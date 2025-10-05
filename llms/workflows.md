

# workflows/components/connections.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: A connection establishes a link between nodes to route data through the workflow. 
contentType: howto
---

# Connections

A connection establishes a link between nodes to route data through the workflow. A connection between two nodes passes data from one node's output to another node's input.

![Example of creating and deleting a connection](/_images/workflows/components/connections/example.gif)

## Create a connection

To create a connection between two nodes, select the grey dot or **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> on the right side of a node and slide the arrow to the grey rectangle on the left side of the following node.

## Delete a connection

Hover over the connection, then select **Delete** <span class="inline-image">![Delete connector icon](/_images/common-icons/delete-connector.png){.off-glb}</span>.




# workflows/components/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Learn about the building blocks of workflows.
contentType: overview
---

# Workflow components

This section contains:

* [Nodes](/workflows/components/nodes.md): integrations and operations.
* [Connections](/workflows/components/connections.md): node connectors.
* [Sticky notes](/workflows/components/sticky-notes.md): document your workflows.


# workflows/components/nodes.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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

Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector. n8n opens the nodes panel, where you can search or browse all nodes.

--8<-- "_snippets/integrations/builtin/node-operations.md"

## Node controls

To view node controls, hover over the node on the canvas:

* **Execute step** <span class="inline-image">![Execute step icon](/_images/common-icons/play-node.png){.off-glb}</span>: Run the node.
* **Deactivate** <span class="inline-image">![Deactivate node icon](/_images/common-icons/power-off.png){.off-glb}</span>: Deactivate the node.
* **Delete** <span class="inline-image">![Delete node icon](/_images/common-icons/delete-node.png){.off-glb}</span>: Delete the node.
* **Node context menu** <span class="inline-image">![Node context menu icon](/_images/common-icons/node-context-menu.png){.off-glb}</span>: Select node actions. Available actions:
	* Open node
	* Execute step
	* Rename node
	* Deactivate node
	* Pin node
	* Copy node
	* Duplicate node
	* Select all
	* Clear selection
	* Delete node

## Node settings

The node settings under the **Settings** tab allow you to control node behaviors and add node notes.

When active or set, they do the following:

* **Request Options**: Select **Add Option** to view and select these options. 
	- **Batching**: Control how to batch large numbers of input items.
	- **Ignore SSL Issues**: Download the response even if SSL validation isn't possible.
	- **Proxy**: Use this if you need to specify an HTTP proxy.
	- **Timeout**: Set a timeout for the request in ms. 
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


# workflows/components/sticky-notes.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Annotate your workflows using sticky notes.
contentType: howto
---

# Sticky Notes

Sticky Notes allow you to annotate and comment on your workflows.

