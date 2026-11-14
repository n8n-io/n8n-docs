# التنسيق: وكيل فحص العقوبات

## من أين تأتي المهام؟

| المصدر | المدخلات |
|--------|----------|
| `finance.payment-scheduler` | `{partyType: "supplier", partyId, resume: {taskType: "finance.payment", input, when}}` |
| إنسان، كفحص دوري أو تأهيل مورد جديد | `{partyType: "supplier", partyId}` |

## إلى من يسلّم؟

- **عند `clear`:** يعيد المهمة الواردة في `resume` كما هي حرفيًا. outcomeGuard يرفض الإحالة إذا:
  - لم يُسجَّل فحص نظيف في هذه المهمة،
  - أو اختلفت الإحالة عن `resume`،
  - أو كان نوع المهمة خارج `COMPLIANCE_POLICY.resumableTaskTypes`.
- **عند `potential_match`:** لا إحالة. يصعّد إلى `compliance_officer`، والمدفوعات للمورد موقوفة تلقائيًا، لأن `assess_payment` يقرأ السجل.

## القرار البشري

مسؤول الامتثال يقرر عبر `resolvePotentialMatch` في `agents/compliance/human-actions.ts`:
- `false_positive`: تبرئة موثقة، ويُسمح بالدفع.
- `confirmed_match`: تأكيد، ويبقى الدفع موقوفًا. الإبلاغ للجهات الرقابية وتجميد الأصول إجراءات بشرية خارج المنظومة.

القرار يُسجَّل كسجل جديد، فيبقى سجل الفحص الآلي كما هو للتدقيق. ولا يملك أي دور غير `compliance_officer` اتخاذ هذا القرار.

## التصعيد

| السبب | الدور | الخطورة |
|-------|-------|---------|
| `sanctions_potential_match` | `compliance_officer` | high (4 ساعات) |
| مورد غير موجود، أو فشل أداة | `compliance_officer` | medium |
