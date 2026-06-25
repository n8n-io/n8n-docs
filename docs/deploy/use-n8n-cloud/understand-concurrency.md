---
contentType: explanation
nodeTitle: Understand concurrency
originalFilePath: manage-cloud/concurrency.md
originalUrl: 'https://docs.n8n.io/manage-cloud/concurrency'
url: 'https://docs.n8n.io/deploy/use-n8n-cloud/understand-concurrency'
layout:
  description:
    visible: false
---

# Cloud concurrency <a href="#cloud-concurrency" id="cloud-concurrency"></a>

{% hint style="info" %}
**Only for n8n Cloud**

This document discusses concurrency in n8n Cloud. Read [self-hosted n8n concurrency control](../host-n8n/configure-n8n/scaling/control-concurrency.md) to learn how concurrency works with self-hosted n8n instances.
{% endhint %}

Too many concurrent executions can cause performance degradation and unresponsiveness. To prevent this and improve instance stability, n8n sets concurrency limits for production executions in regular mode.

Any executions beyond the limits queue for later processing. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order. 

## Concurrency limits <a href="#concurrency-limits" id="concurrency-limits"></a>

n8n limits the number of concurrent executions for Cloud instances according to their plan. Refer to [Pricing](https://n8n.io/pricing/) for details.

You can view the number of active executions and your plan's concurrency limit at the top of a project's or workflow's executions tab.

## Details <a href="#details" id="details"></a>

Some other details about concurrency to keep in mind:

- Concurrency control applies only to production executions: those started from a webhook or trigger node. It doesn't apply to any other kinds, such as manual executions, sub-workflow executions, or error executions.
- [Test evaluations](#user-content-fn-1)[^1] don't count towards production concurrency limits. They use a separate per-plan limit for how many test cases can run in parallel within a single test run: Community and Pro 1 (sequential), Business 3, Enterprise 5. You can adjust the value for a given run from the **Run Test** popover. Refer to [Metric-based evaluations](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality#run-test-cases-in-parallel) for details.
- You can't retry queued executions. Cancelling or deleting a queued execution also removes it from the queue.
- On instance startup, n8n resumes queued executions up to the concurrency limit and re-enqueues the rest.

## Comparison to queue mode <a href="#comparison-to-queue-mode" id="comparison-to-queue-mode"></a>

{% hint style="info" %}
**Feature availability**

Queue mode is available for Cloud Enterprise plans. To enable it, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa).
{% endhint %}

Concurrency in queue mode is a separate mechanism from concurrency in regular mode. In queue mode, the concurrency settings determine how many jobs each worker can run in parallel. In regular mode, concurrency limits apply to the entire instance.

[^1]: In n8n, evaluation allows you to tag and organize execution history and compare it against new executions. You can use this to understand how your workflow performs over time as you make changes. In particular, this is useful while developing AI-centered workflows.
