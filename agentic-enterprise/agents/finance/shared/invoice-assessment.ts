import type { ErpConnector, Invoice, PurchaseOrder } from "../../../platform/connectors/types.ts";
import type { HumanRole } from "../../../platform/core/types.ts";
import type { EscalationReason, Severity } from "../../../platform/escalation/escalation.ts";
import { FINANCE_POLICY } from "./policy.ts";

/**
 * المطابقة الثلاثية حتميًا: أمر الشراء ↔ إيصال الاستلام ↔ الفاتورة، مع كشف التكرار والاحتيال البنكي.
 * المصدر الوحيد لقواعد قرار الفاتورة، تستخدمه الأداة والحاجز والسياسة المرجعية.
 */

export interface InvoiceFinding {
  code:
    | "INV_NOT_FOUND" | "INV_ALREADY_PROCESSED" | "DUPLICATE_INVOICE" | "ARITHMETIC_ERROR"
    | "NO_PO" | "PO_SUPPLIER_MISMATCH" | "CURRENCY_MISMATCH" | "LINE_NOT_ON_PO"
    | "QTY_EXCEEDS_RECEIPT" | "PRICE_VARIANCE" | "BANK_DETAILS_MISMATCH" | "SUPPLIER_NOT_APPROVED";
  action: "reject" | "escalate";
  message: string;
  escalation?: { reason: EscalationReason; severity: Severity; toRole: HumanRole };
}

export interface LineCheck {
  sku: string;
  qtyInvoiced: number;
  qtyReceived: number;
  qtyPreviouslyInvoiced: number;
  invoiceUnitPrice: number;
  poUnitPrice: number | null;
  priceVariancePct: number | null;
}

export interface InvoiceAssessment {
  invoiceId: string;
  invoice: Invoice | null;
  poId: string | null;
  lines: LineCheck[];
  findings: InvoiceFinding[];
  verdict: "matched" | "rejected" | "on_hold";
  primary: InvoiceFinding | null;
}

const SEVERITY_RANK: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const esc = (reason: EscalationReason, severity: Severity, toRole: HumanRole) => ({ reason, severity, toRole });

