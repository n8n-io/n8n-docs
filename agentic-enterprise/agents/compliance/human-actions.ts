import { PlatformError } from "../../platform/core/errors.ts";
import { verifyHumanAction, type HumanActionProof } from "../../platform/identity/approver-keys.ts";
import type { Platform } from "../../platform/index.ts";

/**
 * قرار بشري على تطابق محتمل. لا توجد أداة وكيل تستدعي هذه الدالة.
 * تُستدعى من واجهة مسؤول الامتثال، ومن evals لمحاكاته.
 * تتحقق من الدور، وتسجل القرار في audit log، وتغلق التصعيدات المفتوحة على المهمة.
 */
export function resolvePotentialMatch(p: Platform, screeningId: string, humanId: string, status: "false_positive" | "confirmed_match", note: string, proof?: HumanActionProof) {
  const human = p.directory.get(humanId);
  if (!human.roles.includes("compliance_officer")) {
    p.audit.append({ actor: { type: "human", id: humanId }, action: "compliance.resolve_match", target: screeningId, outcome: "denied", data: { reason: "not a compliance officer" } });
    throw new PlatformError("UNAUTHORIZED_APPROVER", "Only a compliance officer can resolve a potential sanctions match");
  }
  if (!note.trim()) throw new PlatformError("INVALID_INPUT", "A sanctions decision requires a documented rationale");
  // التبرئة تفتح باب الدفع للمورد، فهي قرار يجب أن يُثبت صاحبه بتوقيعه (T17).
  let keyFingerprint: string | undefined;
  if (p.config.APPROVER_AUTH === "signed") {
    try {
      keyFingerprint = verifyHumanAction(p.keys, p.clock, proof, { purpose: "compliance.resolve_match/v1", humanId, subject: screeningId, details: { status, note } });
    } catch (err) {
      p.audit.append({ actor: { type: "human", id: humanId }, action: "compliance.resolve_match", target: screeningId, outcome: "denied", data: { code: "AUTHENTICATION_FAILED", reason: (err as Error).message } });
      throw err;
    }
  }
  const rec = p.connectors.sanctions.resolveScreening(screeningId, humanId, status, note);
  p.audit.append({ actor: { type: "human", id: humanId }, action: "compliance.resolve_match", target: screeningId, taskId: rec.sourceTaskId, outcome: "success", data: { status, note, partyId: rec.partyId, auth: keyFingerprint ? "signed" : "trusted", ...(keyFingerprint ? { keyFingerprint } : {}) } });
  return rec;
}

/** نسخة للاختبار والتطوير: توقّع بمفاتيح التطوير ثم تقرر. */
export function resolvePotentialMatchSigned(p: Platform, screeningId: string, humanId: string, status: "false_positive" | "confirmed_match", note: string) {
  return resolvePotentialMatch(p, screeningId, humanId, status, note, p.signAction(humanId, "compliance.resolve_match/v1", screeningId, { status, note }));
}
