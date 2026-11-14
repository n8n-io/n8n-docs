import { ephemeralDbConfig } from "../../platform/core/db.ts";
import { describe, expect, it } from "vitest";
import { defineAgent } from "../../platform/agent/agent-definition.ts";
import { definitionFingerprint } from "../../platform/agent/registry.ts";
import { isPlatformError } from "../../platform/core/errors.ts";
import { ManualClock } from "../../platform/core/util.ts";
import { createPlatform } from "../../platform/index.ts";
import { ScriptedRuntime } from "../../platform/runtime/runtime.ts";
import { done, echoTool, Output, sendTool, testAgent, testPlatform } from "../helpers.ts";

function code(fn: () => unknown): string | undefined {
  try {
    fn();
  } catch (e) {
    return isPlatformError(e) ? e.code : (e as Error).message;
  }
  return undefined;
}

describe("agent registry: lifecycle, pause and autonomy", () => {
  it("registers each agent with version and definition hash in the audit log", () => {
    const { p } = testPlatform();
    const a = testAgent({ version: "1.2.0" });
    p.register(a);
    expect(p.agents.find(a.id)).toMatchObject({ status: "ACTIVE", version: "1.2.0", definitionHash: definitionFingerprint(a) });
    expect(p.audit.query({ action: "agent.registered" })[0]).toMatchObject({ target: a.id, data: { version: "1.2.0" } });
  });

  it("pausing one agent stops its claims and its in-flight tool calls, without stopping others", async () => {
    const { p } = testPlatform();
    let midRun: unknown;
    const agent = testAgent({
      policy: async ({ tools }) => {
        p.agents.setStatus("test.agent", "PAUSED", "u-ciso", "suspicious behaviour under review"); // يُوقف أثناء التشغيل
        midRun = await tools.call("echo", { text: "still working?" });
        return done();
      },
    });
    const other = testAgent({ id: "test.other", handles: ["other.run"], policy: async () => done() });
    p.register(agent, other);
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    const o = p.orchestrator.submit({ type: "other.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(midRun).toMatchObject({ status: "denied", code: "AGENT_NOT_ACTIVE" });
    expect(p.orchestrator.get(o.id).status).toBe("completed");

    const t2 = p.orchestrator.submit({ type: "test.run", input: { second: true }, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.get(t2.id).status).toBe("queued"); // لا يُطالب بها وكيل موقوف
    // المسار المباشر (run لمهمة بعينها) يمر بـ claim أيضًا، ولا يتجاوز الإيقاف
    const direct = await p.orchestrator.run(t2.id);
    expect(direct).toMatchObject({ status: "queued", attempts: 0 }); // لم تُبدأ أي محاولة
    expect(p.audit.query({ taskId: t2.id, action: "task.transition" })).toHaveLength(0);
    expect(p.orchestrator.get(t.id).status).not.toBe("running");
  });

  it("reactivation requires a platform operator's signature; pausing does not", () => {
    const { p } = testPlatform();
    p.register(testAgent());
    expect(code(() => p.agents.setStatus("test.agent", "PAUSED", "u-requester", "x"))).toBe("UNAUTHORIZED_APPROVER");
    p.agents.setStatus("test.agent", "PAUSED", "u-cfo", "cost spike");
    expect(code(() => p.agents.setStatus("test.agent", "ACTIVE", "u-ops", "reviewed"))).toBe("AUTHENTICATION_FAILED");
    expect(code(() => p.agents.setStatus("test.agent", "ACTIVE", "u-cfo", "reviewed", p.signAction("u-cfo", "agent.activate/v1", "test.agent", { to: "ACTIVE", note: "reviewed" })))).toBe("UNAUTHORIZED_APPROVER");
    const proof = p.signAction("u-ops", "agent.activate/v1", "test.agent", { to: "ACTIVE", note: "reviewed" });
    expect(p.agents.setStatus("test.agent", "ACTIVE", "u-ops", "reviewed", proof).status).toBe("ACTIVE");
    expect(code(() => p.agents.setStatus("test.agent", "CREATED", "u-ops", "x"))).toBe("INVALID_TRANSITION");
  });

  it("lowering autonomy takes effect immediately and turns actions into recommendations", async () => {
    const { p } = testPlatform();
    let attempt: unknown;
    p.register(testAgent({
      policy: async ({ tools }) => {
        attempt = await tools.call("send_email", { to: "a@example.com", body: "x" });
        await tools.call("escalate_to_human", { reason: "agent_requested", severity: "low", toRole: "cs_supervisor", summary: "Recommend sending the quote email" });
        return done("recommended", { status: "escalated" });
      },
    }));
    p.agents.setAutonomy("test.agent", 1, "u-ciso", "recommend-only during investigation");
    p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(attempt).toMatchObject({ status: "denied", code: "AUTONOMY_LIMIT" });
    expect(p.gate.list()).toHaveLength(0);
    expect(p.escalations.list()[0]!.summary).toMatch(/Recommend/);
    expect(code(() => p.agents.setAutonomy("test.agent", null, "u-ops", "restored"))).toBe("AUTHENTICATION_FAILED");
    p.agents.setAutonomy("test.agent", null, "u-ops", "restored", p.signAction("u-ops", "agent.activate/v1", "test.agent", { autonomy: null, note: "restored" }));
    expect(p.agents.effectiveAutonomy(p.orchestrator.agent("test.agent"))).toBe(3);
  });

  it("with AGENT_REQUIRE_DEPLOY a changed definition waits for deployment; a paused agent stays paused", async () => {
    const opts = { config: { ...ephemeralDbConfig(), KILL_SWITCH: false, AGENT_REQUIRE_DEPLOY: true }, clock: new ManualClock(), runtime: new ScriptedRuntime(), isolated: true, devKeys: true } as const;
    const p = createPlatform(opts);
    p.register(testAgent());
    expect(p.agents.find("test.agent")!.status).toBe("VALIDATED");
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.get(t.id).status).toBe("queued");
    for (const to of ["DEPLOYED", "ACTIVE"] as const) p.agents.setStatus("test.agent", to, "u-ops", "eval suite green", p.signAction("u-ops", "agent.activate/v1", "test.agent", { to, note: "eval suite green" }));
    await p.orchestrator.drain();
    expect(p.orchestrator.get(t.id).status).toBe("completed");
  });

  it("detects a changed definition on re-registration and audits it", () => {
    const { p } = testPlatform();
    p.register(testAgent());
    p.agents.setStatus("test.agent", "PAUSED", "u-ops", "maintenance");
    const changed = testAgent({ version: "1.1.0", tools: [echoTool] });
    const rec = p.agents.sync(changed, false);
    expect(rec).toMatchObject({ status: "PAUSED", version: "1.1.0" });
    expect(p.audit.query({ action: "agent.definition_changed" })[0]!.data).toMatchObject({ fromVersion: "0.0.0", toVersion: "1.1.0" });
  });

  it("rejects definitions whose tools exceed their declared autonomy, or invalid versions", () => {
    const base = { id: "x.y", domain: "x", name: "x", title: "x", kpi: "x", handles: ["x.run"], canHandoffTo: [], systemPrompt: "x", guardrails: [], memory: { remember: [], forget: [] }, outputSchema: Output, defaultEscalationRole: "cs_supervisor" as const, maxToolCalls: 3, referencePolicy: async () => done() };
    expect(() => defineAgent({ ...base, tools: [sendTool], autonomyLevel: 2 })).toThrow(/exceeds declared autonomy/);
    expect(() => defineAgent({ ...base, tools: [echoTool], version: "v1" })).toThrow(/semver/);
    expect(() => defineAgent({ ...base, tools: [echoTool], autonomyLevel: 0 })).not.toThrow();
  });
});
