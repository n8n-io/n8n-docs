import { createHash, randomUUID } from "node:crypto";

/** معرّف فريد ببادئة تدل على نوع الكيان، مثل task_… أو apr_… */
export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 20)}`;
}

/**
 * تسلسل JSON قانوني (canonical): المفاتيح مرتبة، فيعطي النص نفسه دائمًا لنفس البيانات.
 * ضروري لأن hash الموافقة يجب ألا يتغير بتغير ترتيب المفاتيح.
 */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
}

export function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export function hashObject(value: unknown): string {
  return sha256(canonicalJson(value));
}

/** ساعة قابلة للحقن، كي تختبر evals انتهاء الصلاحيات دون انتظار فعلي. */
export interface Clock {
  now(): Date;
}

export const systemClock: Clock = { now: () => new Date() };

export class ManualClock implements Clock {
  private current: Date;
  constructor(start = "2029-03-01T08:00:00.000Z") {
    this.current = new Date(start);
  }
  now(): Date {
    return new Date(this.current);
  }
  advanceHours(hours: number): void {
    this.current = new Date(this.current.getTime() + hours * 3_600_000);
  }
}
