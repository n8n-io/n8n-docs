import type { Budget, ErpConnector, Requisition, Supplier } from "../../../platform/connectors/types.ts";
import { toUsd } from "../../../platform/core/fx.ts";
import type { HumanRole } from "../../../platform/core/types.ts";
import type { EscalationReason, Severity } from "../../../platform/escalation/escalation.ts";
import { PROCUREMENT_POLICY } from "./policy.ts";

/**
 * تقييم حتمي لطلب الشراء مقابل النظام المرجعي (ERP) وسياسة المشتريات.
 * هذا هو المصدر الوحيد لقواعد القرار، وتستخدمه ثلاثة أطراف:
 *   1. الأداة assess_requisition، فيرى الوكيل النتائج نفسها.
 *   2. الحواجز، فلا يستطيع الوكيل تسجيل قرار يخالف التقييم.
 *   3. السياسة المرجعية في evals.
 * الأسعار والموردون يُؤخذون من الكتالوج دائمًا، لا من نص الطلب ولا من عروض الأسعار المرفقة.
 */

export type FindingAction = "reject" | "escalate" | "info";

export interface Finding {
  code:
    | "REQ_NOT_FOUND"
    | "REQ_ALREADY_DECIDED"
    | "REQ_NOT_APPROVED"
    | "PO_ALREADY_EXISTS"
    | "INVALID_QUANTITY"
    | "NON_CATALOG_ITEM"
    | "SUPPLIER_BLOCKED"
    | "SUPPLIER_NOT_APPROVED"
    | "BUDGET_UNKNOWN"
    | "BUDGET_INSUFFICIENT"
    | "QUOTES_REQUIRED"
    | "SPLIT_SUSPECTED"
    | "NEEDED_BY_PAST";
  action: FindingAction;
  message: string;
  supplierId?: string;
  escalation?: { reason: EscalationReason; severity: Severity; toRole: HumanRole };
}

export interface PricedLine {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  lineTotal: number;
  contracted: boolean;
}

export interface SupplierGroup {
  supplierId: string;
  supplierName: string;
  supplierStatus: Supplier["status"] | "unknown";
  currency: string;
  total: number;
  totalUsd: number;
  allContracted: boolean;
  lines: PricedLine[];
  priorSpendUsdInWindow: number;
}

export interface Assessment {
  requisitionId: string;
  requisition: Requisition | null;
  groups: SupplierGroup[];
  totalUsd: number;
  budget: (Budget & { available: number; availableUsd: number }) | null;
  findings: Finding[];
  /** الخلاصة المشتقة من النتائج بترتيب أولوية ثابت: رفض ثم تصعيد ثم موافقة. */
  verdict: "approved_for_po" | "rejected" | "escalated";
  primary: Finding | null;
}

export interface AssessOptions {
  now: Date;
  /** intake: الطلب يجب أن يكون submitted. po: يجب أن يكون approved_for_po. */
  stage: "intake" | "po";
}

const ACTION_RANK: Record<FindingAction, number> = { reject: 0, escalate: 1, info: 2 };

