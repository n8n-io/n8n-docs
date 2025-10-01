---
description: Manage settings for an individual workflow.
contentType: howto
---

# Workflow settings

You can customize workflow behavior for individual workflows using workflow settings.

## Access workflow settings

To open the settings:

1. Open your workflow.
1. Select the **three dots icon** <span class="n8n-inline-image">![three dots icon](/_images/common-icons/three-dots-horizontal.png){.off-glb}</span> in the upper-right corner.
3. Select **Settings**. n8n opens the **Workflow settings** modal.

## Available settings

The following settings are available:

### Execution order

Choose the execution order for multi-branch workflows:

**v1 (recommended)** executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the [canvas](/glossary.md#canvas-n8n), from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.

**v0 (legacy)** executes the first node of each branch, then the second node of each branch, and so on.

### Error Workflow (to notify when this one errors)

Select a workflow to trigger if the current workflow fails. See [error workflows](/flow-logic/error-handling.md) for more details.

<!-- vale from-write-good.Passive = NO -->
### This workflow can be called by
<!-- vale from-write-good.Passive = YES -->

Choose which other workflows can call this workflow.

### Timezone

Sets the timezone for this workflow. The timezone setting is important for the Schedule Trigger node.

You can set your n8n instance's timezone to configure the default timezone workflows use:

* [Set a n8n Cloud instance timezone](/manage-cloud/set-cloud-timezone.md)
* [Configure the timezone for self-hosted instances](/hosting/configuration/environment-variables/timezone-localization.md)

If you don't configure the workflow or instance timezone, n8n defaults to the EDT (New York) timezone.

### Save failed production executions

Whether n8n should save failed executions for active workflows.

### Save successful production executions

Whether n8n should save successful executions for active workflows.

### Save manual executions

Whether n8n should save executions for workflows started by the user in the editor.

### Save execution progress

Whether n8n should save execution data for each node.

If set to **Save**, the workflow resumes from where it stopped in case of an error. This may increase latency.

### Timeout Workflow

Whether n8n should cancel the current workflow execution after a certain amount of time elapses.

When enabled, the **Timeout After** option appears. Here, you can set the time (in hours, minutes, and seconds) after which the workflow should timeout. For n8n Cloud users, n8n enforces a maximum available timeout for each plan.

### Estimated time saved

An estimate of the number of minutes each of execution of this workflow saves you.

Setting this lets n8n calculate the amount of time saved for [insights](/insights.md).
