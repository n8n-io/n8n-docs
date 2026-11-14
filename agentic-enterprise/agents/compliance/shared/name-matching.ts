import type { SanctionsEntry } from "../../../platform/connectors/types.ts";

/**
 * مطابقة الأسماء مقابل قوائم العقوبات. خوارزمية حتمية قابلة للتدقيق، والنموذج اللغوي لا يقرر التطابق.
 *
 * التحدي الرئيسي هو الأسماء العربية: الاسم الواحد يُكتب بالإنجليزية بطرق كثيرة
 * (Mohammed / Muhammad / Mohamed، Rashid / Rasheed)، وقد يرد بالحرف العربي.
 * المعالجة على أربع طبقات:
 *   1. تطبيع: أحرف صغيرة، وإزالة التشكيل وعلامات الترقيم، وتوحيد أداة التعريف (al-/el-/ال).
 *   2. حذف الكلمات العامة: اللواحق القانونية وكلمات النشاط التجاري (LLC، Trading، مؤسسة…).
 *   3. تقريب صوتي: توحيد الأشكال الشائعة لنقل الأسماء العربية.
 *   4. هيكل ساكن (consonant skeleton): يقارن الكتابة العربية باللاتينية، فـ"محمد" ≈ mhmd ≈ Mohamed.
 * الدرجة: متوسط أفضل تطابق لكل كلمة بمقياس Jaro-Winkler، في الاتجاهين، ثم الأقل منهما.
 *
 * حدود معروفة ("مستقبلي"): لا يعالج تبديل ترتيب الاسم الكامل مع النسب الطويل، ولا تواريخ الميلاد
 * أو الجنسية كعوامل ترجيح. الإنتاج يحتاج محركًا متخصصًا ومعايرة على بيانات حقيقية.
 */

export const MATCH_THRESHOLD = 0.85;
export const REPORT_THRESHOLD = 0.75;

const RAW_STOPWORDS = [
  "llc", "ltd", "limited", "co", "company", "corp", "inc", "plc", "gmbh", "ab", "fze", "fzco", "est", "establishment",
  "trading", "general", "holdings", "holding", "group", "international", "the", "and", "of", "for",
  "مؤسسة", "شركة", "للتجارة", "التجارة", "تجارة", "العامة", "المحدودة", "ذات", "مسؤولية", "و",
];

const VARIANTS: Array<[RegExp, string]> = [
  [/^(mohammed|mohammad|mohamed|mohamad|muhammed|mohamud|mohd|muhamad)$/, "muhammad"],
  [/^(abdallah|abdulla|abdullah|abdellah)$/, "abdullah"],
  [/^(ahmad|ahmed|ahmet)$/, "ahmad"],
  [/^(hussein|husain|hussain|hosein)$/, "husayn"],
];

const ARABIC_TO_LATIN: Record<string, string> = {
  ب: "b", ت: "t", ث: "th", ج: "j", ح: "h", خ: "kh", د: "d", ذ: "dh", ر: "r", ز: "z", س: "s", ش: "sh", ص: "s",
  ض: "d", ط: "t", ظ: "z", ع: "", غ: "gh", ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n", ه: "h", ة: "h",
  ء: "", ا: "", ي: "", و: "",
};

function isArabic(s: string): boolean {
  return /[\u0600-\u06FF]/.test(s);
}

/** توحيد الحروف العربية متعددة الأشكال: الهمزات، والتاء المربوطة، والألف المقصورة، والتطويل. */
function normalizeArabic(s: string): string {
  return s
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ـ/g, "");
}

const STOPWORDS = new Set(RAW_STOPWORDS.map(normalizeArabic));

