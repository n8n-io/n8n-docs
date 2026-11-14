import { sameTaskInvoice } from "../../shared/guardrails/same-task-invoice.ts";
import { invoiceDecisionMatchesAssessment } from "./invoice-decision-matches-assessment.ts";

/**
 * حواجز وكيل معالجة الفواتير، منفّذة في الكود:
 * 1. same_task_invoice (مشترك في المالية): الكتابة على فاتورة المهمة فقط.
 * 2. invoice_decision_matches_assessment: القرار يطابق المطابقة الثلاثية، والتعليق (on_hold) مسموح دائمًا.
 * إضافة إلى outcomeGuard في agent.ts: لا إحالة للدفع إلا إذا كانت الفاتورة matched في ERP.
 *
 * متى يتوقف ويطلب إنسانًا؟ عند أي فرق كمية أو سعر، أو مورد غير معتمد، أو أمر شراء مفقود،
 * وفورًا وبخطورة critical عند اختلاف الحساب البنكي.
 */
export const invoiceProcessorGuardrails = [sameTaskInvoice(["record_invoice_decision"]), invoiceDecisionMatchesAssessment];
