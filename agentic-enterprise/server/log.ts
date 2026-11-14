/**
 * سجل تشغيلي منظم (JSON سطرًا بسطر) إلى stdout، مناسب لأي جامع سجلات (Loki أو CloudWatch أو ELK).
 * هذا سجل تشغيلي للتشخيص، لا بديل عن audit log: لا يُعتمد عليه للمساءلة، ولا تُكتب فيه أسرار أو محتوى المهام.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";
const ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export interface Logger {
  log(level: LogLevel, msg: string, fields?: Record<string, unknown>): void;
  child(fields: Record<string, unknown>): Logger;
}

const REDACT = /(token|secret|password|authorization|signature|key)$/i;

export function createLogger(opts: { level?: LogLevel; sink?: (line: string) => void; base?: Record<string, unknown> } = {}): Logger {
  const min = ORDER[opts.level ?? ((process.env.LOG_LEVEL as LogLevel | undefined) ?? "info")] ?? 20;
  const sink = opts.sink ?? ((l: string) => process.stdout.write(l + "\n"));
  const base = opts.base ?? {};
  return {
    log(level, msg, fields = {}) {
      if (ORDER[level] < min) return;
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries({ ...base, ...fields })) clean[k] = REDACT.test(k) ? "[redacted]" : v;
      sink(JSON.stringify({ ts: new Date().toISOString(), level, msg, ...clean }));
    },
    child(fields) {
      return createLogger({ ...opts, base: { ...base, ...fields } });
    },
  };
}
