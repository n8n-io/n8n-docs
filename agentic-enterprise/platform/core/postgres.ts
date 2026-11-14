import { MessageChannel, receiveMessageOnPort, Worker, type MessagePort } from "node:worker_threads";

/**
 * محوّل PostgreSQL بواجهة متزامنة مطابقة لما تستخدمه المنصة من node:sqlite (prepare/get/all/run/exec).
 *
 * لماذا متزامن؟ كل منطق المنصة (المعاملات المتداخلة، وسلسلة audit، وCAS على الإيجارات) مبني على واجهة متزامنة
 * ومختبر بها. نقل المنطق إلى async دفعة واحدة يغيّر كل مسار أمان. هذا المحوّل يشغّل الاتصال في worker thread،
 * والخيط الرئيسي ينتظر بـ Atomics.wait. الثمن: الخيط الرئيسي محجوز أثناء كل استعلام (مثل SQLite تمامًا).
 * التحويل إلى واجهة async مخطط كخطوة لاحقة (ADR-013).
 *
 * الدلالات:
 * - `BEGIN IMMEDIATE` يصبح `BEGIN` + قفل استشاري على مستوى الـ schema (pg_advisory_xact_lock)،
 *   فيبقى كاتب واحد لكل مستأجر في كل لحظة، كما في SQLite. هذا يحفظ صحة سلسلة audit وتسلسل seq.
 * - `?` تتحول إلى `$n` خارج النصوص المقتبسة.
 * - `x IS ?` (مقارنة تقبل NULL في SQLite) تصبح `x IS NOT DISTINCT FROM $n`.
 * - DDL: INTEGER→BIGINT، وREAL→DOUBLE PRECISION، ويُضاف عمود rowid تسلسلي آخر كل جدول (محاكاة rowid في SQLite).
 */
export interface PgStatement {
  run(...params: unknown[]): { changes: number };
  get(...params: unknown[]): Record<string, unknown> | undefined;
  all(...params: unknown[]): Array<Record<string, unknown>>;
}

const QUERY_TIMEOUT_MS = 30_000;
/** مفتاح القفل الاستشاري لتسلسل DDL بين العمليات (ثابت عشوائي خاص بهذا النظام). */
export const DDL_LOCK_KEY = 727_410_031;

export class PostgresDatabase {
  readonly dialect = "postgres" as const;
  private readonly worker: Worker;
  private readonly port: MessagePort;
  private readonly flag = new Int32Array(new SharedArrayBuffer(4));
  private readonly cache = new Map<string, string>();
  private closed = false;

  constructor(
    url: string,
    readonly schema: string,
  ) {
    if (!/^[a-z_][a-z0-9_]{0,62}$/.test(schema)) throw new Error(`Invalid schema name ${schema}`);
    const { port1, port2 } = new MessageChannel();
    this.port = port1;
    this.worker = new Worker(new URL("./pg-worker.mjs", import.meta.url), {
      workerData: { url, schema, shared: this.flag.buffer, port: port2 },
      transferList: [port2],
    });
    this.worker.unref();
    this.call({ op: "connect" });
  }

  private call(msg: Record<string, unknown>): { rows: Array<Record<string, unknown>>; rowCount: number } {
    if (this.closed) throw new Error("Database is closed");
    Atomics.store(this.flag, 0, 0);
    this.port.postMessage(msg);
    const r = Atomics.wait(this.flag, 0, 0, QUERY_TIMEOUT_MS);
    if (r === "timed-out") throw new Error(`PostgreSQL call timed out after ${QUERY_TIMEOUT_MS}ms`);
    const m = receiveMessageOnPort(this.port) as { message: { result?: { rows: Array<Record<string, unknown>>; rowCount: number }; error?: { message: string; code: string | null } } } | undefined;
    if (!m) throw new Error("PostgreSQL worker returned no message");
    if (m.message.error) {
      const e = new Error(m.message.error.message) as Error & { code?: string | null };
      e.code = m.message.error.code;
      throw e;
    }
    return m.message.result!;
  }

