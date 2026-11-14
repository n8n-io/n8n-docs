import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { PostgresDatabase } from "./postgres.ts";

/**
 * واجهة قاعدة البيانات التي تستخدمها المنصة: مجموعة جزئية متزامنة من node:sqlite.
 * تنفيذان:
 * - SQLite (node:sqlite المدمج، بلا اعتماديات أصلية): ملف واحد بنمط WAL. الافتراضي.
 * - PostgreSQL (DATABASE_URL): schema لكل مستأجر، عبر محوّل متزامن (postgres.ts، ADR-013).
 * كل كتابة تقرأ ثم تعدّل تتم في transaction()، وتعطي الدلالات نفسها في الاثنين: كاتب واحد لكل قاعدة/schema.
 */
export interface Statement {
  run(...params: any[]): { changes: number | bigint }; // eslint-disable-line @typescript-eslint/no-explicit-any
  get(...params: any[]): Record<string, unknown> | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  all(...params: any[]): Array<Record<string, unknown>>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface Database {
  prepare(sql: string): Statement;
  exec(sql: string): void;
  close(): void;
  readonly dialect?: "postgres";
}

export type Dialect = "sqlite" | "postgres";
export const dialectOf = (db: Database): Dialect => (db.dialect === "postgres" ? "postgres" : "sqlite");

/** يفتح SQLite لمسار ملف أو :memory:، أو PostgreSQL لعنوان postgres:// مع schema. */
export function openDatabase(path: string, opts: { url?: string; schema?: string } = {}): Database {
  if (opts.url) return new PostgresDatabase(opts.url, opts.schema ?? "public");
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  // busy_timeout أولًا: تحويل الوضع إلى WAL يحتاج قفلًا، وبدون مهلة انتظار تفشل العملية الثانية فورًا (R2).
  db.exec("PRAGMA busy_timeout = 10000;");
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA synchronous = NORMAL;");
  return db;
}

const depth = new WeakMap<Database, number>();
/** خطافات ما بعد الالتزام لكل مستوى معاملة. تُنفَّذ بعد COMMIT الخارجي فقط، وتُسقط عند أي تراجع. */
const hooks = new WeakMap<Database, Array<Array<() => void>>>();

/**
 * تنفيذ مجموعة عمليات في معاملة واحدة: إما تنجح كلها أو لا يُحفظ شيء.
 * - المستوى الخارجي يستخدم BEGIN IMMEDIATE، فيأخذ قفل الكتابة فورًا ويُسلسل الكتّاب بين العمليات.
 * - المستويات الداخلية تستخدم SAVEPOINT، فيمكن استدعاء دالة تفتح معاملة من داخل معاملة أخرى.
 */
export function transaction<T>(db: Database, fn: () => T): T {
  const level = depth.get(db) ?? 0;
  const sp = `sp_${level}`;
  const stack = hooks.get(db) ?? [];
  hooks.set(db, stack);
  db.exec(level === 0 ? "BEGIN IMMEDIATE" : `SAVEPOINT ${sp}`);
  depth.set(db, level + 1);
  stack.push([]);
  let pending: Array<() => void> = [];
  try {
    const result = fn();
    db.exec(level === 0 ? "COMMIT" : `RELEASE ${sp}`);
    pending = stack.pop()!;
    if (level === 0) for (const h of pending) h();
    else stack[stack.length - 1]!.push(...pending); // تُرحَّل للمستوى الأب، ولا تُنفَّذ قبل الالتزام الخارجي
    return result;
  } catch (err) {
    if (stack.length > level) stack.splice(level); // التراجع يُسقط خطافات هذا المستوى وما تحته
    db.exec(level === 0 ? "ROLLBACK" : `ROLLBACK TO ${sp}; RELEASE ${sp}`);
    throw err;
  } finally {
    depth.set(db, level);
  }
}

/**
 * يسجّل دالة تُنفَّذ بعد التزام المعاملة الخارجية، ولا تُنفَّذ إن تراجعت.
 * خارج أي معاملة تُنفَّذ فورًا. تُستخدم لكل أثر خارج قاعدة البيانات يجب أن يطابق ما التُزم فعلًا.
 */
export function afterCommit(db: Database, fn: () => void): void {
  const stack = hooks.get(db);
  if (!stack || stack.length === 0 || (depth.get(db) ?? 0) === 0) return fn();
  stack[stack.length - 1]!.push(fn);
}

/**
 * ترحيل إضافي آمن (additive): يضيف الأعمدة الناقصة فقط، ولا يحذف ولا يعدّل بيانات قائمة.
 * يتيح فتح قواعد أُنشئت بإصدار أقدم دون فقدان أي شيء.
 */
export function ensureColumns(db: Database, table: string, columns: Record<string, string>): string[] {
  const existing = new Set(
    (dialectOf(db) === "postgres"
      ? db.prepare("SELECT column_name AS name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ?").all(table)
      : db.prepare(`PRAGMA table_info(${table})`).all()
    ).map((c) => String(c.name)),
  );
  const added: string[] = [];
  for (const [name, type] of Object.entries(columns)) {
    if (existing.has(name)) continue;
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${type}`);
    added.push(name);
  }
  return added;
}

export function parseJson<T>(text: unknown): T {
  return JSON.parse(String(text)) as T;
}

/**
 * إعداد قاعدة مؤقتة معزولة للاختبارات وevals: SQLite في الذاكرة، أو schema جديد في PostgreSQL
 * إذا ضُبط TEST_POSTGRES_URL (فتعمل الاختبارات نفسها على المحركين).
 */
export function ephemeralDbConfig(): { DATABASE_PATH: string; DATABASE_URL?: string; DATABASE_SCHEMA?: string } {
  const url = process.env.TEST_POSTGRES_URL;
  if (!url) return { DATABASE_PATH: ":memory:" };
  return { DATABASE_PATH: ":memory:", DATABASE_URL: url, DATABASE_SCHEMA: `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}` };
}
