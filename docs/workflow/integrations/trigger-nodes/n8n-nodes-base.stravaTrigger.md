# Strava Trigger

[Strava](https://www.strava.com/) is an internet service for tracking human exercise which incorporates social network features.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/strava/).


## Events

*
- `*`
- Created
- Deleted
- Updated


**Activity**
- `*`
- Created
- Deleted
- Updated


**Athlete**
- `*`
- Created
- Deleted
- Updated


## Example Usage

This workflow allows you to receive updates when a new activity gets created in Strava using the Strava Trigger node. It also allows you to tweet about the activity that was created in Strava using the Twitter node. You can also find the [workflow](https://n8n.io/workflows/745) on n8n.io. This example usage workflow would use the following node.
- [Strava Trigger]()
- [Twitter](/integrations/nodes/n8n-nodes-base.twitter/)

The final workflow should look like the following image.

![A workflow with the Strava Trigger node](/_images/integrations/trigger-nodes/stravatrigger/workflow.png)

### 1. Strava Trigger node

This node will trigger the workflow when a new activity gets created in Strava.

1. First of all, you'll have to enter credentials for the Strava Trigger node. You can find out how to do that [here](/integrations/credentials/strava/).
2. Select 'Activity' from the ***Object*** dropdown list.
3. Select 'created' from the ***Event*** dropdown list.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node triggers the workflow when a new activity gets created in Strava.

![Using the Strava Trigger node to receive updates when a new activity is created](/_images/integrations/trigger-nodes/stravatrigger/stravatrigger_node.png)

### 2. Twitter node (create: tweet)

This node will tweet about the activity that gets created in Strava.

1. First of all, you'll have to enter credentials for the Twitter node. You can find out how to do that [here](/integrations/credentials/twitter/).
2. Click on the gears icon next to the ***Text*** field and click on ***Add Expression***.

3. Enter the following text in the ***Expression*** field: `I ran {{$node["Strava Trigger"].json["object_data"]["distance"]}} meters and completed my {{$node["Strava Trigger"].json["object_data"]["name"]}}!`
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that this node gets the information of the activity in Strava from the previous node and tweets about it.

![Using the Twitter node to tweet about the activity](/_images/integrations/trigger-nodes/stravatrigger/twitter_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Strava Trigger node.

