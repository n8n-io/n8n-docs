import { describe, expect, it } from "vitest";
import { allow } from "../../platform/tools/types.ts";
import { done, testAgent, testPlatform, gd } from "../helpers.ts";

describe("ToolExecutor", () => {
  it("denies everything while the kill switch is engaged", async () => {
    const { p } = testPlatform();
    p.register(testAgent());
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    p.killSwitch.engage("drill", false);
    const r = await p.executor.call(testAgent(), t.id, "echo", { text: "hi" });
    expect(r).toMatchObject({ status: "denied", code: "KILL_SWITCH_ACTIVE" });
    await expect(p.orchestrator.run(t.id)).rejects.toThrow(/Emergency stop/);
  });

  it("rejects unknown tools and extra or invalid fields", async () => {
    const { p } = testPlatform();
    const agent = testAgent();
    p.register(agent);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    expect(await p.executor.call(agent, t.id, "delete_everything", {})).toMatchObject({ code: "TOOL_NOT_ALLOWED" });
    expect(await p.executor.call(agent, t.id, "echo", { text: 1 })).toMatchObject({ code: "INVALID_INPUT" });
    expect(await p.executor.call(agent, t.id, "echo", { text: "a", approved: true })).toMatchObject({ code: "INVALID_INPUT" });
    expect(await p.executor.call(agent, t.id, "echo", { text: "a" })).toEqual({ status: "ok", output: { text: "a" } });
  });

  it("applies guardrails: block and escalate", async () => {
    const { p } = testPlatform();
    const agent = testAgent({
      guardrails: [
        { id: "no-secret", description: "", appliesTo: ["echo"], check: (c) => (String(c.input.text).includes("secret") ? { action: "block", reason: "secret" } : allow) },
        { id: "esc", description: "", appliesTo: ["echo"], check: (c) => (c.input.text === "fraud" ? { action: "escalate", reason: "suspected_fraud", severity: "critical", toRole: "ciso", summary: "fraud" } : allow) },
      ],
    });
    p.register(agent);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    expect(await p.executor.call(agent, t.id, "echo", { text: "my secret" })).toMatchObject({ status: "denied", code: "GUARDRAIL_BLOCKED" });
    expect(await p.executor.call(agent, t.id, "echo", { text: "fraud" })).toMatchObject({ status: "escalated", reason: "suspected_fraud" });
    expect(p.escalations.list({ taskId: t.id })[0]).toMatchObject({ toRole: "ciso", severity: "critical" });
  });

  it("never executes an approval tool before approval, and executes the stored payload after it", async () => {
    const { p } = testPlatform();
    const agent = testAgent({
      policy: async ({ tools }) => {
        const r = await tools.call("send_email", { to: "client@example.com", body: "Approved text" });
        return r.status === "pending_approval" ? done("waiting", { status: "needs_approval" }) : done("unexpected");
      },
    });
    p.register(agent);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    expect((await p.orchestrator.run(t.id)).status).toBe("awaiting_approval");
    expect(p.connectors.email.outbox()).toHaveLength(0);

    const [a] = p.gate.list({ status: "pending" });
    expect(a!.allowedRoles).toEqual(["cs_supervisor"]);
    const final = await p.decide(a!.id, "u-cs-sup", "approve");
    expect(final.status).toBe("completed");
    expect(p.connectors.email.outbox()).toMatchObject([{ to: ["client@example.com"], body: "Approved text" }]);
    // لا يمكن تنفيذه مرة ثانية
    expect(await p.executor.executeApproved(a!.id)).toMatchObject({ status: "denied", code: "APPROVAL_INVALID" });
  });

  it("approval granted during an emergency stop is held, not escalated, and executes only on explicit resume", async () => {
    const { p } = testPlatform();
    p.register(testAgent({ policy: async ({ tools }) => (await tools.call("send_email", { to: "a@example.com", body: "x" }), done("waiting", { status: "needs_approval" })) }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    p.killSwitch.engage("incident drill", false);
    const [a] = p.gate.list({ status: "pending" });
    expect((await p.decide(a!.id, "u-cs-sup", "approve")).status).toBe("awaiting_approval");
    expect(p.connectors.email.outbox()).toHaveLength(0);
    await expect(p.resume("u-ops")).rejects.toThrow(/Emergency stop/);
    p.killSwitch.release();
    expect((await p.resume("u-ops"))[0]!.status).toBe("completed");
    expect(p.connectors.email.outbox()).toHaveLength(1);
  });

  it("refuses execution if the stored payload was modified after approval", async () => {
    const { p } = testPlatform();
    const agent = testAgent({ policy: async ({ tools }) => (await tools.call("send_email", { to: "a@example.com", body: "hi" }), done("", { status: "needs_approval" })) });
    p.register(agent);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    const [a] = p.gate.list({ status: "pending" });
    gd(p, a!.id, "u-cs-sup", "approve");
    p.db.prepare("UPDATE approvals SET payload = ? WHERE id = ?").run(JSON.stringify({ to: "attacker@evil.example", body: "hi" }), a!.id);
    expect(await p.executor.executeApproved(a!.id)).toMatchObject({ code: "PAYLOAD_TAMPERED" });
    expect(p.connectors.email.outbox()).toHaveLength(0);
    expect(p.escalations.list()[0]).toMatchObject({ reason: "suspected_fraud", toRole: "ciso" });
  });

  it("caps tool calls per task and escalates", async () => {
    const { p } = testPlatform();
    const agent = testAgent({ policy: async ({ tools }) => { for (let i = 0; i < 10; i++) await tools.call("echo", { text: "x" }); return done(); } });
    p.register(agent);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    expect((await p.orchestrator.run(t.id)).status).toBe("escalated");
    expect(p.escalations.list()[0]!.reason).toBe("max_attempts_exceeded");
  });
});

describe("Orchestrator", () => {
  it("routes by task type and deduplicates by idempotency key", () => {
    const { p } = testPlatform();
    p.register(testAgent());
    const a = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester", idempotencyKey: "k1" });
    const b = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester", idempotencyKey: "k1" });
    expect(b.id).toBe(a.id);
    expect(() => p.orchestrator.submit({ type: "unknown", input: {}, originator: "u-requester" })).toThrow(/No agent/);
    expect(() => p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-nobody" })).toThrow(/Unknown originator/);
  });

  it("allows only declared handoffs and inherits the originator", async () => {
    const { p } = testPlatform();
    const parent = testAgent({
      canHandoffTo: ["child.run"],
      policy: async () => done("ok", { handoffs: [{ taskType: "child.run", input: { x: 1 }, when: "now" }, { taskType: "forbidden.run", input: {}, when: "now" }] }),
    });
    const child = testAgent({ id: "test.child", handles: ["child.run"] });
    const other = testAgent({ id: "test.other", handles: ["forbidden.run"] });
    p.register(parent, child, other);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    const kids = p.orchestrator.list({ parentId: t.id });
    expect(kids.map((k) => k.type)).toEqual(["child.run"]);
    expect(kids[0]).toMatchObject({ originator: "u-requester", status: "completed" });
    expect(p.audit.query({ action: "task.handoff" })[0]!.outcome).toBe("denied");
  });

  it("keeps distinct handoffs of the same type and deduplicates identical ones", async () => {
    const { p } = testPlatform();
    const h = (x: number) => ({ taskType: "child.run", input: { x }, when: "now" as const });
    p.register(testAgent({ canHandoffTo: ["child.run"], policy: async () => done("ok", { handoffs: [h(1), h(2), h(1)] }) }), testAgent({ id: "test.child", handles: ["child.run"] }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.list({ parentId: t.id }).map((k) => k.input.x)).toEqual([1, 2]);
  });

  it("defers after_approval handoffs until the approved action executes", async () => {
    const { p } = testPlatform();
    const parent = testAgent({
      canHandoffTo: ["child.run"],
      policy: async ({ tools }) => {
        await tools.call("send_email", { to: "a@example.com", body: "x" });
        return done("wait", { status: "needs_approval", handoffs: [{ taskType: "child.run", input: {}, when: "after_approval" }] });
      },
    });
    p.register(parent, testAgent({ id: "test.child", handles: ["child.run"] }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.list({ parentId: t.id })).toHaveLength(0);
    await p.decide(p.gate.list()[0]!.id, "u-cs-sup", "approve");
    expect(p.orchestrator.list({ parentId: t.id })).toHaveLength(1);
  });

  it("derives status from facts: claimed needs_approval without a request escalates", async () => {
    const { p } = testPlatform();
    p.register(testAgent({ policy: async () => done("lie", { status: "needs_approval" }) }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    expect((await p.orchestrator.run(t.id)).status).toBe("escalated");
  });

  it("outcome guard drops handoffs and escalates when claims contradict the system of record", async () => {
    const { p } = testPlatform();
    const parent = testAgent({
      canHandoffTo: ["child.run"],
      policy: async () => done("ok", { handoffs: [{ taskType: "child.run", input: {}, when: "now" }] }),
      outcomeGuard: () => ["requisition not approved in ERP"],
    });
    p.register(parent, testAgent({ id: "test.child", handles: ["child.run"] }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.get(t.id).status).toBe("escalated");
    expect(p.orchestrator.list({ parentId: t.id })).toHaveLength(0);
    expect(p.escalations.list()[0]!.reason).toBe("guardrail_triggered");
  });

  it("retries invalid output with exponential backoff, then escalates after max attempts", async () => {
    const { p, clock } = testPlatform();
    p.register(testAgent({ policy: async () => ({ status: "bogus" }) as never }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    const first = p.orchestrator.get(t.id);
    expect(first).toMatchObject({ status: "queued", attempts: 1 });
    expect(new Date(first.notBefore!).getTime() - clock.now().getTime()).toBe(30_000);
    await p.orchestrator.drain(); // لم تُستحق بعد: لا محاولة جديدة
    expect(p.orchestrator.get(t.id).attempts).toBe(1);
    clock.advanceHours(1);
    await p.orchestrator.drain();
    expect(new Date(p.orchestrator.get(t.id).notBefore!).getTime() - clock.now().getTime()).toBe(60_000);
    clock.advanceHours(1);
    await p.orchestrator.drain();
    const final = p.orchestrator.get(t.id);
    expect(final.status).toBe("escalated");
    expect(final.attempts).toBe(3);
    expect(p.escalations.list()[0]!.reason).toBe("max_attempts_exceeded");
  });

  it("rejected approval escalates; expired approval is swept and escalated", async () => {
    const { p, clock } = testPlatform();
    const policy = async ({ tools }: { tools: { call: (n: string, i: Record<string, unknown>) => Promise<unknown> } }) => (await tools.call("send_email", { to: "a@example.com", body: "x" }), done("w", { status: "needs_approval" }));
    p.register(testAgent({ policy }));
    const t1 = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    const t2 = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    const [a1] = p.gate.list({ taskId: t1.id });
    expect((await p.decide(a1!.id, "u-cs-sup", "reject", "tone")).status).toBe("escalated");
    clock.advanceHours(30);
    expect(p.orchestrator.sweepExpiredApprovals()).toBe(1);
    expect(p.orchestrator.get(t2.id).status).toBe("escalated");
    expect(p.escalations.list().map((e) => e.reason).sort()).toEqual(["approval_expired", "approval_rejected"]);
  });

  it("forgets task memory at the end of the task and keeps agent memory", async () => {
    const { p } = testPlatform();
    p.register(testAgent({
      policy: async ({ tools }) => {
        await tools.call("memory_remember", { namespace: "notes", key: "k", value: "temp" });
        await tools.call("memory_remember", { namespace: "prefs", key: "k", value: "keep" });
        return done();
      },
    }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    expect(p.memory.read("task", t.id, "notes")).toHaveLength(0);
    expect(p.memory.read("agent", "test.agent", "prefs")[0]!.value).toBe("keep");
  });

  it("rejects illegal state transitions and lets humans resolve escalations", async () => {
    const { p } = testPlatform();
    p.register(testAgent({ policy: async () => done("help", { status: "escalated" }) }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    expect(() => p.resolveEscalated(p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" }).id, "u-cs-sup", "complete", "")).toThrow(/not escalated/);
    const r = p.resolveEscalated(t.id, "u-cs-sup", "requeue", "added missing data");
    expect(r.status).toBe("queued");
    expect(p.escalations.list({ taskId: t.id })[0]!.status).toBe("resolved");
  });
});
