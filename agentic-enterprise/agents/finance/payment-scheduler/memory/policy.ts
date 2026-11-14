import type { MemoryPolicy } from "../../../../platform/memory/memory-store.ts";

/**
 * ذاكرة وكيل جدولة المدفوعات.
 *
 * ما يُحفظ:
 * - payment_working (مستوى المهمة): ملاحظات التنفيذ، وتُمحى عند انتهاء المهمة.
 *
 * ما يُنسى، ولا يدخل الذاكرة أصلًا:
 * - الحسابات البنكية: المرجع الوحيد هو السجل الرئيسي لحظة الدفع، ولا توجد نسخة في الذاكرة قد تتقادم أو تُسمَّم.
 * - تاريخ المدفوعات: مصدره نظام المدفوعات وaudit log.
 * - نتائج فحص العقوبات: مصدرها سجل الامتثال، وتُقرأ في كل مرة.
 */
export const paymentSchedulerMemory: MemoryPolicy = {
  remember: [{ namespace: "payment_working", scope: "task", maxTtlDays: 0, allowPii: false, description: "Working notes for the current payment" }],
  forget: ["Bank account details (always read from master data)", "Payment history (kept in the payments system)", "Screening results (kept in the compliance record)"],
};
