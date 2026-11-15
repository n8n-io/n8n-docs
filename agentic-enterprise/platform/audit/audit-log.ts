import type { Database } from "../core/db.ts";
import { dialectOf, afterCommit, parseJson, transaction } from "../core/db.ts";
import { NoAnchor, type AuditAnchor } from "./anchor.ts";
import { PlatformError } from "../core/errors.ts";
import type { Actor, JsonObject } from "../core/types.ts";
import { canonicalJson, sha256, type Clock } from "../core/util.ts";

/**
 * سجل تدقيق غير قابل للتعديل (append-only):
 * 1. كل سجل يحمل hash السجل السابق، فتشكّل السجلات سلسلة: تعديل أي سجل يكسر كل ما بعده.
 * 2. قاعدة البيانات نفسها ترفض UPDATE وDELETE عبر triggers، فالمنع لا يعتمد على الكود فقط.
 * 3. verify() تعيد حساب السلسلة كاملة وتحدد أول سجل تالف.
 *
 * حدود معروفة: من يملك صلاحية الكتابة على ملف قاعدة البيانات يستطيع حذف triggers.
 * المعالجة في الإنتاج ("مستقبلي"): نسخ رأس السلسلة دوريًا إلى تخزين WORM خارجي.
 */

export const GENESIS_HASH = "0".repeat(64);

export interface AuditEntryInput {
  actor: Actor;
  action: string;
  target?: string;
  taskId?: string;
  outcome: "success" | "denied" | "pending" | "failure" | "info";
  data?: JsonObject;
}

export interface AuditEntry extends Required<Omit<AuditEntryInput, "target" | "taskId">> {
  seq: number;
  ts: string;
  target: string | null;
  taskId: string | null;
  prevHash: string;
  hash: string;
}

export interface VerifyResult {
  valid: boolean;
  entries: number;
  firstBrokenSeq?: number;
  reason?: string;
  /** نوع التثبيت الخارجي. none يعني أن الحذف من الذيل وإعادة الكتابة الكاملة غير قابلين للكشف. */
  anchoring?: AuditAnchor["kind"];
  /** أحداث حديثة لم يصل تثبيتها بعد (كاتب متزامن بين الالتزام وكتابة التثبيت). */
  pendingAnchors?: number;
}

/**
 * عدد الأحداث الأخيرة المسموح أن تكون بلا تثبيت بعد. يغطي نافذة السباق بين التزام عملية وكتابة تثبيتها،
 * ونافذة انهيار بينهما. أي حدث أقدم من هذه النافذة بلا تثبيت يُعد تلاعبًا.
 */
export const ANCHOR_PENDING_WINDOW = 8;

/** الفاصل الافتراضي بين تحققين كاملين عندما يُستخدم التحقق التزايدي. */
export const DEFAULT_FULL_VERIFY_INTERVAL_MS = 10 * 60_000;

