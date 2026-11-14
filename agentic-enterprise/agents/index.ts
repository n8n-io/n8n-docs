import type { AgentDefinition } from "../platform/agent/agent-definition.ts";
import { sanctionsScreenerAgent } from "./compliance/sanctions-screener/agent.ts";
import { invoiceProcessorAgent } from "./finance/invoice-processor/agent.ts";
import { paymentSchedulerAgent } from "./finance/payment-scheduler/agent.ts";
import { poIssuerAgent } from "./procurement/po-issuer/agent.ts";
import { requisitionIntakeAgent } from "./procurement/requisition-intake/agent.ts";

/** سجل كل وكلاء الأعمال المبنية. يُسجَّل في المنصة عند التشغيل: createPlatform().register(...ALL_AGENTS). */
export const ALL_AGENTS: AgentDefinition[] = [
  requisitionIntakeAgent,
  poIssuerAgent,
  invoiceProcessorAgent,
  paymentSchedulerAgent,
  sanctionsScreenerAgent,
];
