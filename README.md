# 🌊 رصين — Raseen

> منصة ذكاء اصطناعي سعودية للتنبؤ بالاحتراق الوظيفي عبر تحليل البصمة الرقمية للأداء.

## 🚀 خطوات النشر على Vercel (3 دقائق)

### الطريقة الأسهل: Vercel CLI

```bash
# 1. ثبّت Vercel CLI (مرة واحدة فقط)
npm install -g vercel

# 2. ادخل لمجلد المشروع
cd raseen-deploy

# 3. سجّل دخول لحسابك
vercel login

# 4. ادفع المشروع للـ production
vercel --prod
```

أول مرة بيسألك:
- **Set up and deploy?** → Y
- **Which scope?** → اختر حسابك
- **Link to existing project?** → N
- **Project name?** → raseen (أو أي اسم)
- **In which directory is your code?** → ./
- **Override settings?** → N

### إضافة الـ API Key

بعد ما يخلص الـ deploy الأولي:

```bash
# أضف الـ API key كمتغير بيئة
vercel env add ANTHROPIC_API_KEY production
# الصق الـ key لما يطلبه

# اعمل redeploy عشان يستخدم الـ key الجديد
vercel --prod
```

أو من الواجهة: ادخل dashboard.vercel.com → اختار المشروع → Settings → Environment Variables → Add:
- **Name:** `ANTHROPIC_API_KEY`
- **Value:** الـ key بتاعك من console.anthropic.com
- **Environments:** Production, Preview, Development

ثم Redeploy من قائمة Deployments.

---

## 🌐 الطريقة الثانية: عبر GitHub

```bash
# 1. ارفع المشروع لـ GitHub
cd raseen-deploy
git init
git add .
git commit -m "Initial Raseen deployment"
gh repo create raseen --public --push
```

ثم:
1. ادخل [vercel.com/new](https://vercel.com/new)
2. اختار repo `raseen`
3. Add Environment Variable: `ANTHROPIC_API_KEY` = `sk-ant-...`
4. اضغط **Deploy**

---

## 📁 هيكل المشروع

```
raseen-deploy/
├── index.html          ← الصفحة الرئيسية (Marble theme + Dark/Light toggle)
├── api/
│   └── chat.js         ← Serverless function (يخفي API key)
├── vercel.json         ← إعدادات النشر
├── package.json
└── README.md
```

---

## 🔑 الحصول على ANTHROPIC_API_KEY

1. ادخل [console.anthropic.com](https://console.anthropic.com)
2. سجّل دخول أو أنشئ حساب
3. من Settings → API Keys → **Create Key**
4. اِنسخ الـ key (يبدأ بـ `sk-ant-...`)
5. أضفه في Vercel كما هو موضّح أعلاه

---

## ⚙️ التطوير المحلي (اختياري)

```bash
# ثبّت Vercel CLI
npm i -g vercel

# شغّل development server
vercel dev
```

افتح `http://localhost:3000` — الموقع هيشتغل والـ API endpoint كذلك.

---

## ✨ المميزات

- 🌊 خلفية رخامية مائية متحركة (Marble water animation)
- 🌗 Dark/Light mode toggle (يُحفظ في localStorage)
- 🤖 مستشار AI مدمج بـ Claude
- 📱 Responsive (mobile, tablet, desktop)
- ⚡ سرعة عالية — صفحة HTML واحدة
- 🌐 RTL كامل، عربي حصري

---

© 2025 منصة رصين · المملكة العربية السعودية
