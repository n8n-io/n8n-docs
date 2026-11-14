import { createHash, hkdfSync, randomBytes, timingSafeEqual } from "node:crypto";
import { join } from "node:path";
import { z } from "zod";
import type { AuditAnchor } from "../audit/anchor.ts";
import { AuditLog } from "../audit/audit-log.ts";
import { ensureColumns, openDatabase, parseJson, transaction, type Database } from "../core/db.ts";
import { PlatformError } from "../core/errors.ts";
import { newId, type Clock } from "../core/util.ts";

/**
 * مستوى التحكم (control plane) لتعدد المستأجرين.
 *
 * نموذج العزل: قاعدة بيانات مستقلة لكل مستأجر (database-per-tenant)، مع ملف تثبيت audit وملف إيقاف خاصين به.
 * لا يوجد استعلام واحد يستطيع أن يقرأ بيانات مستأجرين اثنين، فخطأ في شرط WHERE لا يسرّب بيانات.
 *
 * رموز API:
 * - تُعرض مرة واحدة عند الإصدار، وتُخزَّن كـ SHA-256 فقط.
 * - كل رمز مربوط بمستأجر واحد، ونطاقات (scopes) محددة، ومعرّف بشري مسؤول (originator) للمهام التي يُنشئها.
 * - الرمز يحدد العميل، لا الموافق: قرار الموافقة عبر API يتطلب توقيع Ed25519 من الإنسان نفسه.
 *
 * جذر الثقة لعمليات التحكم (إنشاء مستأجر وإصدار رمز) هو الوصول إلى ملفات الخادم، مثل الوصول إلى القاعدة نفسها.
 * كل عملية مُدقَّقة في audit log خاص بمستوى التحكم، ومثبّت خارجيًا عند توفر المفتاح.
 */
export const API_SCOPES = ["tasks:write", "tasks:read", "approvals:read", "approvals:decide", "ops:read", "inbound:n8n"] as const;
export type ApiScope = (typeof API_SCOPES)[number];

export const TenantIdSchema = z.string().regex(/^[a-z][a-z0-9-]{2,31}$/, "tenant id: 3-32 chars, lowercase letters, digits, dashes");

export const TenantSettingsSchema = z.strictObject({
  /** اسم متغير البيئة الذي يحمل سر n8n الوارد لهذا المستأجر. السر نفسه لا يُخزَّن هنا. */
  n8nInboundSecretEnv: z.string().regex(/^[A-Z][A-Z0-9_]{2,63}$/).optional(),
});
export type TenantSettings = z.infer<typeof TenantSettingsSchema>;

export interface Tenant {
  id: string;
  name: string;
  status: "active" | "suspended";
  settings: TenantSettings;
  createdAt: string;
}

export interface ApiPrincipal {
  tokenId: string;
  tenantId: string;
  scopes: ApiScope[];
  originator: string;
  label: string;
}

const TOKEN_RE = /^aet_([a-z0-9]{8,40})_([A-Za-z0-9_-]{43})$/;

export class ControlPlane {
  readonly db: Database;
  readonly audit: AuditLog;