export function assessInvoice(erp: ErpConnector, invoiceId: string): InvoiceAssessment {
  const inv = erp.getInvoice(invoiceId);
  const f: InvoiceFinding[] = [];
  const done = (po: PurchaseOrder | null, lines: LineCheck[]): InvoiceAssessment => {
    const sorted = [...f].sort((a, b) =>
      a.action !== b.action ? (a.action === "reject" ? -1 : 1) : SEVERITY_RANK[a.escalation?.severity ?? "low"] - SEVERITY_RANK[b.escalation?.severity ?? "low"]);
    const primary = sorted[0] ?? null;
    return { invoiceId, invoice: inv, poId: po?.id ?? null, lines, findings: sorted, primary, verdict: !primary ? "matched" : primary.action === "reject" ? "rejected" : "on_hold" };
  };
  if (!inv) return (f.push({ code: "INV_NOT_FOUND", action: "reject", message: `Invoice ${invoiceId} not found` }), done(null, []));
  if (inv.status !== "received") return (f.push({ code: "INV_ALREADY_PROCESSED", action: "reject", message: `Invoice status is "${inv.status}"` }), done(null, []));

  // التكرار: نفس المورد ونفس رقم الفاتورة بعد التطبيع، في فاتورة أخرى غير مرفوضة.
  const dup = erp.findInvoices({ supplierId: inv.supplierId, invoiceNumber: inv.invoiceNumber }).filter((x) => x.id !== inv.id && x.status !== "rejected");
  if (dup.length) f.push({ code: "DUPLICATE_INVOICE", action: "reject", message: `Same supplier invoice number ${inv.invoiceNumber} already exists as ${dup.map((d) => d.id).join(", ")}` });

  const subtotal = inv.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
  if (Math.abs(subtotal - inv.subtotal) > FINANCE_POLICY.arithmeticTolerance || Math.abs(inv.subtotal + inv.tax - inv.total) > FINANCE_POLICY.arithmeticTolerance)
    f.push({ code: "ARITHMETIC_ERROR", action: "reject", message: `Lines sum to ${subtotal}; invoice states subtotal ${inv.subtotal}, tax ${inv.tax}, total ${inv.total}` });

  const supplier = erp.getSupplier(inv.supplierId);
  if (!supplier || supplier.status !== "approved")
    f.push({ code: "SUPPLIER_NOT_APPROVED", action: "escalate", message: `Supplier ${inv.supplierId} is ${supplier?.status ?? "unknown"}`, escalation: esc("policy_exception", "medium", "ap_supervisor") });
  // أخطر نمط احتيال (BEC): الفاتورة تطلب الدفع لحساب غير المسجل في السجل الرئيسي.
  if (supplier && inv.remitToIban && inv.remitToIban.replace(/\s/g, "") !== supplier.bankAccount.iban)
    f.push({
      code: "BANK_DETAILS_MISMATCH", action: "escalate",
      message: `Invoice asks for payment to ****${inv.remitToIban.slice(-4)} but master data has ****${supplier.bankAccount.iban.slice(-4)}. Possible business email compromise; verify by calling the supplier on a known number.`,
      escalation: esc("suspected_fraud", "critical", "finance_controller"),
    });

  const po = inv.poId ? erp.getPurchaseOrder(inv.poId) : null;
  if (!po) {
    f.push({ code: "NO_PO", action: "escalate", message: `Invoice has no valid PO reference (${inv.poId ?? "none"})`, escalation: esc("missing_data", "medium", "ap_supervisor") });
    return done(null, []);
  }
  if (po.supplierId !== inv.supplierId)
    f.push({ code: "PO_SUPPLIER_MISMATCH", action: "escalate", message: `PO ${po.id} belongs to ${po.supplierId}, invoice is from ${inv.supplierId}`, escalation: esc("suspected_fraud", "high", "finance_controller") });
  if (po.currency !== inv.currency)
    f.push({ code: "CURRENCY_MISMATCH", action: "escalate", message: `PO in ${po.currency}, invoice in ${inv.currency}`, escalation: esc("policy_exception", "medium", "ap_supervisor") });

  const receipts = erp.getGoodsReceipts(po.id);
  const others = erp.findInvoices({ supplierId: inv.supplierId }).filter((x) => x.poId === po.id && x.id !== inv.id && x.status !== "rejected");
  const lines: LineCheck[] = inv.lines.map((l) => {
    const poLine = po.lines.find((p) => p.sku === l.sku);
    const qtyReceived = receipts.reduce((s, r) => s + (r.lines.find((x) => x.sku === l.sku)?.quantityReceived ?? 0), 0);
    const qtyPreviouslyInvoiced = others.reduce((s, o) => s + (o.lines.find((x) => x.sku === l.sku)?.quantity ?? 0), 0);
    const variance = poLine ? Math.round(((l.unitPrice - poLine.unitPrice) / poLine.unitPrice) * 10_000) / 100 : null;
    if (!poLine) f.push({ code: "LINE_NOT_ON_PO", action: "escalate", message: `${l.sku} is not on PO ${po.id}`, escalation: esc("policy_exception", "medium", "ap_supervisor") });
    else if (variance! > FINANCE_POLICY.unitPriceTolerancePct)
      f.push({ code: "PRICE_VARIANCE", action: "escalate", message: `${l.sku} invoiced at ${l.unitPrice} vs PO ${poLine.unitPrice} (+${variance}%)`, escalation: esc("policy_exception", "medium", "ap_supervisor") });
    if (qtyPreviouslyInvoiced + l.quantity > qtyReceived)
      f.push({ code: "QTY_EXCEEDS_RECEIPT", action: "escalate", message: `${l.sku}: invoiced ${l.quantity} (+${qtyPreviouslyInvoiced} earlier) but only ${qtyReceived} received`, escalation: esc("policy_exception", "medium", "ap_supervisor") });
    return { sku: l.sku, qtyInvoiced: l.quantity, qtyReceived, qtyPreviouslyInvoiced, invoiceUnitPrice: l.unitPrice, poUnitPrice: poLine?.unitPrice ?? null, priceVariancePct: variance };
  });
  return done(po, lines);
}

