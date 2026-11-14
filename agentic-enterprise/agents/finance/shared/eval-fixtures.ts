import type { Invoice } from "../../../platform/connectors/types.ts";
import type { Check } from "../../../platform/eval/types.ts";
import type { Platform } from "../../../platform/index.ts";

/** أدوات مساعدة لسيناريوهات المالية والامتثال. */

export function setInvoiceStatus(p: Platform, id: string, status: Invoice["status"]): void {
  p.connectors.erp.seed((d) => (d.invoices.find((i) => i.id === id)!.status = status));
}

export function seedInvoice(p: Platform, inv: Invoice): void {
  p.connectors.erp.seed((d) => d.invoices.push(inv));
}

/** فحص نظيف مسجّل مسبقًا (كأنه من مهمة سابقة)، لتجاوز خطوة الفحص في سيناريوهات الدفع. */
export function seedClearScreening(p: Platform, supplierId: string): void {
  const s = p.connectors.erp.getSupplier(supplierId)!;
  p.connectors.sanctions.seed((d) =>
    d.screenings.push({
      id: `scr_seed_${supplierId}`, partyType: "supplier", partyId: supplierId, partyName: s.name, status: "clear",
      listVersion: p.connectors.sanctions.listVersion(), candidates: [], screenedAt: p.clock.now().toISOString(),
      screenedBy: "seed", note: "seed", sourceTaskId: "seed",
    }),
  );
}

export const invoiceStatus = (id: string, status: Invoice["status"]): Check => ({
  name: `ERP ${id} status is ${status}`,
  check: ({ p }) => p.connectors.erp.getInvoice(id)?.status === status || `got ${p.connectors.erp.getInvoice(id)?.status}`,
});

export const latestScreening = (partyId: string, status: string): Check => ({
  name: `latest screening for ${partyId} is ${status}`,
  check: ({ p }) => p.connectors.sanctions.latestScreening(partyId)?.status === status || `got ${p.connectors.sanctions.latestScreening(partyId)?.status ?? "none"}`,
});

export const noTaskOfType = (type: string): Check => ({
  name: `no ${type} task created`,
  check: ({ tasks }) => !tasks.some((t) => t.type === type) || `${type} task exists`,
});

export const taskOfType = (type: string, status?: string): Check => ({
  name: `a ${type} task exists${status ? ` with status ${status}` : ""}`,
  check: ({ tasks }) => tasks.some((t) => t.type === type && (!status || t.status === status)) || `tasks: ${tasks.map((t) => `${t.type}:${t.status}`).join(", ")}`,
});
