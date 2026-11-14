import type { ApprovalGrant } from "../approval/approval-gate.ts";
import type { Money } from "../core/types.ts";

/**
 * واجهات موحدة للأنظمة الخارجية. الوكلاء والأدوات يعتمدون على هذه الواجهات فقط،
 * فاستبدال الـ mock بتكامل حقيقي (SAP أو Microsoft Graph أو بوابة البنك) لا يغيّر كود الوكلاء.
 *
 * قاعدة إلزامية: كل دالة ذات أثر لا رجعة فيه تأخذ ApprovalGrant، وتستهلكه عبر ApprovalGate.redeem
 * قبل تنفيذ الأثر. بدون تفويض صالح يرمي الـ connector خطأ، حتى لو استُدعي من خارج ToolExecutor.
 */

export interface Supplier {
  id: string;
  name: string;
  nameAr?: string;
  country: string;
  status: "approved" | "pending_onboarding" | "blocked";
  categories: string[];
  bankAccount: { iban: string; bankName: string; verifiedAt: string };
  paymentTermsDays: number;
  riskRating: "low" | "medium" | "high";
}

export interface Budget {
  costCenter: string;
  owner: string;
  fiscalYear: number;
  currency: string;
  total: number;
  committed: number;
  spent: number;
}

export interface CatalogItem {
  sku: string;
  description: string;
  category: string;
  unitPrice: number;
  currency: string;
  supplierId: string;
  contracted: boolean;
}

export interface PurchaseOrderLine {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  costCenter: string;
  requesterId: string;
  currency: string;
  lines: PurchaseOrderLine[];
  total: number;
  status: "open" | "partially_received" | "received" | "closed" | "cancelled";
  createdAt: string;
  sourceTaskId: string;
  requisitionId?: string;
}

/** طلب الشراء كما يسجله الموظف في بوابة المشتريات. هو السجل المرجعي، لا نص المهمة. */
export interface Requisition {
  id: string;
  requesterId: string;
  costCenter: string;
  neededBy: string;
  justification: string;
  lines: Array<{ sku: string | null; description: string; quantity: number }>;
  status: "submitted" | "approved_for_po" | "rejected" | "escalated" | "ordered";
  decision: { by: string; reasonCode: string; note: string; at: string } | null;
  poIds: string[];
  submittedAt: string;
}

export interface GoodsReceipt {
  id: string;
  poId: string;
  lines: Array<{ sku: string; quantityReceived: number }>;
  receivedAt: string;
}

export interface Invoice {
  id: string;
  supplierId: string;
  invoiceNumber: string;
  poId: string | null;
  currency: string;
  lines: Array<{ sku: string; quantity: number; unitPrice: number }>;
  subtotal: number;
  tax: number;
  total: number;
  /** الحساب البنكي المذكور في الفاتورة. قد يختلف عن السجل الرئيسي، وهذه علامة احتيال. */
  remitToIban: string | null;
  issueDate: string;
  dueDate: string;
  status: "received" | "matched" | "on_hold" | "approved_for_payment" | "paid" | "rejected";
}

export interface Payment {
  id: string;
  invoiceIds: string[];
  supplierId: string;
  iban: string;
  amount: number;
  currency: string;
  executedAt: string;
  approvalId: string;
}

export interface EmailMessage {
  id: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  receivedAt: string;
}

export interface SanctionsEntry {
  id: string;
  list: "OFAC_SDN" | "EU_CONSOLIDATED" | "UN_SC";
  name: string;
  aliases: string[];
  country: string | null;
  type: "individual" | "entity";
}

export interface ErpConnector {
  getSupplier(id: string): Supplier | null;
  findSuppliers(filter: { category?: string; name?: string }): Supplier[];
  getBudget(costCenter: string): Budget | null;
  getCatalogItem(sku: string): CatalogItem | null;
  searchCatalog(filter: { category?: string; query?: string }): CatalogItem[];
  getRequisition(id: string): Requisition | null;
  /** كتابة داخلية قابلة للتراجع: تسجيل قرار الفرز على الطلب. */
  recordRequisitionDecision(id: string, status: "approved_for_po" | "rejected" | "escalated", decision: { by: string; reasonCode: string; note: string }): Requisition;
  listPurchaseOrders(filter: { requesterId?: string; costCenter?: string; supplierId?: string; sinceIso?: string }): PurchaseOrder[];
  getPurchaseOrder(id: string): PurchaseOrder | null;
  /** إجراء commit_spend: يلزم الشركة ماليًا أمام المورد. */
  createPurchaseOrder(po: Omit<PurchaseOrder, "id" | "status" | "createdAt" | "total">, grant: ApprovalGrant): PurchaseOrder;
  getGoodsReceipts(poId: string): GoodsReceipt[];
  getInvoice(id: string): Invoice | null;
  findInvoices(filter: { supplierId?: string; invoiceNumber?: string; status?: Invoice["status"] }): Invoice[];
  /** كتابة داخلية قابلة للتراجع: تغيير حالة الفاتورة فقط. */
  setInvoiceStatus(id: string, status: Invoice["status"], note: string): Invoice;
  /** إجراء master_data_change: تغيير الحساب البنكي هو أكثر نواقل الاحتيال شيوعًا. */
  updateSupplierBank(supplierId: string, bank: Supplier["bankAccount"], grant: ApprovalGrant): Supplier;
}

