---
description: Manage settings for an individual workflow.
contentType: howto
nodeTitle: Configure workflow settings
originalFilePath: workflows/settings.md
originalUrl: 'https://docs.n8n.io/workflows/settings'
url: 'https://docs.n8n.io/build/manage-workflows/configure-workflow-settings'
layout:
  description:
    visible: false
---

# Workflow settings <a href="#workflow-settings" id="workflow-settings"></a>

You can customize workflow behavior for individual workflows using workflow settings.

## Access workflow settings <a href="#access-workflow-settings" id="access-workflow-settings"></a>

To open the settings:

1. Open your workflow.
1. Select the **three dots icon** <img src="../.gitbook/assets/three-dots-horizontal.png" alt="three dots icon" data-size="line"> in the upper-right corner.
3. Select **Settings**. n8n opens the **Workflow settings** modal.

## Available settings <a href="#available-settings" id="available-settings"></a>

The following settings are available:

### Execution order <a href="#execution-order" id="execution-order"></a>

Choose the execution order for multi-branch workflows:

**v1 (recommended)** executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the [canvas](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#canvas-n8n), from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.

**v0 (legacy)** executes the first node of each branch, then the second node of each branch, and so on.

### Error Workflow (to notify when this one errors) <a href="#error-workflow-to-notify-when-this-one-errors" id="error-workflow-to-notify-when-this-one-errors"></a>

Select a workflow to trigger if the current workflow fails. See [error workflows](../flow-logic/handle-errors-gracefully.md) for more details.


### This workflow can be called by <a href="#this-workflow-can-be-called-by" id="this-workflow-can-be-called-by"></a>


Choose which other workflows can call this workflow.

### Timezone <a href="#timezone" id="timezone"></a>

Sets the timezone for this workflow. The timezone setting is important for the Schedule Trigger node.

You can set your n8n instance's timezone to configure the default timezone workflows use:

* [Set a n8n Cloud instance timezone](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/configure-cloud/set-your-timezone)
* [Configure the timezone for self-hosted instances](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/timezone-and-localization)

If you don't configure the workflow or instance timezone, n8n defaults to the EDT (New York) timezone.

### Save failed production executions <a href="#save-failed-production-executions" id="save-failed-production-executions"></a>

Whether n8n should save failed executions for active workflows.

### Save successful production executions <a href="#save-successful-production-executions" id="save-successful-production-executions"></a>

Whether n8n should save successful executions for active workflows.

### Save manual executions <a href="#save-manual-executions" id="save-manual-executions"></a>

Whether n8n should save executions for workflows started by the user in the editor.

### Save execution progress <a href="#save-execution-progress" id="save-execution-progress"></a>

Whether n8n should save execution data for each node.

If set to **Save**, the workflow resumes from where it stopped in case of an error. This may increase latency.

### Timeout Workflow <a href="#timeout-workflow" id="timeout-workflow"></a>

Whether n8n should cancel the current workflow execution after a certain amount of time elapses.

When enabled, the **Timeout After** option appears. Here, you can set the time (in hours, minutes, and seconds) after which the workflow should timeout. For n8n Cloud users, n8n enforces a maximum available timeout for each plan.

### Redact production execution data <a href="#redact-production-execution-data" id="redact-production-execution-data"></a>

Controls whether n8n redacts execution data from production (non-manually triggered) executions. When set to **Redact**, n8n hides the input and output data of each node and replaces it with a redacted indicator.

### Redact manual execution data <a href="#redact-manual-execution-data" id="redact-manual-execution-data"></a>

Controls whether n8n redacts execution data from manually triggered executions. When set to **Redact**, n8n hides the input and output data of each node and replaces it with a redacted indicator.

If your instance admin [enforces data redaction instance-wide](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data#instance-level-enforcement), n8n locks the settings covered by the enforced scope to **Redact**. You can't turn them off here.

Refer to [Execution data redaction](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data) for details on redaction policies, revealing data, and permission requirements.

### Estimated time saved <a href="#estimated-time-saved" id="estimated-time-saved"></a>

An estimate of the number of minutes each of execution of this workflow saves you.

Setting this lets n8n calculate the amount of time saved for [insights](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights).

### Custom span attributes <a href="#custom-span-attributes" id="custom-span-attributes"></a>

Add custom key-value attributes to the workflow's OpenTelemetry span. Refer to [Custom span attributes](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/trace-executions-with-opentelemetry#custom-span-attributes) for details.
