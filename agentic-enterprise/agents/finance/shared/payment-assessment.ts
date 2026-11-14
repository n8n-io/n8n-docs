import type { Connectors, Invoice } from "../../../platform/connectors/types.ts";
import type { HumanRole } from "../../../platform/core/types.ts";
import type { EscalationReason, Severity } from "../../../platform/escalation/escalation.ts";
import { screeningAllowsPayment } from "../../compliance/shared/screening.ts";

/**
 * جاهزية الدفع حتميًا. لا دفعة إلا إذا تحققت كل هذه الشروط:
 * - الفاتورة مطابقة (matched) وغير مدفوعة، ولا توجد دفعة سابقة لها.
 * - المورد معتمد، والدفع لحسابه المسجل في السجل الرئيسي فقط.
 * - فحص العقوبات للمورد نظيف وحديث.
 */

export interface PaymentFinding {
  code: "INV_NOT_FOUND" | "INV_NOT_MATCHED" | "ALREADY_PAID" | "SUPPLIER_NOT_APPROVED" | "BANK_DETAILS_MISMATCH" | "SCREENING_MISSING" | "SCREENING_STALE" | "SCREENING_HIT";
  action: "reject" | "escalate" | "screen";
  message: string;
  escalation?: { reason: EscalationReason; severity: Severity; toRole: HumanRole };
}

export interface PaymentAssessment {
  invoiceId: string;
  supplierId: string | null;
  amount: number | null;
  currency: string | null;
  payee: { supplierId: string; bankName: string; ibanLast4: string } | null;
  scheduledFor: string | null;
  findings: PaymentFinding[];
  verdict: "ready" | "needs_screening" | "rejected" | "escalated";
  primary: PaymentFinding | null;
  invoice: Invoice | null;
}

const RANK = { reject: 0, escalate: 1, screen: 2 } as const;

export function assessPayment(c: Connectors, invoiceId: string, now: Date): PaymentAssessment {
  const inv = c.erp.getInvoice(invoiceId);
  const f: PaymentFinding[] = [];
  const base = { invoiceId, supplierId: inv?.supplierId ?? null, amount: inv?.total ?? null, currency: inv?.currency ?? null, invoice: inv };
  const done = (payee: PaymentAssessment["payee"], scheduledFor: string | null): PaymentAssessment => {
    const sorted = [...f].sort((a, b) => RANK[a.action] - RANK[b.action]);
    const primary = sorted[0] ?? null;
    const verdict = !primary ? "ready" : primary.action === "reject" ? "rejected" : primary.action === "escalate" ? "escalated" : "needs_screening";
    return { ...base, payee, scheduledFor, findings: sorted, primary, verdict };
  };

  if (!inv) return (f.push({ code: "INV_NOT_FOUND", action: "reject", message: `Invoice ${invoiceId} not found` }), done(null, null));
  if (inv.status === "paid" || c.payments.listPayments({ supplierId: inv.supplierId }).some((p) => p.invoiceIds.includes(inv.id)))
    return (f.push({ code: "ALREADY_PAID", action: "reject", message: `Invoice ${inv.id} is already paid` }), done(null, null));
  if (inv.status !== "matched") f.push({ code: "INV_NOT_MATCHED", action: "reject", message: `Invoice status is "${inv.status}"; only matched invoices can be paid` });

  const s = c.erp.getSupplier(inv.supplierId);
  if (!s || s.status !== "approved")
    f.push({ code: "SUPPLIER_NOT_APPROVED", action: "escalate", message: `Supplier ${inv.supplierId} is ${s?.status ?? "unknown"}`, escalation: { reason: "policy_exception", severity: "high", toRole: "finance_controller" } });
  if (s && inv.remitToIban && inv.remitToIban.replace(/\s/g, "") !== s.bankAccount.iban)
    f.push({ code: "BANK_DETAILS_MISMATCH", action: "escalate", message: "Invoice remit-to IBAN differs from master data", escalation: { reason: "suspected_fraud", severity: "critical", toRole: "finance_controller" } });

  const scr = screeningAllowsPayment(c.sanctions.latestScreening(inv.supplierId), now, c.sanctions.listVersion());
  if (scr.code === "SCREENING_HIT")
    f.push({ code: "SCREENING_HIT", action: "escalate", message: scr.detail, escalation: { reason: "sanctions_potential_match", severity: "high", toRole: "compliance_officer" } });
  else if (!scr.ok) f.push({ code: scr.code as "SCREENING_MISSING" | "SCREENING_STALE", action: "screen", message: scr.detail });

  const today = now.toISOString().slice(0, 10);
  const payee = s ? { supplierId: s.id, bankName: s.bankAccount.bankName, ibanLast4: s.bankAccount.iban.slice(-4) } : null;
  return done(payee, inv.dueDate > today ? inv.dueDate : today);
}
