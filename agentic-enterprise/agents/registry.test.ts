import { describe, expect, it } from "vitest";
import { testPlatform } from "../tests/helpers.ts";
import { ALL_AGENTS } from "./index.ts";

describe("agent registry", () => {
  it("registers every agent on one platform; every handoff target is routable and every agent has a KPI and prompt", () => {
    const { p } = testPlatform();
    p.register(...ALL_AGENTS);
    const handled = new Set(ALL_AGENTS.flatMap((a) => a.handles));
    for (const a of ALL_AGENTS) {
      for (const t of a.canHandoffTo) expect(handled.has(t), `${a.id} → ${t}`).toBe(true);
      expect(a.kpi.length).toBeGreaterThan(10);
      expect(a.systemPrompt).toMatch(/# الدور[\s\S]*# قواعد القرار[\s\S]*# صيغة المخرجات[\s\S]*# الحالات الحدّية/);
      expect(a.tools.some((t) => t.permission === "approval") ? a.guardrails.some((g) => g.id === "platform.injection_guard") : true, `${a.id} approval tools need injection guard`).toBe(true);
    }
  });
});
