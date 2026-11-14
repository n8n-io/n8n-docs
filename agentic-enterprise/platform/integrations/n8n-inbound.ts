import type { Database } from "../core/db.ts";
import { z } from "zod";
import type { AuditLog } from "../audit/audit-log.ts";
import { MAX_SKEW_SECONDS, NONCE_HEADER, SIGNATURE_HEADER, TIMESTAMP_HEADER, verifySignature } from "../connectors/n8n/signing.ts";
import { transaction } from "../core/db.ts";
import { PlatformError } from "../core/errors.ts";
import type { Clock } from "../core/util.ts";
import type { Orchestrator } from "../orchestrator/orchestrator.ts";
import type { Task } from "../orchestrator/task.ts";

/**
 * استقبال أحداث من n8n وتحويلها إلى مهام. المبدأ: n8n مصدر خارجي، فرسالته بيانات لا تعليمات.
 * - التحقق من HMAC على `${timestamp}.${rawBody}` بمقارنة ثابتة الزمن، مع نافذة ±5 دقائق.
 * - nonce لكل رسالة يُخزَّن، فإعادة الإرسال داخل النافذة تُرفض (replay).
 * - كل مسار في قائمة سماح يحدد نوع المهمة، والمنشئ (originator)، ومخطط البيانات: معرّفات فقط.
 *   النص الحر (مثل نص بريد) لا يُمرر؛ الوكيل يقرأ السجل المرجعي بنفسه.
 * - eventId يصبح مفتاح idempotency، فتكرار الحدث نفسه من n8n (retry) لا ينشئ مهمة ثانية.
 */
export interface InboundRoute {
  route: string;
  taskType: string;
  /** المعرّف البشري المسؤول عن المهام الناتجة (يجب أن يكون في الدليل). */
  originator: string;
  data: z.ZodObject;
}

export const DEFAULT_INBOUND_ROUTES: InboundRoute[] = [
  { route: "invoice-received", taskType: "finance.invoice", originator: "u-ap-sup", data: z.strictObject({ invoiceId: z.string().regex(/^INV-\d+$/) }) },
  {
    route: "requisition-submitted", taskType: "procurement.requisition", originator: "u-proc-lead",
    data: z.strictObject({ requisitionId: z.string().regex(/^REQ-\d+$/), language: z.enum(["ar", "en"]).optional() }),
  },
  { route: "supplier-onboarded", taskType: "compliance.screen", originator: "u-compliance", data: z.strictObject({ partyType: z.literal("supplier"), partyId: z.string().regex(/^sup-\d+$/) }) },
];

const Envelope = z.strictObject({
  eventId: z.string().regex(/^[A-Za-z0-9._:-]{1,128}$/),
  data: z.record(z.string(), z.unknown()),
});

export const MAX_INBOUND_BYTES = 16 * 1024;

export class N8nInbound {
  constructor(
    private readonly db: Database,
    private readonly audit: AuditLog,
    private readonly clock: Clock,
    private readonly orchestrator: Pick<Orchestrator, "submit">,
    private readonly secret: Buffer,
    private readonly routes: InboundRoute[] = DEFAULT_INBOUND_ROUTES,
  ) {
    db.exec(`CREATE TABLE IF NOT EXISTS inbound_nonces (nonce TEXT PRIMARY KEY, source TEXT NOT NULL, received_at TEXT NOT NULL);`);
  }

  /** يعيد المهمة المنشأة (أو الموجودة لنفس eventId). يرمي AUTHENTICATION_FAILED أو INVALID_INPUT أو NOT_FOUND. */
  receive(route: string, headers: Record<string, string | string[] | undefined>, rawBody: string): Task {
    const h = (n: string) => {
      const v = headers[n];
      return Array.isArray(v) ? v[0] : v;
    };
    const deny = (code: "AUTHENTICATION_FAILED" | "INVALID_INPUT" | "NOT_FOUND", reason: string): never => {
      this.audit.append({ actor: { type: "system", id: "n8n-inbound" }, action: "inbound.n8n", target: route.slice(0, 64), outcome: "denied", data: { code, reason } });
      throw new PlatformError(code, reason);
    };

    if (Buffer.byteLength(rawBody) > MAX_INBOUND_BYTES) deny("INVALID_INPUT", "Body too large");
    const ts = Number(h(TIMESTAMP_HEADER));
    const sig = h(SIGNATURE_HEADER);
    const nonce = h(NONCE_HEADER);
    if (!Number.isInteger(ts) || !sig || !nonce || !/^[A-Za-z0-9_-]{8,128}$/.test(nonce)) deny("AUTHENTICATION_FAILED", "Missing or malformed signature headers");
    if (Math.abs(this.clock.now().getTime() / 1000 - ts) > MAX_SKEW_SECONDS) deny("AUTHENTICATION_FAILED", "Timestamp outside allowed window");
    if (!verifySignature(this.secret, ts, rawBody, sig!)) deny("AUTHENTICATION_FAILED", "Invalid signature");

    const spec = this.routes.find((r) => r.route === route);
    if (!spec) deny("NOT_FOUND", `Unknown inbound route`);

    let body: z.infer<typeof Envelope>;
    try {
      body = Envelope.parse(JSON.parse(rawBody));
    } catch {
      return deny("INVALID_INPUT", "Body is not a valid event envelope");
    }
    const parsed = spec!.data.safeParse(body.data);
    if (!parsed.success) deny("INVALID_INPUT", `Event data rejected: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);

    // الـ nonce يُسجَّل داخل معاملة إنشاء المهمة نفسها: إما الاثنان أو لا شيء.
    // رفض التكرار يُدقَّق بعد التراجع، وإلا ضاع سجل الرفض مع المعاملة.
    const task = transaction(this.db, () => {
      if (this.db.prepare("SELECT 1 FROM inbound_nonces WHERE nonce = ?").get(nonce!)) return null;
      this.db.prepare("INSERT INTO inbound_nonces (nonce, source, received_at) VALUES (?, ?, ?)").run(nonce!, `n8n:${route}`, this.clock.now().toISOString());
      const t = this.orchestrator.submit({
        type: spec!.taskType,
        input: { ...(parsed.data as Record<string, unknown>), source: { system: "n8n", route, eventId: body.eventId } },
        originator: spec!.originator,
        idempotencyKey: `n8n:${route}:${body.eventId}`,
      });
      this.audit.append({ actor: { type: "system", id: "n8n-inbound" }, action: "inbound.n8n", target: t.id, taskId: t.id, outcome: "success", data: { route, eventId: body.eventId } });
      return t;
    });
    return task ?? deny("AUTHENTICATION_FAILED", "Replayed message (nonce already used)");
  }

  /** تنظيف دوري لـ nonces أقدم من ضعف النافذة (لا يمكن إعادة استخدامها أصلًا بسبب الطابع الزمني). */
  pruneNonces(): number {
    const cutoff = new Date(this.clock.now().getTime() - 2 * MAX_SKEW_SECONDS * 1000).toISOString();
    return Number(this.db.prepare("DELETE FROM inbound_nonces WHERE received_at < ?").run(cutoff).changes);
  }
}
