---
permalink: /nodes/n8n-nodes-base.microsoftToDo
description: Learn how to use the Microsoft To Do node in n8n
---

# Microsoft To Do

[Microsoft To Do](https://todo.microsoft.com) is a cloud-based task management application. It allows users to manage their tasks from a smartphone, tablet, and computer.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Microsoft/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.microsoftToDo" />

## Example Usage

This workflow allows you to create, update and get a task in Microsoft To Do. You can also find the [workflow](https://n8n.io/workflows/1114) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Microsoft To Do]()

The final workflow should look like the following image.

![A workflow with the Microsoft To Do node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Microsoft To Do node (create: task)

This node will create a task with the importance level `High` in the Tasks list. You can select a different list and the importance level.

1. First of all, you'll have to enter credentials for the Microsoft To Do node. You can find out how to do that [here](../../../credentials/Microsoft/README.md).
2. Select 'Create' from the ***Operation*** dropdown list.
3. Select a list from the ***List ID*** dropdown list.
4. Enter a subject in the ***Subject*** field.
5. Click on ***Add Field*** and select 'Importance' from the dropdown list.
6. Select 'High' from the ***Importance*** dropdown list.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new task in Microsoft To Do.

![Create a task with the Microsoft To Do node](./MicrosoftToDo_node.png)

### 3. Microsoft To Do1 node (update: task)

This node will update the status of the task that we created in the previous node.

::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***List ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Microsoft To Do > Parameters > taskListId. You can also add the following expression: `{{$node["Microsoft To Do"].parameter["taskListId"]}}`.
5. Click on the gears icon next to the ***Task ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Current Node > Input > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
7. Click on the ***Add Field*** button and select 'Status' from the dropdown list.
8. Select 'In progress' from the ***Status*** dropdown list.
9. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node updates the status of the task that we created in the previous node.

![Update the status of a task using the Microsoft To Do node](./MicrosoftToDo1_node.png)

### 4. Microsoft To Do2 node (get: task)

This node will get the task that we created earlier.

::: v-pre
1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***List ID*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Microsoft To Do > Parameters > taskListId. You can also add the following expression: `{{$node["Microsoft To Do"].parameter["taskListId"]}}`.
4. Click on the gears icon next to the ***Task ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
6. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node fetches the information of the task that we created earlier.

![Retrieve the information of tasks using the Microsoft To Do node](./MicrosoftToDo2_node.png)
