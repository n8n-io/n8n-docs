import { describe, expect, it } from "vitest";
import { ALL_AGENTS } from "../../agents/index.ts";
import { resolvePotentialMatchSigned } from "../../agents/compliance/human-actions.ts";
import { isPlatformError } from "../../platform/core/errors.ts";
import { testPlatform } from "../helpers.ts";

/** حق المحو مع سجل audit لا يُعدَّل (crypto-shredding)، على وكيل فحص العقوبات الحقيقي. */
function setup() {
  const { p } = testPlatform();
  p.register(...ALL_AGENTS);
  return p;
}
const screen = async (p: ReturnType<typeof setup>, partyId: string) => {
  const t = p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId }, originator: "u-requester" });
  await p.orchestrator.drain();
  return p.orchestrator.get(t.id);
};
const rawAudit = (p: ReturnType<typeof setup>) => (p.db.prepare("SELECT data FROM audit_log").all() as Array<{ data: string }>).map((r) => r.data).join("\n");
const code = (fn: () => unknown) => {
  try {
    fn();
  } catch (e) {
    return isPlatformError(e) ? e.code : String(e);
  }
  return "ok";
};

describe("privacy: sealed personal data and right to erasure", () => {
  it("personal-data agents' tool outputs and escalation summaries are sealed in the audit log; business agents' are not", async () => {
    const p = setup();
    await screen(p, "sup-007"); // Mohamed Al-Rashid: تطابق محتمل وتصعيد
    const raw = rawAudit(p);
    expect(raw).not.toMatch(/Al-Rashid/i);
    expect(raw).toContain('"$sealed":1');
    const out = p.audit.query({ action: "tool.screen_party" })[0]!;
    expect(JSON.stringify(p.vault.openAll(out.data))).toMatch(/Al-Rashid/); // قابل للقراءة لمن يملك المفتاح
    // وكيل المشتريات يعالج بيانات أعمال: لا ختم
    p.orchestrator.submit({ type: "procurement.requisition", input: { requisitionId: "REQ-2001" }, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.audit.query({ action: "tool.get_requisition" }).some((e) => JSON.stringify(e.data).includes("REQ-2001"))).toBe(true);
  });

  it("erasure shreds the subject key: content becomes unrecoverable, the chain stays valid, task output is redacted", async () => {
    const p = setup();
    const t = await screen(p, "sup-001");
    expect(JSON.stringify(t.output)).toMatch(/Gulf Office/);
    const before = p.audit.verify();
    const r = p.privacy.erase("sup-001", "u-compliance", "PDPL erasure request #PR-2029-014", p.signAction("u-compliance", "privacy.erase_subject/v1", "sup-001", { note: "PDPL erasure request #PR-2029-014" }));
    expect(r.tasksRedacted).toBe(1);
    expect(p.audit.verify()).toMatchObject({ valid: true, entries: before.entries + 2 }); // + محو الذاكرة + قرار المحو
    for (const e of p.audit.query({ action: "tool.screen_party" })) expect(p.vault.openAll(e.data).output).toEqual({ $erased: true, subject: "sup-001" });
    expect(p.orchestrator.get(t.id).output).toEqual({ $erased: true, subject: "sup-001" });
    expect(p.audit.query({ action: "privacy.erase_subject" }).at(-1)).toMatchObject({ outcome: "success", target: "sup-001", data: { auth: "signed" } });

    // نشاط لاحق لصاحب بيانات ممحو لا يعيد إنشاء مفتاح له
    await screen(p, "sup-001");
    expect(p.audit.query({ action: "tool.screen_party" }).at(-1)!.data.output).toEqual({ $erased: true, subject: "sup-001" });
  });

  it("only a compliance officer, with a signed decision and a stated basis, can erase", async () => {
    const p = setup();
    await screen(p, "sup-001");
    expect(code(() => p.privacy.erase("sup-001", "u-cfo", "request", p.signAction("u-cfo", "privacy.erase_subject/v1", "sup-001", { note: "request" })))).toBe("UNAUTHORIZED_APPROVER");
    expect(code(() => p.privacy.erase("sup-001", "u-compliance", "request"))).toBe("AUTHENTICATION_FAILED");
    expect(code(() => p.privacy.erase("sup-001", "u-compliance", "  ", p.signAction("u-compliance", "privacy.erase_subject/v1", "sup-001", { note: "  " })))).toBe("INVALID_INPUT");
    // توقيع لصاحب بيانات آخر لا يصلح
    expect(code(() => p.privacy.erase("sup-001", "u-compliance", "request", p.signAction("u-compliance", "privacy.erase_subject/v1", "sup-002", { note: "request" })))).toBe("AUTHENTICATION_FAILED");
    expect(p.vault.isErased("sup-001")).toBe(false);
    expect(p.audit.query({ action: "privacy.erase_subject" }).filter((e) => e.outcome === "denied")).toHaveLength(4);
  });

  it("a confirmed sanctions match is under legal hold and cannot be erased", async () => {
    const p = setup();
    await screen(p, "sup-007");
    const scr = p.connectors.sanctions.latestScreening("sup-007")!;
    resolvePotentialMatchSigned(p, scr.id, "u-compliance", "confirmed_match", "matches listed entity; retained under AML rules");
    const note = "erasure request";
    expect(code(() => p.privacy.erase("sup-007", "u-compliance", note, p.signAction("u-compliance", "privacy.erase_subject/v1", "sup-007", { note })))).toBe("INVALID_TRANSITION");
    expect(p.vault.isErased("sup-007")).toBe(false);
    expect(p.audit.query({ action: "privacy.erase_subject" }).at(-1)!.data.reason).toMatch(/Legal hold/);
  });
});
