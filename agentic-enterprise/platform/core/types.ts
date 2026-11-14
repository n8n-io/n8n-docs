/**
 * الأنواع الأساسية المشتركة في المنصة.
 * كل كيان يتخذ قرارًا أو ينفّذ إجراءً هو "فاعل" (Actor): وكيل أو إنسان أو النظام نفسه.
 */

export type ActorType = "agent" | "human" | "system";

export interface Actor {
  type: ActorType;
  id: string;
}

/** الأدوار البشرية المعتمدة. تُستخدم في التوجيه والموافقات وفصل الصلاحيات. */
export const HUMAN_ROLES = [
  "cfo",
  "finance_controller",
  "ap_supervisor",
  "procurement_lead",
  "procurement_manager",
  "compliance_officer",
  "legal_counsel",
  "cs_supervisor",
  "ciso",
  "platform_operator",
] as const;
export type HumanRole = (typeof HUMAN_ROLES)[number];

export interface Human {
  id: string;
  name: string;
  roles: HumanRole[];
}

/**
 * مستوى صلاحية الأداة:
 * - read: قراءة فقط، بلا أثر جانبي.
 * - write: كتابة داخلية قابلة للتراجع (مسودة، ملاحظة، تحديث حالة).
 * - approval: إجراء لا رجعة فيه، لا يُنفَّذ إلا بعد موافقة بشرية صالحة.
 */
export type ToolPermission = "read" | "write" | "approval";

/** أنواع الإجراءات التي لا رجعة فيها وتمر حتمًا عبر approval gate. */
export const IRREVERSIBLE_ACTIONS = [
  "payment",
  "external_send",
  "delete",
  "contract",
  "commit_spend",
  "master_data_change",
] as const;
export type IrreversibleAction = (typeof IRREVERSIBLE_ACTIONS)[number];

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type JsonObject = { [key: string]: JsonValue };

export interface Money {
  amount: number;
  currency: string;
}
