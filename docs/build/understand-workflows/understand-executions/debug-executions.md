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

Available on n8n Cloud and registered Community plans.
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
