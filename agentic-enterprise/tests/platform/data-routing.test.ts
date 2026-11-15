import { randomBytes } from "node:crypto";
import { describe, expect, it } from "vitest";
import { MemoryAnchor } from "../../platform/audit/anchor.ts";
import { ephemeralDbConfig } from "../../platform/core/db.ts";
import { ManualClock } from "../../platform/core/util.ts";
import { createPlatform } from "../../platform/index.ts";
import { parseRoutes, selectRoute } from "../../platform/policy/data-routing.ts";
import type { AgentRuntime, RunRequest } from "../../platform/runtime/runtime.ts";
import { done, testAgent } from "../helpers.ts";

/** منفّذ "حي" وهمي: يسجل أي نموذج طُلب وأي بيانات وصلته، دون اتصال فعلي. */
class RecordingLiveRuntime implements AgentRuntime {
  readonly kind = "live" as const;
  calls: Array<{ model: string | undefined; input: unknown }> = [];
  async run(req: RunRequest) {
    this.calls.push({ model: req.model, input: req.task.input });
    return { outcome: done(), usage: { costUsd: 0.01, turns: 1, durationMs: 1 } };
  }
}

function setup(config: Record<string, unknown>) {
  const runtime = new RecordingLiveRuntime();
  const p = createPlatform({ config: { ...ephemeralDbConfig(), KILL_SWITCH: false, ...config }, clock: new ManualClock(), runtime, isolated: true, anchor: new MemoryAnchor(randomBytes(32)), devKeys: true });
  return { p, runtime };
}

const ROUTES = JSON.stringify([
  { id: "global", provider: "anthropic", model: "model-global", region: "us", maxClass: "confidential" },
  { id: "eu-personal", provider: "anthropic", model: "model-eu", region: "eu", maxClass: "personal", approvalRef: "DPA-2029-EU-07" },
  { id: "ksa-regulated", provider: "anthropic", model: "model-ksa", region: "sa", maxClass: "regulated", approvalRef: "DPIA-KSA-2029-03" },
]);

describe("data-sensitivity model routing", () => {
  it("route selection is fail-closed and respects class order and residency", () => {
    const routes = parseRoutes(ROUTES, "x");
    expect(selectRoute(routes, { dataClass: "internal", residency: "any" })).toMatchObject({ ok: true, route: { id: "global" } });
    expect(selectRoute(routes, { dataClass: "personal", residency: "any" })).toMatchObject({ ok: true, route: { id: "eu-personal" } });
    expect(selectRoute(routes, { dataClass: "personal", residency: "sa" })).toMatchObject({ ok: true, route: { id: "ksa-regulated" } });
    expect(selectRoute(routes, { dataClass: "confidential", residency: "sa" })).toMatchObject({ ok: true, route: { id: "global" } }); // الإقامة تُفرض على الشخصية فما فوق
    expect(selectRoute(parseRoutes(undefined, "m"), { dataClass: "personal", residency: "any" })).toMatchObject({ ok: false });
    expect(() => parseRoutes(JSON.stringify([{ id: "no-ref", provider: "p", model: "m", region: "us", maxClass: "personal" }]), "m")).toThrow(/approvalRef/);
  });

  it("personal data never reaches a model without an approved route: denied, audited, escalated, model not called", async () => {
    const { p, runtime } = setup({}); // الافتراضي: حتى confidential فقط
    p.register(testAgent({ dataClass: "personal" }));
    const t = p.orchestrator.submit({ type: "test.run", input: { name: "Mohammed Al-Example" }, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(runtime.calls).toHaveLength(0);
    expect(p.orchestrator.get(t.id).status).toBe("escalated");
    expect(p.escalations.list({ status: "open" })[0]).toMatchObject({ reason: "data_policy", severity: "high" });
    expect(p.audit.query({ action: "model.route_denied" })[0]!.data).toMatchObject({ dataClass: "personal" });
  });

  it("a Saudi-resident tenant's personal data goes only to the in-region approved route", async () => {
    const { p, runtime } = setup({ MODEL_ROUTES: ROUTES, DATA_RESIDENCY: "sa" });
    p.register(testAgent({ dataClass: "personal" }), testAgent({ id: "test.biz", handles: ["biz.run"] }));
    p.orchestrator.submit({ type: "test.run", input: { name: "x" }, originator: "u-requester" });
    p.orchestrator.submit({ type: "biz.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(runtime.calls.map((c) => c.model)).toEqual(["model-ksa", "model-global"]);
    expect(p.audit.query({ action: "model.routed" }).map((e) => e.data.region)).toEqual(["sa", "us"]);
  });

  it("with residency sa and no in-region route, personal data is refused rather than sent abroad", async () => {
    const routesNoKsa = JSON.stringify(JSON.parse(ROUTES).filter((r: { id: string }) => r.id !== "ksa-regulated"));
    const { p, runtime } = setup({ MODEL_ROUTES: routesNoKsa, DATA_RESIDENCY: "sa" });
    p.register(testAgent({ dataClass: "personal" }));
    p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(runtime.calls).toHaveLength(0);
    expect(p.escalations.list({ status: "open" })[0]!.summary).toMatch(/residency sa/);
  });

  it("the deterministic runtime sends nothing externally, so it is not subject to routing", async () => {
    const { p } = (() => {
      const p = createPlatform({ config: { ...ephemeralDbConfig(), KILL_SWITCH: false }, clock: new ManualClock(), isolated: true, anchor: new MemoryAnchor(randomBytes(32)) });
      return { p };
    })();
    p.register(testAgent({ dataClass: "regulated" }));
    const t = p.orchestrator.submit({ type: "test.run", input: {}, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.get(t.id).status).toBe("completed");
  });
});
