import { decrypt, encrypt } from "./encryption";
import { randSubdomain } from "./random";
import { createStreamLogger, StreamLogger } from "./logger";
import { WIZARD_HTML } from "./html";

interface Env {
    SECRET: string;
}

export default {
    async fetch(request: Request, env: Env) {
        try {
            const url = new URL(request.url);

            if (url.pathname === '/api/deploy' && request.method === 'POST') {
                const origin = request.headers.get('Origin');
                if (origin && origin !== url.origin) {
                    return new Response('Unauthorized context', { status: 403 });
                }

                const logger = createStreamLogger();
                const { readable, success, info, error, close } = logger;

                (async () => {
                    try {
                        const { CFAccount } = await import("./api");
                        const { buildScript } = await import("./script");

                        const key = url.searchParams.get('key');
                        const preRelease = url.searchParams.get('pre-release') === 'true';
                        const formData = await request.formData();
                        const apiToken = key ? await decrypt(key, env.SECRET) : formData.get('apiToken')?.toString().trim() ?? '';
                        const deployType = formData.get('deployType')?.toString() || 'workers';
                        const account = await CFAccount.create(apiToken);

                        let workerName: string;
                        do {
                            workerName = randSubdomain();
                        } while (await account.nameTaken(deployType, workerName));

                        info('Installing SELOOM Panel 🇮🇶...');
                        const namespaceId = await account.createKvNamespace(workerName, deployType);
                        success('KV namespace created successfully!');

                        if (deployType === 'pages') {
                            await deployPages(env, account, workerName, namespaceId, logger, preRelease, buildScript);
                        } else {
                            await deployWorkers(env, account, workerName, namespaceId, logger, preRelease, buildScript);
                        }
                    } catch (err: any) {
                        error(`Failed to install SELOOM Panel: ${err?.message || err}`);
                    } finally {
                        close();
                    }
                })();

                return new Response(readable, {
                    headers: {
                        'Content-Type': 'application/x-ndjson'
                    }
                });
            }

            return new Response(WIZARD_HTML, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'public, max-age=3600'
                }
            });
        } catch (err: any) {
            return new Response("Worker Error: " + (err?.message || err) + "\nStack: " + (err?.stack || ""), { status: 500 });
        }
    }
};

async function deployPages(
    env: Env,
    account: any,
    workerName: string,
    namespaceId: string,
    logger: StreamLogger,
    preRelease: boolean,
    buildScript: any
) {
    const { success, complete } = logger;

    const { script, path } = await buildScript(account, workerName, 'pages.dev', '_worker.js', preRelease);
    success('Script built successfully!');

    const subdomain = await account.createPagesProject(workerName, namespaceId);
    success('Pages project created successfully!');

    await account.deployPages(workerName, script);
    success('Pages deployed successfully!');

    const url = new URL(`https://${subdomain}/${path}/panel`);
    const payload = {
        url: url.href,
        user: account.email,
        key: await encrypt(account.token, env.SECRET)
    }

    complete(JSON.stringify(payload));
}

async function deployWorkers(
    env: Env,
    account: any,
    workerName: string,
    namespaceId: string,
    logger: StreamLogger,
    preRelease: boolean,
    buildScript: any
) {
    const { success, complete } = logger;
    let subdomain: string;
    try {
        subdomain = await account.getWorkersDevSubdomain();
        success('Account workers subdomain is available!');
    } catch (error) {
        subdomain = await account.createWorkersDevSubdomain();
        success('Fresh account, Workers subdomain created successfully!');
    }

    const { script, path } = await buildScript(account, workerName, subdomain, 'worker.js', preRelease);
    success('Script built successfully!');

    await account.deployWorker(workerName, script, namespaceId);
    success('Worker deployed successfully!');

    await account.enableSubdomain(workerName);
    success('Worker subdomain enabled successfully!');

    const url = new URL(`https://${workerName}.${subdomain}/${path}/panel`);
    const payload = {
        url: url.href,
        user: account.email,
        key: await encrypt(account.token, env.SECRET)
    }

    complete(JSON.stringify(payload));
}
