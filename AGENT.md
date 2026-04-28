# 🤖 AGENT.md — تعليمات للـ AI Agent

> **انسخ المحتوى الكامل لهذا الملف والصقه كـ prompt في VS Code Agent / Cursor / Cline**

---

## السياق
أنا agent يعمل على مشروع **رصين (Raseen)** — لوحة موظف لمنصة سعودية لرصد الاحتراق الوظيفي.

**هدفي:** نشر هذا المشروع على Vercel في production environment وإرجاع الـ live URL للمستخدم.

**المستخدم:** يعمل على macOS ويتحدث العربية.

---

## 🎯 خطوات التنفيذ

### 1️⃣ تحقّق من البيئة
```bash
node --version
npm --version
which vercel
```

### 2️⃣ ثبّت Vercel CLI إذا لم يكن مثبتاً
```bash
npm install -g vercel
```

### 3️⃣ تأكّد من تسجيل الدخول
```bash
vercel whoami
```

إذا لم يكن مسجّلاً، اطلب من المستخدم تشغيل:
```bash
vercel login
```
**انتظر تأكيد المستخدم قبل المتابعة.**

### 4️⃣ تأكّد من بنية المشروع
المشروع يجب أن يحتوي:
- `index.html` (في الجذر)
- `api/chat.js` (داخل مجلد api/)
- `vercel.json`
- `package.json`

```bash
ls -la
ls api/
```

### 5️⃣ النشر الأول
```bash
vercel --yes
```

سيسأل عن إعدادات المشروع — استخدم الإعدادات الافتراضية:
- Set up and deploy? → **Y**
- Scope → حساب المستخدم
- Link to existing project? → **N**
- Project name → `raseen`
- Directory → `./` (الافتراضي)
- Override settings? → **N**

### 6️⃣ اطلب من المستخدم ANTHROPIC_API_KEY

اعرض هذه الرسالة بالعربي:

> 🔑 **مطلوب: مفتاح Anthropic API**
>
> للمستشار الذكي يعمل، أحتاج منك مفتاح API:
> 1. اذهب إلى https://console.anthropic.com
> 2. Settings → API Keys → Create Key
> 3. انسخ المفتاح وأرسله لي

### 7️⃣ أضف المفتاح كـ environment variable
```bash
echo "$ANTHROPIC_API_KEY" | vercel env add ANTHROPIC_API_KEY production
```

أو بشكل تفاعلي:
```bash
vercel env add ANTHROPIC_API_KEY production
# ثم الصق المفتاح
```

### 8️⃣ نشر production
```bash
vercel --prod
```

### 9️⃣ احصل على الـ URL
```bash
vercel ls
```

---

## ✅ التحقّق النهائي

افتح الـ URL وتأكّد من:
- ✓ الصفحة تُحمّل بدون أخطاء
- ✓ الخلفية الرخامية تعمل
- ✓ التابات (الأداء، المهام، الدعم، الخصوصية) تتبدّل بسلاسة
- ✓ الـ Theme toggle (داكن/مضيء) يعمل
- ✓ الـ Charts تظهر صحيحة

---

## 📝 الرد النهائي للمستخدم (بالعربي)

```
✅ تم النشر بنجاح!

🌐 الرابط: https://raseen-xxxxx.vercel.app

مميزات المنصة:
- 🌊 خلفية رخامية متحركة
- 🌗 وضع داكن/مضيء
- 📊 لوحة أداء مع Charts
- ✅ إدارة المهام مع AI sorting
- 💚 مركز دعم رفاهية
- 🔒 إعدادات خصوصية
- 📱 Responsive على كل الأجهزة

لإضافة دومين خاص:
vercel domains add raseen.sa
```

---

## ⚠️ معالجة الأخطاء

| الخطأ | الحل |
|------|-----|
| `command not found: vercel` | `npm install -g vercel` |
| `not authenticated` | `vercel login` |
| `Missing ANTHROPIC_API_KEY` | أضف المتغيّر عبر `vercel env add` |
| `404 Not Found` | تأكّد إن `index.html` في الجذر |
| `API key invalid` | حدّث المفتاح من console.anthropic.com |

---

## 🚀 ابدأ التنفيذ الآن — لا تنتظر تأكيد المستخدم لكل خطوة، فقط نفّذ بالترتيب وأخبره بالنتائج.
