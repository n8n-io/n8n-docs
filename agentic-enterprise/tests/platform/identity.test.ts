import { createPublicKey, generateKeyPairSync, verify } from "node:crypto";
import { describe, expect, it } from "vitest";
import { isPlatformError } from "../../platform/core/errors.ts";
import { decisionMessage, generateApproverKeyPair, signDecision, type DecisionProof } from "../../platform/identity/approver-keys.ts";
import { done, gd, testAgent, testPlatform } from "../helpers.ts";

/** R7: لا يمكن اتخاذ قرار موافقة باسم شخص دون مفتاحه الخاص، والقرار مربوط بالإجراء الدقيق. */

async function pendingApproval() {
  const t = testPlatform();
  t.p.register(testAgent({ policy: async ({ tools }) => (await tools.call("send_email", { to: "client@example.com", body: "quote" }), done("waiting", { status: "needs_approval" })) }));
  const task = t.p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
  await t.p.orchestrator.drain();
  return { ...t, task, approval: t.p.gate.list({ status: "pending" })[0]! };
}

function code(fn: () => unknown): string | undefined {
  try {
    fn();
  } catch (e) {
    return isPlatformError(e) ? e.code : String(e);
  }
  return undefined;
}

describe("signed approval decisions", () => {
  it("rejects an unsigned decision in signed mode and audits the attempt", async () => {
    const { p, approval } = await pendingApproval();
    expect(code(() => p.gate.decide(approval.id, "u-cs-sup", "approve"))).toBe("AUTHENTICATION_FAILED");
    expect(p.gate.get(approval.id).status).toBe("pending");
    expect(p.audit.query({ action: "approval.approve" }).at(-1)).toMatchObject({ outcome: "denied", data: { code: "AUTHENTICATION_FAILED" } });
  });

  it("an attacker's own key cannot sign as someone else (impersonation)", async () => {
    const { p, approval, clock } = await pendingApproval();
    const attacker = generateApproverKeyPair();
    const forged = signDecision(attacker.privateKeyPem, { approvalId: approval.id, humanId: "u-cs-sup", decision: "approve", payloadHash: approval.payloadHash, comment: "", issuedAt: clock.now().toISOString() });
    expect(code(() => p.gate.decide(approval.id, "u-cs-sup", "approve", "", forged))).toBe("AUTHENTICATION_FAILED");
  });

  it("a proof is bound to one approval, one decision, one comment and the exact payload", async () => {
    const { p, approval } = await pendingApproval();
    const proof = p.signDecision(approval.id, "u-cs-sup", "approve", "ok");
    const tampered = (patch: Partial<DecisionProof>) => code(() => p.gate.decide(approval.id, "u-cs-sup", (patch.decision ?? "approve") as "approve", patch.comment ?? "ok", { ...proof, ...patch }));
    expect(tampered({ approvalId: "apr_other" })).toBe("AUTHENTICATION_FAILED"); // إعادة استخدام على طلب آخر
    expect(tampered({ decision: "reject", comment: "ok" })).toBe("AUTHENTICATION_FAILED"); // تحويل الموافقة إلى رفض
    expect(tampered({ comment: "approved by CFO" })).toBe("AUTHENTICATION_FAILED"); // تعديل التعليق
    expect(tampered({ payloadHash: "f".repeat(64) })).toBe("AUTHENTICATION_FAILED"); // حمولة مختلفة
    expect(tampered({ humanId: "u-cfo" })).toBe("AUTHENTICATION_FAILED"); // تحويله لشخص آخر
    expect(code(() => p.gate.decide(approval.id, "u-cs-sup", "approve", "ok", proof))).toBeUndefined();
  });

  it("rejects stale proofs (replay outside the 5-minute window) and proofs from revoked keys", async () => {
    const { p, approval, clock } = await pendingApproval();
    const proof = p.signDecision(approval.id, "u-cs-sup", "approve");
    clock.advanceHours(0.2);
    expect(code(() => p.gate.decide(approval.id, "u-cs-sup", "approve", "", proof))).toBe("AUTHENTICATION_FAILED");
    p.keys.revoke("u-cs-sup", "u-ops");
    expect(code(() => gd(p, approval.id, "u-cs-sup", "approve"))).toBe("AUTHENTICATION_FAILED");
  });

  it("stores verifiable provenance: key fingerprint and signature in the decision record", async () => {
    const { p, approval } = await pendingApproval();
    gd(p, approval.id, "u-cs-sup", "approve", "checked recipient");
    const d = p.gate.get(approval.id).decisions[0]!;
    expect(d).toMatchObject({ auth: "signed", keyFingerprint: p.keys.activeKey("u-cs-sup")!.fingerprint });
    const { signature, ...rest } = { approvalId: approval.id, humanId: d.humanId, decision: d.decision, payloadHash: approval.payloadHash, comment: d.comment, issuedAt: d.issuedAt!, signature: d.signature! };
    expect(verify(null, decisionMessage(rest), createPublicKey(p.keys.activeKey("u-cs-sup")!.publicKeyPem), Buffer.from(signature, "base64"))).toBe(true);
  });

  it("only a platform operator can register keys, and only Ed25519 keys are accepted", () => {
    const { p } = testPlatform();
    const k = generateApproverKeyPair();
    expect(code(() => p.keys.register("u-cfo", k.publicKeyPem, "u-cfo"))).toBe("UNAUTHORIZED_APPROVER");
    const rsa = generateKeyPairSync("rsa", { modulusLength: 2048 }).publicKey.export({ type: "spki", format: "pem" }).toString();
    expect(code(() => p.keys.register("u-cfo", rsa, "u-ops"))).toBe("INVALID_INPUT");
    const before = p.keys.activeKey("u-cfo")!.fingerprint;
    expect(p.keys.register("u-cfo", k.publicKeyPem, "u-ops").fingerprint).not.toBe(before);
    expect(p.keys.list().filter((x) => x.humanId === "u-cfo" && x.revokedAt === null)).toHaveLength(1);
    expect(p.audit.query({ action: "identity.key_registered" }).at(-1)).toMatchObject({ actor: { id: "u-ops" }, target: "u-cfo" });
  });
});

