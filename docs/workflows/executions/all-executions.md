---
description: View and filter all executions for all workflows.
contentType: howto
---

# All executions

To view **all executions** from an n8n instance, navigate to the **Overview** page and then click into the Executions tab. This will show you all executions from the workflows you have access to.

If your n8n instance supports **projects**, you'll also be able to view the executions tab within projects you have access to. This will show you executions only from the workflows within the specified project.

/// note | Deleted workflows
When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.
///

## Filter executions

You can filter the executions list:

1. Select the **Executions** tab either from within the **Overview** page or a specific **project** to open the list.
2. Select **Filters**.
3. Enter your filters. You can filter by:
	* **Workflows**: choose all workflows, or a specific workflow name.
	* **Status**: choose from **Failed**, **Running**, **Success**, or **Waiting**.
	* **Execution start**: see executions that started in the given time.
	* **Saved custom data**: this is data you create within the workflow using the Code node. Enter the key and value to filter. Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for information on adding custom data.

--8<-- "_snippets/workflows/executions/custom-execution-data-availability.md"

## Retry failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Select the **Executions** tab from within either the **Overview** page or a specific **project** to open the list. 
2. On the execution you want to retry, select **Retry execution** <span class="n8n-inline-image">![Options menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
--8<-- "_snippets/workflows/executions/retry-options.md"

## Load data from previous executions into your current workflow

You can load data from a previous workflow back into the canvas. Refer to [Debug executions](/workflows/executions/debug.md) for more information.
