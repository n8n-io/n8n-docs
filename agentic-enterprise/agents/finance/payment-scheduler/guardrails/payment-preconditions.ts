import { allow, type Guardrail } from "../../../../platform/tools/types.ts";
import { assessPayment } from "../../shared/payment-assessment.ts";

/**
 * payment_preconditions: يعيد تقييم جاهزية الدفع لحظة طلب الموافقة.
 * - rejected (غير مطابقة، أو مدفوعة، أو غير موجودة): منع.
 * - needs_screening: منع، مع التوجيه لطلب الفحص أولًا.
 * - escalated (تطابق عقوبات، أو احتيال بنكي، أو مورد غير معتمد): تصعيد للدور المحدد.
 */
export const paymentPreconditions: Guardrail = {
  id: "finance.payment_preconditions",
  description: "Re-checks match status, duplicates, supplier, bank details and sanctions screening before any payment request",
  appliesTo: ["schedule_payment"],
  check: (call, ctx) => {
    const a = assessPayment(ctx.connectors, String(call.input.invoiceId), ctx.clock.now());
    if (a.verdict === "ready") return allow;
    if (a.verdict === "escalated" && a.primary?.escalation)
      return { action: "escalate", ...a.primary.escalation, summary: `Payment blocked for ${String(call.input.invoiceId)}: ${a.primary.message}` };
    return { action: "block", reason: `${a.primary?.code}: ${a.primary?.message}${a.verdict === "needs_screening" ? " — request compliance.screen first" : ""}` };
  },
};
