# التنسيق: وكيل فرز طلبات الشراء

## من أين تأتي المهام؟

| المصدر | نوع المهمة | المدخلات |
|--------|-----------|----------|
| بوابة المشتريات (إنسان) | `procurement.requisition` | `requisitionId`، و`language` اختياري، و`untrusted[]` للمرفقات |

الطالب هو `originator` للمهمة وما يتفرع عنها. لذلك لا يستطيع اعتماد أمر الشراء الناتج عن طلبه (فصل الصلاحيات).

## إلى من يسلّم؟

| الحالة | المستلم | الشكل |
|--------|---------|-------|
| `approved_for_po` | `procurement.po-issuer` | إحالة `procurement.po` بالمدخلات `{requisitionId, supplierId}`، واحدة لكل مورد، فورًا (`when: "now"`) |
| `rejected` | الطالب | ملخص المهمة والملاحظة في ERP بلغته |
| `escalated` | إنسان | تصعيد حسب الجدول أدناه |

الإحالة إلى أي نوع مهمة آخر يرفضها Orchestrator، لأن `canHandoffTo` لا يحوي إلا `procurement.po`. والإحالة إلى `procurement.po` نفسها يرفضها outcomeGuard، ما لم يكن الطلب مسجلًا `approved_for_po` في ERP.

## التصعيد

| النتيجة | الدور | الخطورة | المهلة |
|---------|-------|---------|--------|
| `NON_CATALOG_ITEM`، `SUPPLIER_NOT_APPROVED`، `QUOTES_REQUIRED` | `procurement_lead` | low أو medium | 24 إلى 72 ساعة |
| `BUDGET_INSUFFICIENT`، `BUDGET_UNKNOWN` | `procurement_manager` | medium | 24 ساعة |
| `SPLIT_SUSPECTED` | `procurement_manager` | high | 4 ساعات |
| خطأ أداة أو بيانات ناقصة | `procurement_lead` | medium | 24 ساعة |

**بعد قرار الإنسان:**
- `requeue`: يعيد المهمة للوكيل بعد تعديل البيانات، كرفع الميزانية مثلًا.
- `complete` أو `reject`: يغلق المهمة مباشرة.

## ما لا يفعله

- لا يتواصل مع الموردين.
- لا يصدر أوامر شراء.
- لا يغيّر الميزانيات.
- لا يعدّل الطلب نفسه، لأن تعديل الطلب مسؤولية الطالب.
