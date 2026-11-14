import { getScreeningStatus } from "../../../common/tools/get-screening-status.ts";
import { getSupplier } from "../../../common/tools/get-supplier.ts";
import { assessPaymentTool } from "../../shared/tools/assess-payment.ts";
import { getInvoice } from "../../shared/tools/get-invoice.ts";
import { workflowTool } from "../../../../platform/tools/workflow-tool.ts";
import { schedulePayment } from "./schedule-payment.ts";

/**
 * أدوات وكيل جدولة المدفوعات وصلاحياتها:
 *
 * | الأداة                 | الصلاحية            | الملف                                    |
 * |------------------------|---------------------|------------------------------------------|
 * | get_invoice            | read                | finance/shared/tools/get-invoice.ts      |
 * | get_supplier           | read                | common/tools/get-supplier.ts             |
 * | get_screening_status   | read                | common/tools/get-screening-status.ts     |
 * | assess_payment         | read                | finance/shared/tools/assess-payment.ts   |
 * | schedule_payment       | approval (payment)  | tools/schedule-payment.ts                |
 * | request_remittance_notice | approval (external_send) | platform/tools/workflow-tool.ts (n8n) |
 */
export const requestRemittanceNotice = workflowTool({ name: "request_remittance_notice", action: "external_send", keys: ["notify_supplier_remittance"] });

export const paymentSchedulerTools = [getInvoice, getSupplier, getScreeningStatus, assessPaymentTool, schedulePayment, requestRemittanceNotice];
