import { z } from "zod";

/**
 * إعدادات المنصة من متغيرات البيئة، مع تحقق صارم من الأنواع.
 * لا توجد قيم سرية افتراضية؛ المفتاح يُقرأ من البيئة فقط.
 */
const boolish = z
  .string()
  .optional()
  .transform((v) => v === "true" || v === "1");

const ConfigSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  AGENT_MODEL: z.string().default("claude-opus-5-5"),
  AGENT_RUNTIME: z.enum(["scripted", "live"]).default("scripted"),
  DATABASE_PATH: z.string().default("./data/enterprise.db"),
  /** postgres://… لاستخدام PostgreSQL بدل SQLite. الاتصال يحمل كلمة المرور، فيأتي من مدير الأسرار. */
  DATABASE_URL: z.string().regex(/^postgres(ql)?:\/\//).optional(),
  /** الـ schema في PostgreSQL (يُحدد تلقائيًا لكل مستأجر في الخادم). */
  DATABASE_SCHEMA: z.string().regex(/^[a-z_][a-z0-9_]{0,62}$/).default("public"),
  KILL_SWITCH: boolish,
  KILL_SWITCH_FILE: z.string().default("./data/KILL_SWITCH"),
  APPROVAL_TTL_HOURS: z.coerce.number().positive().default(24),
  DUAL_APPROVAL_THRESHOLD_USD: z.coerce.number().positive().default(50_000),
  AGENT_MAX_TURNS: z.coerce.number().int().positive().default(20),
  AGENT_MAX_BUDGET_USD: z.coerce.number().positive().default(2),
  AGENT_TIMEOUT_MS: z.coerce.number().int().positive().default(300_000),
  /** أقصى عمق لسلسلة الإحالات بين الوكلاء. */
  /** سقف التكلفة التراكمية لكل وكيل خلال 24 ساعة متحركة (دولار). */
  AGENT_DAILY_BUDGET_USD: z.coerce.number().positive().default(50),
  AGENT_MAX_HANDOFF_DEPTH: z.coerce.number().int().min(1).max(50).default(6),
  /** مفتاح HMAC لتثبيت audit خارج القاعدة (32 بايت على الأقل، hex أو base64). يأتي من مدير الأسرار. */
  AUDIT_ANCHOR_KEY: z.string().optional(),
  AUDIT_ANCHOR_FILE: z.string().default("./data/audit-anchor.jsonl"),
  /** true: يرفض الإقلاع دون مفتاح تثبيت. إلزامي في الإنتاج. */
  AUDIT_ANCHOR_REQUIRED: boolish,
  /** signed: كل قرار موافقة يتطلب توقيع Ed25519 من صاحبه (الافتراضي، وإلزامي في الإنتاج). trusted: للاختبار فقط. */
  APPROVER_AUTH: z.enum(["signed", "trusted"]).default("signed"),
  /** true: الوكيل الجديد أو الذي تغيّر تعريفه ينتظر نشرًا بشريًا موقّعًا قبل أن يعمل. موصى به في الإنتاج. */
  AGENT_REQUIRE_DEPLOY: boolish,
  /** mock: سير عمل وهمي. n8n: اتصال حقيقي بـ N8N_BASE_URL (يتطلب الأسرار والكتالوج). */
  WORKFLOW_CONNECTOR: z.enum(["mock", "n8n"]).default("mock"),
  N8N_BASE_URL: z.string().url().optional(),
  /** سر HMAC للطلبات الصادرة إلى n8n (32 بايت على الأقل). */
  N8N_OUTBOUND_SECRET: z.string().optional(),
  /** سر HMAC للأحداث الواردة من n8n. مختلف عن الصادر، فتسريب أحدهما لا يكشف الآخر. */
  N8N_INBOUND_SECRET: z.string().optional(),
  N8N_WORKFLOWS_FILE: z.string().optional(),
  N8N_HEADER_AUTH_NAME: z.string().optional(),
  N8N_HEADER_AUTH_VALUE: z.string().optional(),
  N8N_TIMEOUT_MS: z.coerce.number().int().positive().default(15_000),
});

export type PlatformConfig = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env, overrides: Partial<PlatformConfig> = {}): PlatformConfig {
  const parsed = ConfigSchema.parse(env);
  return { ...parsed, ...overrides };
}
