import type { JsonObject } from "../core/types.ts";

/**
 * دورة حياة المهمة (state machine). كل انتقال غير مدرج هنا يُرفض في الكود.
 *
 *   queued ──► running ──► completed
 *                 │  ├──► awaiting_approval ──► completed | escalated
 *                 │  ├──► escalated ──► queued (استئناف بشري) | completed | cancelled
 *                 │  └──► rejected
 *                 └──► failed ──► queued (إعادة محاولة)
 */
export type TaskStatus =
  | "queued"
  | "running"
  | "awaiting_approval"
  | "escalated"
  | "completed"
  | "rejected"
  | "failed"
  | "cancelled";

export const TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  queued: ["running", "cancelled"],
  running: ["completed", "awaiting_approval", "escalated", "rejected", "failed", "queued"],
  awaiting_approval: ["completed", "escalated", "cancelled"],
  escalated: ["queued", "completed", "cancelled", "rejected"],
  failed: ["queued", "cancelled"],
  completed: [],
  rejected: [],
  cancelled: [],
};

export const TERMINAL: TaskStatus[] = ["completed", "rejected", "cancelled"];

export interface Handoff {
  taskType: string;
  input: JsonObject;
  /** now: فور انتهاء التشغيل. after_approval: بعد تنفيذ كل الإجراءات الموافق عليها. */
  when: "now" | "after_approval";
}

export interface Task {
  id: string;
  type: string;
  status: TaskStatus;
  assignee: string;
  input: JsonObject;
  output: JsonObject | null;
  parentId: string | null;
  /** الإنسان الذي أنشأ السلسلة. يُورَّث للمهام الفرعية، ويُمنع من الموافقة عليها (SoD). */
  originator: string;
  attempts: number;
  idempotencyKey: string | null;
  pendingHandoffs: Handoff[];
  lastError: string | null;
  /** رمز الإيجار للتشغيل الحالي. استدعاءات الأدوات تحمله، فتُرفض استدعاءات أي تشغيل متروك ("زومبي"). */
  leaseId: string | null;
  /** بعد هذا الوقت يُعد العامل ميتًا، وتُعاد المهمة للطابور (recoverExpiredLeases). */
  leaseExpiresAt: string | null;
  /** لا تُشغَّل المهمة قبل هذا الوقت (تأخير متصاعد بعد الفشل). */
  notBefore: string | null;
  createdAt: string;
  updatedAt: string;
}
