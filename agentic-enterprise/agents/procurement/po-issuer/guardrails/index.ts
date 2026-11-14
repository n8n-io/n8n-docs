import { injectionGuard } from "../../../../platform/security/guardrails.ts";
import { sameTaskScope } from "../../shared/guardrails/same-task-scope.ts";
import { poPreconditions } from "./po-preconditions.ts";

/**
 * حواجز وكيل إصدار أوامر الشراء، منفّذة في الكود عبر ToolExecutor، بالترتيب:
 * 1. same_task_scope (مشترك): الطلب والمورد هما المسندان في المهمة فقط.
 * 2. po_preconditions: إعادة التقييم لحظة الإصدار (اعتماد، وتكرار، ومورد، وميزانية، وتقسيم).
 * 3. injection_guard (من المنصة): محتوى خارجي فيه علامات تلاعب، فيُصعَّد بدل طلب الموافقة.
 * ثم approval gate: لا يصدر أي أمر دون موافقة بشرية، ويُنفَّذ بالمبلغ الموافق عليه أو أقل.
 */
export const poIssuerGuardrails = [
  sameTaskScope(["create_purchase_order"]),
  poPreconditions,
  injectionGuard(["create_purchase_order"], "procurement_manager"),
];
