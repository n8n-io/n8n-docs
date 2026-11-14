import type { WorkflowSpec } from "../types.ts";
import { parseCatalog } from "./catalog.ts";

/**
 * الكتالوج الافتراضي (للتطوير والاختبار). في الإنتاج يأتي من N8N_WORKFLOWS_FILE.
 * المدخلات معرّفات ونصوص قصيرة محدودة النمط؛ البيانات الحساسة تجلبها n8n من الأنظمة المرجعية بنفسها.
 */
export const DEFAULT_WORKFLOW_CATALOG: WorkflowSpec[] = parseCatalog([
  {
    key: "notify_supplier_remittance",
    description: "Send the supplier a remittance advice for a paid invoice via the approved n8n email workflow.",
    webhookPath: "ae/notify-supplier-remittance",
    action: "external_send",
    fields: {
      supplierId: { type: "string", pattern: "sup-\\d+" },
      invoiceId: { type: "string", pattern: "INV-\\d+" },
      language: { type: "string", pattern: "ar|en", required: false },
    },
  },
  {
    key: "open_supplier_bank_change_case",
    description: "Open a callback-verification case in the vendor-master workflow for a requested bank-account change.",
    webhookPath: "ae/supplier-bank-change-case",
    action: "master_data_change",
    fields: {
      supplierId: { type: "string", pattern: "sup-\\d+" },
      reason: { type: "string", maxLength: 300 },
    },
  },
]);
