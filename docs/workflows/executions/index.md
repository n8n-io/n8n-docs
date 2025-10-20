---
description: An execution is a single run of a workflow.
contentType: overview
---

# Executions

An execution is a single run of a workflow.

## Execution modes

There are two execution modes:

* Manual: run workflows manually when testing. Select **Execute Workflow** to start a manual execution. You can do manual executions of active workflows, but n8n recommends keeping your workflow set to **Inactive** while developing and testing.
* Production: a production workflow is one that runs automatically. To enable this, set the workflow to **Active**.


## Execution lists

n8n provides two execution lists:

* [Workflow-level executions](/workflows/executions/single-workflow-executions.md): this execution list shows the executions for a single workflow.
* [All executions](/workflows/executions/all-executions.md): this list shows all executions for all your workflows.

n8n supports [adding custom data to executions](/workflows/executions/custom-executions-data.md).
