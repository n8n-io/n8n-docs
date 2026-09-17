---
contentType: howto
title: Debug and re-run past executions
description: >-
  How to copy execution data into your current workflow in order to debug
  previous executions.
nodeTitle: Debug executions
originalFilePath: workflows/executions/debug.md
originalUrl: 'https://docs.n8n.io/workflows/executions/debug'
url: >-
  https://docs.n8n.io/build/understand-workflows/understand-executions/debug-executions
layout:
  description:
    visible: false
---

# Debug and re-run past executions <a href="#debug-and-re-run-past-executions" id="debug-and-re-run-past-executions"></a>

{% hint style="info" %}
**Feature availability**

Debugging and re-running past executions is available on:

- **n8n Cloud:** All plans
- **Self-hosted:** Registered Community, Business, Enterprise
{% endhint %}

You can load data from a previous execution into your current workflow. This is useful for debugging data from failed production executions: you can see a failed execution, make changes to your workflow to fix it, then re-run it with the previous execution data.

## Load data <a href="#load-data" id="load-data"></a>

To load data from a previous execution:

1. In your workflow, select the **Executions** tab to view the **Executions** list.
1. Select the execution you want to debug. n8n displays options depending on whether the workflow was successful or failed:
	* For failed executions: select **Debug in editor**.
	* For successful executions: select **Copy to editor**.
1. n8n copies the execution data into your current workflow, and [pins the data](../../work-with-data/pin-and-mock-data.md) in the first node in the workflow.

{% hint style="info" %}
**Check which executions you save**

The executions available on the **Executions** list depends on your [Workflow settings](../../manage-workflows/configure-workflow-settings.md).
{% endhint %}

## Related pages

* [Understand executions](./): what an execution is, and how to view, filter, and debug them.
* [Manual, partial, and production executions](types-of-executions.md): how manual, partial, and production executions differ.
* [View all executions](view-all-executions.md): view and filter all executions across all your workflows.
* [View executions for a single workflow](view-executions-for-a-single-workflow.md): view and filter executions for the workflow currently open on the canvas.
* [Customize executions data](customize-executions-data.md): add custom data to your workflow executions using the Code node.
* [Stream real-time responses](stream-real-time-responses.md): send data back to users as an AI Agent node generates it.
* [Dirty nodes](understand-dirty-nodes.md): what dirty nodes are and how they affect workflow execution.
