import { describe, expect, it } from "vitest";
import { isPlatformError } from "../../platform/core/errors.ts";
import { testPlatform, gd } from "../helpers.ts";

function request(p: ReturnType<typeof testPlatform>["p"], amount: number, currency = "USD", action: "payment" | "master_data_change" = "payment") {
  return p.gate.request({
    taskId: "t1", actionType: action, toolName: "pay", requestedBy: "agent.x", originator: "u-requester",
    payload: { invoiceId: "INV-1", amount }, summary: "pay", money: { amount, currency },
  });
}

function codeOf(fn: () => unknown): string | undefined {
  try {
    fn();
  } catch (e) {
    return isPlatformError(e) ? e.code : "OTHER";
  }
  return undefined;
}

describe("ApprovalGate", () => {
  it("requires one approver below the threshold and two above it", () => {
    const { p } = testPlatform();
    expect(request(p, 49_999).requiredApprovals).toBe(1);
    expect(request(p, 50_001).requiredApprovals).toBe(2);
    expect(request(p, 200_000, "SAR").requiredApprovals).toBe(2); // ≈ 53,340 USD
    expect(request(p, 100, "XYZ").requiredApprovals).toBe(2); // عملة مجهولة: أشد حد
    expect(request(p, 1, "USD", "master_data_change").requiredApprovals).toBe(2); // دائمًا مزدوجة
  });

  it("enforces role, originator SoD and no double decision", () => {
    const { p } = testPlatform();
    const r = request(p, 60_000);
    expect(codeOf(() => gd(p, r.id, "u-cs-sup", "approve"))).toBe("UNAUTHORIZED_APPROVER");
    expect(codeOf(() => gd(p, r.id, "u-requester", "approve"))).toBe("UNAUTHORIZED_APPROVER");
    expect(gd(p, r.id, "u-fin-ctrl", "approve").status).toBe("pending");
    expect(codeOf(() => gd(p, r.id, "u-fin-ctrl", "approve"))).toBe("SOD_VIOLATION");
    expect(gd(p, r.id, "u-cfo", "approve").status).toBe("approved");
    // كل رفض مسجل في audit رغم التراجع عن المعاملة
    expect(p.audit.query({ action: "approval.approve" }).filter((e) => e.outcome === "denied")).toHaveLength(3);
  });

  it("blocks the originator even when they hold an approver role", () => {
    const { p } = testPlatform();
    const r = p.gate.request({ taskId: "t", actionType: "payment", toolName: "pay", requestedBy: "a", originator: "u-fin-ctrl", payload: {}, summary: "s", money: { amount: 10, currency: "USD" } });
    expect(codeOf(() => gd(p, r.id, "u-fin-ctrl", "approve"))).toBe("SOD_VIOLATION");
  });

  it("expires after TTL and cannot be approved afterwards", () => {
    const { p, clock } = testPlatform();
    const r = request(p, 10);
    clock.advanceHours(25);
    expect(codeOf(() => gd(p, r.id, "u-fin-ctrl", "approve"))).toBe("APPROVAL_INVALID");
    expect(p.gate.get(r.id).status).toBe("expired");
  });

  it("issues a single-use grant bound to action type and amount", () => {
    const { p } = testPlatform();
    const r = request(p, 1_000);
    expect(codeOf(() => p.gate.issueGrant(r.id))).toBe("APPROVAL_INVALID");
    gd(p, r.id, "u-fin-ctrl", "approve");
    const grant = p.gate.issueGrant(r.id);
    expect(codeOf(() => p.gate.issueGrant(r.id))).toBe("APPROVAL_INVALID");
    expect(codeOf(() => p.gate.redeem(grant, "external_send"))).toBe("APPROVAL_INVALID");
    expect(codeOf(() => p.gate.redeem(grant, "payment", { amount: 1_001, currency: "USD" }))).toBe("APPROVAL_INVALID");
    expect(codeOf(() => p.gate.redeem({ ...grant, nonce: "forged" }, "payment"))).toBe("APPROVAL_INVALID");
    expect(p.gate.redeem(grant, "payment", { amount: 1_000, currency: "USD" }).status).toBe("executed");
    expect(codeOf(() => p.gate.redeem(grant, "payment", { amount: 1_000, currency: "USD" }))).toBe("APPROVAL_INVALID");
    expect(codeOf(() => p.gate.redeem(undefined, "payment"))).toBe("APPROVAL_REQUIRED");
  });

  it("rejection is final", () => {
    const { p } = testPlatform();
    const r = request(p, 60_000);
    gd(p, r.id, "u-fin-ctrl", "reject", "not matched");
    expect(p.gate.get(r.id).status).toBe("rejected");
    expect(codeOf(() => gd(p, r.id, "u-cfo", "approve"))).toBe("APPROVAL_INVALID");
  });

  it("tool-level roles can only narrow the policy roles", () => {
    const { p } = testPlatform();
    const r = p.gate.request({ taskId: "t", actionType: "payment", toolName: "pay", requestedBy: "a", originator: "u-requester", payload: {}, summary: "s", roles: ["cfo", "cs_supervisor"] });
    expect(r.allowedRoles).toEqual(["cfo"]);
  });
});
