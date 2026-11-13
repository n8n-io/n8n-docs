---
title: Execute Sub-workflow
description: >-
  Documentation for the Execute Sub-workflow node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Execute Sub-workflow
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow
layout:
  description:
    visible: false
---

# Execute Sub-workflow <a href="#execute-sub-workflow" id="execute-sub-workflow"></a>

Use the Execute Sub-workflow node to run a different workflow on the host machine that runs n8n.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Source <a href="#source" id="source"></a>

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

### Workflow Inputs <a href="#workflow-inputs" id="workflow-inputs"></a>

If you select a sub-workflow using the **database** and **From list** options, the sub-workflow's input items will automatically display, ready for you to fill in or map values.

You can optionally remove requested input items, in which case the sub-workflow receives `null` as the item's value. You can also enable **Attempt to convert types** to try to automatically convert data to the sub-workflow item's requested type.

Input items won't appear if the sub-workflow's Workflow Input Trigger node uses the "Accept all data" input data mode.

### Mode <a href="#mode" id="mode"></a>

Use this parameter to control the execution mode for the node. Choose from these options:

- **Run once with all items**: Pass all input items into a single execution of the node.
- **Run once for each item**: Execute the node once for each input item in turn.

## Node options <a href="#node-options" id="node-options"></a>

This node includes one option: **Wait for Sub-Workflow Completion**. This lets you control whether the main workflow should wait for the sub-workflow's completion before moving on to the next step (turned on) or whether the main workflow should continue without waiting (turned off).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Execute Sub-workflow integration templates](https://n8n.io/integrations/execute-workflow) or [search all templates](https://n8n.io/workflows/)

## Set up and use a sub-workflow <a href="#set-up-and-use-a-sub-workflow" id="set-up-and-use-a-sub-workflow"></a>

This section walks through setting up both the parent workflow and sub-workflow.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wlwT5JcWyWTecnDN6aul/" %}


## How data passes between workflows <a href="#how-data-passes-between-workflows" id="how-data-passes-between-workflows"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/edKlUxnfiRMq38CujuFv/" %}
