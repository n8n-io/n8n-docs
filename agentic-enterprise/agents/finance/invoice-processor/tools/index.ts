import { getSupplier } from "../../../common/tools/get-supplier.ts";
import { assessInvoiceTool } from "../../shared/tools/assess-invoice.ts";
import { getInvoice } from "../../shared/tools/get-invoice.ts";
import { getPurchaseOrder } from "../../shared/tools/get-purchase-order.ts";
import { recordInvoiceDecision } from "./record-invoice-decision.ts";

/**
 * أدوات وكيل معالجة الفواتير وصلاحياتها:
 *
 * | الأداة                    | الصلاحية | الملف                                  |
 * |---------------------------|----------|----------------------------------------|
 * | get_invoice               | read     | finance/shared/tools/get-invoice.ts    |
 * | get_purchase_order        | read     | finance/shared/tools/get-purchase-order.ts |
 * | get_supplier              | read     | common/tools/get-supplier.ts           |
 * | assess_invoice            | read     | finance/shared/tools/assess-invoice.ts |
 * | record_invoice_decision   | write    | tools/record-invoice-decision.ts       |
 *
 * لا يملك أي أداة دفع. الدفع عند payment-scheduler، وبموافقة بشرية.
 */
export const invoiceProcessorTools = [getInvoice, getPurchaseOrder, getSupplier, assessInvoiceTool, recordInvoiceDecision];
