# VisionOS — الخطة النهائية بعد القرارات المعمارية

> ده الملف اللي بيلغي التقسيم القديم. القرارات اللي اتاخدت في النقاش وبُني عليها التقسيم ده:
> 1. **Frigate (MIT)** بيُستخدم كمحرك الكاميرا/الستريم/الـ detection الأساسي جوه الـ Edge Box — مش بنعيد بناءه من الصفر.
> 2. **ERP منفصل تماماً** عن الـ Vision Engine، بيتكلموا عن طريق API/events بس.
> 3. المعمارية `apps/services/packages` بس بتتشغل في البداية كـ **modular monolith** (كود مقسّم فعلياً، تشغيل مبدئي بعدد processes قليل) — الانفصال الفعلي لـ microservices لما يظهر سبب حقيقي (عميل تاني/حمل مختلف).
> 4. **Research Sprint أسبوع كامل قبل أي كود** — مخرجاته كاتالوج تقني رسمي بيحدد كل مكتبة/رخصة/قرار.
> 5. تم تصحيح جدول الرخص: **Ultralytics YOLO = AGPL-3.0** (محتاج Enterprise License للاستخدام التجاري المغلق)، **InsightFace موديلات جاهزة = غير تجارية** (الكود بس MIT).

---

## 1. البنية النهائية (Monorepo)

```
visionos/
├── apps/
│   ├── admin-dashboard/        # Next.js — لإدارة العملاء والتراخيص (عندك)
│   └── customer-dashboard/     # Next.js + Flutter لاحقاً — للعميل النهائي
│
├── services/
│   ├── auth-service/           # JWT, RBAC, multi-tenant isolation
│   ├── erp-service/            # Companies, Branches, Users (مصغر)
│   ├── license-service/        # Activation lock, camera/module limits
│   ├── camera-service/         # طبقة رفيعة فوق Frigate: إدارة الكاميرات + إعداد config.yml ديناميكياً
│   ├── pipeline-service/       # يستهلك Frigate MQTT events، يطبّق Rules، يولّد Events رسمية
│   ├── ai-custom-service/      # الموديولز اللي Frigate مش بيغطيها (Pool Safety حالياً)
│   ├── notification-service/   # WhatsApp/Email/Telegram
│   ├── billing-service/        # مؤجل لما بعد الـ MVP (placeholder فقط الآن)
│   └── report-service/         # تقارير + export
│
├── packages/
│   ├── ui/                     # مكونات UI مشتركة بين الداشبوردات
│   ├── sdk/                    # عميل TypeScript لكل الـ internal APIs
│   └── shared/                 # types, constants, validation schemas مشتركة
│
├── infra/
│   ├── docker/                 # docker-compose لكل بيئة (dev/edge/cloud)
│   └── frigate-config/         # قوالب config.yml بتاعة Frigate لكل نوع عميل
│
└── docs/
    └── research-sprint/        # الكاتالوج الناتج من Phase 0 (مصدر الحقيقة لأي قرار مكتبة)
```

**قاعدة تشغيل الـ MVP:** كل ما فوق كود منفصل فعلياً (packages مستقلة، contracts واضحة)، لكن بيتشغل مبدئياً كـ 3 processes فقط على الـ Edge Box: `frigate` (container جاهز) + `edge-runtime` (يلم auth+erp+license+camera+pipeline+ai-custom+notification في process واحد بالتطوير) + `admin-api` (على الكلاود). الفصل لـ containers منفصلة فعلياً بيحصل بس لو ظهر سبب حقيقي (تعدد عملاء بأحمال مختلفة).

---

## 2. جدول الرخص (مصدر أولي — يتأكد نهائياً في Research Sprint)

| المكوّن | المصدر | الرخصة | مناسب تجارياً بدون فتح كود؟ | ملاحظة |
|---|---|---|---|---|
| Camera/Stream/NVR | Frigate | MIT | ✅ نعم | حر بالكامل |
| Object Detection | Frigate المدمج (أو YOLO خاص) | — | ⚠️ محتاج فحص | Frigate نفسه MIT، بس لو استخدمت YOLO مباشر خارج Frigate لازم Enterprise License (AGPL-3.0) |
| Object Tracking | ByteTrack | MIT | ✅ نعم | |
| OCR / LPR | PaddleOCR (أو Frigate المدمج) | Apache 2.0 | ✅ نعم | |
| Segmentation | SAM 2 | Apache 2.0 | ✅ نعم | |
| Pose (Pool Safety) | MediaPipe | Apache 2.0 | ✅ نعم | |
| Face Recognition | InsightFace | كود MIT / **موديلات جاهزة غير تجارية** | ⚠️ لا للموديلات الجاهزة | لازم ترخيص تجاري من InsightFace أو تدريب موديل خاص |

