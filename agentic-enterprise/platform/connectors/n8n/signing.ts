import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * توقيع HMAC-SHA256 للرسائل بين المنصة وn8n، في الاتجاهين.
 * الصيغة: X-AE-Timestamp: <unix seconds>، وX-AE-Signature: v1=<hex(HMAC(secret, `${ts}.${body}`))>.
 * الطابع الزمني داخل التوقيع يمنع إعادة استخدام رسالة قديمة خارج نافذة 5 دقائق، والـ nonce يمنع التكرار داخلها.
 */
export const SIGNATURE_HEADER = "x-ae-signature";
export const TIMESTAMP_HEADER = "x-ae-timestamp";
export const NONCE_HEADER = "x-ae-nonce";
export const MAX_SKEW_SECONDS = 300;

export function parseSecret(raw: string, name: string): Buffer {
  const buf = /^[0-9a-f]+$/i.test(raw) && raw.length % 2 === 0 ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64");
  if (buf.length < 32) throw new Error(`${name} must be at least 32 bytes (hex or base64)`);
  return buf;
}

export function sign(secret: Buffer, timestamp: number, body: string): string {
  return "v1=" + createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

export function verifySignature(secret: Buffer, timestamp: number, body: string, signature: string): boolean {
  const expected = Buffer.from(sign(secret, timestamp, body));
  const got = Buffer.from(signature);
  return expected.length === got.length && timingSafeEqual(expected, got);
}
