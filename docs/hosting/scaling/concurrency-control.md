---
contentType: explanation
---

# Concurrency control

n8n in main mode does not restrict how many executions may run at the same time. This can lead to a scenario where too many concurrent executions thrash the event loop, causing performance degradation and unresponsiveness. To protect against this, n8n supports **concurrency control** to limit the number of concurrent executions in main mode.

## How it works

With concurrency control enabled, any executions over the limit will be throttled, i.e. queued for later processing. As active executions complete and concurrency capacity becomes available, throttled executions are picked up in FIFO order.

Keep in mind:

- Concurrency control applies **to main mode only**. Scaling mode has [its own concurrency mechanism](/hosting/scaling/queue-mode/#configure-worker-concurrency).
- Concurrency control may throttle only production executions (i.e. in `webhook` and `trigger` modes), not executions in `manual`, `retry`, `error`, `integrated`, `cli` or `internal` modes.
- On instance startup, any previous queued executions are cancelled - this may change in future. 
- Since they have not yet started, queued executions may not be retried and are also excluded from crash recovery.

## Usage

/// note | Cloud plan limits
Concurrency limits on n8n cloud are enabled and set according to cloud plan.
///

Concurrency control is disabled by default for self-hosted users. To enable it, set this environment variable to a positive value:

```sh
export N8N_CONCURRENCY_PRODUCTION_CAP=20
```

When enabled, the local and global executions views will show a header with the number of active executions and the current concurrency cap. Any executions throttled by concurrency control will be displayed as `Queued`.

To disable concurrency control, unset the environment variable.
