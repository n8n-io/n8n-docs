# Workflow

A [workflow](../../reference/glossary.md#workflow) is a collection of nodes connected together to automate a process. 

A workflow can be started manually (with the Start node) or by Trigger nodes. When a workflow is started, it executes all the active and connected nodes. The workflow execution ends when all the nodes have processed their data. You can view your workflow executions in the **Execution log**, which can be helpful for debugging.

![Workflow](../images/Execute_workflow.gif)

## Activating a workflow

Workflows that start with a Trigger node or a Webhook node need to be activated in order to be executed. This is done via the **Active** toggle in the Editor UI.

Active workflows enable the Trigger and Webhook nodes to receive data whenever a condition is met (e.g., Monday at 10:00, an update in a Trello board) and in turn trigger the workflow execution.

All the newly created workflows are deactivated by default. 

## Sharing a workflow

Workflows are saved in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. Feel free to [share your workflows](../../reference/contributing.md#contribute-a-workflow-🧬) on the [n8n page](https://n8n.io/workflows) and contribute to the workflow library.

You can export a workflow as a JSON file in two ways:

  * **Download**: Click the Download button under the Workflow menu in the sidebar. This will download the workflow as a JSON file.
  * **Copy-Paste**: Select all the workflow nodes in the Editor UI, copy them (Ctrl + c), then paste them (Ctrl + v) in your desired file.

You can import JSON files as workflows in two ways:

  * **Import**: Click Import from File or Import from URL under the Workflow menu in the sidebar and select the JSON file or paste the link to a workflow.
  * **Copy-Paste**: Copy the JSON workflow to the clipboard (Ctrl + c) and paste it (Ctrl + v) into the Editor UI.

## Workflow settings

On each workflow, it is possible to set some custom settings and overwrite some of the global default settings. The following settings can be set:

* **Timezone**: Sets the timezone to be used in the workflow. The default timezone is EDT (New York). The Timezone setting is particularly important for the Cron Trigger node.
* **Save Data Error Execution**: If the execution data of the workflow should be saved when the workflow fails.
* **Save Data Success Execution**: If the execution data of the workflow should be saved when the workflow succeeds.
* **Save Manual Executions**: If executions started from the Editor UI should be saved.
* **Save Execution Progress**: If the execution data of each node should be saved. If set to "Yes", the workflow resumes from where it stopped in case of an error. However, this might increase latency.

## Failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the Executions list from the sidebar.
2. For the workflow execution you want to retry, click on the refresh icon under the Status column.
3. Select either of the following options to retry the execution:
    * **Retry with currently saved workflow**: Once you make changes to your workflow, you can select this option to execute the workflow with the previous execution data.
    * **Retry with original workflow**: If you want to retry the execution without making changes to your workflow, you can select this option to retry the execution with the previous execution data.

You can also use the [Error Trigger node](../../nodes/nodes-library/core-nodes/ErrorTrigger), which triggers a workflow when another workflow has an error. Once a workflow fails, this node gets details about the failed workflow and the errors.