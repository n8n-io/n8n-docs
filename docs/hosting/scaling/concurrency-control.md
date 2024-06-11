---
contentType: explanation
---

# Concurrency control

In regular mode, n8n does not limit how many production executions may run at the same time. This can lead to a scenario where too many concurrent executions thrash the event loop, causing performance degradation and unresponsiveness. 

To prevent this, you can set a **concurrency limit** for production executions in regular mode. This allows for a number of production executions to run concurrently, and queues up any concurrent production executions over the limit. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order.

Concurrency control is disabled by default. To enable it:

```sh
export N8N_CONCURRENCY_PRODUCTION_LIMIT=20
```

Keep in mind:

- Concurrency control applies only to **production executions**, those started from a webhook or trigger node. It does not apply to any other kinds, such as manual executions, subworkflow executions, error executions, started from CLI, etc.

- Queued executions cannot retried. Cancelling or deleting a queued execution removes it also from the queue.

- On instance startup, queued executions are resumed up to the concurrency limit and the rest are re-enqueued.

- To monitor concurrency control, watch logs for executions being enqueued and released. In future, concurrency control will be reflected in the UI.

## Comparison to scaling mode

In scaling mode, you can control how many jobs a worker may run concurrently using the [`--concurrency` flag](/hosting/scaling/queue-mode/#configure-worker-concurrency). 

Concurrency control in scaling mode is a separate mechanism from concurrency control in regular mode, but both are controlled by the environment variable `N8N_CONCURRENCY_PRODUCTION_LIMIT`. In scaling mode, n8n takes the limit from this variable if set to a value other than `-1`, else it falls back to the `--concurrency` flag or its default.

