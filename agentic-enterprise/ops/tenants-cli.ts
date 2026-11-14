import { join } from "node:path";
import { HmacFileAnchor, parseAnchorKey } from "../platform/audit/anchor.ts";
import { systemClock } from "../platform/core/util.ts";
import { API_SCOPES, ControlPlane, deriveTenantKey, type ApiScope } from "../platform/tenancy/control-plane.ts";

/**
 * أوامر مستوى التحكم (تُشغَّل على الخادم بصلاحية الوصول إلى DATA_ROOT):
 *   npm run ops -- tenants create <id> --name "…" --as <operator> [--n8n-secret-env ACME_N8N_INBOUND_SECRET]
 *   npm run ops -- tenants list
 *   npm run ops -- tenants suspend|activate <id> --as <operator> --note "…"
 *   npm run ops -- tokens issue <tenantId> --scopes tasks:write,tasks:read --originator u-requester --label "…" --as <operator> [--ttl-days 90]
 *   npm run ops -- tokens list [tenantId]
 *   npm run ops -- tokens revoke <tokenId> --as <operator> --note "…"
 */
export function runControlCommand(cmd: string, args: string[], v: Record<string, string | boolean | undefined>): void {
  const root = process.env.DATA_ROOT ?? "./data";
  const master = process.env.AUDIT_ANCHOR_KEY ? parseAnchorKey(process.env.AUDIT_ANCHOR_KEY) : undefined;
  const url = process.env.DATABASE_URL;
  const cp = new ControlPlane(root, systemClock, master ? new HmacFileAnchor(join(root, "control-anchor.jsonl"), deriveTenantKey(master, "_control")) : undefined, url ? { url } : {});
  const as = () => {
    if (typeof v.as !== "string" || !v.as) throw new Error("--as <operatorId> is required");
    return v.as;
  };
  const [sub, id] = args;
  try {
    if (cmd === "tenants") {
      if (sub === "create") {
        const t = cp.createTenant(String(id), String(v.name ?? id), as(), typeof v["n8n-secret-env"] === "string" ? { n8nInboundSecretEnv: v["n8n-secret-env"] } : {});
        console.log(`Tenant created: ${t.id} (${t.name}). Data directory: ${cp.tenantDir(t.id)}`);
      } else if (sub === "list") console.table(cp.listTenants().map((t) => ({ id: t.id, name: t.name, status: t.status, createdAt: t.createdAt, n8n: t.settings.n8nInboundSecretEnv ?? "-" })));
      else if (sub === "suspend" || sub === "activate") {
        cp.setTenantStatus(String(id), sub === "suspend" ? "suspended" : "active", as(), String(v.note ?? ""));
        console.log(`Tenant ${id}: ${sub === "suspend" ? "suspended" : "active"}`);
      } else throw new Error("tenants create|list|suspend|activate");
    } else if (cmd === "tokens") {
      if (sub === "issue") {
        const scopes = String(v.scopes ?? "").split(",").filter(Boolean) as ApiScope[];
        for (const s of scopes) if (!(API_SCOPES as readonly string[]).includes(s)) throw new Error(`Unknown scope ${s}. Valid: ${API_SCOPES.join(", ")}`);
        const ttlDays = typeof v["ttl-days"] === "string" ? Number(v["ttl-days"]) : undefined;
        const { token, tokenId, expiresAt } = cp.issueToken(String(id), { scopes, originator: String(v.originator ?? ""), label: String(v.label ?? ""), ...(ttlDays ? { ttlDays } : {}) }, as());
        console.log(`Token ${tokenId} issued, expires ${expiresAt}. Store it in your secret manager now; it is not shown again:\n${token}`);
      } else if (sub === "list") console.table(cp.listTokens(id));
      else if (sub === "revoke") {
        cp.revokeToken(String(id), as(), String(v.note ?? ""));
        console.log(`Token ${id} revoked.`);
      } else throw new Error("tokens issue|list|revoke");
    }
  } finally {
    cp.close();
  }
}
