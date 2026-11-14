import type { ApprovalGate, ApprovalGrant } from "../../approval/approval-gate.ts";
import { PlatformError } from "../../core/errors.ts";
import { toUsd } from "../../core/fx.ts";
import type { Clock } from "../../core/util.ts";
import { newId } from "../../core/util.ts";
import type {
  Connectors,
  EmailConnector,
  ErpConnector,
  Invoice,
  Payment,
  PaymentConnector,
  PurchaseOrder,
  Requisition,
  SanctionsConnector,
  ScreeningRecord,
  Supplier,
  WorkflowConnector,
  WorkflowRun,
  WorkflowSpec,
} from "../types.ts";
import { findSpec, validateWorkflowPayload } from "../n8n/catalog.ts";
import { DEFAULT_WORKFLOW_CATALOG } from "../n8n/default-catalog.ts";
import { defaultFixtures, type Fixtures } from "./fixtures.ts";

/**
 * تنفيذات وهمية للـ connectors، تحتفظ بالحالة في الذاكرة.
 * - كل كتابة تُسجَّل في writes، فتستطيع evals أن تتحقق من عدم حدوث أي أثر غير مصرح به.
 * - failNext() يحقن عطلًا في الاستدعاء التالي لاختبار مسار التصعيد عند فشل نظام خارجي.
 * - الإجراءات التي لا رجعة فيها تستهلك ApprovalGrant عبر gate.redeem قبل تنفيذ الأثر.
 */

export interface WriteRecord {
  connector: string;
  method: string;
  args: unknown;
}

export class FaultInjector {
  private pending = new Set<string>();
  failNext(method: string): void {
    this.pending.add(method);
  }
  check(method: string): void {
    if (this.pending.delete(method)) throw new PlatformError("CONNECTOR_ERROR", `Injected failure in ${method}`);
  }
}

export class MockErp implements ErpConnector {
  constructor(
    private readonly data: Fixtures,
    private readonly gate: ApprovalGate,
    private readonly clock: Clock,
    private readonly writes: WriteRecord[],
    readonly faults: FaultInjector,
  ) {}

  getSupplier(id: string) {
    this.faults.check("erp.getSupplier");
    return structuredClone(this.data.suppliers.find((s) => s.id === id) ?? null);
  }
  findSuppliers(f: { category?: string; name?: string }) {
    return structuredClone(
      this.data.suppliers.filter(
        (s) => (!f.category || s.categories.includes(f.category)) && (!f.name || s.name.toLowerCase().includes(f.name.toLowerCase())),
      ),
    );
  }
  getBudget(costCenter: string) {
    this.faults.check("erp.getBudget");
    return structuredClone(this.data.budgets.find((b) => b.costCenter === costCenter) ?? null);
  }
  getCatalogItem(sku: string) {
    return structuredClone(this.data.catalog.find((c) => c.sku === sku) ?? null);
  }
  searchCatalog(f: { category?: string; query?: string }) {
    const q = f.query?.toLowerCase();
    return structuredClone(
      this.data.catalog.filter((c) => (!f.category || c.category === f.category) && (!q || c.description.toLowerCase().includes(q) || c.sku.toLowerCase().includes(q))),
    );
  }
  getRequisition(id: string) {
    this.faults.check("erp.getRequisition");
    return structuredClone(this.data.requisitions.find((r) => r.id === id) ?? null);
  }
  recordRequisitionDecision(id: string, status: "approved_for_po" | "rejected" | "escalated", d: { by: string; reasonCode: string; note: string }): Requisition {
    const req = this.data.requisitions.find((r) => r.id === id);
    if (!req) throw new PlatformError("NOT_FOUND", `Requisition ${id} not found`);
    if (req.status === "ordered") throw new PlatformError("CONNECTOR_ERROR", "Requisition already ordered");
    req.status = status;
    req.decision = { ...d, at: this.clock.now().toISOString() };
    this.writes.push({ connector: "erp", method: "recordRequisitionDecision", args: { id, status, reasonCode: d.reasonCode } });
    return structuredClone(req);
  }
  listPurchaseOrders(f: { requesterId?: string; costCenter?: string; supplierId?: string; sinceIso?: string }) {
    return structuredClone(
      this.data.purchaseOrders.filter(
        (p) =>
          (!f.requesterId || p.requesterId === f.requesterId) &&
          (!f.costCenter || p.costCenter === f.costCenter) &&
          (!f.supplierId || p.supplierId === f.supplierId) &&
          (!f.sinceIso || p.createdAt >= f.sinceIso),
      ),
    );
  }
  getPurchaseOrder(id: string) {
    return structuredClone(this.data.purchaseOrders.find((p) => p.id === id) ?? null);
  }

