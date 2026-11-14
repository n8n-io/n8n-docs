import { MATCH_THRESHOLD } from "./name-matching.ts";

/** سياسة الامتثال كقيم في الكود. أي تغيير يمر بمراجعة compliance_officer. */
export const COMPLIANCE_POLICY = {
  /** فوق هذه الدرجة يُعد التطابق محتملًا، ولا يملك الوكيل تبرئة الطرف. */
  matchThreshold: MATCH_THRESHOLD,
  /** صلاحية نتيجة الفحص قبل الدفع، بالأيام. بعدها يُعاد الفحص. */
  screeningValidityDays: 30,
  /** أنواع المهام التي يجوز استئنافها بعد فحص نظيف. */
  resumableTaskTypes: ["finance.payment"] as string[],
} as const;
