---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# 8. Activating and Examining the Workflow

In this step of the workflow, you will learn how to activate your workflow and change the default workflow settings.

Activating a workflow means that it will run automatically every time a trigger node receives input or meets a condition. By default, all newly created workflows are deactivated.

To activate your workflow, set the **Inactive** toggle in the top navigation of the Editor UI to be **Activated**. Nathan's workflow will now be executed automatically every Monday at 9 AM:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-8-activated-workflow.png" alt="Activated workflow" style="width:100%"><figcaption align = "center"><i>Activated workflow</i></figcaption></figure>

## Workflow Executions

An execution represents a completed run of a workflow, from the first to the last node. n8n logs workflow executions, allowing you to see if the workflow was completed successfully or not. The execution log is useful for debugging your workflow and seeing at what stage it runs into issues.

To see the execution log, in your Editor UI select **All executions** in the left panel. This will open the **Executions** window.

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-8-execution-list.png" alt="Execution List" style="width:100%"><figcaption align = "center"><i>Execution List</i></figcaption></figure>

The **Executions** window displays a table with the following information:

- **Name**: The name of the workflow
- **Started At**: The date and time when the workflow started
- **Status**: The status of the workflow (Waiting, Running, Succeeded, Cancelled, or Failed) and the amount of time it took the workflow to execute
- **Execution ID**: The ID of this workflow execution

/// note | Workflow execution status
You can filter the displayed **Executions** by workflow and by status (**Any Status**, **Failed**, **Cancelled**, **Running**, **Success**, or **Waiting**).
The information displayed here depends on which executions are configured to be saved in the [**Workflow Settings**](/workflows/settings/).
///


## Workflow Settings

You can customize your workflows and executions, or overwrite some of the global default settings in [**Workflow Settings**](/workflows/settings/).

Access these settings by selecting the three dots in the upper right corner of the Editor UI, then select **Settings**.

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-8-workflow-settings.png" alt="Workflow Settings" style="width:100%"><figcaption align = "center"><i>Workflow Settings</i></figcaption></figure>

In the **Workflow Settings** window you can configure the following settings:

- [**Error Workflow**](/flow-logic/error-handling/): A workflow to run in case the execution of the current workflow fails.
- **This workflow can be called by**: Workflows that are allowed to call this workflow using the [Execute Workflow node](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/).
- **Timezone**: The timezone to use in the current workflow. If not set, the global timezone (by default "New York") is used. This setting is particularly important for the [Schedule Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/), as you want to make sure that the workflow gets executed at the right time.
- **Save failed production executions**: If the Execution data of the workflow should be saved when it fails. Default is to save.
- **Save successful production executions**: If the Execution data of the workflow should be saved when it succeeds. Default is to save.
- **Save manual executions**: If executions started from the Editor UI should be saved. Default is to save.
- **Save execution progress**: If the execution data of each node should be saved. If set to Save, you can resume the workflow from where it stopped in case of an error, though keep in mind that this might make the execution slower. Default is not to save.
- **Timeout Workflow**: Whether to cancel a workflow execution after a specific period of time. Default is not to timeout.


## What's next?

**You 👩‍🔧**: That was it! Now you have a 7-node workflow that will run automatically every Monday morning. You don't have to worry about remembering to wrangle the data. Instead, you can start your week with more meaningful or exciting work.

**Nathan 🙋**: This workflow is incredibly helpful, thank you! Now, what's next for you?

**You 👩‍🔧**: I'd like to build more workflows, share them with others, and use some workflows built by other people.