  createPurchaseOrder(input: Omit<PurchaseOrder, "id" | "status" | "createdAt" | "total">, grant: ApprovalGrant): PurchaseOrder {
    const total = round2(input.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0));
    const budget = this.data.budgets.find((b) => b.costCenter === input.costCenter);
    if (!budget) throw new PlatformError("CONNECTOR_ERROR", `Unknown cost center ${input.costCenter}`);
    this.gate.redeem(grant, "commit_spend", { amount: total, currency: input.currency });
    this.faults.check("erp.createPurchaseOrder");
    const po: PurchaseOrder = {
      ...structuredClone(input),
      id: `PO-${1000 + this.data.purchaseOrders.length + 1}`,
      total,
      status: "open",
      createdAt: this.clock.now().toISOString(),
    };
    this.data.purchaseOrders.push(po);
    // الالتزام يُضاف للميزانية بعملتها، عبر التحويل إلى الدولار.
    budget.committed = round2(budget.committed + (budget.currency === po.currency ? total : toUsd(total, po.currency) / toUsd(1, budget.currency)));
    if (po.requisitionId) {
      const req = this.data.requisitions.find((r) => r.id === po.requisitionId);
      if (req) (req.status = "ordered"), req.poIds.push(po.id);
    }
    this.writes.push({ connector: "erp", method: "createPurchaseOrder", args: { poId: po.id, total, currency: po.currency } });
    return structuredClone(po);
  }

  getGoodsReceipts(poId: string) {
    return structuredClone(this.data.goodsReceipts.filter((g) => g.poId === poId));
  }
  getInvoice(id: string) {
    return structuredClone(this.data.invoices.find((i) => i.id === id) ?? null);
  }
  findInvoices(f: { supplierId?: string; invoiceNumber?: string; status?: Invoice["status"] }) {
    return structuredClone(
      this.data.invoices.filter(
        (i) =>
          (!f.supplierId || i.supplierId === f.supplierId) &&
          (!f.invoiceNumber || normalizeRef(i.invoiceNumber) === normalizeRef(f.invoiceNumber)) &&
          (!f.status || i.status === f.status),
      ),
    );
  }
  setInvoiceStatus(id: string, status: Invoice["status"], note: string): Invoice {
    this.faults.check("erp.setInvoiceStatus");
    const inv = this.data.invoices.find((i) => i.id === id);
    if (!inv) throw new PlatformError("NOT_FOUND", `Invoice ${id} not found`);
    if (inv.status === "paid") throw new PlatformError("CONNECTOR_ERROR", "Paid invoices are immutable");
    inv.status = status;
    this.writes.push({ connector: "erp", method: "setInvoiceStatus", args: { id, status, note } });
    return structuredClone(inv);
  }
  updateSupplierBank(supplierId: string, bank: Supplier["bankAccount"], grant: ApprovalGrant): Supplier {
    this.gate.redeem(grant, "master_data_change");
    const s = this.data.suppliers.find((x) => x.id === supplierId);
    if (!s) throw new PlatformError("NOT_FOUND", `Supplier ${supplierId} not found`);
    s.bankAccount = structuredClone(bank);
    this.writes.push({ connector: "erp", method: "updateSupplierBank", args: { supplierId } });
    return structuredClone(s);
  }

  /** للاختبارات فقط: إضافة بيانات إلى الحالة. */
  seed(mutator: (data: Fixtures) => void): void {
    mutator(this.data);
  }
}