export class AuditLog {
  /**
   * نقطة الثقة: آخر seq تحقق منه تحقق كامل ناجح (مع تثبيته)، وhash الصف عنده، ووقت ذلك التحقق.
   * تُوضع خلف الذيل بنافذة التثبيت المعلّق، فيُعاد فحص الأحداث الحديثة غير المثبتة بعد في كل مرة.
   */
  private trusted: { seq: number; hash: string; at: number } | null = null;

  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
    private readonly anchor: AuditAnchor = new NoAnchor(),
    private readonly fullVerifyIntervalMs = DEFAULT_FULL_VERIFY_INTERVAL_MS,
  ) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS audit_log (
        seq        INTEGER PRIMARY KEY,
        ts         TEXT NOT NULL,
        actor_type TEXT NOT NULL,
        actor_id   TEXT NOT NULL,
        action     TEXT NOT NULL,
        target     TEXT,
        task_id    TEXT,
        outcome    TEXT NOT NULL,
        data       TEXT NOT NULL,
        prev_hash  TEXT NOT NULL,
        hash       TEXT NOT NULL UNIQUE
      );
      CREATE INDEX IF NOT EXISTS idx_audit_task ON audit_log(task_id);
      CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
    `);
    if (dialectOf(db) === "postgres")
      // في PostgreSQL يشمل المنع TRUNCATE أيضًا، وهو مسار حذف لا تمر به محفزات DELETE.
      db.exec(`
        CREATE OR REPLACE FUNCTION audit_append_only() RETURNS trigger LANGUAGE plpgsql AS $fn$
          BEGIN RAISE EXCEPTION 'audit_log is append-only'; END $fn$;
        DROP TRIGGER IF EXISTS audit_no_update_delete ON audit_log;
        CREATE TRIGGER audit_no_update_delete BEFORE UPDATE OR DELETE ON audit_log FOR EACH ROW EXECUTE FUNCTION audit_append_only();
        DROP TRIGGER IF EXISTS audit_no_truncate ON audit_log;
        CREATE TRIGGER audit_no_truncate BEFORE TRUNCATE ON audit_log FOR EACH STATEMENT EXECUTE FUNCTION audit_append_only();
      `);
    else
      db.exec(`
        CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit_log
          BEGIN SELECT RAISE(ABORT, 'audit_log is append-only'); END;
        CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit_log
          BEGIN SELECT RAISE(ABORT, 'audit_log is append-only'); END;
      `);
  }

  append(input: AuditEntryInput): AuditEntry {
    // قراءة آخر سجل ثم الإدراج داخل معاملة واحدة: بدونها يحصل كاتبان متزامنان على seq نفسه ويُفقد أحدهما (R1).
    return transaction(this.db, () => {
      const entry = this.appendUnsafe(input);
      // التثبيت بعد التزام المعاملة الخارجية فقط: حدث تراجعت معاملته لا يُثبَّت، فلا إنذار كاذب.
      afterCommit(this.db, () => this.anchor.record(entry.seq, entry.hash, entry.ts));
      return entry;
    });
  }

  private appendUnsafe(input: AuditEntryInput): AuditEntry {
    const last = this.db.prepare("SELECT seq, hash FROM audit_log ORDER BY seq DESC LIMIT 1").get() as
      | { seq: number; hash: string }
      | undefined;
    const seq = (last?.seq ?? 0) + 1;
    const prevHash = last?.hash ?? GENESIS_HASH;
    const body = {
      seq,
      ts: this.clock.now().toISOString(),
      actor: input.actor,
      action: input.action,
      target: input.target ?? null,
      taskId: input.taskId ?? null,
      outcome: input.outcome,
      data: input.data ?? {},
      prevHash,
    };
    const hash = sha256(canonicalJson(body));
    this.db
      .prepare(
        `INSERT INTO audit_log (seq, ts, actor_type, actor_id, action, target, task_id, outcome, data, prev_hash, hash)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        seq,
        body.ts,
        body.actor.type,
        body.actor.id,
        body.action,
        body.target,
        body.taskId,
        body.outcome,
        canonicalJson(body.data),
        prevHash,
        hash,
      );
    return { ...body, hash };
  }

  query(filter: { taskId?: string; action?: string; actorId?: string } = {}): AuditEntry[] {
    const clauses: string[] = [];
    const params: string[] = [];
    if (filter.taskId) (clauses.push("task_id = ?"), params.push(filter.taskId));
    if (filter.action) (clauses.push("action = ?"), params.push(filter.action));
    if (filter.actorId) (clauses.push("actor_id = ?"), params.push(filter.actorId));
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const rows = this.db.prepare(`SELECT * FROM audit_log ${where} ORDER BY seq`).all(...params);
    return rows.map((r) => rowToEntry(r as Record<string, unknown>));
  }

  verify(): VerifyResult {
    const rows = this.db.prepare("SELECT * FROM audit_log ORDER BY seq").all();
    const anchoring = this.anchor.kind;
    let prevHash = GENESIS_HASH;
    let expectedSeq = 1;
    const hashes = new Map<number, string>();
    for (const raw of rows) {
      const e = rowToEntry(raw as Record<string, unknown>);
      if (e.seq !== expectedSeq) return { ...broken(rows.length, e.seq, "sequence gap"), anchoring };
      if (e.prevHash !== prevHash) return { ...broken(rows.length, e.seq, "prev_hash mismatch"), anchoring };
      const { hash, ...body } = e;
      if (sha256(canonicalJson(body)) !== hash) return { ...broken(rows.length, e.seq, "content hash mismatch"), anchoring };
      hashes.set(e.seq, hash);
      prevHash = hash;
      expectedSeq++;
    }
    if (anchoring === "none") return { valid: true, entries: rows.length, anchoring };

    // مطابقة القاعدة مع التثبيت الخارجي: يكشف الحذف من الذيل (R5) وإعادة الكتابة الكاملة (R6).
    const a = this.anchor.read();
    const lastSeq = rows.length;
    if (a.invalidSignatures > 0) return { ...broken(lastSeq, 0, `${a.invalidSignatures} anchor entr(y/ies) with invalid signature`), anchoring };
    if (!a.present && lastSeq > 0) return { ...broken(lastSeq, 1, "anchor store missing while audit log has events"), anchoring };
    // النظام السليم لا يثبّت الرقم نفسه مرتين (التثبيت بعد الالتزام فقط). تثبيتان متعارضان لرقم واحد يعنيان
    // تثبيتًا لحدث تراجعت معاملته (عيب) أو محاولة إقحام تثبيت بديل (تلاعب). كلاهما فشل.
    const anchored = new Map<number, string>();
    for (const e of a.entries) {
      const prior = anchored.get(e.seq);
      if (prior !== undefined && prior !== e.hash) return { ...broken(lastSeq, e.seq, "conflicting anchors for the same event"), anchoring };
      anchored.set(e.seq, e.hash);
    }
    for (const [seq, hash] of [...anchored].sort((x, y) => x[0] - y[0])) {
      const dbHash = hashes.get(seq);
      if (dbHash === undefined) return { ...broken(lastSeq, seq, "anchored event missing from audit log (deletion or truncation)"), anchoring };
      if (dbHash !== hash) return { ...broken(lastSeq, seq, "anchored hash differs from audit log (rewritten history)"), anchoring };
    }
    let pending = 0;
    for (let seq = 1; seq <= lastSeq; seq++) {
      if (anchored.has(seq)) continue;
      if (seq <= lastSeq - ANCHOR_PENDING_WINDOW) return { ...broken(lastSeq, seq, "event has no anchor (inserted outside the audit API)"), anchoring };
      pending++;
    }
    return { valid: true, entries: lastSeq, anchoring, pendingAnchors: pending };
  }

  /**
   * تحقق تزايدي للاستخدام قبل كل عملية مميزة. التكلفة تتناسب مع الأحداث الجديدة منذ نقطة الثقة، لا مع حجم السجل.
   *
   * يكشف فورًا: إعادة كتابة السلسلة أو حذف الذيل (hash الصف عند نقطة الثقة أو عدد الصفوف حتى عندها يتغير)،
   * وأي خلل في الأحداث الجديدة (تسلسل، أو prev_hash، أو محتوى، أو تثبيت ناقص أو متعارض، أو حذف بعد نقطة الثقة،
   * أو تقصير ملف التثبيت). لا يكشف فورًا: تعديل محتوى صف قديم مع ترك عمود hash كما هو؛ يكشفه التحقق الكامل
   * التالي، الذي يُفرض تلقائيًا كل fullVerifyIntervalMs (افتراضيًا 10 دقائق)، وعند الإقلاع، وفي `ops audit verify`.
   */
  verifyFast(): VerifyResult {
    const now = this.clock.now().getTime();
    if (!this.trusted || now - this.trusted.at >= this.fullVerifyIntervalMs) return this.verifyFullAndTrust();
    const anchoring = this.anchor.kind;
    const t = this.trusted;
    const lastSeq = Number((this.db.prepare("SELECT COALESCE(MAX(seq), 0) AS m FROM audit_log").get() as { m: number }).m);
    if (t.seq > 0) {
      const row = this.db.prepare("SELECT hash FROM audit_log WHERE seq = ?").get(t.seq) as { hash: string } | undefined;
      if (!row) return { ...broken(lastSeq, t.seq, "trusted checkpoint event missing (deletion or truncation)"), anchoring };
      if (row.hash !== t.hash) return { ...broken(lastSeq, t.seq, "trusted checkpoint hash changed (rewritten history)"), anchoring };
      const n = Number((this.db.prepare("SELECT COUNT(*) AS n FROM audit_log WHERE seq <= ?").get(t.seq) as { n: number }).n);
      if (n !== t.seq) return { ...broken(lastSeq, t.seq, "events before the trusted checkpoint were deleted or inserted"), anchoring };
    }
    const rows = this.db.prepare("SELECT * FROM audit_log WHERE seq > ? ORDER BY seq").all(t.seq);
    let prevHash = t.seq > 0 ? t.hash : GENESIS_HASH;
    let expectedSeq = t.seq + 1;
    const hashes = new Map<number, string>();
    for (const raw of rows) {
      const e = rowToEntry(raw as Record<string, unknown>);
      if (e.seq !== expectedSeq) return { ...broken(lastSeq, e.seq, "sequence gap"), anchoring };
      if (e.prevHash !== prevHash) return { ...broken(lastSeq, e.seq, "prev_hash mismatch"), anchoring };
      const { hash, ...body } = e;
      if (sha256(canonicalJson(body)) !== hash) return { ...broken(lastSeq, e.seq, "content hash mismatch"), anchoring };
      hashes.set(e.seq, hash);
      prevHash = hash;
      expectedSeq++;
    }
    if (anchoring === "none") return { valid: true, entries: lastSeq, anchoring };
    const a = this.anchor.readAfter(t.seq);
    if (a.truncated) return { ...broken(lastSeq, t.seq, "anchor store was truncated or replaced"), anchoring };
    if (!a.present && lastSeq > 0) return { ...broken(lastSeq, 1, "anchor store missing while audit log has events"), anchoring };
    if (a.invalidSignatures > 0) return { ...broken(lastSeq, 0, `${a.invalidSignatures} anchor entr(y/ies) with invalid signature`), anchoring };
    const anchored = new Map<number, string>();
    for (const e of a.entries) {
      const prior = anchored.get(e.seq);
      if (prior !== undefined && prior !== e.hash) return { ...broken(lastSeq, e.seq, "conflicting anchors for the same event"), anchoring };
      anchored.set(e.seq, e.hash);
    }
    for (const [seq, hash] of anchored) {
      const dbHash = hashes.get(seq);
      if (dbHash === undefined) return { ...broken(lastSeq, seq, "anchored event missing from audit log (deletion or truncation)"), anchoring };
      if (dbHash !== hash) return { ...broken(lastSeq, seq, "anchored hash differs from audit log (rewritten history)"), anchoring };
    }
    let pending = 0;
    for (let seq = t.seq + 1; seq <= lastSeq; seq++) {
      if (anchored.has(seq)) continue;
      if (seq <= lastSeq - ANCHOR_PENDING_WINDOW) return { ...broken(lastSeq, seq, "event has no anchor (inserted outside the audit API)"), anchoring };
      pending++;
    }
    return { valid: true, entries: lastSeq, anchoring, pendingAnchors: pending };
  }

  private verifyFullAndTrust(): VerifyResult {
    const r = this.verify();
    if (!r.valid) {
      this.trusted = null;
      return r;
    }
    // نقطة الثقة خلف الذيل بنافذة التثبيت المعلّق، فالأحداث غير المثبتة بعد تُفحص مجددًا في كل تحقق سريع.
    const seq = Math.max(0, r.entries - ANCHOR_PENDING_WINDOW);
    const row = seq > 0 ? (this.db.prepare("SELECT hash FROM audit_log WHERE seq = ?").get(seq) as { hash: string }) : null;
    this.trusted = { seq, hash: row?.hash ?? GENESIS_HASH, at: this.clock.now().getTime() };
    if (this.anchor.kind !== "none") this.anchor.readAfter(seq); // تهيئة موضع القراءة التزايدية بعد القراءة الكاملة
    return r;
  }

  /** يرمي خطأ إن كانت السلسلة تالفة. يُستدعى عند الإقلاع وفي evals. */
  assertIntact(): void {
    const r = this.verify();
    if (!r.valid) throw new PlatformError("AUDIT_TAMPERED", `Audit chain broken at seq ${r.firstBrokenSeq}: ${r.reason}`);
  }
}

function broken(entries: number, seq: number, reason: string): VerifyResult {
  return { valid: false, entries, firstBrokenSeq: seq, reason };
}

function rowToEntry(r: Record<string, unknown>): AuditEntry {
  return {
    seq: Number(r.seq),
    ts: String(r.ts),
    actor: { type: r.actor_type as Actor["type"], id: String(r.actor_id) },
    action: String(r.action),
    target: (r.target as string | null) ?? null,
    taskId: (r.task_id as string | null) ?? null,
    outcome: r.outcome as AuditEntry["outcome"],
    data: parseJson<JsonObject>(r.data),
    prevHash: String(r.prev_hash),
    hash: String(r.hash),
  };
}