describe("approval lifecycle hardening", () => {
  it("a rejection requires a reason", async () => {
    const { p, approval } = await pendingApproval();
    expect(code(() => gd(p, approval.id, "u-cs-sup", "reject", "  "))).toBe("INVALID_INPUT");
  });

  it("an approval granted during an emergency stop can be revoked and then never executes", async () => {
    const { p, approval, task } = await pendingApproval();
    p.killSwitch.engage("drill", false);
    await p.decide(approval.id, "u-cs-sup", "approve");
    expect(p.gate.get(approval.id).status).toBe("approved");
    expect(p.orchestrator.revokeApproval(approval.id, "u-cs-sup", "recipient no longer a customer").status).toBe("escalated");
    p.killSwitch.release();
    expect(await p.resume("u-ops")).toEqual([]);
    expect(p.connectors.email.outbox()).toHaveLength(0);
    expect(code(() => p.gate.issueGrant(approval.id))).toBe("APPROVAL_INVALID");
    expect(p.escalations.list({ taskId: task.id })[0]!.reason).toBe("approval_revoked");
  });

  it("R9: a retried run does not create a second approval request for the same action", async () => {
    const { p, task } = await pendingApproval();
    const agent = p.orchestrator.agent("test.agent");
    const again = await p.executor.call(agent, task.id, "send_email", { to: "client@example.com", body: "quote" });
    expect(again.status).toBe("pending_approval");
    expect(p.gate.list()).toHaveLength(1);
    expect(p.audit.query({ action: "approval.request_deduplicated" })).toHaveLength(1);
    const different = await p.executor.call(agent, task.id, "send_email", { to: "client@example.com", body: "revised quote" });
    expect(different.status).toBe("pending_approval");
    expect(p.gate.list()).toHaveLength(2);
  });
});
