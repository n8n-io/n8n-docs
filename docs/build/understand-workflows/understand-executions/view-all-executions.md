---
description: View and filter all executions for all workflows.
contentType: howto
nodeTitle: View all executions
originalFilePath: workflows/executions/all-executions.md
originalUrl: 'https://docs.n8n.io/workflows/executions/all-executions'
url: >-
  https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions
layout:
  description:
    visible: false
---

# All executions <a href="#all-executions" id="all-executions"></a>

To view **all executions** from an n8n instance, navigate to the **Overview** page and then click into the Executions tab. This will show you all executions from the workflows you have access to.

If your n8n instance supports **projects**, you'll also be able to view the executions tab within projects you have access to. This will show you executions only from the workflows within the specified project.

{% hint style="info" %}
**Deleted workflows**

When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.
{% endhint %}

## Filter executions <a href="#filter-executions" id="filter-executions"></a>

You can filter the executions list:

1. Select the **Executions** tab either from within the **Overview** page or a specific **project** to open the list.
2. Select **Filters**.
3. Enter your filters. You can filter by:
	* **Workflows**: choose all workflows, or a specific workflow name.
	* **Status**: choose from **Failed**, **Running**, **Success**, or **Waiting**.
	* **Execution start**: see executions that started in the given time.
	* **Saved custom data**: this is data you create within the workflow using the Code node. Enter the key and value to filter. Refer to [Custom executions data](customize-executions-data.md) for information on adding custom data.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/4ohnS4NGKS6lbgfQc4u9/" %}

## Retry failed workflows <a href="#retry-failed-workflows" id="retry-failed-workflows"></a>

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Select the **Executions** tab from within either the **Overview** page or a specific **project** to open the list. 
2. On the execution you want to retry, select **Retry execution** <img src="../../.gitbook/assets/three-dot-options-menu.png" alt="Options menu icon" data-size="line">.
{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/RMwte6qQJdkcUpqXqnhz/" %}

## Load data from previous executions into your current workflow <a href="#load-data-from-previous-executions-into-your-current-workflow" id="load-data-from-previous-executions-into-your-current-workflow"></a>

You can load data from a previous workflow back into the canvas. Refer to [Debug executions](debug-executions.md) for more information.
