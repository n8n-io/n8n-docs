import { describe, expect, it } from "vitest";
import { testPlatform } from "../../tests/helpers.ts";
import { poIssuerAgent } from "./po-issuer/agent.ts";
import { INTAKE_TASK, requisitionIntakeAgent } from "./requisition-intake/agent.ts";
import { assessRequisition, verdictFor } from "./shared/assessment.ts";
import { bumpBudget, seedRequisition } from "./shared/eval-fixtures.ts";

function setup() {
  const t = testPlatform();
  t.p.register(requisitionIntakeAgent, poIssuerAgent);
  return t;
}

describe("procurement assessment", () => {
  it("prices from the catalog and converts currencies for the budget check", () => {
    const { p } = setup();
    const a = assessRequisition(p.connectors.erp, "REQ-2002", { now: p.clock.now(), stage: "intake" });
    expect(a.groups).toHaveLength(1);
    expect(a.groups[0]).toMatchObject({ supplierId: "sup-003", currency: "EUR", total: 2_020 });
    expect(a.totalUsd).toBe(2_181.6);
    expect(a.budget!.available).toBe(1_500);
    expect(a.verdict).toBe("escalated");
    expect(a.primary!.code).toBe("BUDGET_INSUFFICIENT");
  });

  it("requires 3 quotes for non-contracted spend above 10k USD", () => {
    const { p } = setup();
    bumpBudget(p, "CC-WH-01", 900_000);
    seedRequisition(p, { id: "REQ-2101", requesterId: "u-requester", costCenter: "CC-WH-01", neededBy: "2029-06-01", justification: "racking", lines: [{ sku: "WH-RACK-HD", description: "rack", quantity: 20 }], status: "submitted" });
    const a = assessRequisition(p.connectors.erp, "REQ-2101", { now: p.clock.now(), stage: "intake" });
    expect(a.findings.map((f) => f.code)).toContain("QUOTES_REQUIRED");
  });

  it("rejection outranks escalation, and non-catalog lines escalate", () => {
    const { p } = setup();
    seedRequisition(p, { id: "REQ-2102", requesterId: "u-requester", costCenter: "CC-WH-01", neededBy: "2029-06-01", justification: "x", lines: [{ sku: null, description: "Custom signage", quantity: 1 }, { sku: "OFF-PAPER-A4", description: "paper", quantity: 0 }], status: "submitted" });
    const a = assessRequisition(p.connectors.erp, "REQ-2102", { now: p.clock.now(), stage: "intake" });
    expect(a.findings.map((f) => f.code).sort()).toEqual(["INVALID_QUANTITY", "NON_CATALOG_ITEM"]);
    expect(a.verdict).toBe("rejected");
  });

  it("verdictFor scopes findings to one supplier", () => {
    const { p } = setup();
    const a = assessRequisition(p.connectors.erp, "REQ-2005", { now: p.clock.now(), stage: "po" });
    expect(verdictFor(a, "sup-004").verdict).toBe("approved_for_po");
    expect(verdictFor(a, "sup-001").verdict).toBe("rejected");
  });
});

describe("procurement end-to-end", () => {
  it("multi-supplier requisition yields one PO task per supplier and no false duplicate", async () => {
    const { p } = setup();
    bumpBudget(p, "CC-WH-01", 900_000);
    seedRequisition(p, {
      id: "REQ-2103", requesterId: "u-requester", costCenter: "CC-WH-01", neededBy: "2029-06-01", justification: "dispatch refit",
      lines: [{ sku: "OFF-CHAIR-ERG", description: "chair", quantity: 4 }, { sku: "WH-PALLET-EUR", description: "pallet", quantity: 100 }], status: "submitted",
    });
    const t = p.orchestrator.submit({ type: INTAKE_TASK, input: { requisitionId: "REQ-2103" }, originator: "u-requester" });
    await p.orchestrator.drain();
    const kids = p.orchestrator.list({ parentId: t.id });
    expect(kids.map((k) => k.input.supplierId).sort()).toEqual(["sup-001", "sup-003"]);
    for (const a of p.gate.list({ status: "pending" })) await p.decide(a.id, "u-proc-mgr", "approve");
    expect(p.connectors.erp.getRequisition("REQ-2103")!.poIds).toHaveLength(2);
    expect(kids.map((k) => p.orchestrator.get(k.id).status)).toEqual(["completed", "completed"]);
  });

  it("refuses to execute an approved PO if the catalog price rose after approval", async () => {
    const { p } = setup();
    const t = p.orchestrator.submit({ type: "procurement.po", input: { requisitionId: "REQ-2005", supplierId: "sup-004" }, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    p.connectors.erp.seed((d) => (d.catalog.find((c) => c.sku === "IT-LAPTOP-14")!.unitPrice = 1_600));
    const [a] = p.gate.list({ status: "pending" });
    const final = await p.decide(a!.id, "u-proc-mgr", "approve");
    expect(final.status).toBe("escalated");
    expect(p.connectors.writes.filter((w) => w.method === "createPurchaseOrder")).toHaveLength(0);
    expect(p.escalations.list().map((e) => e.reason)).toContain("execution_failed");
  });

  it("escalates when ERP fails at execution time, without double-issuing on retry", async () => {
    const { p } = setup();
    const t = p.orchestrator.submit({ type: "procurement.po", input: { requisitionId: "REQ-2005", supplierId: "sup-004" }, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    p.connectors.faults.failNext("erp.createPurchaseOrder");
    const [a] = p.gate.list({ status: "pending" });
    expect((await p.decide(a!.id, "u-proc-mgr", "approve")).status).toBe("escalated");
    expect(p.gate.get(a!.id).status).toBe("execution_failed");
    expect(await p.executor.executeApproved(a!.id)).toMatchObject({ status: "denied" });
  });
});
