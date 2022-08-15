# Workflow

A workflow is a collection of nodes connected together to automate a process. 

A workflow can be started manually (with the Start node) or by Trigger nodes. When a workflow is started, it executes all the active and connected nodes. The workflow execution ends when all the nodes have processed their data. You can view your workflow executions in the **Execution log**, which can be helpful for debugging.

![Workflow](/_images/workflows/workflows/Execute_workflow.gif)

## Activating a workflow

Workflows that start with a Trigger node or a Webhook node need to be activated in order to be executed. This is done via the **Active** toggle in the Editor UI.

Active workflows enable the Trigger and Webhook nodes to receive data whenever a condition is met (for example, Monday at 10:00, an update in a Trello board) and in turn trigger the workflow execution.

All the newly created workflows are deactivated by default. 

## Export and import a workflow

n8n saves workflows in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. 

You can export a workflow as a JSON file in two ways:

  * **Download**: Click the Download button under the Workflow menu in the sidebar. This will download the workflow as a JSON file.
  * **Copy-Paste**: Select all the workflow nodes in the Editor UI, copy them (`Ctrl + c` or `cmd +c`), then paste them (`Ctrl + v` or `cmd + v`) in your desired file.  
  
  To select all nodes, or a group of nodes, click and drag:
  ![Select a group of nodes](/_images/workflows/workflows/selectingnodes.gif)

You can import JSON files as workflows in two ways:

  * **Import**: Click Import from File or Import from URL under the Workflow menu in the sidebar and select the JSON file or paste the link to a workflow.
  * **Copy-Paste**: Copy the JSON workflow to the clipboard (`Ctrl + c` or `cmd +c`) and paste it (`Ctrl + v` or `cmd + v`) into the Editor UI.

## Workflow settings

On each workflow, it's possible to set some custom settings and overwrite some of the global default settings from the **Workflow** > **Settings** menu.

![The Workflow Setting modal.](/_images/workflows/workflows/workflow_settings.png)

The following settings are available:

* **Error Workflow**: Select a workflow to trigger if the current workflow fails. See [Error Workflow](/flow-logic/error-handling/) for more details.
* **Timezone**: Sets the timezone to be used in the workflow. The default timezone is EDT (New York). The Timezone setting is particularly important for the Cron Trigger node.
* **Save Data Error Execution**: If the execution data of the workflow should be saved when the workflow fails.
* **Save Data Success Execution**: If the execution data of the workflow should be saved when the workflow succeeds.
* **Save Manual Executions**: If executions started from the Editor UI should be saved.
* **Save Execution Progress**: If the execution data of each node should be saved. If set to "Yes", the workflow resumes from where it stopped in case of an error. However, this might increase latency.
* **Timeout Workflow**: Toggle to enable setting a duration after which the current workflow execution should be cancelled.
* **Timeout After**: Only available when **Timeout Workflow** is enabled. Set the time in hours, minutes, and seconds after which the workflow should timeout. For n8n Cloud users a maximum available timeout is enforced for each plan (for example, three minutes for Start level).

## Failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the Executions list from the sidebar.
2. For the workflow execution you want to retry, click on the refresh icon under the Status column.
3. Select either of the following options to retry the execution:
    * **Retry with currently saved workflow**: Once you make changes to your workflow, you can select this option to execute the workflow with the previous execution data.
    * **Retry with original workflow**: If you want to retry the execution without making changes to your workflow, you can select this option to retry the execution with the previous execution data.

You can also use the [Error Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.errorTrigger/), which triggers a workflow when another workflow has an error. Once a workflow fails, this node gets details about the failed workflow and the errors.

## Workflow templates

When creating a new workflow, you can choose whether to start with an empty workflow, or use an existing template.

Templates provide:

* A way to get started quickly: n8n might already have a template that does what you need.
* Examples of what you can build
* Best practices for creating your own workflows

### Use a workflow template

1. In the sidebar, click **Templates**.
2. Browse or search the workflow templates list.
3. Click a workflow to view more information. n8n opens the workflow details page.
4. On the workflow details page, click **Use this workflow**. n8n opens the workflow.
5. Click **Save** to add the workflow to your workflows.

!!! note "Workflow templates are available in 0.165.0 and above"
    Workflow templates are available on all flavors of n8n. If you can't access workflow templates in n8n, check that your n8n version is 0.165.0 or above, and check whether you are using a self-hosted or embedded version of n8n with templates disabled.

<!--
### Add your workflow to the library

You can submit your own workflows to n8n's template library.

1. In n8n, download your workflow JSON: 
    1. Open the workflow
    2. Click **Workflows** > **Download**.
2. [Log in](https://n8n.io/login) to your n8n dashboard.
3. Click **Share New Workflow**.
4. Enter your workflow details:
    * **Name**: this should be descriptive but simple. It will appear on the website and in app.
    * **Description**: tell users what the workflow does. Include any configuration or setup steps.
    * **Workflow code**: copy in the workflow JSON that you downloaded.
5. Click **Publish Workflow to Share**. n8n reviews all workflows before publishing them.
-->