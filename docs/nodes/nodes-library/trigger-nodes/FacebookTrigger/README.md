---
permalink: /nodes/n8n-nodes-base.facebookTrigger
description: Learn how to use the Facebook Trigger node in n8n
---

# Facebook Trigger

[Facebook](https://www.facebook.com/) is a social networking site that makes it easy to connect and share with family and friends online.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/FacebookApp/README.md).
:::

## Object

- Get updates about an Ad Account
- Get updates about the app
- Get updates about Certificate Transparency
- Get updates about activity in groups and events in groups of Workplace
- Get updates about the comments on your media
- Get updates about the links for rich previews by an external provider
- Page updates
- Updates regarding granting or revoking permissions
- User profile updates
- Get updates about Whatsapp business account
- Get updates about Workplace security

## Example Usage

This workflow allows you to receive updates when a user updates their profile on Facebook using the Facebook Trigger node. It also allows you to send a message in Mattermost about the update. You can also find the [workflow](https://n8n.io/workflows/769) on n8n.io. This example usage workflow would use the following nodes.
- [Facebook Trigger]()
- [Set](../../core-nodes/Set/README.md)
- [Mattermost](../../nodes/Mattermost/README.md)

The final workflow should look like the following image.

![A workflow with the Facebook Trigger node](./workflow.png)

### 1. Facebook Trigger node

The Facebook Trigger node will trigger the workflow when a user updates their profile on Facebook.

1. First of all, you'll have to enter credentials for the Facebook Trigger node. You can find out how to do that [here](../../../credentials/FacebookApp/README.md).
2. Select 'User' from the ***Object*** dropdown list.
3. Enter your app ID in the ***App ID*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the updated information of the user from Facebook. This output is passed on to the next node in the workflow.

![Using the Facebook Trigger node to trigger the workflow](./FacebookTrigger_node.png)

### 2. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.
::: v-pre
1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `field` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > changes > [Item: 0] > field. You can also add the following expression: `{{$node["Facebook Trigger"].json["changes"][0]["field"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Click on the gears icon next to the ***Name*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > changes > [Item: 0] > field. You can also add the following expression: `{{$node["Facebook Trigger"].json["changes"][0]["field"]}}`.
8. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
9. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > changes > [Item: 0] > value > page. You can also add the following expression: `{{$node["Facebook Trigger"].json["changes"][0]["value"]["page"]}}`.
10. Click on ***Add Value*** and select 'String' from the dropdown list.
11. Enter `uid` in the ***Name*** field.
12. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
13. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > uid. You can also add the following expression: `{{$node["Facebook Trigger"].json["uid"]}}`.
14. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
15. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](./Set_node.png)

### 3. Mattermost node (post: message)

This node will send a message of the updated information in the channel `Information Updated` in Mattermost. If you have a different channel, use that instead.
::: v-pre
1. First of all, you'll have to enter credentials for the Facebook Trigger node. You can find out how to do that [here](../../../credentials/Mattermost/README.md).
2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.
4. Enter the following message in the ***Expression*** field: `The user with uid {{$node["Facebook Trigger"].json["uid"]}} changed their {{$node["Facebook Trigger"].json["changes"][0]["field"]}} to {{$node["Facebook Trigger"].json["changes"][0]["value"]["page"]}}.`.
5. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node sends a message of the updated information to the `Information Updated` channel in Mattermost.

![Using the Mattermost node to send a message of the updated information](./Mattermost_node.png)
