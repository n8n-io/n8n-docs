---
description: An execution is a single run of a workflow.
contentType: overview
---

# Executions

An execution is a single run of a workflow.

## Execution modes

There are two execution modes:

* **Manual:** Run workflows manually by clicking **Execute Workflow**. Unpublish workflows  while testing through manual runs.
* **Production:** Production workflows run automatically. Publish a version of the workflow to put it into production.

## How executions count towards quotas:

[Paid plans](https://n8n.io/pricing/), whether cloud or self-hosted, have an execution limit quota. Only production executions count towards this quota. These are executions started automatically by triggers, schedules, or polling. This distinction applies regardless of the instance environment, such as development or production.

### Execution count by trigger type

The way executions are counted depends on the type of trigger node used:

* **Schedule Trigger nodes:** Count one execution every time the node fires, regardless of outcome.
* **Polling nodes (like Google Drive Trigger):** Count one execution only when new data is found. Polls that return no results don't count as an execution.
* **Webhook Trigger nodes:** Count one execution for every inbound request that activates the trigger. This includes requests with an empty body (such as `{}`). Malformed requests that fail before the workflow starts don't count as an execution.

### Triggers and runs that don't count

The following don't count towards your execution quota:

* **Manual executions:** Running a workflow from the editor while building or testing.
* **Sub-workflow executions:** When a workflow calls another workflow with the Execute Sub-workflow node, only the parent (top-level) execution counts.
* **Error workflow executions:** Runs of a workflow set as an [error workflow](/flow-logic/error-handling.md).
* **Polls that return no data:** A polling trigger only counts when it finds new data.
* **Malformed or rejected requests:** Webhook requests that fail before the workflow starts.

## Execution lists

n8n provides two execution lists:

* [Workflow-level executions](/workflows/executions/single-workflow-executions.md): this execution list shows the executions for a single workflow.
* [All executions](/workflows/executions/all-executions.md): this list shows all executions for all your workflows.

n8n supports [adding custom data to executions](/workflows/executions/custom-executions-data.md).

## Execution data redaction

You can redact execution data to protect sensitive information. Redaction hides the input and output data of workflow executions while preserving execution metadata like status, timing, and node names. Refer to [Execution data redaction](/workflows/executions/execution-data-redaction.md) for details.
