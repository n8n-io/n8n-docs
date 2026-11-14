import { allow, type Guardrail } from "../../../../platform/tools/types.ts";
import { assessRequisition, verdictFor } from "../../shared/assessment.ts";

/**
 * po_preconditions: يعيد تقييم الطلب لحظة طلب إصدار الأمر، لأن الحالة قد تتغير بعد الفرز
 * (ميزانية استُهلكت، أو مورد أوقف، أو أمر سابق صدر).
 * - نتيجة reject (طلب غير معتمد، أمر مكرر، مورد محظور، مورد خارج الطلب): منع.
 * - نتيجة escalate (ميزانية لم تعد كافية، اشتباه تقسيم، مورد غير مكتمل التأهيل): تصعيد للدور المحدد.
 */
export const poPreconditions: Guardrail = {
  id: "procurement.po_preconditions",
  description: "Re-checks requisition approval, duplicates, supplier status, budget and split purchasing at PO time",
  appliesTo: ["create_purchase_order"],
  check: (call, ctx) => {
    const a = assessRequisition(ctx.connectors.erp, String(call.input.requisitionId), { now: ctx.clock.now(), stage: "po" });
    const { verdict, primary } = verdictFor(a, String(call.input.supplierId));
    if (verdict === "rejected") return { action: "block", reason: `${primary?.code}: ${primary?.message}` };
    if (verdict === "escalated" && primary?.escalation)
      return { action: "escalate", ...primary.escalation, summary: `PO blocked for ${String(call.input.requisitionId)}: ${primary.message}` };
    return allow;
  },
};
