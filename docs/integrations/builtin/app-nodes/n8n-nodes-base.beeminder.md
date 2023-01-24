# Beeminder

[Beeminder](https://www.beeminder.com/){:target=_blank .external-link} node allows you to automate work in the Beereminder platform and integrate Beereminder with other applications. n8n has built-in support for a wide range of Beereminder features, which includes basic operations like creating, deleting, and updating datapoints.

On this page, you'll find a list of operations the Beereminder node supports and links to more resources.

!!! note "Credentials"
  Refer to the [Beereminder credentials](https://docs.n8n.io/integrations/builtin/credentials/beeminder/) for guidance on setting up authentication. 

!!! note "Examples & Templates"
  For example, usage and templates to help you get started, take a look at n8n's [Beereminder integrations](https://n8n.io/integrations/beeminder/){:target=_blank .external-link} list.



## Basic Operations

**Datapoint**
- Create datapoint for a goal
- Delete a datapoint
- Get all datapoints for a goal
- Update a datapoint


## Example Usage

This workflow allows you to add a datapoint to Beeminder when a new activity gets added to Strava. You can also find the [workflow](https://n8n.io/workflows/900) on n8n.io. This example usage workflow would use the following nodes.
- [Strava Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger/)
- [Beeminder]()

The final workflow should look like the following image.

![A workflow with the Beeminder node](/_images/integrations/builtin/app-nodes/beeminder/workflow.png)

### 1. Strava Trigger node

This node will trigger the workflow whenever a new activity gets added to your Strava account.

1. First of all, you'll have to enter credentials for the Strava Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/strava/).
2. Select 'created' from the ***Event*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node triggers the workflow when a new activity gets added to Strava.

![Using the Strava Trigger node to trigger the workflow](/_images/integrations/builtin/app-nodes/beeminder/stravatrigger_node.png)

### 2. Beeminder node (create: datapoint)

This node will create a datapoint for the goal `testing`. If you have created a goal with a different name, select that goal instead.

1. First of all, you'll have to enter credentials for the Beeminder node. You can find out how to do that [here](/integrations/builtin/credentials/beeminder/).
2. Select a goal from the ***Goal Name*** dropdown list.
3. Click on ***Add Field*** and select 'Comment'.
4. Click on the gears icon next to the ***Comment*** field and click on ***Add Expression***.

5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > object_data > name. You can also add the following expression: `{{$json["object_data"]["name"]}}`.

6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a datapoint in Beeminder.

![Using the Beeminder node to create a datapoint for a goal](/_images/integrations/builtin/app-nodes/beeminder/beeminder_node.png)

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Strava Trigger node.

