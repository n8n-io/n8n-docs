# Notion Trigger

[Notion](https://notion.so) is an all-in-one workspace for your notes, tasks, wikis, and databases.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/notion/).


## Example Usage

This workflow allows you to receive a message on Mattermost when new meeting notes get added to the Notion. You can also find the [workflow](https://n8n.io/workflows/1089) on Workflow².io. This example usage workflow would use the following nodes.
- [Notion Trigger]()
- [IF](/workflow/integrations/core-nodes/n8n-nodes-base.if/)
- [Mattermost](/workflow/integrations/nodes/n8n-nodes-base.mattermost/)
- [No Operation, do nothing](/workflow/integrations/core-nodes/n8n-nodes-base.noOp/)

The final workflow should look like the following image.

![A workflow with the Notion Trigger node](/_images/integrations/trigger-nodes/notiontrigger/workflow.png)

### 1. Notion Trigger node

The Notion Trigger node will trigger the workflow when new data gets added to Notion.

1. First of all, you'll have to enter credentials for the Notion Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/notion/).
2. Click on ***Add Poll Time*** and select 'Every Hour' from the ***Mode*** dropdown list. This will check Notion every hour for new meeting notes.
3. Select 'Page Added to Database' from the ***Event*** dropdown list.
4. Select the database that contains the meeting notes from the ***Database*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the new data from Notion. This output gets passed on to the next node in the workflow.

**Note:** Make sure to add a field with the `Created Time` property type in your Notion database.

![Using the Notion Trigger node to trigger the workflow](/_images/integrations/trigger-nodes/notiontrigger/notiontrigger_node.png)

### 2. IF node

This node will check if the notes belong to the `Marketing` team. If the team is `Marketing` the node will return `true`, otherwise `false`.

1. Click on ***Add Condition*** and select 'String'.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > properties > Team. You can also add the following expression: `{{$json["properties"]["Team"]}}`.
4. Enter `Marketing` in the ***Value 2*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node checks the team that we received from the previous node and returns `true` if the value equals `Marketing`.

![Using the IF node to check the team](/_images/integrations/trigger-nodes/notiontrigger/if_node.png)

### 3. Mattermost node (post: message)

This node will send a message about the new data in the channel 'Marketing' in Mattermost. If you have a different channel, use that instead.

1. First of all, you'll have to enter credentials for the Mattermost node. You can find out how to do that [here](/workflow/integrations/credentials/mattermost/).

2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.
4. Enter the following message in the ***Expression*** field:
```
New meeting notes got added.
Agenda: {{$json["properties"]["Agenda"]["content"]}}
Date: {{$json["properties"]["created time"]}}
```
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sends a message in Mattermost about the new data that got added to Notion.

![Using the Mattermost node to send a message](/_images/integrations/trigger-nodes/notiontrigger/mattermost_node.png)

### 5. NoOp node

Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.

1. Create a ***NoOp*** node connected to the 'false' output of the IF node.
2. Click on ***Execute Node*** to run the node.

![Using the NoOp node](/_images/integrations/trigger-nodes/notiontrigger/noop_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Notion Trigger node.

