---
description: View and filter all executions for the workflow currently open on the canvas.
---

# Workflow-level executions list

The **Executions** list in a workflow shows all executions for that workflow.

!!! note "Deleted workflows"
	When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.

## View executions for a single workflow

In the workflow, select the **Executions** tab in the top menu. You can preview all executions of that workflow.

## Retry failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the **Executions** list.
2. For the workflow execution you want to retry, select **Refresh** <span class="inline-image">![Refresh icon](/_images/common-icons/refresh.png)</span>.
--8<-- "_snippets/workflows/executions/retry-options.md"
