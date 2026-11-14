import type { MemoryPolicy } from "../../../../platform/memory/memory-store.ts";

/**
 * ذاكرة وكيل معالجة الفواتير.
 *
 * ما يُحفظ:
 * - matching_notes (مستوى المهمة): ملاحظات المطابقة، وتُمحى عند انتهاء المهمة.
 * - supplier_invoice_patterns (مستوى الوكيل، 365 يومًا): أنماط تنسيق متكررة لدى مورد،
 *   مثل "يضع رقم أمر الشراء في حقل المرجع". بلا مبالغ ولا حسابات بنكية.
 *
 * ما يُنسى:
 * - الحسابات البنكية الواردة في الفواتير: لا تُحفظ أبدًا، والمرجع الوحيد هو السجل الرئيسي.
 *   حفظها قد يجعل الحساب الاحتيالي "مألوفًا" في المرة القادمة.
 * - أسماء جهات اتصال الموردين وبريدهم: تُحجب تلقائيًا.
 * - محتوى رسائل البريد المرافقة.
 */
export const invoiceProcessorMemory: MemoryPolicy = {
  remember: [
    { namespace: "matching_notes", scope: "task", maxTtlDays: 0, allowPii: false, description: "Working notes for the current invoice" },
    { namespace: "supplier_invoice_patterns", scope: "agent", maxTtlDays: 365, allowPii: false, description: "Recurring invoice layout quirks per supplier" },
  ],
  forget: ["Bank details from invoices (master data is the only reference)", "Supplier contact names and emails", "Content of accompanying emails"],
};
