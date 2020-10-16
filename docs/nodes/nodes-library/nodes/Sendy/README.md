---
permalink: /nodes/n8n-nodes-base.sendy
description: Learn how to use the Sendy node in n8n
---

# Sendy

[Sendy](https://sendy.co) is a self-hosted email newsletter application that lets you send trackable emails via AWS SES.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Sendy/README.md).
:::

## Basic Operations

::: details Campaign
- Create a campaign
:::

::: details Subscriber
- Add a subscriber to a list
- Count subscribers
- Delete a subscriber from a list
- Unsubscribe a user from a list
- Get the status of a subscriber
:::

## Example Usage

This workflow allows you to extract information from an image of a receipt using the Sendy node. You can also find the [workflow](https://n8n.io/workflows/702) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [HTTP Request](../../core-nodes/HTTPRequest/README.md)
- [Sendy]()

The final workflow should look like the following image.

![A workflow with the Sendy node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.


### 2. HTTP Request (GET)

This example workflow uses the HTTP Request node to make a GET request to download the image of a receipt. You can also use other nodes, for example, the [Box](../../nodes/Box/README.md) node, to get the images of the receipts you want to use.
::: v-pre
1. Enter the URL of the image in the ***URL*** field. For example, `https://miro.medium.com/max/1400/0*1T9GkAb93w5NSMsf`.
2. Select 'File' from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the HTTP Request node downloads the image from the URL. This image (binary data) can now be used by the other nodes in the workflow.

![Using the HTTP Request node to get the file](./HTTPRequest_node.png)

  
### 3. Sendy node (predict: receipt)

This node will get the image of the receipt (binary data) from the HTTP Request node and extract the information from it.
1. Select 'Receipt' from the ***Resource*** dropdown list. 
2. You'll have to enter credentials for the Sendy node. You can find out how to do that  [here](../../../credentials/Sendy/README.md).
3. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node extracts the information from the image that it got from the HTTP Request node.

![Using the Sendy node to extract information from receipt](./Sendy_node.png)

## Further Reading

- [Automatically Adding Expense Receipts to Google Sheets with Telegram, Sendy, Twilio, and n8n 🧾](https://medium.com/n8n-io/automatically-adding-expense-receipts-to-google-sheets-with-telegram-Sendy-twilio-and-n8n-c47eb2f8d7a5)
