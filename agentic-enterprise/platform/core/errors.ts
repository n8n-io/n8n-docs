/** أخطاء المنصة. لكل خطأ رمز ثابت (code) يُسجَّل في audit log ويُختبر في evals. */

export type PlatformErrorCode =
  | "KILL_SWITCH_ACTIVE"
  | "TOOL_NOT_ALLOWED"
  | "TOOL_NOT_FOUND"
  | "INVALID_INPUT"
  | "AUTHENTICATION_FAILED"
  | "GUARDRAIL_BLOCKED"
  | "APPROVAL_REQUIRED"
  | "APPROVAL_INVALID"
  | "SOD_VIOLATION"
  | "UNAUTHORIZED_APPROVER"
  | "INVALID_TRANSITION"
  | "NOT_FOUND"
  | "AUDIT_TAMPERED"
  | "MEMORY_POLICY_VIOLATION"
  | "CONNECTOR_ERROR";

export class PlatformError extends Error {
  constructor(
    public readonly code: PlatformErrorCode,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "PlatformError";
  }
}

export function isPlatformError(err: unknown, code?: PlatformErrorCode): err is PlatformError {
  return err instanceof PlatformError && (code === undefined || err.code === code);
}
