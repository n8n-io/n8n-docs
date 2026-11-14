import type { Connectors, ScreeningRecord } from "../../../platform/connectors/types.ts";
import { COMPLIANCE_POLICY } from "./policy.ts";
import { screenNames, type Candidate } from "./name-matching.ts";

/**
 * فحص طرف حتمي: يجمع كل أسماء الطرف من السجل الرئيسي (لا من نص المهمة)، ويطابقها بالقائمة الحالية.
 * المصدر الوحيد لنتيجة الفحص: تستخدمه الأداة والحاجز والسياسة المرجعية.
 */
export interface PartyScreening {
  partyId: string;
  partyName: string | null;
  names: string[];
  candidates: Candidate[];
  suggested: "clear" | "potential_match" | null;
  listVersion: string;
}

export function screenSupplier(c: Connectors, supplierId: string): PartyScreening {
  const s = c.erp.getSupplier(supplierId);
  const listVersion = c.sanctions.listVersion();
  if (!s) return { partyId: supplierId, partyName: null, names: [], candidates: [], suggested: null, listVersion };
  const names = [s.name, ...(s.nameAr ? [s.nameAr] : [])];
  const candidates = screenNames(names, c.sanctions.entries());
  const suggested = candidates.some((x) => x.score >= COMPLIANCE_POLICY.matchThreshold) ? "potential_match" : "clear";
  return { partyId: supplierId, partyName: s.name, names, candidates, suggested, listVersion };
}

/** هل يسمح سجل الفحص الأخير بالدفع؟ نظيف أو مبرَّأ بشريًا، وحديث، وعلى نسخة القائمة الحالية. */
export function screeningAllowsPayment(rec: ScreeningRecord | null, now: Date, currentListVersion: string): { ok: boolean; code: "SCREENING_MISSING" | "SCREENING_STALE" | "SCREENING_HIT" | "SCREENING_OK"; detail: string } {
  if (!rec) return { ok: false, code: "SCREENING_MISSING", detail: "No sanctions screening on record" };
  if (rec.status === "potential_match" || rec.status === "confirmed_match") return { ok: false, code: "SCREENING_HIT", detail: `Latest screening is ${rec.status} (${rec.id})` };
  const ageDays = (now.getTime() - new Date(rec.screenedAt).getTime()) / 86_400_000;
  if (ageDays > COMPLIANCE_POLICY.screeningValidityDays || rec.listVersion !== currentListVersion)
    return { ok: false, code: "SCREENING_STALE", detail: `Screening ${rec.id} is ${Math.floor(ageDays)} days old on list ${rec.listVersion}` };
  return { ok: true, code: "SCREENING_OK", detail: `${rec.status} on ${rec.screenedAt}` };
}
