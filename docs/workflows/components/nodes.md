---
description: A node is an entry point for retrieving data, a function to process data, or an exit for sending data.
contentType: howto
---

# Nodes

[Nodes](/glossary.md#node-n8n) are the key building blocks of a [workflow](/glossary.md#workflow-n8n). They perform a range of actions, including:

* Starting the workflow.
* Fetching and sending data.
* Processing and manipulating data.

n8n provides a collection of built-in nodes, as well as the ability to create your own nodes. Refer to:

* [Built-in integrations](/integrations/builtin/node-types.md) to browse the node library.
* [Community nodes](/integrations/community-nodes/installation/index.md) for guidance on finding and installing community-created nodes.
* [Creating nodes](/integrations/creating-nodes/overview.md) to start building your own nodes.


## Add a node to your workflow

### Add a node to an empty workflow

1. Select **Add first step**. n8n opens the nodes panel, where you can search or browse [trigger nodes](/glossary.md#trigger-node-n8n).
2. Select the trigger you want to use.

    /// note | Choose the correct app event
	If you select **On App Event**, n8n shows a list of all the supported services. Use this list to browse n8n's integrations and trigger a workflow in response to an event in your chosen service. Not all integrations have triggers. To see which ones you can use as a trigger, select the node. If a trigger is available, you'll see it at the top of the available operations list.

	For example, this is the trigger for Asana:

	![Screenshot of the Asana node operations list, showing the Recommended section at the top of the list](/_images/workflows/components/nodes/recommended-trigger.png)
	///

### Add a node to an existing workflow

Select the **Add node** <span class="n8n-inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector. n8n opens the nodes panel, where you can search or browse all nodes.

--8<-- "_snippets/integrations/builtin/node-operations.md"

## Node controls

To view node controls, hover over the node on the canvas:

* **Execute step** <span class="n8n-inline-image">![Execute step icon](/_images/common-icons/play-node.png){.off-glb}</span>: Run the node.
* **Deactivate** <span class="n8n-inline-image">![Deactivate node icon](/_images/common-icons/power-off.png){.off-glb}</span>: Deactivate the node.
* **Delete** <span class="n8n-inline-image">![Delete node icon](/_images/common-icons/delete-node.png){.off-glb}</span>: Delete the node.
* **Node context menu** <span class="n8n-inline-image">![Node context menu icon](/_images/common-icons/node-context-menu.png){.off-glb}</span>: Select node actions. Available actions:
	* Open node
	* Execute step
	* Rename node
	* Deactivate node
	* Pin node
	* Copy node
	* Duplicate node
	* Tidy up workflow
	* Convert node to sub-workflow
	* Select all
	* Clear selection
    * Delete node

## Node settings

The node settings under the **Settings** tab allow you to control node behaviors and add node notes.

When active or set, they do the following:

* **Always Output Data**: The node returns an empty item even if the node returns no data during execution. Be careful setting this on IF nodes, as it could cause an infinite loop.
* **Execute Once**: The node executes once, with data from the first item it receives. It doesn't process any extra items.
* **Retry On Fail**: When an execution fails, the node reruns until it succeeds. 
* **On Error**: 
    - **Stop Workflow**: Halts the entire workflow when an error occurs, preventing further node execution.
    - **Continue**: Proceeds to the next node despite the error, using the last valid data.
    - **Continue (using error output)**: Continues workflow execution, passing error information to the next node for potential handling.

You can document your workflow using node notes:

* **Notes**: Note to save with the node.
* **Display note in flow**: If active, n8n displays the note in the workflow as a subtitle.
