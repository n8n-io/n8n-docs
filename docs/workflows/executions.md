---
description: An execution is a single run of a workflow.
---

# Executions

An execution is a single run of a workflow.

## Browse all executions

Select the **Executions**  in the left menu to view your executions history. n8n opens the **Workflow Executions** modal. You can then open and view individual executions.

!!! note "Deleted workflows"
	When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.

## View executions for a single workflow

In the workflow, select the **Executions** tab in the top menu. You can preview all executions of that workflow.

## Filter the executions list

TODO

https://www.notion.so/n8n/Executions-list-improvements-a6787232db6248ac8d80dff436ee7fd3#55ee785011534424b135daa61ac3f609

## Add custom filters

TODO

https://www.notion.so/n8n/Executions-list-improvements-a6787232db6248ac8d80dff436ee7fd3?pvs=4#61dc6c39bf774abe8233145f835c4cfc

## Retry failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the **Executions** list.
2. For the workflow execution you want to retry, select **Refresh** <span class="inline-image">![Refresh icon](/_images/common-icons/refresh.png)</span>.
3. Select either of the following options to retry the execution:
    * **Retry with currently saved workflow**: Once you make changes to your workflow, you can select this option to execute the workflow with the previous execution data.
    * **Retry with original workflow**: If you want to retry the execution without making changes to your workflow, you can select this option to retry the execution with the previous execution data.
