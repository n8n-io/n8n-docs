---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Execute Workflow
description: Documentation for the Execute Workflow node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: high
---

# Execute Workflow

Use the Execute Workflow node to run a different workflow on the host machine that runs n8n.

## Node parameters

### Source

Select where the node should get the sub-workflow's information from:

- **Database**: Select this option to load the workflow from the database by ID. You must also enter either:
	- **From list**: Select the workflow from a list of workflows available to your account.
	- **Workflow ID**: Enter the ID for the workflow. The URL of the workflow contains the ID after `/workflow/`. For example, if the URL of a workflow is `https://my-n8n-acct.app.n8n.cloud/workflow/abCDE1f6gHiJKL7`, the **Workflow ID** is `abCDE1f6gHiJKL7`.
- **Local File**: Select this option to load the workflow from a locally saved JSON file. You must also enter:
	- **Workflow Path**: Enter the path to the local JSON workflow file you want the node to execute.
- **Parameter**: Select this option to load the workflow from a parameter. You must also enter:
	- **Workflow JSON**: Enter the JSON code you want the node to execute.
- **URL**: Select this option to load the workflow from a URL. You must also enter:
	- **Workflow URL**: Enter the URL you want to load the workflow from.

### Workflow Inputs

If you select a sub-workflow using the **database** and **From list** options, the sub-workflow's input items will automatically display, ready for you to fill in or map values.

You can optionally remove requested input items, in which case the sub-workflow receives `null` as the item's value. You can also enable **Attempt to convert types** to try to automatically convert data to the sub-workflow item's requested type.

Input items won't appear if the sub-workflow's Workflow Input Trigger node uses the "Accept all data" input data mode.

### Mode

Use this parameter to control the execution mode for the node. Choose from these options:

- **Run once with all items**: Pass all input items into a single execution of the node.
- **Run once for each item**: Execute the node once for each input item in turn.

## Node options

This node includes one option: **Wait for Sub-Workflow Completion**. This lets you control whether the main workflow should wait for the sub-workflow's completion before moving on to the next step (turned on) or whether the main workflow should continue without waiting (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'execute-workflow') ]]

## Set up and use a sub-workflow

This section walks through setting up both the parent workflow and sub-workflow.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"


## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