**قرار عملي:** الاعتماد الأساسي على المدمج جوه Frigate (detection, LPR, face recognition — كله تحت مظلة MIT بتاعت Frigate) بدل استدعاء YOLO/InsightFace منفصلين، وده بيوفر مشكلة الرخصة تلقائياً في أغلب الحالات. المكتبات المنفصلة (SAM2, MediaPipe, ByteTrack) بتُستخدم بس للموديولز اللي Frigate مش بيغطيها زي Pool Safety.

---

## Phase 0 — VisionOS Research Sprint (أسبوع واحد، قبل أي كود)

### 0.A — إعداد الكاتالوج
- [ ] **0.1** إنشاء قالب الكاتالوج (جدول موحّد لكل فئة)
  - [ ] 0.1.a أعمدة الجدول: الفئة / أفضل مشروع / رخصة / مناسب تجارياً؟ / يحتاج تعديل؟ / فكرة فقط أم fork؟ / القرار النهائي
  - [ ] 0.1.b ملف `docs/research-sprint/catalog.md` فاضي بالقالب جاهز للتعبئة

### 0.B — تقييم الفئات (كل فئة = تاسك مستقل، ينتج صف في الكاتالوج)
- [ ] **0.2** Camera/NVR — تأكيد Frigate كخيار نهائي (أو بدائل: Shinobi, ZoneMinder) + توثيق السبب
- [ ] **0.3** AI Detection — تأكيد الاعتماد على detection المدمج في Frigate + فحص جودته على كاميرات الفنادق تحديداً
- [ ] **0.4** Face Recognition — تقييم موديل InsightFace التجاري vs تدريب موديل خاص vs تأجيل الميزة دي بالكامل من الـ MVP
- [ ] **0.5** OCR/LPR — تأكيد PaddleOCR أو LPR المدمج في Frigate
- [ ] **0.6** Tracking — تأكيد ByteTrack (أو الموجود جوه Frigate أصلاً)
- [ ] **0.7** Fire & Smoke Detection — بحث موديلات جاهزة (غالباً هيتأجل لمرحلة تانية، مش ضمن الـ 4 موديولز)
- [ ] **0.8** Drowning Detection — أهم فئة بحث (مفيش حل جاهز شائع) — تقييم MediaPipe Pose + منطق حركة مخصص، وتوثيق أي أبحاث/مشاريع مفتوحة قريبة من المطلوب
- [ ] **0.9** Parking/LPR — خارج نطاق الـ MVP، بس يتوثق للمستقبل
- [ ] **0.10** Dashboards — تأكيد "تطوير خاص" (Next.js + shadcn) بدل أي framework جاهز
- [ ] **0.11** Licensing/Multi-Tenant — بحث سريع لأي مكتبة activation-lock جاهزة قبل بناء حل خاص
- [ ] **0.12** Docker/GPU Optimization — توثيق أفضل ممارسات Frigate الرسمية لـ NVIDIA/Coral/Intel iGPU

### 0.C — القرار النهائي
- [ ] **0.13** جلسة مراجعة الكاتالوج كامل، وتثبيت "قائمة القرارات المعتمدة" (نسخة نهائية من جدول القسم 2 فوق)
- [ ] **0.14** تحديث بنية `services/` لو أي قرار غيّر الفرضيات (مثلاً لو Face Recognition اتأجل بالكامل)

**معيار القبول:** ملف `catalog.md` مكتمل لكل الفئات، وقائمة قرارات نهائية موقّعة قبل أي commit كود إنتاجي.

---

## Phase 1 — الأساس (Infra + Auth + ERP Core + Frigate Integration)

### 1.A — Infra أساسي
- [ ] **1.1** Monorepo structure حسب القسم 1 فوق + README لكل مجلد
- [ ] **1.2** Docker Compose: PostgreSQL + Frigate container + edge-runtime skeleton
- [ ] **1.3** DB migrations لكل الجداول (TENANTS, COMPANIES, BRANCHES, USERS, LICENSES, CAMERAS, PIPELINES, EVENTS, ALERTS, RULES)
- [ ] **1.4** Seed script (شركة + فرع + admin تجريبي)
- [ ] **1.5** CI أساسي (lint + build + migration check)

