# Matrix

[Matrix](https://matrix.org) is an open standard for interoperable, decentralized, real-time communication over IP.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/matrix/).


## Basic Operations

* Account
    * Get current user's account information
* Event
    * Get single event by ID
* Media
    * Send media to a chat room
* Message
    * Send a message to a room
    * Gets all messages from a room
* Room
    * New chat room with defined settings
    * Invite a user to a room
    * Join a new room
    * Kick a user from a room
    * Leave a room
* Room Member
    * Get all members

## Example Usage

This workflow allows you to create a room, invite members from a different room, and send a message to the room that we created using the Matrix node. You can also find the [workflow](https://n8n.io/workflows/724) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Matrix]()
- [IF](/workflow/integrations/core-nodes/n8n-nodes-base.if/)
- [No Operation, do nothing](/workflow/integrations/core-nodes/n8n-nodes-base.noOp/)

The final workflow should look like the following image.

![A workflow with the Matrix node](/_images/integrations/nodes/matrix/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Matrix node (create: room)

This node will create a new room called `n8n` on the Matrix server.

1. First of all, you'll have to enter credentials for the Matrix node. You can find out how to do that [here](/workflow/integrations/credentials/matrix/).

2. Select 'Room' from the ***Resource*** dropdown list.
3. Enter `n8n` in the ***Room Name*** field. You can also enter a different name for the room.
4. Enter an alias for the room in the ***Room Alias*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a room `n8n` with an alias `#discussion-n8n:matrix.org`.

![Using the Matrix node to create a room](/_images/integrations/nodes/matrix/matrix_node.png)

### 3. Matrix1 node (me: account)

This node will get your account information from the Matrix server. We are doing this because Matrix will send an invite to all members of the room, including you. Since you are already a member of the room, you will get an error. We will use the data from this node later on to make sure that you don't send an invite to yourself.


1. Select the credentials that you entered in the previous node.
2. Select 'Account' from the ***Resource*** dropdown list.
3. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns your user ID.

![Using the Matrix node to get your account information](/_images/integrations/nodes/matrix/matrix1_node.png)

### 3. Matrix2 node (getAll: roomMember)

This node will return the information of all the members in a room.


1. Select the credentials that you entered in the previous node.
2. Select 'Room Member' from the ***Resource*** dropdown list.
3. Select a room from the ***Room ID*** dropdown list. We will invite the members of this room later on in the workflow.
4. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the information of all the members in the room that we specified. The output of this node will be passed on to the next nodes in the workflow.

![Using the Matrix node to get the information of the members in a room](/_images/integrations/nodes/matrix/matrix2_node.png)

### 4. IF node

This node will compare your user ID with the user ID of other members. If the user IDs are not equal, the output will be true.


1. Click on ***Add Condition*** and select 'String'.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Matrix1 > Output Data > JSON > user_id. You can also add the following expression: `{{$node["Matrix1"].json["user_id"]}}`.
4. Select 'Not Equal' from the ***Operation*** dropdown list.
5. Click on the gears icon next to the ***Value 2*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Matrix2 > Output Data > JSON > user_id. You can also add the following expression: `{{$node["Matrix2"].json["user_id"]}}`.
7. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the information of all the members of the room except your own.

![Using the IF node to compare your user id with the user id of the members in a room](/_images/integrations/nodes/matrix/if_node.png)

### 4. Matrix3 node (invite: room)

This node will send an invitation to the members returned by the previous node to join the room that we created using the Matrix node.


1. Connect the node to the 'true' output of the IF node
2. Select the credentials that you entered in the previous node.
3. Select 'Room' from the ***Resource*** dropdown list.
4. Select 'Invite' from the ***Operation*** dropdown list.
5. Click on the gears icon next to the ***Room ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Matrix > Output Data > JSON > room_id. You can also add the following expression: `{{$node["Matrix"].json["room_id"]}}`.
7. Click on the gears icon next to the ***User ID*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > IF > Output Data > JSON > user_id. You can also add the following expression: `{{$node["IF"].json["user_id"]}}`.
9. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends an invite to join the `n8n` room to the members of the other room.

![Using the Matrix node to send an invite to join the room](/_images/integrations/nodes/matrix/matrix3_node.png)

### 5. Matrix4 node (create: message)

This node will send a message to the new room that we created using the Matrix node.


1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***Room ID*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Matrix > Output Data > JSON > room_id. You can also add the following expression: `{{$node["Matrix"].json["room_id"]}}`.
4. Enter a message in the ***Text*** field.
5. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends a message to the room that we created with the Matrix node.

![Using the Matrix node to send a message to the room we created](/_images/integrations/nodes/matrix/matrix4_node.png)

### 6. NoOp node
Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow. We've added this as it can sometimes help others with a better understanding of the workflow, visually.


1. Create a ***NoOp*** node connected to the 'false' output of the IF node.
2. Click on ***Execute Node*** to run the node.


![Using the NoOp node](/_images/integrations/nodes/matrix/noop_node.png)




