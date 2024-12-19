---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Manage settings for an individual workflow.
contentType: howto
---

# Workflow settings

You can customize workflow behavior for individual workflows using workflow settings.

To open the settings:

1. Open your workflow.
2. Select the **Options** <span class="inline-image">![Options menu](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> menu.
3. Select **Settings**. n8n opens the **Workflow settings** modal.


The following settings are available:

* **Execution order**: choose the execution order for multi-branch workflows. **v0 (legacy)** executes the first node of each branch, then the second node of each branch, and so on. **v1 (recommended)** executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the canvas, from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.
* **Error Workflow**: select a workflow to trigger if the current workflow fails. See [Error workflows](/flow-logic/error-handling/) for more details.
* **This workflow can be called by**: choose whether other workflow can call this workflow.
* **Timezone**: sets the timezone for the workflow to use. The default timezone is EDT (New York). The timezone setting is  important for the Schedule Trigger node.
* **Save failed production executions**: whether n8n should save failed executions for active workflows.
* **Save successful production executions**: whether n8n should save successful executions for active workflows.
* **Save manual executions**: whether n8n should save executions for workflows started by the user in the editor.
* **Save execution progress**: whether n8n should save execution data for each node. If set to **Save**, the workflow resumes from where it stopped in case of an error. This might increase latency.
* **Timeout Workflow**: toggle to enable setting a duration after which n8n should cancel the current workflow execution.
	* **Timeout After**: Set the time in hours, minutes, and seconds after which the workflow should timeout. For n8n Cloud users n8n enforces a maximum available timeout for each plan.