export class MockPayments implements PaymentConnector {
  constructor(
    private readonly data: Fixtures,
    private readonly gate: ApprovalGate,
    private readonly clock: Clock,
    private readonly writes: WriteRecord[],
    readonly faults: FaultInjector,
  ) {}

  execute(instr: { invoiceIds: string[]; supplierId: string; iban: string; amount: number; currency: string }, grant: ApprovalGrant): Payment {
    // ضمانة إضافية مستقلة عن الوكيل: الدفع فقط لمورد معتمد وعلى الحساب البنكي المسجل في سجله الرئيسي.
    // التحقق يسبق استهلاك التفويض، فلا يُستهلك تفويض على دفعة مرفوضة.
    const supplier = this.data.suppliers.find((s) => s.id === instr.supplierId);
    if (!supplier || supplier.status !== "approved") throw new PlatformError("CONNECTOR_ERROR", "Payee is not an approved supplier");
    if (supplier.bankAccount.iban !== instr.iban) throw new PlatformError("CONNECTOR_ERROR", "IBAN does not match supplier master data");
    const approval = this.gate.redeem(grant, "payment", { amount: instr.amount, currency: instr.currency });
    this.faults.check("payments.execute");
    const p: Payment = { id: newId("pay"), ...structuredClone(instr), executedAt: this.clock.now().toISOString(), approvalId: approval.id };
    this.data.payments.push(p);
    for (const id of instr.invoiceIds) {
      const inv = this.data.invoices.find((i) => i.id === id);
      if (inv) inv.status = "paid";
    }
    this.writes.push({ connector: "payments", method: "execute", args: { id: p.id, amount: p.amount, currency: p.currency } });
    return structuredClone(p);
  }
  listPayments(f: { supplierId?: string } = {}) {
    return structuredClone(this.data.payments.filter((p) => !f.supplierId || p.supplierId === f.supplierId));
  }
}

export class MockEmail implements EmailConnector {
  constructor(
    private readonly data: Fixtures,
    private readonly gate: ApprovalGate,
    private readonly writes: WriteRecord[],
  ) {}
  inbox(mailbox: string) {
    return structuredClone(this.data.inbox[mailbox] ?? []);
  }
  send(msg: { from: string; to: string[]; subject: string; body: string }, grant: ApprovalGrant) {
    this.gate.redeem(grant, "external_send");
    const id = newId("mail");
    this.data.outbox.push({ id, ...structuredClone(msg) });
    this.writes.push({ connector: "email", method: "send", args: { id, to: msg.to } });
    return { id };
  }
  outbox() {
    return structuredClone(this.data.outbox);
  }
}

