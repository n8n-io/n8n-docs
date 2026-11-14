import type { MemoryPolicy } from "../../../../platform/memory/memory-store.ts";

/**
 * ذاكرة وكيل فرز الطلبات.
 *
 * ما يُحفظ:
 * - triage_notes (مستوى المهمة): ملاحظات العمل أثناء الفرز، وتُمحى تلقائيًا عند انتهاء المهمة.
 * - catalog_gaps (مستوى الوكيل، 180 يومًا): أوصاف الأصناف المطلوبة غير الموجودة في الكتالوج وتكرارها،
 *   لاقتراح إضافتها للكتالوج. بلا بيانات شخصية.
 *
 * ما يُنسى:
 * - هوية الطالب وأي بيانات شخصية: لا تُحفظ إطلاقًا، وتُحجب تلقائيًا لو وردت.
 * - نص المبررات والمرفقات وعروض الأسعار: تبقى في ERP، ولا تدخل الذاكرة.
 * - القرارات السابقة: مصدرها ERP وaudit log، لا الذاكرة، كي لا يتكون "انطباع" عن طالب بعينه.
 */
export const intakeMemory: MemoryPolicy = {
  remember: [
    { namespace: "triage_notes", scope: "task", maxTtlDays: 0, allowPii: false, description: "Working notes for the current requisition" },
    { namespace: "catalog_gaps", scope: "agent", maxTtlDays: 180, allowPii: false, description: "Frequently requested non-catalog items" },
  ],
  forget: [
    "Requester identity and any personal data",
    "Justification text, attachments and supplier quotes",
    "Past decisions about specific requesters (no profiling)",
  ],
};
