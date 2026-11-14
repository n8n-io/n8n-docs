import type { AuditLog } from "../audit/audit-log.ts";
import type { Database } from "../core/db.ts";
import { dialectOf, parseJson } from "../core/db.ts";
import { PlatformError } from "../core/errors.ts";
import type { JsonValue } from "../core/types.ts";
import type { Clock } from "../core/util.ts";

/**
 * ذاكرة موحدة مع فصل صريح بين ما يُحفظ وما يُنسى:
 * - task: ذاكرة عمل مؤقتة تُمحى تلقائيًا عند انتهاء المهمة (forgetTask).
 * - agent: ذاكرة طويلة خاصة بوكيل واحد، مثل تفضيلات مورد أو أنماط أخطاء متكررة.
 * - shared: معرفة مشتركة بين الوكلاء في namespace محدد، مثل قائمة الموردين الموثوقين.
 *
 * السياسة تُفرض في الكود: لكل وكيل قائمة namespaces مسموحة (MemoryPolicy)، وحد أقصى لمدة الاحتفاظ.
 * البيانات الشخصية (PII) تُحجب تلقائيًا قبل الحفظ، ما لم تسمح السياسة صراحة بحفظها في هذا الـ namespace.
 * كل سجل يمكن ربطه بأصحاب البيانات (subjectIds)، فيمكن تنفيذ "حق المحو" في GDPR وPDPL عبر eraseSubject.
 */

export type MemoryScope = "task" | "agent" | "shared";

export interface MemoryRule {
  namespace: string;
  scope: MemoryScope;
  /** أقصى مدة احتفاظ بالأيام. القيمة 0 تعني حتى نهاية المهمة فقط. */
  maxTtlDays: number;
  allowPii: boolean;
  description: string;
}

export interface MemoryPolicy {
  /** ما يُحفظ: كل كتابة خارج هذه القواعد تُرفض. */
  remember: MemoryRule[];
  /** ما يُنسى: وثائقي، ويُطبَّق فعليًا بغياب القاعدة وبالحجب التلقائي. */
  forget: string[];
}

export interface MemoryRecord {
  scope: MemoryScope;
  owner: string;
  namespace: string;
  key: string;
  value: JsonValue;
  subjectIds: string[];
  createdAt: string;
  expiresAt: string | null;
  redactions: number;
}

const PII_PATTERNS: Array<[string, RegExp]> = [
  ["email", /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g],
  ["iban", /\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){2,7}(?:\s?[A-Z0-9]{1,4})?\b/g],
  ["card", /\b(?:\d[ -]?){13,19}\b/g],
  ["phone", /(?:\+|00)\d{1,3}[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4}/g],
  ["national_id", /\b[12]\d{9}\b/g],
];

