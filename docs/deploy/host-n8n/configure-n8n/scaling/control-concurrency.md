---
contentType: explanation
nodeTitle: Control concurrency
originalFilePath: hosting/scaling/concurrency-control.md
originalUrl: 'https://docs.n8n.io/hosting/scaling/concurrency-control'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/control-concurrency'
layout:
  description:
    visible: false
---

# Self-hosted concurrency control <a href="#self-hosted-concurrency-control" id="self-hosted-concurrency-control"></a>

{% hint style="info" %}
**Only for self-hosted n8n**

This document is for self-hosted concurrency control. Read [Cloud concurrency](../../../use-n8n-cloud/understand-concurrency.md) to learn how concurrency works with n8n Cloud accounts.
{% endhint %}

In regular mode, n8n doesn't limit how many production executions may run at the same time. This can lead to a scenario where too many concurrent executions thrash the event loop, causing performance degradation and unresponsiveness. 

To prevent this, you can set a concurrency limit for production executions in regular mode. Use this to control how many production executions run concurrently, and queue up any concurrent production executions over the limit. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order.

Concurrency control is disabled by default. To enable it:

```sh
export N8N_CONCURRENCY_PRODUCTION_LIMIT=20
```

Keep in mind:

- Concurrency control applies only to production executions: those started from a webhook or [trigger](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#trigger-node-n8n) node. It doesn't apply to any other kinds, such as manual executions, sub-workflow executions, error executions, or started from CLI.
- You can't retry queued executions. Cancelling or deleting a queued execution also removes it from the queue.
- On instance startup, n8n resumes queued executions up to the concurrency limit and re-enqueues the rest.

- To monitor concurrency control, watch logs for executions being added to the queue and released. In a future version, n8n will show concurrency control in the UI.


When you enable concurrency control, you can view the number of active executions and the configured limit at the top of a project's or workflow's executions tab.

## Comparison to queue mode <a href="#comparison-to-queue-mode" id="comparison-to-queue-mode"></a>

In queue mode, you can control how many jobs a worker may run concurrently using the [`--concurrency` flag](enable-queue-mode.md#configure-worker-concurrency).

Concurrency control in queue mode is a separate mechanism from concurrency control in regular mode, but the environment variable `N8N_CONCURRENCY_PRODUCTION_LIMIT` controls both of them. In queue mode, n8n takes the limit from this variable if set to a value other than `-1`, falling back to the `--concurrency` flag or its default.

## Evaluation concurrency <a href="#evaluation-concurrency" id="evaluation-concurrency"></a>

Evaluation test runs use a separate concurrency limit from production executions. By default, the limit follows the instance's license tier (Community/Pro 1, Business 3, Enterprise 5). Override it with [`N8N_CONCURRENCY_EVALUATION_LIMIT`](../basic-configuration/use-environment-variables/executions.md). Refer to [Metric-based evaluations](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality#run-test-cases-in-parallel) for how the slider behaves in the UI.

