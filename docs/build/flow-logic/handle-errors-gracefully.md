---
contentType: howto
description: How to handle execution errors.
nodeTitle: Handle errors gracefully
originalFilePath: flow-logic/error-handling.md
originalUrl: 'https://docs.n8n.io/flow-logic/error-handling'
url: 'https://docs.n8n.io/build/flow-logic/handle-errors-gracefully'
layout:
  description:
    visible: false
---

# Error handling <a href="#error-handling" id="error-handling"></a>

When designing your flow logic, it's a good practice to consider potential errors, and set up methods to handle them gracefully. With an error workflow, you can control how n8n responds to a workflow execution failure.

{% hint style="info" %}
**Investigating errors**

To investigate failed executions, you can:

* Review your [Executions](../understand-workflows/understand-executions/README.md), for a [single workflow](../understand-workflows/understand-executions/view-executions-for-a-single-workflow.md) or [all workflows you have access to](../understand-workflows/understand-executions/view-all-executions.md). You can [load data from previous execution](../understand-workflows/understand-executions/debug-executions.md) into your current workflow.
* Enable [Log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems).
{% endhint %}

## Create and set an error workflow <a href="#create-and-set-an-error-workflow" id="create-and-set-an-error-workflow"></a>

For each workflow, you can set an error workflow in **Workflow Settings**. It runs if an execution fails. This means you can, for example, send email or Slack alerts when a workflow execution errors. The error workflow must start with the [Error Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.errortrigger).

You can use the same error workflow for multiple workflows.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/geH8a4bHDCaSGYqSS37b/" %}

## Error data <a href="#error-data" id="error-data"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/DeA33zfTLE9PhrqQNw2Y/" %}

## Cause a workflow execution failure using Stop And Error <a href="#cause-a-workflow-execution-failure-using-stop-and-error" id="cause-a-workflow-execution-failure-using-stop-and-error"></a>

When you create and set an error workflow, n8n runs it when an execution fails. Usually, this is due to things like errors in node settings, or the workflow running out of memory.

You can add the [Stop And Error](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.stopanderror) node to your workflow to force executions to fail under your chosen circumstances, and trigger the error workflow.
