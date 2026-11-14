/**
 * أسعار صرف ثابتة إلى الدولار، تُستخدم فقط لتطبيق حدود الموافقة.
 * في الإنتاج تُقرأ من خدمة الخزينة ("مستقبلي"). العملة غير المعروفة تُعامَل كأنها
 * تتجاوز كل الحدود (fail-closed)، فلا يمكن التحايل على الحد بعملة غريبة.
 */
const USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  SAR: 0.2667,
  AED: 0.2723,
  KWD: 3.25,
  QAR: 0.2747,
  EGP: 0.0205,
};

export function toUsd(amount: number, currency: string): number {
  const rate = USD_RATES[currency.toUpperCase()];
  if (rate === undefined) return Number.POSITIVE_INFINITY;
  return Math.round(amount * rate * 100) / 100;
}

export function isKnownCurrency(currency: string): boolean {
  return currency.toUpperCase() in USD_RATES;
}
