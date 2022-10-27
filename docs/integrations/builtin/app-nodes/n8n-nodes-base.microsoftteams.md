# Microsoft Teams

[Microsoft Teams](https://teams.microsoft.com/) is a business-oriented communication and collaboration platform that combines workplace chat, video meetings, file storage , and application integration.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/microsoft/).


## Basic Operations

* Channel
    * Create a channel
    * Delete a channel
    * Get a channel
    * Get all channels
    * Update a channel
* Channel Message (Beta)
    * Create a message
    * Get all messages
* Task
    * Create a task
    * Delete a task
    * Get a task
    * Get all tasks
    * Update a task

## Example Usage

This workflow allows you to create, update and send a message to a channel in Microsoft Teams. You can also find the [workflow](https://n8n.io/workflows/680) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Microsoft Teams]()

The final workflow should look like the following image.

![A workflow with the Microsoft Teams node](/_images/integrations/builtin/app-nodes/microsoftteams/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Microsoft Teams node (create: channel)

1. First of all, you'll have to enter credentials for the Microsoft Teams node. You can find out how to do that [here](/integrations/builtin/credentials/microsoft/).
2. Select the team that you want to use from the ***Team ID*** dropdown list.
3. Enter a name for the channel in the ***Name*** field.
4. Click on ***Execute Node*** to run the node.

![Create a channel with the Microsoft Teams node](/_images/integrations/builtin/app-nodes/microsoftteams/microsoftteams_node.png)


### 3. Microsoft Teams1 node (update: channel)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Team ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Microsoft Teams > Parameters > teamId. You can also add the following expression: `{{$node["Microsoft Teams"].parameter["teamId"]}}`
5. Click on the gears icon next to the ***Channel ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Microsoft Teams > Output > JSON > id. You can also add the following expression: `{{$node["Microsoft Teams"].json["id"]}}`
7. Click on the ***Add Field*** button and select 'Name' from the dropdown list.
8. Enter a new channel name in the ***Name*** field.
9. Click on ***Execute Node*** to run the node.

![Update a Channel with the Microsoft Teams node](/_images/integrations/builtin/app-nodes/microsoftteams/microsoftteams1_node.png)



### 4. Microsoft Teams2 node (create: channelMessage)

1. Select the credentials that you entered in the previous node.
2. Select 'Channel Message (Beta)' from the ***Resource*** dropdown list.
3. Click on the gears icon next to the ***Team ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Microsoft Teams > Parameters > teamId. You can also add the following expression: `{{$node["Microsoft Teams"].parameter["teamId"]}}`
5. Click on the gears icon next to the ***Channel ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Microsoft Teams > Output > JSON > id. You can also add the following expression: `{{$node["Microsoft Teams"].json["id"]}}`
7. Select 'Text' from the ***Message Type*** dropdown list.
8. Enter a message in the ***Message*** field.
9. Click on ***Execute Node*** to run the node.

![Send a message with the Microsoft Teams node](/_images/integrations/builtin/app-nodes/microsoftteams/microsoftteams2_node.png)

