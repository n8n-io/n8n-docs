---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
description: How to handle execution errors.
---

# Error handling

When designing your flow logic, it's a good practice to consider potential errors, and set up methods to handle them gracefully. With an error workflow, you can control how n8n responds to a workflow execution failure.

/// note | Investigating errors
To investigate failed executions, you can:

* Review your [Executions](/workflows/executions/), for a [single workflow](/workflows/executions/single-workflow-executions/) or [all workflows you have access to](/workflows/executions/all-executions/). You can [load data from previous execution](/workflows/executions/debug/) into your current workflow.
* Enable [Log streaming](/log-streaming/).
///

## Create and set an error workflow

For each workflow, you can set an error workflow in **Workflow Settings**. It runs if an execution fails. This means you can, for example, send email or Slack alerts when a workflow execution errors. The error workflow must start with the [Error Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger/).

You can use the same error workflow for multiple workflows.

--8<-- "_snippets/flow-logic/create-set-error-workflow.md"

## Error data

--8<-- "_snippets/integrations/builtin/core-nodes/error-trigger/error-data.md"

## Cause a workflow execution failure using Stop And Error

When you create and set an error workflow, n8n runs it when an execution fails. Usually, this is due to things like errors in node settings, or the workflow running out of memory.

You can add the [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror/) node to your workflow to force executions to fail under your chosen circumstances, and trigger the error workflow.
