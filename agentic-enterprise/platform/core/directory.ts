import { PlatformError } from "./errors.ts";
import type { Human, HumanRole } from "./types.ts";

/**
 * دليل البشر وأدوارهم. البيانات الآن ثابتة للتطوير والاختبار.
 * في الإنتاج يُقرأ من Okta (connector "مستقبلي")، ويُتحقق من هوية الموافق عبر SSO وMFA.
 */
export class HumanDirectory {
  private readonly byId = new Map<string, Human>();

  constructor(humans: Human[]) {
    for (const h of humans) this.byId.set(h.id, h);
  }

  get(id: string): Human {
    const h = this.byId.get(id);
    if (!h) throw new PlatformError("NOT_FOUND", `Unknown human: ${id}`);
    return h;
  }

  has(id: string): boolean {
    return this.byId.has(id);
  }

  withRole(role: HumanRole): Human[] {
    return [...this.byId.values()].filter((h) => h.roles.includes(role));
  }
}

/** أشخاص افتراضيون بأسماء وظيفية فقط، بلا أسماء حقيقية. */
export const DEFAULT_HUMANS: Human[] = [
  { id: "u-cfo", name: "Chief Financial Officer", roles: ["cfo"] },
  { id: "u-fin-ctrl", name: "Finance Controller", roles: ["finance_controller"] },
  { id: "u-ap-sup", name: "AP Supervisor", roles: ["ap_supervisor"] },
  { id: "u-proc-lead", name: "Procurement Lead", roles: ["procurement_lead"] },
  { id: "u-proc-mgr", name: "Procurement Manager", roles: ["procurement_manager"] },
  { id: "u-compliance", name: "Compliance Officer", roles: ["compliance_officer"] },
  { id: "u-legal", name: "Legal Counsel", roles: ["legal_counsel"] },
  { id: "u-cs-sup", name: "Customer Service Supervisor", roles: ["cs_supervisor"] },
  { id: "u-ciso", name: "CISO", roles: ["ciso"] },
  { id: "u-ops", name: "Platform Operator", roles: ["platform_operator"] },
  { id: "u-requester", name: "Warehouse Manager (requester)", roles: [] },
];
