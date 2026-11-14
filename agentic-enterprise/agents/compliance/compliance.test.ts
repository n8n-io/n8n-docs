import { describe, expect, it } from "vitest";
import { testPlatform } from "../../tests/helpers.ts";
import { paymentSchedulerAgent } from "../finance/payment-scheduler/agent.ts";
import { setInvoiceStatus } from "../finance/shared/eval-fixtures.ts";
import { resolvePotentialMatchSigned } from "./human-actions.ts";
import { sanctionsScreenerAgent } from "./sanctions-screener/agent.ts";
import { MATCH_THRESHOLD, nameScore, skeleton, tokens } from "./shared/name-matching.ts";

describe("name matching", () => {
  const hit = (a: string, b: string) => expect(nameScore(a, b), `${a} ~ ${b}`).toBeGreaterThanOrEqual(MATCH_THRESHOLD);
  const miss = (a: string, b: string) => expect(nameScore(a, b), `${a} ≁ ${b}`).toBeLessThan(MATCH_THRESHOLD);

  it("matches Latin transliteration variants of Arabic names", () => {
    hit("Mohamed Al-Rashid General Trading", "Mohammed Al Rashid");
    hit("Mohd Rasheed", "Muhammad Al-Rashid");
    hit("Zarka Trading Est", "Zarqa Trading Establishment");
  });

  it("matches across Arabic and Latin scripts via consonant skeletons", () => {
    hit("محمد الراشد", "Mohammed Al Rashid");
    hit("Zarka Trading", "مؤسسة الزرقاء للتجارة");
    hit("شركة الزرقا", "Zarqa Trading Establishment");
    expect(skeleton("محمد")).toBe(skeleton("muhammad"));
    expect(skeleton("راشد")).toBe(skeleton("rasheed"));
  });

  it("normalizes variants, legal suffixes and Arabic letter forms", () => {
    expect(tokens("MOHD. AL-RASHID TRADING L.L.C")).toEqual(["muhammad", "rashid"]);
    expect(tokens("مؤسسة الزرقاء للتجارة")).toEqual(tokens("موسسه الزرقاء التجاره"));
  });

  it("does not match unrelated companies", () => {
    miss("Gulf Office Supplies LLC", "Crescent Maritime Holdings Ltd");
    miss("EuroPack Logistics GmbH", "Zarqa Trading Establishment");
    miss("Nordic IT Hardware AB", "Muhammad Abdullah AL-RASHEED");
    miss("Rashid Logistics", "Muhammad Abdullah AL-RASHEED");
  });
});

describe("compliance human decisions", () => {
  it("only a compliance officer can clear a potential match, and payment then proceeds", async () => {
    const { p } = testPlatform();
    p.register(sanctionsScreenerAgent, paymentSchedulerAgent);
    p.connectors.erp.seed((d) => d.invoices.push({ ...structuredClone(d.invoices[0]!), id: "INV-9010", supplierId: "sup-007", invoiceNumber: "MRT-9", poId: null, remitToIban: null, status: "matched" }));
    const t = p.orchestrator.submit({ type: "finance.payment", input: { invoiceId: "INV-9010" }, originator: "u-requester" });
    await p.orchestrator.drain();
    const hit = p.connectors.sanctions.latestScreening("sup-007")!;
    expect(hit.status).toBe("potential_match");
    expect(p.gate.list()).toHaveLength(0);

    expect(() => resolvePotentialMatchSigned(p, hit.id, "u-fin-ctrl", "false_positive", "looks fine")).toThrow(/compliance officer/);
    resolvePotentialMatchSigned(p, hit.id, "u-compliance", "false_positive", "Different person: DOB and nationality do not match listing");
    expect(p.connectors.sanctions.latestScreening("sup-007")!.status).toBe("false_positive");

    const again = p.orchestrator.submit({ type: "finance.payment", input: { invoiceId: "INV-9010" }, originator: "u-requester", idempotencyKey: `${t.id}:retry` });
    expect((await p.orchestrator.run(again.id)).status).toBe("awaiting_approval");
    expect(p.audit.query({ action: "compliance.resolve_match" }).map((e) => e.outcome)).toEqual(["denied", "success"]);
  });

  it("a confirmed match keeps payments blocked", async () => {
    const { p } = testPlatform();
    p.register(sanctionsScreenerAgent);
    const t = p.orchestrator.submit({ type: "compliance.screen", input: { partyType: "supplier", partyId: "sup-007" }, originator: "u-requester" });
    await p.orchestrator.run(t.id);
    resolvePotentialMatchSigned(p, p.connectors.sanctions.latestScreening("sup-007")!.id, "u-compliance", "confirmed_match", "Confirmed against OFAC record");
    setInvoiceStatus(p, "INV-9001", "matched");
    expect(() => p.connectors.sanctions.resolveScreening(p.connectors.sanctions.latestScreening("sup-007")!.id, "u-compliance", "false_positive", "x")).toThrow(/Only potential matches/);
  });
});
