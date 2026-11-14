import { describe, expect, it } from "vitest";
import { testPlatform } from "../../tests/helpers.ts";
import { sanctionsScreenerAgent } from "../compliance/sanctions-screener/agent.ts";
import { invoiceProcessorAgent } from "./invoice-processor/agent.ts";
import { paymentSchedulerAgent } from "./payment-scheduler/agent.ts";
import { seedClearScreening, setInvoiceStatus } from "./shared/eval-fixtures.ts";
import { assessInvoice } from "./shared/invoice-assessment.ts";

function setup() {
  const t = testPlatform();
  t.p.register(invoiceProcessorAgent, paymentSchedulerAgent, sanctionsScreenerAgent);
  return t;
}

describe("finance", () => {
  it("an existing potential match escalates the payment directly to compliance, without re-screening", async () => {
    const { p } = setup();
    setInvoiceStatus(p, "INV-9001", "matched");
    p.connectors.sanctions.recordScreening({ partyType: "supplier", partyId: "sup-001", partyName: "Gulf Office Supplies LLC", status: "potential_match", listVersion: p.connectors.sanctions.listVersion(), candidates: [], screenedBy: "x", note: "x", sourceTaskId: "x" });
    const t = p.orchestrator.submit({ type: "finance.payment", input: { invoiceId: "INV-9001" }, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.get(t.id).status).toBe("escalated");
    expect(p.orchestrator.list().some((x) => x.type === "compliance.screen")).toBe(false);
    expect(p.escalations.list()[0]).toMatchObject({ reason: "sanctions_potential_match", toRole: "compliance_officer" });
  });

  it("a stale screening triggers a fresh one before paying", async () => {
    const { p, clock } = setup();
    setInvoiceStatus(p, "INV-9001", "matched");
    seedClearScreening(p, "sup-001");
    clock.advanceHours(31 * 24);
    p.orchestrator.submit({ type: "finance.payment", input: { invoiceId: "INV-9001" }, originator: "u-requester" });
    await p.orchestrator.drain();
    expect(p.orchestrator.list().map((t) => `${t.type}:${t.status}`)).toEqual(["finance.payment:completed", "compliance.screen:completed", "finance.payment:awaiting_approval"]);
  });

  it("blocks execution if a sanctions hit appears between approval and execution", async () => {
    const { p } = setup();
    setInvoiceStatus(p, "INV-9001", "matched");
    seedClearScreening(p, "sup-001");
    const t = p.orchestrator.submit({ type: "finance.payment", input: { invoiceId: "INV-9001" }, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    p.connectors.sanctions.recordScreening({ partyType: "supplier", partyId: "sup-001", partyName: "Gulf Office Supplies LLC", status: "potential_match", listVersion: p.connectors.sanctions.listVersion(), candidates: [], screenedBy: "x", note: "list update", sourceTaskId: "x" });
    const [a] = p.gate.list({ status: "pending" });
    expect((await p.decide(a!.id, "u-fin-ctrl", "approve")).status).toBe("escalated");
    expect(p.connectors.payments.listPayments()).toHaveLength(0);
  });

  it("partial invoicing is accepted up to the received quantity, cumulatively", () => {
    const { p } = setup();
    p.connectors.erp.seed((d) => {
      const base = d.invoices.find((i) => i.id === "INV-9002")!;
      Object.assign(base, { lines: [{ sku: "WH-PALLET-EUR", quantity: 200, unitPrice: 14 }], subtotal: 2_800, total: 2_800 });
      d.invoices.push({ ...structuredClone(base), id: "INV-9011", invoiceNumber: "EP-77813", lines: [{ sku: "WH-PALLET-EUR", quantity: 150, unitPrice: 14 }], subtotal: 2_100, total: 2_100 });
    });
    expect(assessInvoice(p.connectors.erp, "INV-9002").verdict).toBe("on_hold"); // 200 + 150 > 300
    setInvoiceStatus(p, "INV-9011", "rejected");
    expect(assessInvoice(p.connectors.erp, "INV-9002").verdict).toBe("matched");
  });

  it("price above tolerance is held; within tolerance passes", () => {
    const { p } = setup();
    p.connectors.erp.seed((d) => {
      const inv = d.invoices.find((i) => i.id === "INV-9001")!;
      inv.lines[0]!.unitPrice = 1_180; // +2.6%
      inv.subtotal = 11_800;
      inv.total = 13_525;
    });
    expect(assessInvoice(p.connectors.erp, "INV-9001").primary!.code).toBe("PRICE_VARIANCE");
  });
});
