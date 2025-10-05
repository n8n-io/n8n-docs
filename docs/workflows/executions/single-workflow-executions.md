---
description: View and filter all executions for the workflow currently open on the canvas.
contentType: howto
---

# Workflow-level executions list

The **Executions** list in a workflow shows all executions for that workflow.

/// note | Deleted workflows
When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.
///

/// note | Execution history and workflow history
Don't confuse the execution list with [Workflow history](/workflows/history.md).

Executions are workflow runs. With the executions list, you can see previous runs of the current version of the workflow. You can copy previous executions into the editor to [Debug and re-run past executions](/workflows/executions/debug.md) in your current workflow.

Workflow history is previous versions of the workflow: for example, a version with a different node, or different parameters set.
///


## View executions for a single workflow

In the workflow, select the **Executions** tab in the top menu. You can preview all executions of that workflow.

## Filter executions

You can filter the executions list.

1. In your workflow, select **Executions**.	
2. Select **Filters**.
3. Enter your filters. You can filter by:
	* **Status**: choose from **Failed**, **Running**, **Success**, or **Waiting**.
	* **Execution start**: see executions that started in the given time.
	* **Saved custom data**: this is data you create within the workflow using the Code node. Enter the key and value to filter. Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for information on adding custom data.

		--8<-- "_snippets/workflows/executions/custom-execution-data-availability.md"


## Retry failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the **Executions** list.
2. For the workflow execution you want to retry, select **Refresh** <span class="n8n-inline-image">![Refresh icon](/_images/common-icons/refresh.png){.off-glb}</span>.
--8<-- "_snippets/workflows/executions/retry-options.md"
