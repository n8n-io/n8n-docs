---
permalink: /nodes/n8n-nodes-base.goToWebinar
description: Learn how to use the GoToWebinar node in n8n
---

# GoToWebinar

[GoToWebinar](https://www.gotomeeting.com/webinar) is a platform that helps you create and deliver online video conferences.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/GoToWebinar/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.goToWebinar" />

## Example Usage

This workflow allows you to create, update, and get a webinar. You can also find the [workflow](https://n8n.io/workflows/960) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [GoToWebinar]()

The final workflow should look like the following image.

![A workflow with the GoToWebinar node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. GoToWebinar node (create: webinar)

This node will create a new webinar in GoToWebinar.

1. First of all, you'll have to enter credentials for the GoToWebinar node. You can find out how to do that [here](../../../credentials/GoToWebinar/README.md).
2. Select 'Webinar' from the ***Resource*** dropdown list.
3. Select 'Create' from the ***Operation*** dropdown list.
4. Enter a subject in the ***Subject*** field.
5. Click on the ***Add Time Range*** button.
6. Set the start time in the ***Start Time*** field.
7. Set the end time in the ***End Time*** field.
8. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new webinar.

![Using the GoToWebinar node to create a new webinar](./GoToWebinar_node.png)

### 3. GoToWebinar1 node (update: webinar)

This node will update the description of the webinar that we created in the previous node.

::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Webinar' from the ***Resource*** dropdown list.
3. Select 'Update' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Webinar Key*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > webinarKey. You can also add the following expression: `{{$json["webinarKey"]}}`.
6. Click on the ***Add Field*** button and select 'Description' from the dropdown list.
7. Enter a description in the ***Description*** field.
8. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node updates the description of the webinar that we created in the previous node.

![Using the GoToWebinar node to update a webinar](./GoToWebinar1_node.png)

### 4. GoToWebinar2 node (get: webinar)

This node will get the information about the webinar that we created earlier.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Webinar' from the ***Resource*** dropdown list.
3. Select 'Get' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Webinar Key*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > GoToWebinar > Output Data > JSON > webinarKey. You can also add the following expression: `{{$node["GoToWebinar"].json["webinarKey"]}}`.
6. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node returns the information about the webinar.

![Using the GoToWebinar node to get information of a webinar](./GoToWebinar2_node.png)
