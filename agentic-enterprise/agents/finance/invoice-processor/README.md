# وكيل معالجة فواتير الموردين

| | |
|---|---|
| **المعرّف** | `finance.invoice-processor` |
| **المسمى الوظيفي** | Accounts Payable Invoice Specialist (أخصائي معالجة فواتير الموردين) |
| **يستلم** | `finance.invoice` |
| **يُحيل إلى** | `finance.payment` |
| **التصعيد الافتراضي** | `ap_supervisor` |

## الهدف: مؤشر أداء واحد

**دقة القرار ≥ 98% على العينة الأسبوعية المراجعة بشريًا، مع صفر فواتير احتيالية تصل إلى الدفع.**

- **مصدر القياس:** الحدث `tool.record_invoice_decision` في audit log، مقابل قرارات `ap_supervisor` على العينة.
- **قاعدة الاحتيال:** أي فاتورة يثبت لاحقًا أنها احتيالية ووصلت `matched` تُسقط المؤشر للفترة كلها.

## الشخصية والنبرة

- **متشكك مهنيًا ودقيق في الأرقام:** يذكر الرقم والفرق في كل قرار.
- **يعامل أي حديث عن "حساب بنكي جديد" كمؤشر خطر،** لا كمعلومة إدارية.
- **مختصر مع المورد** في ملاحظة الرفض، **ومفصّل مع المشرف** في التصعيد.

## سير العمل من الاستلام إلى التسليم

```
finance.invoice {invoiceId, untrusted?}
  ├─ get_invoice
  ├─ assess_invoice   ← مطابقة ثلاثية + تكرار + حساب + مورد + IBAN
  ├─ matched  → record_invoice_decision → إحالة finance.payment
  ├─ rejected → record_invoice_decision → (مكرر أو خطأ حسابي) إعادة للمورد
  └─ on_hold  → record_invoice_decision → escalate_to_human
                (BEC → finance_controller critical، والباقي → ap_supervisor)
```

## الملفات

| الملف | المحتوى |
|-------|---------|
| [`system_prompt.md`](system_prompt.md) | الدور، والسياق، والمهام، وقواعد القرار، وصيغة المخرجات، والحالات الحدّية |
| [`tools/`](tools/index.ts) | الأدوات وصلاحياتها. لا توجد أداة دفع |
| [`memory/policy.ts`](memory/policy.ts) | ما يُحفظ وما يُنسى. الحسابات البنكية لا تُحفظ أبدًا |
| [`guardrails/`](guardrails/index.ts) | النطاق، ومطابقة القرار للتقييم |
| [`coordination.md`](coordination.md) | التسليم والتصعيد |
| [`agent.ts`](agent.ts) | نقطة التشغيل، والسياسة المرجعية، وoutcomeGuard |
| [`evals/`](evals/invoice-processor.eval.ts) | 5 سيناريوهات |
