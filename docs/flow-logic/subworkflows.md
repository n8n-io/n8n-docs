---
contentType: howto
description: Call workflows from other workflows, and split large workflows into smaller components.
---

# Sub-workflows

You can call one workflow from another workflow. This allows you to build modular, microservice-like workflows. It can also help if your workflow grows large enough to encounter [memory issues](/hosting/scaling/memory-errors/). Creating sub-workflows uses the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) and [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger/) nodes.

## Set up and use a sub-workflow

This section walks through setting up both the parent workflow and sub-workflow.

### Create the sub-workflow

1. Create a new workflow.
1. **Optional**: configure which workflows can call the sub-workflow:
	1. Select the **Options** <span class="inline-image">![Options menu](/_images/common-icons/three-dot-options-menu.png)</span> menu > **Settings**. n8n opens the **Workflow settings** modal.
	1. Change the **This workflow can be called by** setting.	Refer to [Workflow settings](/workflows/settings/) for more information on configuring your workflows.
1. Add the **Execute Workflow Trigger** node.
1. Add other nodes as needed to build your sub-workflow functionality.		
1. Save the sub-workflow.

!!! note "Sub-workflow mustn't contain errors"
	If there are errors in the sub-workflow, the parent workflow can't trigger it.  

!!! note "Load data into sub-workflow before building"
	This requires the ability to [load data from previous executions](/workflows/executions/debug/), which is available to Pro and Enterprise users.

	If you want to load data into your subworkflow to use while building it:

	1. Create the subworkflow and add the **Execute Workflow Trigger**. 
	1. In the subworkflow [settings](/workflows/settings/), set **Save successful production executions** to **Save**. 
	1. Skip ahead to setting up the parent workflow, and run it.
	1. Follow the steps to [load data from previous executions](/workflows/executions/debug/).
	You'll now have example data pinned in the trigger node, which allows you to work with real data when configuring the rest of the workflow.

### Call the sub-workflow

1. Open the workflow where you want to call the sub-workflow.
1. Add the **Execute Workflow** node.
1. In the **Execute Workflow** node, set the sub-workflow you want to call. You can choose to call the workflow by ID, load a workflow from a local file, add workflow JSON as a parameter in the node, or target a workflow by URL.

	!!! note "Find your workflow ID"
		Your sub-workflow's ID is the alphanumeric string at the end of its URL.

1. Save your workflow.

When your workflow executes, it will send data to the sub-workflow, and run it.

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
