---
description: An execution is a single run of a workflow.
contentType: overview
nodeTitle: Understand executions
originalFilePath: workflows/executions/index.md
originalUrl: 'https://docs.n8n.io/workflows/executions'
url: 'https://docs.n8n.io/build/understand-workflows/understand-executions'
layout:
  description:
    visible: false
---

# Executions <a href="#executions" id="executions"></a>

An execution is a single run of a workflow.

## Execution modes <a href="#execution-modes" id="execution-modes"></a>

There are two execution modes:

* **Manual:** Run workflows manually by clicking **Execute Workflow**. Unpublish workflows  while testing through manual runs.
* **Production:** Production workflows run automatically. Publish a version of the workflow to put it into production.

## How executions count towards quotas: <a href="#how-executions-count-towards-quotas" id="how-executions-count-towards-quotas"></a>

[Paid plans](https://n8n.io/pricing/), whether cloud or self-hosted, have an execution limit quota. Only production executions count towards this quota. These are executions started automatically by triggers, schedules, or polling. This distinction applies regardless of the instance environment, such as development or production.

### Execution count by trigger type <a href="#execution-count-by-trigger-type" id="execution-count-by-trigger-type"></a>

The way executions are counted depends on the type of trigger node used:

* **Schedule Trigger nodes:** Count one execution every time the node fires, regardless of outcome.
* **Polling nodes (like Google Drive Trigger):** Count one execution only when new data is found. Polls that return no results don't count as an execution.
* **Webhook Trigger nodes:** Count one execution for every inbound request that activates the trigger. This includes requests with an empty body (such as `{}`). Malformed requests that fail before the workflow starts don't count as an execution.

### Triggers and runs that don't count <a href="#triggers-and-runs-that-dont-count" id="triggers-and-runs-that-dont-count"></a>

The following don't count towards your execution quota:

* **Manual executions:** Running a workflow from the editor while building or testing.
* **Sub-workflow executions:** When a workflow calls another workflow with the Execute Sub-workflow node, only the parent (top-level) execution counts.
* **Error workflow executions:** Runs of a workflow set as an [error workflow](../../flow-logic/handle-errors-gracefully.md).
* **Polls that return no data:** A polling trigger only counts when it finds new data.
* **Malformed or rejected requests:** Webhook requests that fail before the workflow starts.

## Execution lists <a href="#execution-lists" id="execution-lists"></a>

n8n provides two execution lists:

* [Workflow-level executions](view-executions-for-a-single-workflow.md): this execution list shows the executions for a single workflow.
* [All executions](view-all-executions.md): this list shows all executions for all your workflows.

n8n supports [adding custom data to executions](customize-executions-data.md).

## Execution data redaction <a href="#execution-data-redaction" id="execution-data-redaction"></a>

You can redact execution data to protect sensitive information. Redaction hides the input and output data of workflow executions while preserving execution metadata like status, timing, and node names. Refer to [Execution data redaction](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data) for details.
