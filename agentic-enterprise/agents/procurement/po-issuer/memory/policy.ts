import type { MemoryPolicy } from "../../../../platform/memory/memory-store.ts";

/**
 * ذاكرة وكيل إصدار أوامر الشراء.
 *
 * ما يُحفظ:
 * - po_working (مستوى المهمة): المسودة والملاحظات أثناء التنفيذ، وتُمحى عند انتهاء المهمة.
 * - supplier_po_issues (مستوى الوكيل، 365 يومًا): مشكلات تشغيلية متكررة مع مورد، مثل
 *   "يرفض الأوامر دون رقم مركز تكلفة في المرجع". بلا بيانات شخصية ولا أسعار.
 *
 * ما يُنسى:
 * - أسعار عروض الموردين ومحتوى المرفقات: المصدر الوحيد للسعر هو الكتالوج.
 * - أسماء جهات الاتصال وبريدهم: تُحجب تلقائيًا.
 * - قرارات الموافقة البشرية: مكانها approval gate وaudit log، لا الذاكرة.
 */
export const poIssuerMemory: MemoryPolicy = {
  remember: [
    { namespace: "po_working", scope: "task", maxTtlDays: 0, allowPii: false, description: "Working draft and notes for the current PO" },
    { namespace: "supplier_po_issues", scope: "agent", maxTtlDays: 365, allowPii: false, description: "Recurring operational issues per supplier" },
  ],
  forget: ["Supplier quote prices and attachment content", "Contact names and emails", "Human approval decisions (kept in the approval gate)"],
};
