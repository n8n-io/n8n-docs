import { noClearOverThreshold } from "./no-clear-over-threshold.ts";
import { sameTaskParty } from "./same-task-party.ts";

/**
 * حواجز وكيل فحص العقوبات، منفّذة في الكود:
 * 1. same_task_party: الكتابة على طرف المهمة فقط.
 * 2. no_clear_over_threshold: لا تبرئة آلية لطرف فوق حد التطابق.
 * إضافة إلى outcomeGuard في agent.ts: لا استئناف لمهمة دفع إلا بعد فحص نظيف مسجل في هذه المهمة،
 * ولا استئناف إلا لنوع مهمة مدرج في COMPLIANCE_POLICY.resumableTaskTypes وبالمدخلات الأصلية نفسها.
 *
 * متى يتوقف ويطلب إنسانًا؟ عند أي تطابق محتمل، أو مورد غير موجود، أو فشل أداة.
 */
export const screenerGuardrails = [sameTaskParty, noClearOverThreshold];
