/** سياسة الذمم الدائنة كقيم في الكود. أي تغيير يمر بمراجعة finance_controller. */
export const FINANCE_POLICY = {
  /** أقصى زيادة مسموحة في سعر الوحدة عن سعر أمر الشراء، كنسبة مئوية. */
  unitPriceTolerancePct: 2,
  /** هامش التقريب في التحقق الحسابي للفاتورة. */
  arithmeticTolerance: 0.01,
} as const;