### 1.B — Auth & RBAC (`auth-service`)
- [ ] **1.6** Login (JWT) + refresh token + logout
- [ ] **1.7** Roles (`owner/admin/viewer`) + Guard/Decorator
- [ ] **1.8** CRUD مستخدمين مع tenant isolation

### 1.C — ERP Core (`erp-service`)
- [ ] **1.9** CRUD كامل لـ `Companies` و `Branches`
- [ ] **1.10** CRUD لـ `Licenses` + دوال التحقق (`camera_limit`, `module_limit`, `expires_at`)
- [ ] **1.11** ربط الترخيص بـ `hardware_id` (activation lock) — endpoint تفعيل من الـ edge box

### 1.D — Camera Integration (`camera-service` — طبقة فوق Frigate، مش بديل له)
- [ ] **1.12** دالة تولّد قسم `cameras:` في `config.yml` بتاع Frigate ديناميكياً من بيانات جدول `CAMERAS`
- [ ] **1.13** `POST /cameras` — إضافة كاميرا في الـ DB + إعادة توليد config Frigate + إعادة تحميله (Frigate API لإعادة التحميل بدون إعادة تشغيل كامل لو متاح، أو restart controlled)
- [ ] **1.14** تطبيق فحص `camera_limit` من 1.10 قبل الإضافة
- [ ] **1.15** خدمة اختبار RTSP سريعة (ffprobe) قبل الحفظ في الـ config
- [ ] **1.16** قراءة حالة الكاميرات (online/offline) من Frigate API مباشرة بدل بناء health-check منفصل
- [ ] **1.17** ONVIF Auto Discovery — استخدام مكتبة ONVIF مستقلة (مش من Frigate) لاكتشاف كاميرات جديدة على الشبكة، وعرضها كمرشحات للإضافة اليدوية

**معيار قبول الفيس:** تسجل دخول، تنشئ شركة وفرع، تضيف كاميرا من الداشبورد، وتلاقيها ظاهرة وشغالة فعلياً جوه Frigate UI/API بدون تدخل يدوي في الـ config.

---

## Phase 2 — Pipeline & AI (استهلاك Frigate + الموديول المخصص)

### 2.A — MQTT Bridge (`pipeline-service`)
- [ ] **2.1** الاتصال بـ MQTT broker بتاع Frigate والاشتراك في topics الأحداث (`frigate/events`, `frigate/+/person`)
- [ ] **2.2** parsing رسائل Frigate (object type, camera, zone, confidence) لشكل داخلي موحّد
- [ ] **2.3** كتابة raw events في جدول `EVENTS` مؤقت للتأكد من استمرارية الاستقبال (اختبار 10 دقائق متواصل)

### 2.B — Zones كـ Pipeline Config
- [ ] **2.4** تعريف zones على مستوى Frigate config (بولت-إن أصلاً فيه) + مزامنتها مع جدول `PIPELINES.config`
- [ ] **2.5** **Occupancy Counting**: قراءة عدد الكائنات الحالية في zone معينة من Frigate API مباشرة (مش إعادة حساب)
- [ ] **2.6** **Intrusion/Fence Crossing**: بناء منطق "دخول/خروج zone" فوق أحداث Frigate (enter/exit events) بدل تتبع يدوي من الصفر

### 2.C — Person Detection
- [ ] **2.7** التأكد إن Frigate بيرصد `person` class بالدقة المطلوبة على عينة كاميرات حقيقية (مش تطوير — اختبار وضبط `min_score`/`threshold` في الـ config فقط)

### 2.D — Pool Safety / Drowning Detection (الموديول المخصص الوحيد)
- [ ] **2.8** **(نتيجة تاسك 0.8)** تأكيد النهج المختار (MediaPipe Pose + قواعد حركة، أو موديل مصنّف جاهز إن وُجد)
- [ ] **2.9** بناء خدمة `ai-custom-service` مستقلة: تستهلك frame stream من كاميرا المسبح (عبر Frigate RTSP relay أو اتصال مباشر)
- [ ] **2.10** تطبيق Pose Estimation + منطق كشف الحركة غير الطبيعية (مكوث تحت الماء / عدم حركة أفقية)
- [ ] **2.11** كتابة event من نوع `drowning_alert` في نفس جدول `EVENTS` (نفس شكل أحداث Frigate، عشان الـ pipeline-service يتعامل معاه بنفس الطريقة)
- [ ] **2.12** ضبط threshold لتقليل false positives قبل أي اعتماد فعلي (اختبار مكثف بفيديوهات تجريبية)

