import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import type { Database } from "../core/db.ts";
import { canonicalJson, type Clock } from "../core/util.ts";
import type { JsonObject, JsonValue } from "../core/types.ts";

/**
 * خزنة أصحاب البيانات: محو قابل للتنفيذ داخل سجل لا يُعدَّل (crypto-shredding).
 *
 * التعارض الذي تحله: سجل audit غير قابل للتعديل (ADR-008)، وPDPL وGDPR يمنحان حق المحو.
 * الحل: أي بيانات شخصية تُكتب في audit تُشفَّر أولًا (AES-256-GCM) بمفتاح خاص بصاحب البيانات. السلسلة تُحسب
 * على النص المشفَّر. المحو = حذف المفتاح: يبقى السجل كما هو وتبقى السلسلة سليمة، لكن المحتوى لم يعد قابلًا للاسترجاع.
 *
 * حدود معلنة:
 * - **النسخ الاحتياطية** التي تحتوي جدول المفاتيح قبل المحو تُبقي المحتوى قابلًا للاسترجاع حتى تنتهي مدة الاحتفاظ بها.
 *   المحو مكتمل فعليًا بانتهاء أقدم نسخة. تُوثق هذه المدة في سجل أنشطة المعالجة (RoPA).
 * - **المعرّف المرجعي** (مثل sup-001) يبقى ظاهرًا. هو معرّف مستعار لا اسم، وبدونه لا يمكن تنفيذ المحو أصلًا.
 * - ما تُشفّره الخزنة هو ما يمر بها فقط: مخرجات أدوات الوكلاء ذوي البيانات الشخصية، وملخصات تصعيداتهم.
 */
export interface Sealed {
  $sealed: 1;
  subject: string;
  iv: string;
  ct: string;
  tag: string;
}

export const isSealed = (v: unknown): v is Sealed => typeof v === "object" && v !== null && (v as { $sealed?: unknown }).$sealed === 1;

export class SubjectVault {
  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
  ) {
    db.exec(`CREATE TABLE IF NOT EXISTS pd_subject_keys (subject TEXT PRIMARY KEY, key_b64 TEXT, created_at TEXT NOT NULL, erased_at TEXT);`);
  }

  private keyFor(subject: string, create: boolean): Buffer | null {
    const row = this.db.prepare("SELECT key_b64, erased_at FROM pd_subject_keys WHERE subject = ?").get(subject) as { key_b64: string | null; erased_at: string | null } | undefined;
    if (row) return row.key_b64 && !row.erased_at ? Buffer.from(row.key_b64, "base64") : null;
    if (!create) return null;
    const key = randomBytes(32);
    this.db.prepare("INSERT INTO pd_subject_keys (subject, key_b64, created_at, erased_at) VALUES (?, ?, ?, NULL)").run(subject, key.toString("base64"), this.clock.now().toISOString());
    return key;
  }

  /**
   * يشفّر قيمة لصاحب بيانات. إن كان صاحبها قد مُحي سابقًا، لا يُنشأ مفتاح جديد له:
   * تُستبدل القيمة بعلامة المحو، فلا يعود المحتوى عبر نشاط لاحق دون قرار بشري جديد.
   */
  seal(subject: string, value: JsonValue): Sealed | { $erased: true; subject: string } {
    const key = this.keyFor(subject, true);
    if (!key) return { $erased: true, subject };
    const iv = randomBytes(12);
    const c = createCipheriv("aes-256-gcm", key, iv);
    c.setAAD(Buffer.from(subject));
    const ct = Buffer.concat([c.update(canonicalJson(value), "utf8"), c.final()]);
    return { $sealed: 1, subject, iv: iv.toString("base64"), ct: ct.toString("base64"), tag: c.getAuthTag().toString("base64") };
  }

  open(v: unknown): JsonValue {
    if (!isSealed(v)) return v as JsonValue;
    const key = this.keyFor(v.subject, false);
    if (!key) return { $erased: true, subject: v.subject };
    try {
      const d = createDecipheriv("aes-256-gcm", key, Buffer.from(v.iv, "base64"));
      d.setAAD(Buffer.from(v.subject));
      d.setAuthTag(Buffer.from(v.tag, "base64"));
      return JSON.parse(Buffer.concat([d.update(Buffer.from(v.ct, "base64")), d.final()]).toString("utf8")) as JsonValue;
    } catch {
      return { $unreadable: true, subject: v.subject };
    }
  }

  /** يفك كل القيم المختومة في كائن (للعرض فقط؛ لا يغيّر السجل). */
  openAll(data: JsonObject): JsonObject {
    const out: JsonObject = {};
    for (const [k, v] of Object.entries(data)) out[k] = isSealed(v) ? this.open(v) : v;
    return out;
  }

  /** حذف المفتاح نهائيًا. يعيد false إن لم يكن هناك مفتاح أو كان محوًّا من قبل. */
  shred(subject: string): boolean {
    const r = this.db.prepare("UPDATE pd_subject_keys SET key_b64 = NULL, erased_at = ? WHERE subject = ? AND erased_at IS NULL").run(this.clock.now().toISOString(), subject);
    if (Number(r.changes) === 1) return true;
    // صاحب بيانات لم يُنشأ له مفتاح بعد: يُسجل محوه مسبقًا، فلا يُنشأ له مفتاح لاحقًا.
    const exists = this.db.prepare("SELECT 1 FROM pd_subject_keys WHERE subject = ?").get(subject);
    if (exists) return false;
    this.db.prepare("INSERT INTO pd_subject_keys (subject, key_b64, created_at, erased_at) VALUES (?, NULL, ?, ?)").run(subject, this.clock.now().toISOString(), this.clock.now().toISOString());
    return true;
  }

  isErased(subject: string): boolean {
    const row = this.db.prepare("SELECT erased_at FROM pd_subject_keys WHERE subject = ?").get(subject) as { erased_at: string | null } | undefined;
    return Boolean(row?.erased_at);
  }
}
