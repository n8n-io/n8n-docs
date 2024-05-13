### Create the sub-workflow

1. Create a new workflow.
1. **Optional**: configure which workflows can call the sub-workflow:
	1. Select the **Options** <span class="inline-image">![Options menu](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> menu > **Settings**. n8n opens the **Workflow settings** modal.
	1. Change the **This workflow can be called by** setting.	Refer to [Workflow settings](/workflows/settings/) for more information on configuring your workflows.
1. Add the **Execute Workflow Trigger** node.
1. Add other nodes as needed to build your sub-workflow functionality.		
1. Save the sub-workflow.

/// note | Sub-workflow mustn't contain errors
If there are errors in the sub-workflow, the parent workflow can't trigger it.  
///
/// note | Load data into sub-workflow before building
This requires the ability to [load data from previous executions](/workflows/executions/debug/), which is available to Pro and Enterprise users.

If you want to load data into your sub-workflow to use while building it:

1. Create the sub-workflow and add the **Execute Workflow Trigger**. 
1. In the sub-workflow [settings](/workflows/settings/), set **Save successful production executions** to **Save**. 
1. Skip ahead to setting up the parent workflow, and run it.
1. Follow the steps to [load data from previous executions](/workflows/executions/debug/).
You can now pin example data in the trigger node, enabling you to work with real data while configuring the rest of the workflow.
///


### Call the sub-workflow

1. Open the workflow where you want to call the sub-workflow.
1. Add the **Execute Workflow** node.
1. In the **Execute Workflow** node, set the sub-workflow you want to call. You can choose to call the workflow by ID, load a workflow from a local file, add workflow JSON as a parameter in the node, or target a workflow by URL.

    /// note | Find your workflow ID
    Your sub-workflow's ID is the alphanumeric string at the end of its URL.
    ///

1. Save your workflow.

When your workflow executes, it will send data to the sub-workflow, and run it.
