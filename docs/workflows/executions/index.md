---
description: An execution is a single run of a workflow.
contentType: overview
---

# Executions

An execution is a single run of a workflow.

## Execution modes

There are two execution modes:

* **Manual:** Run workflows manually when testing. Select **Execute Workflow** to start a manual execution. You can do manual executions of active workflows, but n8n recommends keeping your workflow set to **Inactive** while developing and testing.
* **Production:** A production workflow is one that runs automatically. To enable this, set the workflow to **Active**.


## How executions count towards quotas:

[Paid plans](https://n8n.io/pricing/), whether cloud or self-hosted, have an execution limit quota. Only production executions count towards this quota. These are executions started automatically by triggers, schedules, or polling. Manual executions aren't counted. This distinction applies regardless of the instance environment, such as development or production.

### Execution count by trigger type

The way executions are counted depends on the type of trigger node used:

* **Schedule Trigger nodes:** Count one execution every time the node fires, regardless of outcome.
* **Polling nodes (like Google Drive Trigger):** Count one execution only when new data is found. Polls that return no results do not count as an execution.
* **Webhook Trigger nodes:** Count one execution for every inbound request that activates the trigger. This includes requests with an empty body (such as `{}`). Malformed requests that fail before the workflow starts do not count as an execution.

## Execution lists

n8n provides two execution lists:

* [Workflow-level executions](/workflows/executions/single-workflow-executions.md): this execution list shows the executions for a single workflow.
* [All executions](/workflows/executions/all-executions.md): this list shows all executions for all your workflows.

n8n supports [adding custom data to executions](/workflows/executions/custom-executions-data.md).

## Execution data redaction

You can redact execution data to protect sensitive information. Redaction hides the input and output data of workflow executions while preserving execution metadata like status, timing, and node names. Refer to [Execution data redaction](/workflows/executions/execution-data-redaction.md) for details.
