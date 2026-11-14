import { sameTaskScope } from "../../shared/guardrails/same-task-scope.ts";
import { decisionMatchesAssessment } from "./decision-matches-assessment.ts";

/**
 * حواجز وكيل فرز الطلبات، منفّذة في الكود عبر ToolExecutor:
 * 1. same_task_scope (مشترك): الكتابة على طلب المهمة فقط.
 * 2. decision_matches_assessment: القرار يطابق التقييم الحتمي، والتصعيد مسموح دائمًا.
 * إضافة إلى outcomeGuard في agent.ts: لا إحالة لإصدار أمر شراء إلا إذا كان الطلب مسجلًا approved_for_po في ERP.
 *
 * متى يتوقف ويطلب إنسانًا؟ عند أي نتيجة action=escalate في التقييم، أو أي غموض أو تناقض في البيانات،
 * أو إذا رفض حاجز قراره ولم يكن السبب واضحًا.
 */
export const intakeGuardrails = [sameTaskScope(["record_requisition_decision"]), decisionMatchesAssessment];
