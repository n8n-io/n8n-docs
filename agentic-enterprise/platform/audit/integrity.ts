import { PlatformError } from "../core/errors.ts";
import type { KillSwitch } from "../core/kill-switch.ts";
import type { AuditLog } from "./audit-log.ts";

/**
 * حارس السلامة قبل أي عملية مميزة (قرار موافقة، أو تنفيذ إجراء لا رجعة فيه، أو تشغيل الطابور).
 * عند أي تلف: يُفعَّل الإيقاف الطارئ تلقائيًا، وتُرفض العملية. لا يُكتب حدث جديد في سجل تالف.
 *
 * التكلفة: تحقق كامل O(n). مقبول بحجم البيانات الحالي (≈ 10 آلاف حدث في أقل من ثانية).
 * التحقق التزايدي مخطط في docs/roadmap/IMPLEMENTATION_ROADMAP.md.
 */
export function assertAuditIntegrity(audit: AuditLog, killSwitch: KillSwitch, operation: string): void {
  const v = audit.verify();
  if (v.valid) return;
  killSwitch.engage(`audit integrity failure before ${operation}: seq ${v.firstBrokenSeq} ${v.reason}`);
  throw new PlatformError("AUDIT_TAMPERED", `Refusing ${operation}: audit chain broken at seq ${v.firstBrokenSeq} (${v.reason}). Emergency stop engaged.`);
}
