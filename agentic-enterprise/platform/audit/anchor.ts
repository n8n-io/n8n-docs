import { createHmac, timingSafeEqual } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
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
}

/** بلا تثبيت (تطوير محلي فقط). التحقق يعلن ذلك صراحة، والمراقبة تطلق تنبيهًا. */
export class NoAnchor implements AuditAnchor {
  readonly kind = "none" as const;
  record(): void {}
  read(): AnchorRead {
    return { present: false, entries: [], invalidSignatures: 0 };
  }
}

export function parseAnchorKey(raw: string): Buffer {
  const key = /^[0-9a-f]+$/i.test(raw) && raw.length % 2 === 0 ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64");
  if (key.length < 32) throw new Error("AUDIT_ANCHOR_KEY must decode to at least 32 bytes (hex or base64)");
  return key;
}