  constructor(
    readonly dataRoot: string,
    private readonly clock: Clock,
    anchor?: AuditAnchor,
    db: { path?: string; url?: string; schema?: string } = {},
  ) {
    this.db = openDatabase(db.path ?? join(dataRoot, "control.db"), db.url ? { url: db.url, schema: db.schema ?? "ae_control" } : {});
    this.audit = new AuditLog(this.db, clock, anchor);
    this.audit.assertIntact();
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tenants (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, status TEXT NOT NULL, settings TEXT NOT NULL, created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS api_tokens (
        id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), token_hash TEXT NOT NULL UNIQUE,
        scopes TEXT NOT NULL, originator TEXT NOT NULL, label TEXT NOT NULL,
        created_by TEXT NOT NULL, created_at TEXT NOT NULL, revoked_at TEXT, last_used_at TEXT
      );
    `);
    ensureColumns(this.db, "api_tokens", { expires_at: "TEXT" });
  }

  /** اسم الـ schema للمستأجر في PostgreSQL. */
  static tenantSchema(tenantId: string, prefix = "ae_t_"): string {
    return `${prefix}${TenantIdSchema.parse(tenantId).replace(/-/g, "_")}`;
  }

  tenantDir(tenantId: string): string {
    return join(this.dataRoot, "tenants", TenantIdSchema.parse(tenantId));
  }

  createTenant(id: string, name: string, actor: string, settings: TenantSettings = {}): Tenant {
    TenantIdSchema.parse(id);
    const s = TenantSettingsSchema.parse(settings);
    return transaction(this.db, () => {
      if (this.db.prepare("SELECT 1 FROM tenants WHERE id = ?").get(id)) throw new PlatformError("INVALID_TRANSITION", `Tenant ${id} already exists`);
      const t: Tenant = { id, name: name.slice(0, 200), status: "active", settings: s, createdAt: this.clock.now().toISOString() };
      this.db.prepare("INSERT INTO tenants (id, name, status, settings, created_at) VALUES (?, ?, ?, ?, ?)").run(t.id, t.name, t.status, JSON.stringify(t.settings), t.createdAt);
      this.audit.append({ actor: { type: "human", id: actor }, action: "tenant.create", target: id, outcome: "success", data: { name: t.name, settings: s } });
      return t;
    });
  }

  getTenant(id: string): Tenant | null {
    const r = this.db.prepare("SELECT * FROM tenants WHERE id = ?").get(id) as Record<string, unknown> | undefined;
    return r ? { id: String(r.id), name: String(r.name), status: r.status as Tenant["status"], settings: parseJson(r.settings) as TenantSettings, createdAt: String(r.created_at) } : null;
  }

  listTenants(): Tenant[] {
    return (this.db.prepare("SELECT id FROM tenants ORDER BY id").all() as Array<{ id: string }>).map((r) => this.getTenant(r.id)!);
  }

  setTenantStatus(id: string, status: Tenant["status"], actor: string, note: string): Tenant {
    if (!note.trim()) throw new PlatformError("INVALID_INPUT", "A note is required");
    return transaction(this.db, () => {
      const t = this.getTenant(id);
      if (!t) throw new PlatformError("NOT_FOUND", `Unknown tenant ${id}`);
      this.db.prepare("UPDATE tenants SET status = ? WHERE id = ?").run(status, id);
      this.audit.append({ actor: { type: "human", id: actor }, action: "tenant.status", target: id, outcome: "success", data: { from: t.status, to: status, note } });
      return { ...t, status };
    });
  }

  /** يعيد الرمز الخام مرة واحدة فقط. */
  /** صلاحية الرمز الافتراضية بالأيام. الرمز بلا انتهاء غير مسموح؛ التدوير الدوري إلزامي. */
  static readonly DEFAULT_TOKEN_TTL_DAYS = 90;
  static readonly MAX_TOKEN_TTL_DAYS = 365;

  issueToken(tenantId: string, opts: { scopes: ApiScope[]; originator: string; label: string; ttlDays?: number }, actor: string): { token: string; tokenId: string; expiresAt: string } {
    const ttlDays = z.number().positive().max(ControlPlane.MAX_TOKEN_TTL_DAYS).parse(opts.ttlDays ?? ControlPlane.DEFAULT_TOKEN_TTL_DAYS);
    const expiresAt = new Date(this.clock.now().getTime() + ttlDays * 86_400_000).toISOString();
    const scopes = z.array(z.enum(API_SCOPES)).min(1).parse(opts.scopes);
    return transaction(this.db, () => {
      const t = this.getTenant(tenantId);
      if (!t) throw new PlatformError("NOT_FOUND", `Unknown tenant ${tenantId}`);
      const tokenId = newId("tok").replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 32);
      const token = `aet_${tokenId}_${randomBytes(32).toString("base64url")}`;
      this.db
        .prepare("INSERT INTO api_tokens (id, tenant_id, token_hash, scopes, originator, label, created_by, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(tokenId, tenantId, hashToken(token), JSON.stringify(scopes), opts.originator, opts.label.slice(0, 100), actor, this.clock.now().toISOString(), expiresAt);
      this.audit.append({ actor: { type: "human", id: actor }, action: "token.issue", target: tokenId, outcome: "success", data: { tenantId, scopes, originator: opts.originator, label: opts.label, expiresAt } });
      return { token, tokenId, expiresAt };
    });
  }

  revokeToken(tokenId: string, actor: string, note: string): void {
    transaction(this.db, () => {
      const r = this.db.prepare("UPDATE api_tokens SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL").run(this.clock.now().toISOString(), tokenId);
      if (Number(r.changes) !== 1) throw new PlatformError("NOT_FOUND", `No active token ${tokenId}`);
      this.audit.append({ actor: { type: "human", id: actor }, action: "token.revoke", target: tokenId, outcome: "success", data: { note } });
    });
  }

  listTokens(tenantId?: string): Array<Omit<ApiPrincipal, "scopes"> & { scopes: string[]; revokedAt: string | null; lastUsedAt: string | null; expiresAt: string | null }> {
    const rows = this.db.prepare(`SELECT * FROM api_tokens ${tenantId ? "WHERE tenant_id = ?" : ""} ORDER BY created_at`).all(...(tenantId ? [tenantId] : [])) as Array<Record<string, unknown>>;
    return rows.map((r) => ({
      tokenId: String(r.id), tenantId: String(r.tenant_id), scopes: parseJson(r.scopes) as string[], originator: String(r.originator), label: String(r.label),
      revokedAt: (r.revoked_at as string | null) ?? null, lastUsedAt: (r.last_used_at as string | null) ?? null, expiresAt: (r.expires_at as string | null) ?? null,
    }));
  }

  /** يعيد null لأي رمز غير صالح أو ملغى أو لمستأجر موقوف. لا يكشف السبب للمتصل. */
  authenticate(token: string | undefined): ApiPrincipal | null {
    if (!token) return null;
    const m = TOKEN_RE.exec(token);
    if (!m) return null;
    const r = this.db.prepare("SELECT * FROM api_tokens WHERE id = ?").get(m[1]!) as Record<string, unknown> | undefined;
    if (!r || r.revoked_at) return null;
    // الرموز القديمة (قبل إضافة الانتهاء) بلا expires_at تُرفض: لا رمز أبدي.
    if (!r.expires_at || String(r.expires_at) <= this.clock.now().toISOString()) return null;
    const a = Buffer.from(String(r.token_hash), "hex");
    const b = Buffer.from(hashToken(token), "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const t = this.getTenant(String(r.tenant_id));
    if (!t || t.status !== "active") return null;
    this.db.prepare("UPDATE api_tokens SET last_used_at = ? WHERE id = ?").run(this.clock.now().toISOString(), m[1]!);
    return { tokenId: String(r.id), tenantId: t.id, scopes: parseJson(r.scopes) as ApiScope[], originator: String(r.originator), label: String(r.label) };
  }

  close(): void {
    this.db.close();
  }
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** مفتاح تثبيت مشتق لكل مستأجر (HKDF)، فلا يمكن نقل سطر تثبيت من مستأجر إلى آخر. */
export function deriveTenantKey(master: Buffer, tenantId: string, purpose = "audit-anchor"): Buffer {
  return Buffer.from(hkdfSync("sha256", master, Buffer.from("agentic-enterprise"), Buffer.from(`${purpose}:${tenantId}`), 32));
}
