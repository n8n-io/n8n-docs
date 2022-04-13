# Bitwarden

[Bitwarden](https://www.bitwarden.com/) is an open-source password management solution for individuals, teams, and business organizations.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/bitwarden/).



## Basic Operations

* Collection
    * Delete
    * Get
    * Get All
    * Update
* Event
    * Get All
* Group
    * Create
    * Delete
    * Get
    * Get All
    * Get Members
    * Update
    * Update Members
* Member
    * Create
    * Delete
    * Get
    * Get All
    * Get Groups
    * Update
    * Update Groups

## Example Usage

This workflow allows you to create a group, add members to the group, and get the members of the group in Bitwarden. You can also find the [workflow](https://n8n.io/workflows/1001) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Bitwarden]()

The final workflow should look like the following image.

![A workflow with the Bitwarden node](/_images/integrations/nodes/bitwarden/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bitwarden node (create: group)

This node will create a new group called `documentation` in Bitwarden.

1. First of all, you'll have to enter credentials for the Bitwarden node. You can find out how to do that [here](/integrations/credentials/bitwarden/).
2. Select 'Group' from the ***Resource*** dropdown list.
3. Select 'Create' from the ***Operation*** dropdown list.
4. Enter `documentation` in the ***Name*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new group in Bitwarden.

![Using the Bitwarden node to create a new group](/_images/integrations/nodes/bitwarden/bitwarden_node.png)

### 3. Bitwarden1 node (getAll: member)

This node will get all the members from Bitwarden.

1. Select the credentials that you entered in the previous node.
2. Select 'Member' from the ***Resource*** dropdown list.
3. Select 'Get All' from the ***Operation*** dropdown list.
4. Toggle ***Return All*** to `true`.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node retrieves all the members from Bitwarden.

![Using the Bitwarden node to get all the members](/_images/integrations/nodes/bitwarden/bitwarden1_node.png)

### 4. Bitwarden2 node (updateMembers: group)

This node will update all the members in the group that we created earlier.

1. Select the credentials that you entered in the previous node.
2. Select 'Group' from the ***Resource*** dropdown list.
3. Select 'Update Members' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Group ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Bitwarden > Output Data > JSON > id. You can also add the following expression: `{{$node["Bitwarden"].json["id"]}}`.
6. Click on the gears icon next to the ***Member IDs*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
8. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the members of the group.

![Using the Bitwarden node to update members in a group](/_images/integrations/nodes/bitwarden/bitwarden2_node.png)

### 5. Bitwarden3 node (getMembers: group)

This node will get all the members in the group that we created earlier.

1. Select the credentials that you entered in the previous node.
2. Select 'Group' from the ***Resource*** dropdown list.
3. Select 'Get Members' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Group ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Bitwarden > Output Data > JSON > id. You can also add the following expression: `{{$node["Bitwarden"].json["id"]}}`.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node retrieves the members in the group.

![Using the Bitwarden node to get members in a group](/_images/integrations/nodes/bitwarden/bitwarden3_node.png)
