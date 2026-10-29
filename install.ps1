$ErrorActionPreference = "Stop"

$Binary = "wizard.exe"
$InstallDir = "seloom-wizard"
$Arch = if ([Environment]::Is64BitOperatingSystem) { "amd64" } else { "386" }

if ($env:PROCESSOR_ARCHITECTURE -eq "ARM64" -or $env:PROCESSOR_ARCHITEW6432 -eq "ARM64") {
    $Arch = "arm64"
}

$Archive = "SELOOM-Wizard-windows-$Arch.zip"
$ArchiveUrl = "https://github.com/Seloom1/SELOOM-Wizard/releases/latest/download/$Archive"
$WorkerUrl = "https://raw.githubusercontent.com/Seloom1/SELOOM-Worker-Panel/main/dist/worker.js"
$LatestVersion = (Invoke-RestMethod -Uri "https://raw.githubusercontent.com/Seloom1/SELOOM-Wizard/main/VERSION").Trim()

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

$BinaryPath = Join-Path $InstallDir $Binary
$NeedsInstall = $false

if (Test-Path $BinaryPath) {
    $InstalledVersion = (& $BinaryPath --version).Trim()
    Write-Host "Installed version: $InstalledVersion"
    Write-Host "Latest version: $LatestVersion"

    if ($InstalledVersion -eq $LatestVersion) {
        Write-Host "SELOOM Wizard is up to date."
    } else {
        Write-Host "Updating to version $LatestVersion..."
        $NeedsInstall = $true
    }
} else {
    Write-Host "SELOOM Wizard not found here. Installing version $LatestVersion..."
    $NeedsInstall = $true
}

if ($NeedsInstall) {
    Write-Host "Downloading $Archive..."

    $zipPath = Join-Path $InstallDir $Archive
    Invoke-WebRequest -Uri $ArchiveUrl -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $InstallDir -Force
    Remove-Item $zipPath
}

Write-Host "Downloading SELOOM worker.js..."
Invoke-WebRequest -Uri $WorkerUrl -OutFile (Join-Path $InstallDir "worker.js")

$env:LAUNCHED_BY_SCRIPT = "1"

Push-Location $InstallDir
try {
    & ".\$Binary"
} finally {
    Pop-Location
}
