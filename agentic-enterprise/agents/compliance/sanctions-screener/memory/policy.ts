import type { MemoryPolicy } from "../../../../platform/memory/memory-store.ts";

/**
 * ذاكرة وكيل فحص العقوبات.
 *
 * ما يُحفظ:
 * - screening_notes (مستوى المهمة): ملاحظات العمل، وتُمحى عند انتهاء المهمة.
 *
 * ما يُنسى، أو بالأدق: ما لا يدخل الذاكرة أصلًا:
 * - نتائج الفحص: مكانها سجل الامتثال (sanctions.recordScreening)، وهو سجل مرجعي له مدة احتفاظ نظامية.
 * - قرارات التبرئة السابقة: لا يجوز أن "يتذكر" الوكيل أن اسمًا ما بُرِّئ فيتساهل معه. كل فحص يبدأ من القائمة الحالية.
 * - أي بيانات شخصية عن الأفراد المدرجين في القوائم.
 */
export const screenerMemory: MemoryPolicy = {
  remember: [{ namespace: "screening_notes", scope: "task", maxTtlDays: 0, allowPii: false, description: "Working notes for the current screening" }],
  forget: ["Screening outcomes (kept in the compliance record, not memory)", "Past clearances (no leniency carried across screenings)", "Personal data of listed individuals"],
};
