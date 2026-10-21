---
contentType: howto
nodeTitle: View all executions
originalFilePath: workflows/executions/all-executions.md
originalUrl: https://docs.n8n.io/workflows/executions/all-executions
url: >-
  https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions
description: View and filter all executions for all workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# View all executions

To view **all executions** from an n8n instance, navigate to the **Overview** page and then click into the Executions tab. This will show you all executions from the workflows you have access to.

If your n8n instance supports **projects**, you'll also be able to view the executions tab within projects you have access to. This will show you executions only from the workflows within the specified project.

{% hint style="info" %}
**Deleted workflows**

When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.
{% endhint %}

## Filter executions <a href="#filter-executions" id="filter-executions"></a>

You can filter the executions list:

1. Select the **Executions** tab either from within the **Overview** page or a specific **project** to open the list.
2. Select **Filters**.
3. Enter your filters. You can filter by:
   * **Workflows**: choose all workflows, or a specific workflow name.
   * **Status**: choose from **Failed**, **Running**, **Success**, or **Waiting**.
   * **Execution start**: see executions that started in the given time.
   * **Saved custom data**: this is data you create within the workflow using the Code node. Enter the key and value to filter. Refer to [Custom executions data](customize-executions-data.md) for information on adding custom data.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hEbJHXcEBce6m2wEE65f/" %}

## Retry failed workflows <a href="#retry-failed-workflows" id="retry-failed-workflows"></a>

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Select the **Executions** tab from within either the **Overview** page or a specific **project** to open the list.
2. On the execution you want to retry, select **Retry execution** <img src="../../.gitbook/assets/three-dot-options-menu (1).png" alt="Options menu icon" data-size="line">.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/yD2T5eTeZvZaPRV8P7MJ/" %}

### What a retry runs

When a node fails, a retry resumes from the saved execution state instead of starting the workflow again from the trigger:

* n8n keeps the results of completed node runs. For example, if a workflow adds a row and then fails when sending a message, retrying the failed message node doesn't repeat the earlier row addition.
* The failed node receives its saved input again and processes every item, including items it handled before it failed. For example, a node that sent some messages before it failed sends those messages again. Before you retry, check the target app for items the node already handled. To make retries safe, use operations that update existing records instead of creating new ones, such as **Append or Update Row** in the Google Sheets node or **Insert or Update** in the Postgres node.
* If the failed node is an **Execute Sub-workflow** node, the retry runs the whole sub-workflow again from its start.
* **Retry with original workflow** runs the workflow as it was when the execution ran. If you changed the workflow to fix the failure, choose **Retry with currently saved workflow**. Your changes apply only to nodes that haven't completed: completed nodes keep their saved results.
* Each retry is a new execution. If a retry fails, both the original execution and the failed retry show the retry option. Retry only one of them: retrying both can repeat work for the same data. To avoid extra failed retries, fix the cause before you retry.
* You can't retry an execution that succeeded, even if it didn't do what you expected. For example, an **If** node may have sent every item to the false branch. Use **Copy to editor** to pin the saved data in the first node of your current workflow, then run the workflow again. That run repeats every node after the first, including actions such as adding rows or sending messages. Refer to [Debug and re-run past executions](debug-executions.md) for availability and steps.
* You can retry an execution only while n8n still stores it. n8n doesn't store failed production executions if the workflow's [Save failed production executions](../../manage-workflows/configure-workflow-settings.md#save-failed-production-executions) setting is **Do not save**. For how long n8n keeps executions, refer to [Execution data](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/manage-execution-data) for self-hosted instances, or [Manage your data](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/configure-cloud/manage-your-data) for n8n Cloud.

## Load data from previous executions into your current workflow <a href="#load-data-from-previous-executions-into-your-current-workflow" id="load-data-from-previous-executions-into-your-current-workflow"></a>

You can load data from a previous workflow back into the canvas. Refer to [Debug executions](debug-executions.md) for more information.

## Related resources

* [Understand executions](./)
* [Manual, partial, and production executions](types-of-executions.md)
* [View executions for a single workflow](view-executions-for-a-single-workflow.md)
* [Debug and re-run past executions](debug-executions.md)
* [Customize executions data](customize-executions-data.md)
* [Stream real-time responses](stream-real-time-responses.md)
* [Dirty nodes](understand-dirty-nodes.md)
