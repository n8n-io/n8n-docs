---
title: Iterable
description: Documentation for the Iterable node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Iterable

The Iterable node allows you to automate work in Iterable, and integrate Iterable with other applications. n8n has built-in support for a wide range of Iterable features, including creating users, recording the actions performed by the users, and adding and removing users from the list. 

On this page, you'll find a list of operations the Iterable node supports and links to more resources.

!!! note "Credentials"
    Refer to [Iterable credentials](/integrations/builtin/credentials/iterable/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Iterable integrations](https://n8n.io/integrations/iterable/){:target="_blank" .external-link} list.


## Basic Operations

* Event
    * Record the actions a user perform
* User
    * Create/Update a user
    * Delete a user
    * Get a user
* User List
    * Add user to list
    * Remove a user from a list

## Example Usage

This workflow allows you to create, update, and get a user from Iterable. You can also find the [workflow](https://n8n.io/workflows/813) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Iterable]()

The final workflow should look like the following image.

![A workflow with the Iterable node](/_images/integrations/builtin/app-nodes/iterable/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Iterable node (upsert: user)

This node will create a new user in Iterable.

1. First of all, you'll have to enter credentials for the Iterable node. You can find out how to do that [here](/integrations/builtin/credentials/iterable/).
2. Select 'Email' in the ***Identifier*** field.
3. Enter the email address in the ***Value*** field.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new user in Iterable.

![Using the Iterable node to create a user](/_images/integrations/builtin/app-nodes/iterable/iterable_node.png)

### 3. Iterable1 node (upsert: user)

This node will update the information of the user that we created in the previous node.


1. Select the credentials that you entered in the previous node.
2. Select 'Email' in the ***Identifier*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Iterable > Parameters > value. You can also add the following expression: `{{$node["Iterable"].parameter["value"]}}`.
5. Click on the ***Add Field*** button and select ***Data Fields***.
6. Click on the ***Add Data Field*** button.
7. Enter `Name` in the ***Key*** field.
8. Enter the name of the user in the ***Value*** field.
9. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node updates the information of the user that we created in the previous node.

![Using the Iterable node to update the user information](/_images/integrations/builtin/app-nodes/iterable/iterable1_node.png)



### 4. Iterable2 node (get: user)

This node will get the information of the user that we created using the Iterable node.


1. Select the credentials that you entered in the previous node.
2. Select 'Get' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Iterable > Parameters > value. You can also add the following expression: `{{$node["Iterable"].parameter["value"]}}`.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node gets the information of the user that we created using the Iterable node.

![Using the Iterable node to get the user's information](/_images/integrations/builtin/app-nodes/iterable/iterable2_node.png)