export function tokens(name: string): string[] {
  const cleaned = normalizeArabic(name)
    .normalize("NFKD")
    .replace(/[ً-ٰٟ̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\b(al|el)[\s-]+/g, "")
    .replace(/-/g, " ");
  return cleaned
    .split(/\s+/)
    .map((t) => (isArabic(t) && t.startsWith("ال") && t.length > 3 ? t.slice(2) : t))
    .map((t) => (isArabic(t) && t.startsWith("لل") && t.length > 3 ? t.slice(2) : t))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t) && !STOPWORDS.has(`ال${t}`))
    .map((t) => VARIANTS.reduce((acc, [re, v]) => (re.test(acc) ? v : acc), t));
}

/** الهيكل الساكن: حروف ساكنة فقط، بلا تكرار متتالٍ، وبالحرف اللاتيني. */
export function skeleton(token: string): string {
  const latin = isArabic(token) ? [...token].map((c) => ARABIC_TO_LATIN[c] ?? "").join("") : token;
  return latin
    .replace(/q/g, "k")
    .replace(/[aeiouyw]/g, "")
    .replace(/(.)\1+/g, "$1");
}

export function jaroWinkler(a: string, b: string): number {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const range = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
  const am = new Array<boolean>(a.length).fill(false);
  const bm = new Array<boolean>(b.length).fill(false);
  let matches = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = Math.max(0, i - range); j < Math.min(b.length, i + range + 1); j++) {
      if (bm[j] || a[i] !== b[j]) continue;
      am[i] = bm[j] = true;
      matches++;
      break;
    }
  }
  if (!matches) return 0;
  let t = 0;
  for (let i = 0, k = 0; i < a.length; i++) {
    if (!am[i]) continue;
    while (!bm[k]) k++;
    if (a[i] !== b[k]) t++;
    k++;
  }
  const jaro = (matches / a.length + matches / b.length + (matches - t / 2) / matches) / 3;
  let prefix = 0;
  while (prefix < 4 && a[prefix] === b[prefix]) prefix++;
  return jaro + prefix * 0.1 * (1 - jaro);
}

function tokenSim(x: string, y: string): number {
  if (x === y) return 1;
  const direct = isArabic(x) || isArabic(y) ? 0 : jaroWinkler(x, y);
  const sx = skeleton(x);
  const sy = skeleton(y);
  const skel = sx.length >= 2 && sy.length >= 2 ? jaroWinkler(sx, sy) * 0.97 : 0;
  return Math.max(direct, skel);
}

function directional(q: string[], c: string[]): number {
  if (!q.length || !c.length) return 0;
  return q.reduce((sum, t) => sum + Math.max(...c.map((u) => tokenSim(t, u))), 0) / q.length;
}

/** درجة تشابه بين اسمين من 0 إلى 1. */
export function nameScore(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  // الأقل من الاتجاهين يمنع أن يطابق اسم من كلمة واحدة شائعة اسمًا طويلًا.
  // لكن اسم المورد غالبًا أطول من اسم الشخص المدرج، فنقيس أيضًا تغطية الاسم المدرج داخل اسم المورد.
  const listCoverage = directional(tb, ta);
  const symmetric = Math.min(directional(ta, tb), listCoverage);
  return Math.round(Math.max(symmetric, tb.length >= 2 ? listCoverage * 0.98 : 0) * 1000) / 1000;
}

export interface Candidate {
  entryId: string;
  entryName: string;
  list: SanctionsEntry["list"];
  matchedOn: string;
  partyName: string;
  score: number;
}

/** يفحص كل أسماء الطرف (الاسم والاسم العربي) مقابل كل اسم وكنية في القائمة. */
export function screenNames(partyNames: string[], entries: SanctionsEntry[]): Candidate[] {
  const out: Candidate[] = [];
  for (const e of entries) {
    let best: Candidate | null = null;
    for (const listName of [e.name, ...e.aliases])
      for (const pn of partyNames) {
        const score = nameScore(pn, listName);
        if (!best || score > best.score) best = { entryId: e.id, entryName: e.name, list: e.list, matchedOn: listName, partyName: pn, score };
      }
    if (best && best.score >= REPORT_THRESHOLD) out.push(best);
  }
  return out.sort((a, b) => b.score - a.score);
}