export function assessRequisition(erp: ErpConnector, requisitionId: string, opts: AssessOptions): Assessment {
  const req = erp.getRequisition(requisitionId);
  const findings: Finding[] = [];
  const empty = (f: Finding): Assessment => ({ requisitionId, requisition: req, groups: [], totalUsd: 0, budget: null, findings: [f], verdict: "rejected", primary: f });

  if (!req) return empty({ code: "REQ_NOT_FOUND", action: "reject", message: `Requisition ${requisitionId} does not exist in ERP` });
  if (opts.stage === "intake" && req.status !== "submitted")
    return empty({ code: "REQ_ALREADY_DECIDED", action: "reject", message: `Requisition status is "${req.status}", expected "submitted"` });
  // في مرحلة الأمر: ordered مقبولة لأن الطلب متعدد الموردين يصبح ordered بعد أول أمر، ومنع التكرار يتم لكل مورد.
  if (opts.stage === "po" && req.status !== "approved_for_po" && req.status !== "ordered")
    return empty({ code: "REQ_NOT_APPROVED", action: "reject", message: `Requisition status is "${req.status}"; only approved_for_po requisitions can be ordered` });

  // تسعير كل سطر من الكتالوج وتجميعه حسب المورد.
  const groups = new Map<string, SupplierGroup>();
  for (const line of req.lines) {
    if (!Number.isInteger(line.quantity) || line.quantity <= 0 || line.quantity > PROCUREMENT_POLICY.maxLineQuantity) {
      findings.push({ code: "INVALID_QUANTITY", action: "reject", message: `Invalid quantity ${line.quantity} for "${line.description}"` });
      continue;
    }
    const item = line.sku ? erp.getCatalogItem(line.sku) : null;
    if (!item) {
      findings.push({
        code: "NON_CATALOG_ITEM", action: "escalate",
        message: `"${line.description}" is not a catalog item; a human buyer must source it`,
        escalation: { reason: "policy_exception", severity: "low", toRole: "procurement_lead" },
      });
      continue;
    }
    const supplier = erp.getSupplier(item.supplierId);
    const g = groups.get(item.supplierId) ?? {
      supplierId: item.supplierId, supplierName: supplier?.name ?? "unknown", supplierStatus: supplier?.status ?? "unknown",
      currency: item.currency, total: 0, totalUsd: 0, allContracted: true, lines: [], priorSpendUsdInWindow: 0,
    };
    const lineTotal = round2(line.quantity * item.unitPrice);
    g.lines.push({ sku: item.sku, description: item.description, quantity: line.quantity, unitPrice: item.unitPrice, currency: item.currency, lineTotal, contracted: item.contracted });
    g.total = round2(g.total + (item.currency === g.currency ? lineTotal : (toUsd(lineTotal, item.currency) / toUsd(1, g.currency))));
    g.allContracted &&= item.contracted;
    groups.set(item.supplierId, g);
  }

  const since = new Date(opts.now.getTime() - PROCUREMENT_POLICY.splitLookbackDays * 86_400_000).toISOString();
  for (const g of groups.values()) {
    g.totalUsd = toUsd(g.total, g.currency);
    if (g.supplierStatus === "blocked" || g.supplierStatus === "unknown")
      findings.push({ code: "SUPPLIER_BLOCKED", action: "reject", supplierId: g.supplierId, message: `Supplier ${g.supplierName} is ${g.supplierStatus}` });
    else if (g.supplierStatus !== "approved")
      findings.push({
        code: "SUPPLIER_NOT_APPROVED", action: "escalate", supplierId: g.supplierId,
        message: `Supplier ${g.supplierName} is ${g.supplierStatus}; onboarding must complete first`,
        escalation: { reason: "policy_exception", severity: "medium", toRole: "procurement_lead" },
      });
    if (!g.allContracted && g.totalUsd > PROCUREMENT_POLICY.competitiveQuoteThresholdUsd)
      findings.push({
        code: "QUOTES_REQUIRED", action: "escalate", supplierId: g.supplierId,
        message: `Non-contracted spend of ${g.totalUsd} USD with ${g.supplierName} exceeds ${PROCUREMENT_POLICY.competitiveQuoteThresholdUsd} USD; 3 quotes required`,
        escalation: { reason: "policy_exception", severity: "medium", toRole: "procurement_lead" },
      });

    if (opts.stage === "po") {
      const existing = erp.listPurchaseOrders({ supplierId: g.supplierId }).filter((po) => po.requisitionId === req.id && po.status !== "cancelled");
      if (existing.length)
        findings.push({ code: "PO_ALREADY_EXISTS", action: "reject", supplierId: g.supplierId, message: `PO ${existing.map((p) => p.id).join(", ")} already issued for ${req.id} with ${g.supplierName}` });
    }

    // كشف التقسيم: مشتريات سابقة لنفس الطالب ونفس المورد في النافذة الزمنية.
    const prior = erp
      .listPurchaseOrders({ requesterId: req.requesterId, supplierId: g.supplierId, sinceIso: since })
      .filter((po) => po.status !== "cancelled" && po.requisitionId !== req.id);
    g.priorSpendUsdInWindow = round2(prior.reduce((s, po) => s + toUsd(po.total, po.currency), 0));
    const combined = g.priorSpendUsdInWindow + g.totalUsd;
    if (prior.length > 0 && g.totalUsd <= PROCUREMENT_POLICY.splitThresholdUsd && combined > PROCUREMENT_POLICY.splitThresholdUsd)
      findings.push({
        code: "SPLIT_SUSPECTED", action: "escalate", supplierId: g.supplierId,
        message: `Combined spend with ${g.supplierName} in ${PROCUREMENT_POLICY.splitLookbackDays} days is ${round2(combined)} USD (prior ${g.priorSpendUsdInWindow} USD on ${prior.map((p) => p.id).join(", ")}); possible split to avoid dual approval`,
        escalation: { reason: "policy_exception", severity: "high", toRole: "procurement_manager" },
      });
  }

  const totalUsd = round2([...groups.values()].reduce((s, g) => s + g.totalUsd, 0));
  const b = erp.getBudget(req.costCenter);
  const budget = b ? { ...b, available: round2(b.total - b.committed - b.spent), availableUsd: toUsd(b.total - b.committed - b.spent, b.currency) } : null;
  if (!budget)
    findings.push({ code: "BUDGET_UNKNOWN", action: "escalate", message: `Cost center ${req.costCenter} has no budget`, escalation: { reason: "missing_data", severity: "medium", toRole: "procurement_manager" } });
  else if (totalUsd > budget.availableUsd)
    findings.push({
      code: "BUDGET_INSUFFICIENT", action: "escalate",
      message: `Requisition needs ${totalUsd} USD but ${req.costCenter} has ${budget.available} ${budget.currency} (${budget.availableUsd} USD) available`,
      escalation: { reason: "policy_exception", severity: "medium", toRole: "procurement_manager" },
    });

  if (new Date(req.neededBy).getTime() < opts.now.getTime())
    findings.push({ code: "NEEDED_BY_PAST", action: "info", message: `Needed-by date ${req.neededBy} is in the past` });

  const sorted = [...findings].sort((a, z) => ACTION_RANK[a.action] - ACTION_RANK[z.action]);
  const primary = sorted.find((f) => f.action !== "info") ?? null;
  const verdict = !primary ? "approved_for_po" : primary.action === "reject" ? "rejected" : "escalated";
  return { requisitionId, requisition: req, groups: [...groups.values()], totalUsd, budget, findings: sorted, verdict, primary };
}

/**
 * الخلاصة لمورد واحد: النتائج العامة (بلا supplierId) مع نتائج هذا المورد فقط.
 * يستخدمها مُصدر أوامر الشراء، لأن كل أمر شراء يخص موردًا واحدًا.
 */
export function verdictFor(a: Pick<Assessment, "groups" | "findings">, supplierId: string): { verdict: Assessment["verdict"]; primary: Finding | null; group: SupplierGroup | null } {
  const group = a.groups.find((g) => g.supplierId === supplierId) ?? null;
  const relevant = a.findings.filter((f) => !f.supplierId || f.supplierId === supplierId);
  if (!group && !relevant.some((f) => f.action === "reject"))
    return { verdict: "rejected", group, primary: { code: "REQ_NOT_APPROVED", action: "reject", message: `Supplier ${supplierId} is not part of this requisition` } };
  const primary = [...relevant].sort((x, y) => ACTION_RANK[x.action] - ACTION_RANK[y.action]).find((f) => f.action !== "info") ?? null;
  return { verdict: !primary ? "approved_for_po" : primary.action === "reject" ? "rejected" : "escalated", primary, group };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
