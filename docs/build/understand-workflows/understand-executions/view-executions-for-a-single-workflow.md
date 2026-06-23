---
description: View and filter all executions for the workflow currently open on the canvas.
contentType: howto
nodeTitle: View executions for a single workflow
originalFilePath: workflows/executions/single-workflow-executions.md
originalUrl: 'https://docs.n8n.io/workflows/executions/single-workflow-executions'
url: >-
  https://docs.n8n.io/build/understand-workflows/understand-executions/view-executions-for-a-single-workflow
layout:
  description:
    visible: false
---

# Workflow-level executions list <a href="#workflow-level-executions-list" id="workflow-level-executions-list"></a>

The **Executions** list in a workflow shows all executions for that workflow.

{% hint style="info" %}
**Deleted workflows**

When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.
{% endhint %}

{% hint style="info" %}
**Execution history and workflow history**

Don't confuse the execution list with [Workflow history](../../manage-workflows/view-change-history.md).

Executions are workflow runs. With the executions list, you can see previous runs of the current version of the workflow. You can copy previous executions into the editor to [Debug and re-run past executions](debug-executions.md) in your current workflow.

Workflow history is previous versions of the workflow: for example, a version with a different node, or different parameters set.
{% endhint %}


## View executions for a single workflow <a href="#view-executions-for-a-single-workflow" id="view-executions-for-a-single-workflow"></a>

In the workflow, select the **Executions** tab in the top menu. You can preview all executions of that workflow.

## Filter executions <a href="#filter-executions" id="filter-executions"></a>

You can filter the executions list.

1. In your workflow, select **Executions**.	
2. Select **Filters**.
3. Enter your filters. You can filter by:
	* **Status**: choose from **Failed**, **Running**, **Success**, or **Waiting**.
	* **Execution start**: see executions that started in the given time.
	* **Saved custom data**: this is data you create within the workflow using the Code node. Enter the key and value to filter. Refer to [Custom executions data](customize-executions-data.md) for information on adding custom data.

		{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/4ohnS4NGKS6lbgfQc4u9/" %}


## Retry failed workflows <a href="#retry-failed-workflows" id="retry-failed-workflows"></a>

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the **Executions** list.
2. For the workflow execution you want to retry, select **Refresh** <img src="../../.gitbook/assets/refresh.png" alt="Refresh icon" data-size="line">.
{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/RMwte6qQJdkcUpqXqnhz/" %}