export interface PaymentConnector {
  /** إجراء payment: لا رجعة فيه. */
  execute(instruction: { invoiceIds: string[]; supplierId: string; iban: string } & Money, grant: ApprovalGrant): Payment;
  listPayments(filter?: { supplierId?: string }): Payment[];
}

export interface EmailConnector {
  inbox(mailbox: string): EmailMessage[];
  /** إجراء external_send. */
  send(msg: { from: string; to: string[]; subject: string; body: string }, grant: ApprovalGrant): { id: string };
  outbox(): Array<{ id: string; from: string; to: string[]; subject: string; body: string }>;
}

/**
 * نتيجة فحص طرف (مورد أو عميل) مقابل قوائم العقوبات. هذا هو السجل المرجعي الذي يعتمد عليه الدفع.
 * - clear وpotential_match: يسجلهما وكيل الفحص.
 * - false_positive وconfirmed_match: قرار بشري حصريًا (compliance_officer) عبر resolveScreening.
 */
export interface ScreeningRecord {
  id: string;
  partyType: "supplier" | "customer";
  partyId: string;
  partyName: string;
  status: "clear" | "potential_match" | "false_positive" | "confirmed_match";
  listVersion: string;
  candidates: Array<{ entryId: string; entryName: string; score: number }>;
  screenedAt: string;
  screenedBy: string;
  note: string;
  sourceTaskId: string;
}

export interface SanctionsConnector {
  entries(): SanctionsEntry[];
  listVersion(): string;
  /** كتابة داخلية: يسجّل نتيجة الفحص الآلي. لا يقبل إلا clear أو potential_match. */
  recordScreening(r: Omit<ScreeningRecord, "id" | "screenedAt">): ScreeningRecord;
  latestScreening(partyId: string): ScreeningRecord | null;
  /** قرار بشري حصري. لا توجد أداة وكيل تستدعيه. */
  resolveScreening(id: string, humanId: string, status: "false_positive" | "confirmed_match", note: string): ScreeningRecord;
}

/**
 * سير عمل خارجي (n8n أو ما يماثله) مسموح به صراحة في الكتالوج.
 * الوكيل لا يرى عناوين URL ولا يمررها؛ يختار مفتاحًا من الكتالوج فقط، والمدخلات تُتحقق من مخطط الحقول المعلن.
 */
export interface WorkflowSpec {
  key: string;
  description: string;
  /** مسار الـ webhook في n8n (نسبي إلى N8N_BASE_URL). لا يأتي من النموذج أبدًا. */
  webhookPath: string;
  /** نوع الأثر الذي لا رجعة فيه، ويحدد الموافقين. */
  action: "external_send" | "contract" | "master_data_change";
  /** الحقول المسموحة وأنواعها. أي حقل آخر يُرفض. */
  fields: Record<string, { type: "string" | "number" | "boolean"; maxLength?: number; pattern?: string; required?: boolean }>;
}

export interface WorkflowRun {
  id: string;
  workflowKey: string;
  approvalId: string;
  /** حالة الاستجابة من n8n. محتوى الرد بيانات فقط، ولا يُعامل كتعليمات. */
  status: "accepted" | "failed";
  httpStatus: number | null;
  response: unknown;
  startedAt: string;
}

export interface WorkflowConnector {
  readonly kind: "mock" | "n8n";
  catalog(): WorkflowSpec[];
  /** إجراء لا رجعة فيه: يستهلك التفويض قبل إرسال الطلب، فلا يتكرر التشغيل حتى لو أعيدت المحاولة. */
  trigger(workflowKey: string, payload: Record<string, string | number | boolean>, grant: ApprovalGrant): Promise<WorkflowRun>;
  runs(): WorkflowRun[];
}

export interface Connectors {
  erp: ErpConnector;
  payments: PaymentConnector;
  email: EmailConnector;
  sanctions: SanctionsConnector;
  workflows: WorkflowConnector;
}
