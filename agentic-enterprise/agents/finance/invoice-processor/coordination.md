# التنسيق: وكيل معالجة الفواتير

## من أين تأتي المهام؟

| المصدر | نوع المهمة | المدخلات |
|--------|-----------|----------|
| صندوق بريد الذمم الدائنة، أو بوابة الموردين، أو EDI | `finance.invoice` | `invoiceId`، و`untrusted[]` اختياري (البريد المرافق) |

استخراج بيانات الفاتورة من PDF أو البريد إلى ERP خارج نطاق هذا الوكيل الآن، ومصنّف **مستقبلي**. الوكيل يبدأ من فاتورة مسجلة في ERP.

## إلى من يسلّم؟

| القرار | المستلم |
|--------|---------|
| `matched` | `finance.payment-scheduler`، بإحالة `finance.payment {invoiceId}`. outcomeGuard يرفض الإحالة إن لم تكن الفاتورة `matched` في ERP |
| `rejected` | المورد. الملاحظة في ERP، وإرسالها للمورد إجراء خارجي مصنّف **مستقبلي** يمر بموافقة `external_send` |
| `on_hold` | إنسان، حسب جدول التصعيد أدناه |

## التصعيد

| النتيجة | الدور | الخطورة | السبب |
|---------|-------|---------|-------|
| `BANK_DETAILS_MISMATCH` | `finance_controller` | critical (ساعة واحدة) | `suspected_fraud` |
| `PO_SUPPLIER_MISMATCH` | `finance_controller` | high | `suspected_fraud` |
| `QTY_EXCEEDS_RECEIPT`، `PRICE_VARIANCE`، `LINE_NOT_ON_PO`، `CURRENCY_MISMATCH`، `SUPPLIER_NOT_APPROVED` | `ap_supervisor` | medium | `policy_exception` |
| `NO_PO` | `ap_supervisor` | medium | `missing_data` |

**بعد قرار الإنسان:** يصحح المشرف البيانات (إيصال استلام متأخر، أو إشعار دائن من المورد)، ثم يعيد المهمة للطابور (`requeue`)، أو يغلقها.
