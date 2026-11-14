import { describe, expect, it } from "vitest";
import { resolvePotentialMatch } from "../../agents/compliance/human-actions.ts";
import { sanctionsScreenerAgent } from "../../agents/compliance/sanctions-screener/agent.ts";
import { isPlatformError } from "../../platform/core/errors.ts";
import { generateApproverKeyPair, signAction } from "../../platform/identity/approver-keys.ts";
import { done, testAgent, testPlatform } from "../helpers.ts";

/**
 * T17: القرارات البشرية التي تفتح أو تستأنف عملية تتطلب توقيع صاحبها.
 * الإيقاف الطارئ نفسه لا يحتاج توقيعًا (fail-safe).
 */

async function codeOf(fn: () => unknown): Promise<string | undefined> {
  try {
    await fn();
  } catch (e) {
    return isPlatformError(e) ? e.code : String(e);
  }
  return undefined;
}

async function escalatedTask() {
  const t = testPlatform();
  t.p.register(testAgent({ policy: async () => done("help", { status: "escalated" }) }));
  const task = t.p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
  await t.p.orchestrator.drain();
  return { ...t, task };
}

describe("signed human actions (T17)", () => {
  it("resolving an escalation requires the resolver's signature over the exact action and note", async () => {
    const { p, task } = await escalatedTask();
    expect(await codeOf(() => p.orchestrator.resolveEscalated(task.id, "u-cs-sup", "complete", "done"))).toBe("AUTHENTICATION_FAILED");
    const proof = p.signAction("u-cs-sup", "task.resolve_escalation/v1", task.id, { action: "requeue", note: "fixed data" });
    expect(await codeOf(() => p.orchestrator.resolveEscalated(task.id, "u-cs-sup", "complete", "fixed data", proof))).toBe("AUTHENTICATION_FAILED"); // الفعل مختلف
    expect(p.orchestrator.get(task.id).status).toBe("escalated");
    expect(p.audit.query({ action: "task.resolve_escalation" }).at(-1)).toMatchObject({ outcome: "denied" });
    expect(p.resolveEscalated(task.id, "u-cs-sup", "requeue", "fixed data").status).toBe("queued");
  });

  it("clearing a potential sanctions match needs the compliance officer's own key", async () => {
    const { p } = testPlatform();
    p.register(sanctionsScreenerAgent);
    p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-007" }, originator: "u-requester" });
    await p.orchestrator.drain();
    const hit = p.connectors.sanctions.latestScreening("sup-007")!;
    const details = { status: "false_positive" as const, note: "different person" };
    expect(await codeOf(() => resolvePotentialMatch(p, hit.id, "u-compliance", details.status, details.note))).toBe("AUTHENTICATION_FAILED");
    const attacker = generateApproverKeyPair();
    const forged = signAction(attacker.privateKeyPem, { purpose: "compliance.resolve_match/v1", humanId: "u-compliance", subject: hit.id, details, issuedAt: p.clock.now().toISOString() });
    expect(await codeOf(() => resolvePotentialMatch(p, hit.id, "u-compliance", details.status, details.note, forged))).toBe("AUTHENTICATION_FAILED");
    const genuine = p.signAction("u-compliance", "compliance.resolve_match/v1", hit.id, details)!;
    expect(await codeOf(() => resolvePotentialMatch(p, hit.id, "u-compliance", details.status, "changed after signing", genuine))).toBe("AUTHENTICATION_FAILED");
    expect(p.connectors.sanctions.latestScreening("sup-007")!.status).toBe("potential_match");
    resolvePotentialMatch(p, hit.id, "u-compliance", details.status, details.note, genuine);
    expect(p.connectors.sanctions.latestScreening("sup-007")!.status).toBe("false_positive");
    expect(p.audit.query({ action: "compliance.resolve_match" }).at(-1)).toMatchObject({ outcome: "success", data: { auth: "signed" } });
  });

  it("engaging the emergency stop needs no signature; releasing it needs an operator's signature and a note", async () => {
    const { p } = testPlatform();
    p.killSwitch.engage("anyone can stop", false);
    expect(await codeOf(() => p.orchestrator.releaseEmergencyStop("u-ops", "ok"))).toBe("AUTHENTICATION_FAILED");
    expect(await codeOf(() => p.release("u-cfo", "ok"))).toBe("UNAUTHORIZED_APPROVER");
    expect(await codeOf(() => p.release("u-ops", " "))).toBe("INVALID_INPUT");
    expect(p.killSwitch.isEngaged()).toBe(true);
    p.release("u-ops", "root cause fixed");
    expect(p.killSwitch.isEngaged()).toBe(false);
    expect(p.audit.query({ action: "ops.kill_switch.release" }).at(-1)).toMatchObject({ data: { auth: "signed" } });
  });

  it("a resume signature covers exactly the approvals that existed when it was signed", async () => {
    const { p } = testPlatform();
    p.register(testAgent({ policy: async ({ tools, task }) => (await tools.call("send_email", { to: `${String(task.input.n)}@example.com`, body: "x" }), done("waiting", { status: "needs_approval" })) }));
    p.orchestrator.submit({ type: "test.run", input: { n: 1 }, originator: "u-requester" });
    await p.orchestrator.drain();
    p.killSwitch.engage("drill", false);
    await p.decide(p.gate.list({ status: "pending" })[0]!.id, "u-cs-sup", "approve");
    const signedForOne = p.signAction("u-ops", "ops.resume_approved/v1", "pending-approved", { approvalIds: p.gate.list({ status: "approved" }).map((a) => a.id).sort() });
    p.release("u-ops", "drill over");
    // موافقة جديدة تظهر بعد التوقيع
    p.orchestrator.submit({ type: "test.run", input: { n: 2 }, originator: "u-requester" });
    await p.orchestrator.drain();
    await p.decide(p.gate.list({ status: "pending" })[0]!.id, "u-cs-sup", "approve"); // تُنفَّذ فورًا (لا إيقاف)
    p.killSwitch.engage("again", false);
    p.orchestrator.submit({ type: "test.run", input: { n: 3 }, originator: "u-requester" });
    p.killSwitch.release();
    await p.orchestrator.drain();
    p.killSwitch.engage("again", false);
    await p.decide(p.gate.list({ status: "pending" })[0]!.id, "u-cs-sup", "approve");
    p.release("u-ops", "ok");
    expect(p.gate.list({ status: "approved" })).toHaveLength(2);
    expect(await codeOf(() => p.orchestrator.executePendingApproved("u-ops", signedForOne))).toBe("AUTHENTICATION_FAILED");
    expect(p.connectors.email.outbox().map((m) => m.to[0])).toEqual(["2@example.com"]);
    await p.resume("u-ops");
    expect(p.connectors.email.outbox()).toHaveLength(3);
  });
});
