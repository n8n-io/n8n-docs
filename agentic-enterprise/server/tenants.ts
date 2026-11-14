import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_AGENTS } from "../agents/index.ts";
import { HmacFileAnchor, type AuditAnchor } from "../platform/audit/anchor.ts";
import type { PlatformConfig } from "../platform/config.ts";
import { defaultFixtures, type Fixtures } from "../platform/connectors/mock/fixtures.ts";
import { PlatformError } from "../platform/core/errors.ts";
import type { Clock } from "../platform/core/util.ts";
import { createPlatform, type CreatePlatformOptions, type Platform } from "../platform/index.ts";
import { ControlPlane, deriveTenantKey } from "../platform/tenancy/control-plane.ts";

/**
 * يفتح منصة معزولة لكل مستأجر عند أول طلب ويحتفظ بها مفتوحة:
 * قاعدة، وملف إيقاف، وملف تثبيت audit بمفتاح مشتق، وحالة الأنظمة الوهمية؛ كلها داخل مجلد المستأجر.
 * الإيقاف الطارئ العام (KILL_SWITCH في البيئة) يسري على كل المستأجرين، وملف الإيقاف لكل مستأجر يسري عليه وحده.
 */
export class TenantPlatforms {
  private readonly open = new Map<string, Platform>();

  constructor(
    private readonly control: ControlPlane,
    private readonly base: { config?: Partial<PlatformConfig>; clock?: Clock; anchorMasterKey?: Buffer; extra?: Partial<CreatePlatformOptions>; schemaPrefix?: string } = {},
  ) {}

  get(tenantId: string): Platform {
    const existing = this.open.get(tenantId);
    if (existing) return existing;
    const tenant = this.control.getTenant(tenantId);
    if (!tenant) throw new PlatformError("NOT_FOUND", "Unknown tenant");
    if (tenant.status !== "active") throw new PlatformError("INVALID_TRANSITION", "Tenant is suspended");
    const dir = this.control.tenantDir(tenantId);
    mkdirSync(dir, { recursive: true });
    const inboundSecret = tenant.settings.n8nInboundSecretEnv ? process.env[tenant.settings.n8nInboundSecretEnv] : undefined;
    if (tenant.settings.n8nInboundSecretEnv && !inboundSecret) throw new Error(`Tenant ${tenantId}: ${tenant.settings.n8nInboundSecretEnv} is not set`);
    const anchor: AuditAnchor | undefined = this.base.anchorMasterKey
      ? new HmacFileAnchor(join(dir, "audit-anchor.jsonl"), deriveTenantKey(this.base.anchorMasterKey, tenantId))
      : undefined;
    const p = createPlatform({
      ...this.base.extra,
      config: {
        ...this.base.config,
        DATABASE_PATH: join(dir, "enterprise.db"),
        DATABASE_SCHEMA: ControlPlane.tenantSchema(tenantId, this.base.schemaPrefix),
        KILL_SWITCH_FILE: join(dir, "KILL_SWITCH"),
        AUDIT_ANCHOR_FILE: join(dir, "audit-anchor.jsonl"),
        ...(inboundSecret ? { N8N_INBOUND_SECRET: inboundSecret } : { N8N_INBOUND_SECRET: undefined }),
      },
      ...(this.base.clock ? { clock: this.base.clock } : {}),
      ...(anchor ? { anchor } : {}),
      fixtures: this.loadState(dir),
    }).register(...ALL_AGENTS);
    this.open.set(tenantId, p);
    return p;
  }

  loaded(): Array<[string, Platform]> {
    return [...this.open.entries()];
  }

  /** حفظ حالة الأنظمة الوهمية للمستأجر (كتابة ذرية). لا يلزم مع connectors حقيقية. */
  persist(tenantId: string): void {
    const p = this.open.get(tenantId);
    if (!p) return;
    const file = join(this.control.tenantDir(tenantId), "mock-state.json");
    writeFileSync(`${file}.tmp`, JSON.stringify(p.connectors.state));
    renameSync(`${file}.tmp`, file);
  }

  evict(tenantId: string): void {
    const p = this.open.get(tenantId);
    if (p) {
      this.persist(tenantId);
      p.close();
      this.open.delete(tenantId);
    }
  }

  closeAll(): void {
    for (const id of [...this.open.keys()]) this.evict(id);
  }

  private loadState(dir: string): Fixtures {
    const f = join(dir, "mock-state.json");
    return existsSync(f) ? (JSON.parse(readFileSync(f, "utf8")) as Fixtures) : defaultFixtures();
  }
}