  private inTx = false;

  exec(sql: string): void {
    const text = this.translate(sql, true);
    const t = sql.trim().toUpperCase();
    if (t.startsWith("BEGIN")) this.inTx = true;
    if (t === "COMMIT" || t === "ROLLBACK") this.inTx = false;
    // DDL خارج معاملة يُسلسل بقفل استشاري عام: إقلاع عدة عمليات معًا ينفذ CREATE … IF NOT EXISTS والمحفزات
    // بالتزامن، وPostgreSQL يرفض ذلك أحيانًا ("tuple concurrently updated"). ثبت ذلك باختبار متعدد العمليات.
    if (!this.inTx && /^\s*(CREATE|DROP|ALTER)\b/i.test(sql)) {
      try {
        this.call({ op: "query", text: `BEGIN; SELECT pg_advisory_xact_lock(${DDL_LOCK_KEY}); ${text}; COMMIT;` });
      } catch (err) {
        try {
          this.call({ op: "query", text: "ROLLBACK" });
        } catch {
          /* لا معاملة مفتوحة */
        }
        throw err;
      }
      return;
    }
    this.call({ op: "query", text });
  }

  prepare(sql: string): PgStatement {
    const text = this.translate(sql, false);
    const q = (params: unknown[]) => this.call({ op: "query", text, values: params.map(normalizeParam) });
    return {
      run: (...p) => ({ changes: q(p).rowCount }),
      get: (...p) => q(p).rows[0],
      all: (...p) => q(p).rows,
    };
  }

  close(): void {
    if (this.closed) return;
    try {
      this.call({ op: "close" });
    } finally {
      this.closed = true;
      void this.worker.terminate();
    }
  }

  /** تحويل نص SQL من لهجة SQLite المستخدمة في المنصة إلى PostgreSQL. */
  translate(sql: string, isExec: boolean): string {
    const key = `${isExec ? "x" : "p"}:${sql}`;
    const hit = this.cache.get(key);
    if (hit) return hit;
    let s = sql;
    if (/^\s*BEGIN IMMEDIATE\s*;?\s*$/i.test(s)) s = `BEGIN; SELECT pg_advisory_xact_lock(hashtext(current_schema()))`;
    s = s.replace(/CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\);/g, (_m, name: string, body: string) => {
      const cols = body
        .replace(/\bINTEGER PRIMARY KEY AUTOINCREMENT\b/g, "BIGSERIAL PRIMARY KEY")
        .replace(/\bINTEGER\b/g, "BIGINT")
        .replace(/\bREAL\b/g, "DOUBLE PRECISION")
        .replace(/\s+$/, "");
      return `CREATE TABLE IF NOT EXISTS ${name} (${cols},\n rowid BIGSERIAL);`;
    });
    if (/ALTER TABLE \w+ ADD COLUMN /i.test(s)) s = s.replace(/ADD COLUMN /i, "ADD COLUMN IF NOT EXISTS ").replace(/\bINTEGER\b/g, "BIGINT").replace(/\bREAL\b/g, "DOUBLE PRECISION");
    s = s.replace(/\bIS \?/g, "IS NOT DISTINCT FROM ?"); // مقارنة آمنة مع NULL، كما في SQLite
    s = placeholders(s);
    this.cache.set(key, s);
    return s;
  }
}

/** يحوّل ? إلى $1..$n، متجاهلًا ما داخل '…' و"…". */
function placeholders(sql: string): string {
  let out = "";
  let n = 0;
  let quote: string | null = null;
  for (const ch of sql) {
    if (quote) {
      if (ch === quote) quote = null;
      out += ch;
    } else if (ch === "'" || ch === '"') {
      quote = ch;
      out += ch;
    } else if (ch === "?") out += `$${++n}`;
    else out += ch;
  }
  return out;
}

function normalizeParam(v: unknown): unknown {
  if (typeof v === "bigint") return v.toString();
  if (v === undefined) return null;
  return v;
}