export function redactPii(value: JsonValue): { value: JsonValue; count: number } {
  let count = 0;
  const walk = (v: JsonValue): JsonValue => {
    if (typeof v === "string") {
      let s = v;
      for (const [label, re] of PII_PATTERNS) s = s.replace(re, () => (count++, `[REDACTED:${label}]`));
      return s;
    }
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return { value: walk(value), count };
}

export class MemoryStore {
  constructor(
    private readonly db: Database,
    private readonly audit: AuditLog,
    private readonly clock: Clock,
  ) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS memory (
        scope TEXT NOT NULL, owner TEXT NOT NULL, namespace TEXT NOT NULL, key TEXT NOT NULL,
        value TEXT NOT NULL, subject_ids TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT,
        redactions INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (scope, owner, namespace, key)
      );
    `);
  }

  now(): Date {
    return this.clock.now();
  }

  /** واجهة مقيّدة بوكيل ومهمة وسياسة. هذا ما يحصل عليه الوكيل، لا المخزن الخام. */
  forAgent(agentId: string, taskId: string, policy: MemoryPolicy): AgentMemory {
    return new AgentMemory(this, agentId, taskId, policy);
  }

  write(record: Omit<MemoryRecord, "createdAt" | "redactions">, allowPii: boolean, actor: string): MemoryRecord {
    const { value, count } = allowPii ? { value: record.value, count: 0 } : redactPii(record.value);
    const createdAt = this.clock.now().toISOString();
    this.db
      .prepare(
        `INSERT INTO memory (scope, owner, namespace, key, value, subject_ids, created_at, expires_at, redactions)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(scope, owner, namespace, key) DO UPDATE SET value = excluded.value, subject_ids = excluded.subject_ids,
           created_at = excluded.created_at, expires_at = excluded.expires_at, redactions = excluded.redactions`,
      )
      .run(record.scope, record.owner, record.namespace, record.key, JSON.stringify(value), JSON.stringify(record.subjectIds), createdAt, record.expiresAt, count);
    this.audit.append({
      actor: { type: "agent", id: actor },
      action: "memory.write",
      target: `${record.scope}:${record.owner}:${record.namespace}:${record.key}`,
      outcome: "success",
      data: { redactions: count, expiresAt: record.expiresAt },
    });
    return { ...record, value, createdAt, redactions: count };
  }

  read(scope: MemoryScope, owner: string, namespace: string, key?: string): MemoryRecord[] {
    const now = this.clock.now().toISOString();
    const rows = key
      ? this.db.prepare("SELECT * FROM memory WHERE scope=? AND owner=? AND namespace=? AND key=? AND (expires_at IS NULL OR expires_at > ?)").all(scope, owner, namespace, key, now)
      : this.db.prepare("SELECT * FROM memory WHERE scope=? AND owner=? AND namespace=? AND (expires_at IS NULL OR expires_at > ?) ORDER BY key").all(scope, owner, namespace, now);
    return rows.map((r) => rowToRecord(r as Record<string, unknown>));
  }

  /** ينسى ذاكرة العمل الخاصة بمهمة. يُستدعى تلقائيًا عند انتهاء المهمة. */
  forgetTask(taskId: string): number {
    const res = this.db.prepare("DELETE FROM memory WHERE scope = 'task' AND owner = ?").run(taskId);
    const n = Number(res.changes);
    if (n > 0) this.audit.append({ actor: { type: "system", id: "memory" }, action: "memory.forget_task", target: taskId, taskId, outcome: "success", data: { deleted: n } });
    return n;
  }

  purgeExpired(): number {
    const res = this.db.prepare("DELETE FROM memory WHERE expires_at IS NOT NULL AND expires_at <= ?").run(this.clock.now().toISOString());
    return Number(res.changes);
  }

  /** حق المحو: يحذف كل ذاكرة مرتبطة بصاحب بيانات معيّن، ويوثق ذلك في audit log. */
  eraseSubject(subjectId: string, requestedBy: string): number {
    const res = this.db
      .prepare(
        dialectOf(this.db) === "postgres"
          ? "DELETE FROM memory WHERE EXISTS (SELECT 1 FROM jsonb_array_elements_text(memory.subject_ids::jsonb) AS s(v) WHERE s.v = ?)"
          : "DELETE FROM memory WHERE EXISTS (SELECT 1 FROM json_each(memory.subject_ids) WHERE json_each.value = ?)",
      )
      .run(subjectId);
    const n = Number(res.changes);
    this.audit.append({ actor: { type: "human", id: requestedBy }, action: "memory.erase_subject", target: subjectId, outcome: "success", data: { deleted: n } });
    return n;
  }
}

export class AgentMemory {
  constructor(
    private readonly store: MemoryStore,
    readonly agentId: string,
    readonly taskId: string,
    private readonly policy: MemoryPolicy,
  ) {}

  remember(namespace: string, key: string, value: JsonValue, opts: { ttlDays?: number; subjectIds?: string[] } = {}): MemoryRecord {
    const rule = this.policy.remember.find((r) => r.namespace === namespace);
    if (!rule) throw new PlatformError("MEMORY_POLICY_VIOLATION", `Agent ${this.agentId} may not write memory namespace "${namespace}"`);
    const ttl = rule.scope === "task" ? 0 : Math.min(opts.ttlDays ?? rule.maxTtlDays, rule.maxTtlDays);
    const owner = rule.scope === "task" ? this.taskId : rule.scope === "agent" ? this.agentId : "shared";
    const expiresAt = ttl > 0 ? new Date(this.store.now().getTime() + ttl * 86_400_000).toISOString() : null;
    return this.store.write(
      { scope: rule.scope, owner, namespace, key, value, subjectIds: opts.subjectIds ?? [], expiresAt },
      rule.allowPii,
      this.agentId,
    );
  }

  recall(namespace: string, key?: string): MemoryRecord[] {
    const rule = this.policy.remember.find((r) => r.namespace === namespace);
    if (!rule) throw new PlatformError("MEMORY_POLICY_VIOLATION", `Agent ${this.agentId} may not read memory namespace "${namespace}"`);
    const owner = rule.scope === "task" ? this.taskId : rule.scope === "agent" ? this.agentId : "shared";
    return this.store.read(rule.scope, owner, namespace, key);
  }
}

function rowToRecord(r: Record<string, unknown>): MemoryRecord {
  return {
    scope: r.scope as MemoryScope,
    owner: String(r.owner),
    namespace: String(r.namespace),
    key: String(r.key),
    value: parseJson<JsonValue>(r.value),
    subjectIds: parseJson<string[]>(r.subject_ids),
    createdAt: String(r.created_at),
    expiresAt: (r.expires_at as string | null) ?? null,
    redactions: Number(r.redactions),
  };
}
