# ⚡ SELOOM Wizard 🇮🇶

<div align="center">

![SELOOM Wizard](https://img.shields.io/badge/SELOOM-Wizard%20v1.0.0-0284c7?style=for-the-badge&logo=cloudflare&logoColor=white)
![Platform](https://img.shields.io/badge/Deploy-Web%20%7C%20CLI-f97316?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL--3.0-green?style=for-the-badge)
![Author](https://img.shields.io/badge/Author-Seloom-38bdf8?style=for-the-badge)

<p align="center">
  <b>أداة التثبيت والنشر السريع بنقرة واحدة للوحة سلوم (SELOOM Panel) عبر حساب كلاودفلير بكل سهولة</b><br>
  <b>Automated 1-Click Fast Deployer for SELOOM Panel via Cloudflare API</b>
</p>

[✨ لوحة سلوم الأصلية (SELOOM Panel)](https://github.com/Seloom1/SELOOM-Worker-Panel) • [📖 طريقة التثبيت](#-طريقة-الاستخدام) • [🚀 النشر عبر الويب](#-النسخة-السحابية-web-edition)

---
</div>

## 🌟 مميزات معالج سلوم (Features)

1. ⚡ **تثبيت سريع بنقرة واحدة (1-Click Install)**: لا حاجة لخبرة تقنية أو إعداد بيئة برمجية؛ أدخل التوكن واضغط تثبيت.
2. 🚀 **دعم كامل لـ Cloudflare Pages**: ينشر لوحة `SELOOM Panel` كـ Pages Project لتفادي الحظر تماماً وضمان عمل البروكسي بسلاسة.
3. 🇮🇶 **إعدادات جاهزة ومُحسّنة للعراق**: تأتي اللوحة المنشورة محقونة بالآي بي النظيف المناسب لشبكات العراق (زين وأودي) لتعمل بالرصيد الصفري تلقائياً.
4. 🔒 **أمان وخصوصية تامة 100%**: الأداة مفتوحة المصدر بالكامل، ويتم النشر مباشرة من جهازك أو المتصفح إلى حسابك في كلاودفلير دون تخزين أي مفاتيح في أي خوادم خارجية.
5. 💻 **نسخة ويب ونسخة سطر أوامر (CLI)**: يمكنك استخدام واجهة الويب أو تنفيذ أمر واحد عبر `PowerShell` أو `Termux / Linux`.

---

## 🌐 النسخة السحابية (Web Edition)

عند استضافة المعالج على حسابك أو استخدام الرابط المباشر، يمكنك فتح صفحة الويب وإدخال التوكن مباشرة:

1. اضغط على رابط **إنشاء التوكن** الموجود داخل الصفحة (تم ضبط الصلاحيات مسبقاً).
2. انسخ الـ `Token` والصقه في خانة التوكن.
3. اختر نوع النشر: **Cloudflare Pages** (الخيار الموصى به).
4. اضغط **Install SELOOM Panel**.
5. سيظهر لك مباشرة رابط لوحتك الخاصة وبيانات الدخول!

---

## 💻 نسخة سطر الأوامر (CLI Edition)

### لنظام ويندوز (Windows PowerShell):
```powershell
irm https://raw.githubusercontent.com/Seloom1/SELOOM-Wizard/main/install.ps1 | iex
```

### لأنظمة لينكس، أندرويد (Termux)، وماك (macOS):
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Seloom1/SELOOM-Wizard/main/install.sh)
```

---

## 🛠️ نشر الـ Wizard بنفسك كـ Worker مستقل مجاناً

إذا أردت استضافة المعالج كصفحة ويب خاصة بك ومشاركتها مع أصدقائك أو متابعيك:

```bash
# استنساخ المستودع
git clone https://github.com/Seloom1/SELOOM-Wizard.git
cd SELOOM-Wizard

# تثبيت الحزم
npm install

# نشر المعالج على حساب كلاودفلير الخاص بك مجاناً
npx wrangler deploy
```

---

## 📄 الحقوق والترخيص (License)

- تم بناء وتخصيص المشروع تحت رخصة [GNU General Public License v3.0](LICENSE).
- تم التطوير والإعداد بواسطة **[Seloom (Seloom1)](https://github.com/Seloom1)**.
- تحية تقدير للمشروع الأصلي والمجتمع التقني المفتوح المصدر.
