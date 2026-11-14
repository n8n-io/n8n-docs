import type { Requisition } from "../../../platform/connectors/types.ts";
import type { Check } from "../../../platform/eval/types.ts";
import type { Platform } from "../../../platform/index.ts";

/** أدوات مساعدة لسيناريوهات اختبار المشتريات: تجهيز بيانات ERP وفحوص خاصة بالمجال. */

export function bumpBudget(p: Platform, costCenter: string, total: number): void {
  p.connectors.erp.seed((d) => {
    const b = d.budgets.find((x) => x.costCenter === costCenter)!;
    b.total = total;
  });
}

export function seedRequisition(p: Platform, req: Omit<Requisition, "decision" | "poIds" | "submittedAt"> & Partial<Requisition>): void {
  p.connectors.erp.seed((d) => {
    d.requisitions.push({ decision: null, poIds: [], submittedAt: p.clock.now().toISOString(), ...req });
  });
}

export function seedPurchaseOrder(p: Platform, po: { id: string; supplierId: string; costCenter: string; total: number; currency: string; daysAgo: number; requisitionId?: string }): void {
  p.connectors.erp.seed((d) => {
    d.purchaseOrders.push({
      id: po.id, supplierId: po.supplierId, costCenter: po.costCenter, requesterId: "u-requester", currency: po.currency,
      lines: [], total: po.total, status: "open", sourceTaskId: "seed", ...(po.requisitionId ? { requisitionId: po.requisitionId } : {}),
      createdAt: new Date(p.clock.now().getTime() - po.daysAgo * 86_400_000).toISOString(),
    });
  });
}

export const requisitionStatus = (id: string, status: Requisition["status"]): Check => ({
  name: `ERP ${id} status is ${status}`,
  check: ({ p }) => {
    const s = p.connectors.erp.getRequisition(id)?.status;
    return s === status || `got ${s}`;
  },
});

export const escalatedTo = (role: string, opts: { reasonCode?: string; severity?: string } = {}): Check => ({
  name: `escalated to ${role}${opts.reasonCode ? ` for ${opts.reasonCode}` : ""}`,
  check: ({ escalations }) =>
    escalations.some((e) => e.toRole === role && (!opts.reasonCode || e.summary.includes(opts.reasonCode) || e.summary.toLowerCase().includes(opts.reasonCode.toLowerCase())) && (!opts.severity || e.severity === opts.severity)) ||
    `escalations: ${escalations.map((e) => `${e.toRole}/${e.severity}/${e.reason}`).join(", ") || "none"}`,
});

export const reasonCode = (code: string): Check => ({
  name: `reasonCode = ${code}`,
  check: ({ task }) => (task.output?.data as { reasonCode?: string } | undefined)?.reasonCode === code || `got ${String((task.output?.data as { reasonCode?: string } | undefined)?.reasonCode)}`,
});