export class MockSanctions implements SanctionsConnector {
  constructor(
    private readonly data: Fixtures,
    private readonly clock: Clock,
    private readonly writes: WriteRecord[],
  ) {}
  entries() {
    return structuredClone(this.data.sanctions);
  }
  listVersion() {
    return "FICTIONAL-2029-03-01";
  }
  recordScreening(r: Omit<ScreeningRecord, "id" | "screenedAt">): ScreeningRecord {
    if (r.status !== "clear" && r.status !== "potential_match") throw new PlatformError("CONNECTOR_ERROR", `Automated screening cannot record status ${r.status}`);
    const rec: ScreeningRecord = { ...structuredClone(r), id: newId("scr"), screenedAt: this.clock.now().toISOString() };
    this.data.screenings.push(rec);
    this.writes.push({ connector: "sanctions", method: "recordScreening", args: { id: rec.id, partyId: rec.partyId, status: rec.status } });
    return structuredClone(rec);
  }
  latestScreening(partyId: string) {
    const all = this.data.screenings.filter((s) => s.partyId === partyId);
    return structuredClone(all[all.length - 1] ?? null);
  }
  resolveScreening(id: string, humanId: string, status: "false_positive" | "confirmed_match", note: string): ScreeningRecord {
    const s = this.data.screenings.find((x) => x.id === id);
    if (!s) throw new PlatformError("NOT_FOUND", `Screening ${id} not found`);
    if (s.status !== "potential_match") throw new PlatformError("CONNECTOR_ERROR", `Only potential matches can be resolved (is ${s.status})`);
    // القرار البشري يُسجَّل كسجل جديد، فيبقى سجل الفحص الآلي الأصلي كما هو.
    const rec: ScreeningRecord = { ...structuredClone(s), id: newId("scr"), status, screenedBy: humanId, note, screenedAt: this.clock.now().toISOString() };
    this.data.screenings.push(rec);
    this.writes.push({ connector: "sanctions", method: "resolveScreening", args: { id: rec.id, status } });
    return structuredClone(rec);
  }
  seed(mutator: (data: Fixtures) => void): void {
    mutator(this.data);
  }
}

export interface MockConnectors extends Connectors {
  /** الحالة الكاملة للأنظمة الوهمية، لحفظها على القرص في وضع التشغيل عبر CLI. */
  state: Fixtures;
  erp: MockErp;
  payments: MockPayments;
  email: MockEmail;
  sanctions: MockSanctions;
  writes: WriteRecord[];
  faults: FaultInjector;
}

export function createMockConnectors(
  gate: ApprovalGate,
  clock: Clock,
  fixtures: Fixtures = defaultFixtures(),
  workflows?: (writes: WriteRecord[]) => WorkflowConnector,
): MockConnectors {
  const writes: WriteRecord[] = [];
  const faults = new FaultInjector();
  return {
    workflows: workflows ? workflows(writes) : new MockWorkflows(DEFAULT_WORKFLOW_CATALOG, gate, clock, writes, faults),
    erp: new MockErp(fixtures, gate, clock, writes, faults),
    payments: new MockPayments(fixtures, gate, clock, writes, faults),
    email: new MockEmail(fixtures, gate, writes),
    sanctions: new MockSanctions(fixtures, clock, writes),
    state: fixtures,
    writes,
    faults,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** توحيد أرقام المراجع لكشف التكرار: GOS-2029-0142 وgos 2029/0142 متطابقان. */
export function normalizeRef(ref: string): string {
  return ref.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^0+/, "");
}

/** سير عمل وهمي: يطبق الكتالوج والتحقق واستهلاك التفويض نفسها، ويسجل التشغيل بدل الاتصال بـ n8n. */
export class MockWorkflows implements WorkflowConnector {
  readonly kind = "mock" as const;
  private readonly log: WorkflowRun[] = [];
  constructor(
    private readonly specs: WorkflowSpec[],
    private readonly gate: ApprovalGate,
    private readonly clock: Clock,
    private readonly writes: WriteRecord[],
    private readonly faults: FaultInjector,
  ) {}
  catalog() {
    return structuredClone(this.specs);
  }
  runs() {
    return structuredClone(this.log);
  }
  async trigger(workflowKey: string, payload: Record<string, string | number | boolean>, grant: ApprovalGrant): Promise<WorkflowRun> {
    const spec = findSpec(this.specs, workflowKey);
    const clean = validateWorkflowPayload(spec, payload);
    this.gate.redeem(grant, spec.action);
    this.faults.check("workflows.trigger");
    const run: WorkflowRun = { id: newId("wfr"), workflowKey, approvalId: grant.approvalId, status: "accepted", httpStatus: 200, response: { received: true }, startedAt: this.clock.now().toISOString() };
    this.log.push(run);
    this.writes.push({ connector: "workflows", method: "trigger", args: { workflowKey, payload: clean } });
    return structuredClone(run);
  }
}
