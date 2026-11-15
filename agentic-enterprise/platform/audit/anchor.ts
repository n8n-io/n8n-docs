import { createHmac, timingSafeEqual } from "node:crypto";
import { appendFileSync, closeSync, existsSync, fstatSync, mkdirSync, openSync, readFileSync, readSync } from "node:fs";
import { dirname } from "node:path";

/**
 * تثبيت سلامة audit خارج قاعدة البيانات (external anchoring).
 *
 * سلسلة hash وحدها لا تحمي من مهاجم يملك صلاحية الكتابة على القاعدة: يستطيع حذف الذيل (R5)
 * أو إعادة حساب السلسلة كاملة (R6). الحل: لكل حدث مُلتزَم يُكتب سطر موقّع بـ HMAC في ملف منفصل،
 * بمفتاح لا يُخزَّن في القاعدة أبدًا. للتزوير يحتاج المهاجم الآن ثلاثة أشياء معًا: القاعدة، وملف التثبيت، والمفتاح.
 *
 * في الإنتاج: الملف على وحدة تخزين منفصلة بنمط WORM أو append-only، والمفتاح في مدير أسرار أو HSM.
 * حدود معروفة: من يملك المفتاح والملف والقاعدة معًا يستطيع التزوير. هذا يُعالج بتصدير دوري لرأس السلسلة
 * إلى طرف ثالث، وهو مخطط في docs/roadmap/IMPLEMENTATION_ROADMAP.md.
 */

export interface AnchorEntry {
  seq: number;
  hash: string;
  ts: string;
  sig: string;
}

export interface AnchorRead {
  /** الملف أو المخزن موجود. غيابه مع وجود أحداث في القاعدة يعني حذفه. */
  present: boolean;
  entries: AnchorEntry[];
  invalidSignatures: number;
}

export interface AuditAnchor {
  readonly kind: "file" | "memory" | "none";
  record(seq: number, hash: string, ts: string): void;
  read(): AnchorRead;
  /**
   * قراءة تزايدية: التثبيتات ذات seq > afterSeq فقط، دون إعادة قراءة كل الملف.
   * `truncated` يعني أن المخزن صار أقصر مما قُرئ سابقًا: تلاعب (الملف append-only).
   */
  readAfter(afterSeq: number): AnchorRead & { truncated: boolean };
}

function sign(key: Buffer, seq: number, hash: string, ts: string): string {
  return createHmac("sha256", key).update(`${seq}|${hash}|${ts}`).digest("hex");
}

function validSig(key: Buffer, e: AnchorEntry): boolean {
  const expected = Buffer.from(sign(key, e.seq, e.hash, e.ts), "hex");
  const got = Buffer.from(String(e.sig), "hex");
  return got.length === expected.length && timingSafeEqual(got, expected);
}

/** ملف JSONL يُضاف إليه فقط. الكتابة بـ O_APPEND ذرية للأسطر القصيرة حتى مع عدة عمليات. */
export class HmacFileAnchor implements AuditAnchor {
  readonly kind = "file" as const;
  constructor(
    private readonly path: string,
    private readonly key: Buffer,
  ) {
    if (key.length < 32) throw new Error("Audit anchor key must be at least 32 bytes");
    mkdirSync(dirname(path), { recursive: true });
  }
  record(seq: number, hash: string, ts: string): void {
    appendFileSync(this.path, `${JSON.stringify({ seq, hash, ts, sig: sign(this.key, seq, hash, ts) })}\n`, { flag: "a", mode: 0o600 });
  }
  read(): AnchorRead {
    if (!existsSync(this.path)) return { present: false, entries: [], invalidSignatures: 0 };
    const entries: AnchorEntry[] = [];
    let invalid = 0;
    for (const line of readFileSync(this.path, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try {
        const e = JSON.parse(line) as AnchorEntry;
        if (validSig(this.key, e)) entries.push(e);
        else invalid++;
      } catch {
        invalid++;
      }
    }
    return { present: true, entries, invalidSignatures: invalid };
  }

  // حالة القراءة التزايدية: موضع آخر بايت قُرئ، والتثبيتات المقروءة بعد آخر نقطة ثقة.
  private offset = 0;
  private tail: AnchorEntry[] = [];
  private tailInvalid = 0;
  private partial = "";

  readAfter(afterSeq: number): AnchorRead & { truncated: boolean } {
    if (!existsSync(this.path)) return { present: false, entries: [], invalidSignatures: 0, truncated: this.offset > 0 };
    const fd = openSync(this.path, "r");
    try {
      const size = fstatSync(fd).size;
      if (size < this.offset) return { present: true, entries: [], invalidSignatures: 0, truncated: true };
      if (size > this.offset) {
        const buf = Buffer.alloc(size - this.offset);
        readSync(fd, buf, 0, buf.length, this.offset);
        this.offset = size;
        const text = this.partial + buf.toString("utf8");
        const lines = text.split("\n");
        this.partial = lines.pop() ?? ""; // سطر لم يكتمل بعد (كاتب متزامن): يُستكمل في القراءة التالية
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const e = JSON.parse(line) as AnchorEntry;
            if (validSig(this.key, e)) this.tail.push(e);
            else this.tailInvalid++;
          } catch {
            this.tailInvalid++;
          }
        }
      }
    } finally {
      closeSync(fd);
    }
    this.tail = this.tail.filter((e) => e.seq > afterSeq); // لا حاجة لما قبل نقطة الثقة
    return { present: true, entries: [...this.tail], invalidSignatures: this.tailInvalid, truncated: false };
  }
}

/** للاختبارات: نفس منطق التوقيع، في الذاكرة. */
export class MemoryAnchor implements AuditAnchor {
  readonly kind = "memory" as const;
  readonly lines: AnchorEntry[] = [];
  constructor(private readonly key: Buffer) {}
  record(seq: number, hash: string, ts: string): void {
    this.lines.push({ seq, hash, ts, sig: sign(this.key, seq, hash, ts) });
  }
  read(): AnchorRead {
    const entries = this.lines.filter((e) => validSig(this.key, e));
    return { present: true, entries, invalidSignatures: this.lines.length - entries.length };
  }
  private seen = 0;
  readAfter(afterSeq: number): AnchorRead & { truncated: boolean } {
    const truncated = this.lines.length < this.seen;
    this.seen = this.lines.length;
    const after = this.lines.filter((e) => e.seq > afterSeq);
    const entries = after.filter((e) => validSig(this.key, e));
    return { present: true, entries, invalidSignatures: after.length - entries.length, truncated };
  }
}

/** بلا تثبيت (تطوير محلي فقط). التحقق يعلن ذلك صراحة، والمراقبة تطلق تنبيهًا. */
export class NoAnchor implements AuditAnchor {
  readonly kind = "none" as const;
  record(): void {}
  read(): AnchorRead {
    return { present: false, entries: [], invalidSignatures: 0 };
  }
  readAfter(): AnchorRead & { truncated: boolean } {
    return { present: false, entries: [], invalidSignatures: 0, truncated: false };
  }
}

export function parseAnchorKey(raw: string): Buffer {
  const key = /^[0-9a-f]+$/i.test(raw) && raw.length % 2 === 0 ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64");
  if (key.length < 32) throw new Error("AUDIT_ANCHOR_KEY must decode to at least 32 bytes (hex or base64)");
  return key;
}
