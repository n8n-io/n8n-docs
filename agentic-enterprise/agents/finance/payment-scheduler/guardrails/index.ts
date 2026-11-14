import { injectionGuard } from "../../../../platform/security/guardrails.ts";
import { sameTaskInvoice } from "../../shared/guardrails/same-task-invoice.ts";
import { paymentPreconditions } from "./payment-preconditions.ts";

/**
 * حواجز وكيل جدولة المدفوعات، منفّذة في الكود، بالترتيب:
 * 1. same_task_invoice: فاتورة المهمة فقط.
 * 2. payment_preconditions: مطابقة، وعدم تكرار، ومورد معتمد، وحساب مسجل، وفحص عقوبات نظيف وحديث.
 * 3. injection_guard (من المنصة): محتوى خارجي فيه علامات تلاعب، فيُصعَّد.
 * ثم approval gate: موافقة finance_controller أو cfo، وموافقتان فوق 50 ألف دولار.
 * ثم الـ connector: لا يدفع إلا لمورد معتمد وعلى الحساب المسجل، وبمبلغ لا يتجاوز الموافق عليه.
 */
export const paymentSchedulerGuardrails = [
  sameTaskInvoice(["schedule_payment"]),
  paymentPreconditions,
  injectionGuard(["schedule_payment"], "finance_controller"),
];