**معيار قبول الفيس:** شخص يدخل zone → event occupancy صحيح. شخص يعبر خط → event intrusion صحيح. محاكاة غرق → event drowning_alert. كل ده بيوصل لجدول `EVENTS` موحّد الشكل.

---

## Phase 3 — Rules + Notifications

### 3.A — Rules Engine (`pipeline-service`)
- [ ] **3.1** بنية شرط بسيطة (`metric`, `operator`, `value`, `action`) في جدول `RULES`
- [ ] **3.2** دالة `evaluateRule` + دعم operators أساسية
- [ ] **3.3** ربطها بمخرجات Phase 2 (كل event من Frigate أو من `ai-custom-service` يتفحص ضد الـ rules قبل ما يبقى Alert رسمي)
- [ ] **3.4** Debounce لمنع تكرار نفس التنبيه خلال فترة قصيرة
- [ ] **3.5** CRUD لإدارة الـ Rules

### 3.B — Pipeline Templates
- [ ] **3.6** 4 templates جاهزة (Person Detection, Intrusion, Occupancy, Pool Safety) كـ JSON schema
- [ ] **3.7** `POST /pipelines/from-template` — تطبيق template على كاميرا (ينشئ سجل `PIPELINES` + zone في Frigate config لو محتاج)
- [ ] **3.8** UI بسيط لاختيار كاميرا + template

### 3.C — Notification Center (`notification-service`)
- [ ] **3.9** تكامل Twilio WhatsApp
- [ ] **3.10** تكامل Email (SMTP/SendGrid)
- [ ] **3.11** تكامل Telegram Bot
- [ ] **3.12** جدول `ALERTS` (pending/sent/failed) + retry logic بسيط

**معيار قبول الفيس:** حدث حقيقي (تجاوز عدد أشخاص، عبور خط) → تنبيه فعلي على القنوات التلاتة خلال ثوانٍ.

---

## Phase 4 — Dashboards + Beta

### 4.A — Customer Dashboard
- [ ] **4.1** Live View: استخدام snapshot/stream endpoints بتاعة Frigate مباشرة (مفيش داعي لبناء snapshot service خاص)
- [ ] **4.2** Events Timeline (فلاتر: تاريخ/كاميرا/نوع)
- [ ] **4.3** تقارير يومية/أسبوعية + Export PDF/CSV (`report-service`)

### 4.B — Admin Dashboard
- [ ] **4.4** شاشة إدارة العملاء والتراخيص
- [ ] **4.5** شاشة تجديد/تعديل الترخيص + عرض `hardware_id`

### 4.C — Beta حقيقي
- [ ] **4.6** Deployment checklist (Docker + NVIDIA toolkit + Frigate config template + ربط الكاميرات الفعلية)
- [ ] **4.7** جمع ملاحظات أول أسبوعين + قائمة أولويات (bugs vs features)

**معيار قبول الفيس:** فندق حقيقي شغّال، البيانات حية، والتنبيهات بتوصل صح.

---

## ما تغيّر عن التقسيم القديم (باختصار)

- اتلغى بناء **Stream Engine + AI Runtime (ONNX/TensorRT) من الصفر** بالكامل — استُبدل بتكامل مع Frigate. ده وفّر تقريباً الفيس التاني كامل من الخطة القديمة.
- **Occupancy + Intrusion** بقوا استهلاك لأحداث Frigate الجاهزة (zones/enter/exit) بدل بناء tracking ومنطق polygon من الصفر.
- **Pool Safety** فضل الموديول المخصص الوحيد اللي محتاج بناء AI فعلي من الصفر — وده متوقع لأنه نقطة التميز التنافسي أصلاً.
- **Phase 0 (Research Sprint)** بقى فيز رسمي بمخرج ملموس (`catalog.md`) قبل أي التزام تقني.
- **معمارية الـ services** واضحة كملفات/packages من أول يوم، بس التشغيل الفعلي مبدئياً 3 processes بس على الـ Edge Box لتقليل overhead التشغيل المبكر.