n8n recommends using Sticky Notes heavily, especially on [template workflows](/glossary.md#template-n8n), to help other users understand your workflow.

![Screenshot of a basic workflow with an example sticky note](/_images/workflows/components/stickies/example-sticky-note.png)

## Create a Sticky Note

Sticky Notes are a core node. To add a new Sticky Note:

1. Open the nodes panel.
2. Search for `note`.
3. Click the **Sticky Note** node. n8n adds a new Sticky Note to the canvas.

## Edit a Sticky Note

1. Double click the Sticky Note you want to edit.
2. Write your note. [This guide](https://commonmark.org/help/) explains how to format your text with Markdown. n8n uses [markdown-it](https://github.com/markdown-it/markdown-it), which implements the CommonMark specification. 
3. Click away from the note, or press `Esc`, to stop editing.

## Change the color

To change the Sticky Note color:

1. Hover over the Sticky Note
1. Select **Change color** <span class="inline-image">![Change Sticky Note color icon](/_images/common-icons/change-color.png){.off-glb}</span>

## Sticky Note positioning

You can:

* Drag a Sticky Note anywhere on the canvas.
* Drag Sticky Notes behind nodes. You can use this to visually group nodes.
* Resize Sticky Notes by hovering over the edge of the note and dragging to resize.
* Change the color: select **Options** <span class="inline-image">![Options icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> to open the color selector.

## Writing in Markdown

Sticky Notes support Markdown formatting. This section describes some common options.

```
The text in double asterisks will be **bold**

The text in single asterisks will be *italic*

Use # to indicate headings:
# This is a top-level heading
## This is a sub-heading
### This is a smaller sub-heading

You can add links:
[Example](https://example.com/)

Create lists with asterisks:

* Item one
* Item two

Or created ordered lists with numbers:

1. Item one
2. Item two
```

For a more detailed guide, refer to [CommonMark's help](https://commonmark.org/help/). n8n uses [markdown-it](https://github.com/markdown-it/markdown-it), which implements the CommonMark specification.

## Make images full width

You can force images to be 100% width of the sticky note by appending `#full-width` to the filename:

```markdown
![Source example](https://<IMAGE-URL>/<IMAGE-NAME>.png#full-width)
```


# workflows/create.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Create, run, and activate workflows.
contentType: howto
---

# Create a workflow

A [workflow](/glossary.md#workflow-n8n) is a collection of nodes connected together to automate a process. You build workflows on the [workflow canvas](/glossary.md#canvas-n8n).

## Create a workflow

1. Select the <span class="inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **button** in the upper-left corner of the side menu. Select workflow.
2. If your n8n instance supports projects, you'll also need to choose whether to create the workflow inside your **personal space** or a specific **project** you have access to. If you're using the community version, you'll always create workflows inside your personal space.
3. Get started by adding a trigger node: select **Add first step...**

Or:

1. Select the  <span class="inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **create** button in the upper-right corner from either the **Overview** page or a specific **project**. Select workflow.
2. If you're doing this from the **Overview** page, you'll create the workflow inside your personal space. If you're doing this from inside a project, you'll create the workflow inside that specific project.
3. Get started by adding a trigger node: select **Add first step...**

If it's your first time building a workflow, you may want to use the [quickstart guides](/try-it-out/index.md) to quickly try out n8n features.

## Run workflows manually

You may need to run your workflow manually when building and testing, or if your workflow doesn't have a trigger node. 

To run manually, select **Test Workflow**.

## Run workflows automatically

All new workflows are inactive by default.

You need to activate workflows that start with a trigger node or Webhook node so that they can run automatically. When a workflow is inactive, you must run it manually.

To activate or deactivate your workflow, open your workflow and toggle **Inactive** / **Active**.

Once a workflow is active, it runs whenever its trigger conditions are met.


# workflows/executions/all-executions.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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
2. On the execution you want to retry, select **Retry execution** <span class="inline-image">![Options menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
--8<-- "_snippets/workflows/executions/retry-options.md"

## Load data from previous executions into your current workflow

You can load data from a previous workflow back into the canvas. Refer to [Debug executions](/workflows/executions/debug.md) for more information.


# workflows/executions/custom-executions-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Add custom data to your workflow executions using the Code node. You can then filter executions by this data.
contentType: howto
---

# Custom executions data

You can set custom data on your workflow using the Code node or the [Execution Data node](/integrations/builtin/core-nodes/n8n-nodes-base.executiondata.md). n8n records this with each execution. You can then use this data when filtering the executions list, or fetch it in your workflows using the Code node.

--8<-- "_snippets/workflows/executions/custom-execution-data-availability.md"

## Set and access custom data using the Code node

This section describes how to set and access data using the Code node. Refer to [Execution Data node](/integrations/builtin/core-nodes/n8n-nodes-base.executiondata.md) for information on using the Execution Data node to set data. You can't retrieve custom data using the Execution Data node.

### Set custom executions data

Set a single piece of extra data:

=== "JavaScript"
	```js
	$execution.customData.set("key", "value");
	```
=== "Python"
	```python
	_execution.customData.set("key", "value");
	```

Set all extra data. This overwrites the whole custom data object for this execution:

=== "JavaScript"
	```js
	$execution.customData.setAll({"key1": "value1", "key2": "value2"})
	```
=== "Python"
	```python
	_execution.customData.setAll({"key1": "value1", "key2": "value2"})
	```

There are limitations:

* They must be strings
* `key` has a maximum length of 50 characters
* `value` has a maximum length of 255 characters
* n8n supports a maximum of 10 items of custom data

### Access the custom data object during execution

You can retrieve the custom data object, or a specific value in it, during an execution:

<!-- vale off -->
=== "JavaScript"
	```js
	// Access the current state of the object during the execution
	const customData = $execution.customData.getAll();

	// Access a specific value set during this execution
	const customData = $execution.customData.get("key");
	```
=== "Python"
	```python
	# Access the current state of the object during the execution
	customData = _execution.customData.getAll();

	# Access a specific value set during this execution
	customData = _execution.customData.get("key");
	```
<!-- vale on -->


# workflows/executions/debug.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Debug and re-run past executions
description: How to copy execution data into your current workflow in order to debug previous executions.
---

# Debug and re-run past executions

/// info | Feature availability
Available on n8n Cloud and registered Community plans.
///

You can load data from a previous execution into your current workflow. This is useful for debugging data from failed production executions: you can see a failed execution, make changes to your workflow to fix it, then re-run it with the previous execution data.

## Load data

To load data from a previous execution:

1. In your workflow, select the **Executions** tab to view the **Executions** list.
1. Select the execution you want to debug. n8n displays options depending on whether the workflow was successful or failed:
	* For failed executions: select **Debug in editor**.
	* For successful executions: select **Copy to editor**.
1. n8n copies the execution data into your current workflow, and [pins the data](/data/data-pinning.md) in the first node in the workflow.

/// note | Check which executions you save
The executions available on the **Executions** list depends on your [Workflow settings](/workflows/settings.md).
///


# workflows/executions/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: An execution is a single run of a workflow.
contentType: overview
---

# Executions

An execution is a single run of a workflow.

## Execution modes

There are two execution modes:

* Manual: run workflows manually when testing. Select **Test Workflow** to start a manual execution. You can do manual executions of active workflows, but n8n recommends keeping your workflow set to **Inactive** while developing and testing.
* Production: a production workflow is one that runs automatically. To enable this, set the workflow to **Active**.


## Execution lists

n8n provides two execution lists:

* [Workflow-level executions](/workflows/executions/single-workflow-executions.md): this execution list shows the executions for a single workflow.
* [All executions](/workflows/executions/all-executions.md): this list shows all executions for all your workflows.

n8n supports [adding custom data to executions](/workflows/executions/custom-executions-data.md).


# workflows/executions/manual-partial-and-production-executions.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Manual, partial, and production executions
description: How manual, partial, and automatic workflow executions differ.
contentType: explanation
---

# Manual, partial, and production executions

There are some important differences in how n8n executes workflows manually (by clicking the **Test Workflow** button) and automatically (when the workflow is **Active** and triggered by an event or schedule).

## Manual executions

Manual executions allow you to run workflows directly from the [canvas](/glossary.md#canvas-n8n) to test your workflow logic. These executions are "ad-hoc": they run only when you manually select the **Execute workflow** button.

Manual executions make building workflows easier by allowing you to iteratively test as you go, following the flow logic and seeing data transformations. You can test conditional branching, data formatting changes, and loop behavior by providing different input items and modifying node options.

/// note | Pinning execution data
When performing manual executions, you can use [data pinning](/data/data-pinning.md) to "pin" or "freeze" the output data of a node. You can optionally [edit the pinned data](https://docs.n8n.io/data/data-editing/) as well.

On future runs, instead of executing the pinned node, n8n will substitute the pinned data and continue following the flow logic. This allows you to iterate without operating on variable data or repeating queries to external services. Production executions ignore all pinned data.
///

## Partial executions

Clicking the **Execute workflow** button at the bottom of the workflow in the **Editor** tab manually runs the entire workflow. You can also perform partial executions to run specific steps in your workflow. Partial executions are manual executions that only run a subset of your workflow nodes.

To perform a partial execution, select a node, open its detail view, and select **Execute step**. This executes the specific node and any preceding nodes required to fill in its input data. You can also temporarily disable specific nodes in the workflow chain to avoid interacting with those services while building.

In particular, partial executions are useful when updating the logic of a specific node since they allow you to re-execute the node with the same input data.

### Troubleshooting partial executions

Some common issues you might come across when running partial executions include the following:

<!-- vale from-microsoft.Contractions = NO -->
> The destination node is not connected to any trigger. Partial executions need a trigger.
<!-- vale from-microsoft.Contractions = YES -->

This error message appears when you try to perform a partial execution without connecting the workflow to a trigger. Manual executions, including partial executions, attempt to mimic production executions when possible. Part of this includes requiring a trigger node to describe when the workflow logic should execute.

To work around this, connect a trigger node to the workflow with the node you're trying to execute. Most often, a [manual trigger](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger.md) is the simplest option.

> Please execute the whole workflow, rather than just the node. (Existing execution data is too large.)

This error can appear when performing partial executions on workflows with large numbers of branches. Partial executions involve sending data and workflow logic to the n8n backend in a way that isn't required for full executions. This error occurs when your workflow exceeds the maximum size allowed for these messages.

To work around this, consider using the [limit node](/integrations/builtin/core-nodes/n8n-nodes-base.limit.md) to limit node output while running partial executions. Once the workflow is running as intended, you can disable or delete the limit node before enabling production execution.

## Production executions

Production executions occur when a triggering event or schedule automatically runs a workflow.

To configure production executions, you must attach a [trigger node](/glossary.md#trigger-node-n8n) (any trigger other than the [manual trigger](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger.md) works) and switch workflow's toggle to **Active**. Once activated, the workflow automatically executes whenever the trigger condition occurs.

The execution flow for production executions doesn't display in the Editor tab of the workflow as with manual executions. Instead, you can see executions in the workflow's **Executions** tab according to your [workflow settings](/workflows/settings.md). From there, you can explore and troubleshoot problems using the [debug in editor feature](/workflows/executions/debug.md).


# workflows/executions/single-workflow-executions.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: View and filter all executions for the workflow currently open on the canvas.
contentType: howto
---

# Workflow-level executions list

The **Executions** list in a workflow shows all executions for that workflow.

/// note | Deleted workflows
When you delete a workflow, n8n deletes its execution history as well. This means you can't view executions for deleted workflows.
///

/// note | Execution history and workflow history
Don't confuse the execution list with [Workflow history](/workflows/history.md).

Executions are workflow runs. With the executions list, you can see previous runs of the current version of the workflow. You can copy previous executions into the editor to [Debug and re-run past executions](/workflows/executions/debug.md) in your current workflow.

Workflow history is previous versions of the workflow: for example, a version with a different node, or different parameters set.
///


## View executions for a single workflow

In the workflow, select the **Executions** tab in the top menu. You can preview all executions of that workflow.

## Filter executions

You can filter the executions list.

1. In your workflow, select **Executions**.	
2. Select **Filters**.
3. Enter your filters. You can filter by:
	* **Status**: choose from **Failed**, **Running**, **Success**, or **Waiting**.
	* **Execution start**: see executions that started in the given time.
	* **Saved custom data**: this is data you create within the workflow using the Code node. Enter the key and value to filter. Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for information on adding custom data.

		--8<-- "_snippets/workflows/executions/custom-execution-data-availability.md"


## Retry failed workflows

If your workflow execution fails, you can retry the execution. To retry a failed workflow:

1. Open the **Executions** list.
2. For the workflow execution you want to retry, select **Refresh** <span class="inline-image">![Refresh icon](/_images/common-icons/refresh.png){.off-glb}</span>.
--8<-- "_snippets/workflows/executions/retry-options.md"


# workflows/export-import.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Export and import workflows
description: Different ways to export and import workflows in n8n.
contentType: howto
---

# Export and import workflows

n8n saves workflows in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. 
You can export and import workflows in several ways. 

--8<-- "_snippets/workflows/sharing-credentials.md"

## Copy-Paste

You can copy and paste a workflow or parts of it by selecting the nodes you want to copy to the clipboard (`Ctrl + c` or `cmd +c`) and pasting it (`Ctrl + v` or `cmd + v`) into the Editor UI.

To select all nodes or a group of nodes, click and drag:
  ![Select a group of nodes](/_images/workflows/export-import/selectingnodes.gif)

## From the Editor UI menu

From the top navigation bar, select the three dots in the upper right <img alt="Workflow menu icon" class="off-glb" src="/_images/common-icons/three-dots-horizontal.png"> to see the following options: 

<figure><img src="/_images/courses/level-one/chapter-six/l1-c6-import-export-menu.png" alt="Import/Export menu" style="width:100%"><figcaption align = "center"><i>Import & Export workflows menu</i></figcaption></figure>

* **Download**: Downloads your current workflow as a JSON file to your computer.
* **Import from URL**: Imports workflow JSON from a URL, for example, [this workflow JSON file on GitHub](https://raw.githubusercontent.com/n8n-io/demo-setup/main/n8n/backup/workflows/srOnR8PAY3u4RSwb.json){:target=_blank .external-link}. 
* **Import from File**: Imports a workflow as a JSON file from your computer.

## From the command line

* Export: See the [full list of commands ](/hosting/cli-commands.md#export-workflows-and-credentials){:target="_blank" .external} for exporting workflows or credentials.
* Import: See the [full list of commands ](/hosting/cli-commands.md#import-workflows-and-credentials){:target="_blank" .external} for importing workflows or credentials.

# workflows/history.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workflow history
description: View and restore previous versions of your workflow.
contentType: howto
---

# Workflow history

/// info | Feature availability
* Full workflow history is available on Enterprise Cloud and Enterprise Self-hosted.
* Versions from the last five days are available for Cloud Pro users.
* Versions from the last 24 hours are available for registered Community users.
///	

Use workflow history to view and restore previous versions of your workflows. 

## Understand workflow history

n8n creates a new version when you:

 * Save your workflow.
 * Restore an old version. n8n saves the latest version before restoring.
 * Pull from a Git repository using [Source control](/source-control-environments/index.md). Note that n8n saves versions to the instance database, not to Git.

/// note | Workflow history and execution history
Don't confuse workflow history with the [Workflow-level executions list](/workflows/executions/single-workflow-executions.md).

Executions are workflow runs. With the executions list, you can see previous runs of the current version of the workflow. You can copy previous executions into the editor to [Debug and re-run past executions](/workflows/executions/debug.md) in your current workflow.

Workflow history is previous versions of the workflow: for example, a version with a different node, or different parameters set.
///


## View workflow history

To view a workflow's history:

1. Open the workflow.
1. Select **Workflow history** <span class="inline-image">![Workflow history icon](/_images/common-icons/workflow-history.png){.off-glb}</span>. n8n opens a menu showing the saved workflow versions, and a canvas with a preview of the selected version.

## Restore or copy previous versions

You can restore a previous workflow version, or make a copy of it:

1. On the version you want to restore or copy, select **Options** <span class="inline-image">![Options icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
1. Choose what you want to do:
	* **Restore this version**: replace your current workflow with the selected version.
	* **Clone to new workflow**: create a new workflow based on the selected version.
	* **Open version in new tab**: open a second tab displaying the selected version. Use this to compare versions.
	* **Download**: download the version as JSON.


# workflows/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: "Learn about the key components of automation in n8n."
contentType: overview
---

# Workflows

A [workflow](/glossary.md#workflow-n8n) is a collection of nodes connected together to automate a process.


* [Create](/workflows/create.md) a workflow.
* Use [Workflow templates](/workflows/templates.md) to help you get started.
* Learn about the key [components](/workflows/components/index.md) of an automation in n8n.
* Debug using the [Executions](/workflows/executions/index.md) list.
* [Share](/workflows/sharing.md) workflows between users.

If it's your first time building a workflow, you may want to use the [quickstart guides](/try-it-out/index.md) to quickly try out n8n features.


# workflows/settings.md

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

* **Execution order**: choose the execution order for multi-branch workflows. **v0 (legacy)** executes the first node of each branch, then the second node of each branch, and so on. **v1 (recommended)** executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the [canvas](/glossary.md#canvas-n8n), from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.
* **Error Workflow**: select a workflow to trigger if the current workflow fails. See [Error workflows](/flow-logic/error-handling.md) for more details.
* **This workflow can be called by**: choose whether other workflow can call this workflow.
* **Timezone**: sets the timezone for the workflow to use. The default timezone is EDT (New York). The timezone setting is  important for the Schedule Trigger node.
* **Save failed production executions**: whether n8n should save failed executions for active workflows.
* **Save successful production executions**: whether n8n should save successful executions for active workflows.
* **Save manual executions**: whether n8n should save executions for workflows started by the user in the editor.
* **Save execution progress**: whether n8n should save execution data for each node. If set to **Save**, the workflow resumes from where it stopped in case of an error. This might increase latency.
* **Timeout Workflow**: toggle to enable setting a duration after which n8n should cancel the current workflow execution.
	* **Timeout After**: Set the time in hours, minutes, and seconds after which the workflow should timeout. For n8n Cloud users n8n enforces a maximum available timeout for each plan.


# workflows/sharing.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Share workflows between users.
contentType: howto
---

# Workflow sharing

/// info | Feature availability
Available on Pro and Enterprise Cloud plans, and Enterprise self-hosted plans.
///

Workflow sharing allows you to share workflows between users of the same n8n instance.

Users can share workflows they created. Instance owners, and users with the admin role, can view and share all workflows in the instance. Refer to [Account types](/user-management/account-types.md) for more information about owners and admins.

## Share a workflow

1. Open the workflow you want to share.
2. Select **Share**.
3. In **Add users**, find and select the users you want to share with.
4. Select **Save**.

## View shared workflows

You can browse and search workflows on the **Workflows** list. The workflows in the list depend on the project:

* **Overview** lists all workflows you can access. This includes:
	* Your own workflows.
	* Workflows shared with you.
	* Workflows in projects you're a member of.
	* If you log in as the instance owner or admin: all workflows in the instance.
* Other projects: all workflows in the project.

## Workflow roles and permissions

There are two workflow roles: creator and editor. The creator is the user who created the workflow. Editors are other users with access to the workflow.

You can't change the workflow owner, except when deleting the user.

/// note | Credentials
Workflow sharing allows editors to use all [credentials](/glossary.md#credential-n8n) used in the workflow. This includes credentials that aren't explicitly shared with them using [credential sharing](/credentials/credential-sharing.md).
///
### Permissions

| Permissions | Creator | Editor | 
| ----------- | ------- | ------ | 
| View workflow (read-only) | :white_check_mark: | :white_check_mark: |
| View executions | :white_check_mark: | :white_check_mark: |
| Update (including tags) | :white_check_mark: | :white_check_mark: |
| Run | :white_check_mark: | :white_check_mark: |
| Share | :white_check_mark: | :x: |
| Export | :white_check_mark: | :white_check_mark: |
| Delete | :white_check_mark: | :x: |

## Node editing restrictions with unshared credentials

Sharing in n8n works on the principle of least privilege. This means that if a user shares a workflow with you, but they don't share their credentials, you can't edit the nodes within the workflow that use those credentials. You can view and run the workflow, and edit nodes that don't use unshared credentials.

Refer to [Credential sharing](/credentials/credential-sharing.md) for guidance on sharing credentials.


# workflows/tags.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workflow tags
description: Use tags to label workflows, making it easier to browse your workflows.
contentType: howto
---

# Tags

Workflow tags allow you to label your workflows. You can then filter workflows by tag.

Tags are global. This means when you create a tag, it's available to all users on your n8n instance.

## Add a tag to a workflow

To add a tag to your workflow:

1. In your workflow, select **+ Add tag**.
2. Select an existing tag, or enter a new tag name.
3. Once you select a tag and click away from the tag modal, n8n displays the tag next to the workflow name.

You can add more than one tag.

## Filter by tag

When browsing the workflows on your instance, you can filter by tag.

1. On the **Workflows** page, select **Filters**.
2. Select **Tags**.
3. Select the tag or tags you want to filter by. n8n lists the workflows with that tag.

## Manage tags

You can edit existing tags. Instance owners can delete tags.

1. Select **Manage tags**. This is available from **Filters** > **Tags** on the **Workflows** page, or in the **+ Add tag** modal in your workflow.
2. Hover over the tag you want to change.
3. Select **Edit** <span class="inline-image">![Add node icon](/_images/common-icons/edit.png){.off-glb}</span> to rename it, or **Delete** <span class="inline-image">![Add node icon](/_images/common-icons/delete.png){.off-glb}</span> to delete it.

/// warning | Global tags
Tags are global. If you edit or delete a tag, this affects all users of your n8n instance.
///


# workflows/templates.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Use workflow templates
contentType: howto
---

# Workflow templates

When creating a new workflow, you can choose whether to start with an empty workflow, or use an existing [template](/glossary.md#template-n8n).

Templates provide:

* Help getting started: n8n might already have a template that does what you need.
* Examples of what you can build
* Best practices for creating your own workflows

## Access templates

Select <span class="inline-image">![View templates icon](/_images/common-icons/templates.png){.off-glb}</span> **Templates** to view the templates library.

If you use n8n's template library, this takes you to browse [Workflows on the n8n website](https://n8n.io/workflows/){:target=_blank .external-link}. If you use a custom library provided by your organization, you'll be able to search and browse the templates within the app.


## Add your workflow to the n8n library

--8<-- "_snippets/workflows/templates/submit-templates.md"

## Self-hosted n8n: Disable templates

--8<-- "_snippets/workflows/templates/disable-templates.md"

## Self-hosted n8n: Use your own library

--8<-- "_snippets/workflows/templates/custom-templates-library.md"


# workflows/workflow-id.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Find your workflow ID.
contentType: howto
---

# Find your workflow ID

Your workflow ID is available in:

* The URL of the open workflow.
* The workflow settings title.
