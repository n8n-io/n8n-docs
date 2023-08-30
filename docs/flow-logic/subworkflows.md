---
contentType: howto
description: Call workflows from other workflows, and split large workflows into smaller components.
---

# Sub-workflows

You can call one workflow from another workflow. This allows you to build modular, microservice-like workflows. It can also help if your workflow grows large enough to encounter [memory issues](/hosting/scaling/memory-errors/).

## Set up and use a sub-workflow

### Create the sub-workflow

1. Create a new workflow.
1. **Optional**: configure which workflows can call the sub-workflow:
	1. Select the **Options** <span class="inline-image">![Options menu](/_images/common-icons/three-dot-options-menu.png)</span> menu > **Settings**. n8n opens the **Workflow settings** modal.
	1. Change the **This workflow can be called by** setting.

	Refer to [Workflow settings](/workflows/settings/) for more information on configuring your workflows.
1. Add the **Execute Workflow Trigger** node.
1. Add other nodes as needed to build your sub-workflow functionality.

### Call the sub-workflow

1. Open the workflow where you want to call the sub-workflow.
1. Add the **Execute Workflow** node.
1. In the **Execute Workflow** node, set the sub-workflow you want to call. You can choose to call the workflow by ID, load a workflow from a local file, add workflow JSON as a parameter in the node, or target a workflow by URL.

	!!! note "Find your workflow ID"
		Your sub-workflow's ID is the alphanumeric string at the end of its URL.

[TODO: resume once unstuck on building the example - possible new ID issue?]
