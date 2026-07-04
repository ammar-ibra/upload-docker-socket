# File Upload, Docker & Socket.IO

هذا المشروع عبارة عن API مبني باستخدام **Node.js** و **Express.js**، ويتضمن ثلاث مهام رئيسية:

* رفع الصور محليًا وعلى Cloudinary.
* تشغيل التطبيق باستخدام Docker مع MongoDB.
* إنشاء دردشة بسيطة باستخدام Socket.IO.

---

# 1. File Upload APIs

تم إنشاء واجهتي API لرفع الصور:

## رفع صورة محليًا

```
POST /api/v1/upload/local
```

يقوم بحفظ الصورة داخل مجلد **uploads** ثم يعيد اسم الملف ومساره.

---

## رفع صورة إلى Cloudinary

```
POST /api/v1/upload/cloud
```

يقوم برفع الصورة إلى Cloudinary ثم يعيد رابط الصورة.

---

## التحقق من الملفات

تم إضافة التحقق من:

* السماح فقط بصيغ الصور:

  * jpg
  * jpeg
  * png
  * webp

* الحد الأقصى لحجم الملف:

  * 5MB

كما يمكن الوصول إلى الصور المحلية باستخدام **express.static**.

---


لتشغيل المشروع:

```bash
docker compose up --build
```

---

# 3. Socket.IO Chat

تم ربط Socket.IO مع نفس خادم Express.

الأحداث المستخدمة:

### connection

يتم تنفيذها عند اتصال مستخدم جديد.

---

### disconnect

يتم تنفيذها عند خروج المستخدم من الاتصال.

---

### chat:join

يرسل العميل اسم المستخدم، ويقوم السيرفر بإبلاغ المستخدمين بانضمامه.

---

### chat:message

يرسل العميل رسالة، ويقوم السيرفر بإرسالها لجميع المستخدمين المتصلين.

---

### chat:typing

يرسل العميل إشعارًا بأنه يكتب، ويقوم السيرفر بإرسال هذا الإشعار لباقي المستخدمين.

---


# تشغيل المشروع

تثبيت الحزم:

```bash
npm install
```

تشغيل المشروع:

```bash
npm start
```

أو باستخدام Docker:

```bash
docker compose up --build
```

---

# اختبار المشروع

## رفع الملفات

يمكن اختبار واجهات رفع الصور باستخدام Postman وإرسال الملف بصيغة **form-data**.

---

## Socket.IO

يمكن اختبار أحداث Socket.IO باستخدام:

* Socket.IO Client
* Postman WebSocket
* صفحة HTML بسيطة
---
```bash
```
## postman link

* https://ammaribnnnn-8345846.postman.co/workspace/Ammar-Ibrahem's-Workspace~3fbbe937-edeb-48ec-8689-d2329b754f16/collection/54441169-33b984e3-c8df-44dc-88e0-add033c3a228?action=share&creator=54441169




