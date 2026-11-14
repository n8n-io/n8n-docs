# التنسيق: وكيل جدولة المدفوعات

## من أين تأتي المهام؟

| المصدر | المدخلات |
|--------|----------|
| `finance.invoice-processor` | `{invoiceId}` |
| `compliance.sanctions-screener` (استئناف بعد فحص نظيف) | `{invoiceId, afterScreening: true}` |

## الموافقة البشرية

| الشرط | الموافقون | العدد |
|-------|-----------|-------|
| ≤ 50,000 دولار | `finance_controller`، `cfo` | 1 |
| > 50,000 دولار | الأدوار نفسها، بشخصين مختلفين | 2 |

- من أنشأ سلسلة المهام (`originator`) لا يوافق عليها.
- مدة صلاحية الموافقة 24 ساعة.

## التنسيق مع الامتثال

1. لا فحص صالح: يحيل الوكيل `compliance.screen` ومعه `resume` يعود إلى الفاتورة نفسها.
2. فحص نظيف: يستأنف الفاحص `finance.payment`، والـ outcomeGuard لديه يتحقق أن الاستئناف هو المطلوب حرفيًا.
3. تطابق محتمل: يصعّد الفاحص إلى `compliance_officer`، فيتوقف الدفع حتى قرار بشري. بعد `false_positive`، يعيد الإنسان مهمة الدفع للطابور.

الحماية من الحلقات: إذا عادت المهمة بعد فحص (`afterScreening`) ولم يصبح الفحص صالحًا، يصعّد الوكيل بدل طلب فحص جديد.

## التصعيد

| النتيجة | الدور | الخطورة |
|---------|-------|---------|
| `SCREENING_HIT` | `compliance_officer` | high |
| `BANK_DETAILS_MISMATCH` | `finance_controller` | critical |
| `SUPPLIER_NOT_APPROVED` | `finance_controller` | high |
| فشل التنفيذ بعد الموافقة | `finance_controller` | high |
| `SCREENING_LOOP` | `compliance_officer` | medium |
