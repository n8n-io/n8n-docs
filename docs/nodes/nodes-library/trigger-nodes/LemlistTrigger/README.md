---
permalink: /nodes/n8n-nodes-base.lemlistTrigger
description: Learn how to use the Lemlist Trigger node in n8n
---

# Lemlist Trigger

[Lemlist](https://Lemlist.com) is an email outreach platform that allows you to automatically generate personalized images and videos and send personalized cold emails.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Lemlist/README.md).
:::

## Events

- Email Bounced
- Email Clicked
- Email Opened
- Email Replied
- Email Send Failed
- Email Sent
- Email Unsubscribed

## Example Usage

This workflow allows you to send a message on Mattermost when a lead replies to your email. You can also find the [workflow](https://n8n.io/workflows/984) on n8n.io. This example usage workflow would use the following node.
- [Lemlist Trigger]()
- [Mattermost](../../nodes/Mattermost/README.md)

The final workflow should look like the following image.

![A workflow with the Lemlist Trigger node](./workflow.png)

### 1. Lemlist Trigger

The Lemlist Trigger node will trigger the workflow when a lead sends a reply to the campaign `Docs campaign`. If you have a different campaign, use that instead.

1. First of all, you'll have to enter credentials for the Lemlist Trigger node. You can find out how to do that [here](../../../credentials/Lemlist/README.md).
2. Select 'Email Replied' from the ***Events*** dropdown list.
3. Click on ***Add Field*** and select 'Campaign ID'.
4. Select 'Docs campaign' from the ***Campaign ID*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the information of the reply that was sent by a lead. This output is passed on to the next node in the workflow.

![Using the Lemlist Trigger node to trigger the workflow](./LemlistTrigger_node.png)

## 2. Mattermost node (post: message)

This node will send a message to the `Leads` channel in Mattermost. If you have a different channel, use that instead.

1. First of all, you'll have to enter credentials for the Mattermost node. You can find out how to enter credentials for this node [here](../../../credentials/Mattermost/README.md).
2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field click on ***Add Expression***.
::: v-pre
4. Enter the following message in the ***Expression*** field:
```
{{$json["firstName"]}} has replied back to your {{$json["campaignName"]}}. Below is the reply:
> {{$json["text"]}}
```
5. Click on ***Execute Node*** to run the workflow.
:::
In the screenshot below, you will notice that the node sends a message with a reply to the `Leads` channel in Mattermost.

![Using the Mattermost node to send a message](./Mattermost_node.png)

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Lemlist Trigger node.
:::
