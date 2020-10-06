---
permalink: /nodes/n8n-nodes-base.mindee
description: Learn how to use the Mindee node in n8n
---

# Mindee

[Mindee](https://mindee.com) develops API-based products for instantly extracting information from any kind of image and transforming it into usable data.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Mindee/README.md).
:::

## Basic Operations

::: details Receipt
- Predict
:::

::: details Invoice
- Predict
:::

## Example Usage

This workflow allows you to extract information from an image of a receipt using the Mindee node. You can also find the [workflow](https://n8n.io/workflows/702) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [HTTP Request](../../core-nodes/HTTPRequest/README.md)
- [Mindee]()

The final workflow should look like the following image.

![A workflow with the Mindee node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.


### 2. HTTP Request (GET)

This example workflow uses the HTTP Request node to make a GET request to get the image of the receipt. You can also use other nodes, for example, the [Box](../../nodes/Box/README.md) node, to get the image of the receipt you want to use.
::: v-pre
1. Enter a URL of a file in the ***URL*** field.
2. Select 'File' from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the HTTP Request node gets the file from the URL. We will pass this data to the Mindee node.

![Using the HTTP Request node to get the file](./HTTPRequest_node.png)

  
### 3. Mindee node (predict: receipt)

This node will get the image of the receipt from the HTTP Request node and extract the information from it.
1. Select 'Receipt' from the ***Resource*** dropdown list. 
2.  First of all, you'll have to enter credentials for the Mindee node. You can find out how to enter credentials for this node [here](../../../credentials/Mindee/README.md).
3. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will observe that the node extracts the information from the image it got from the HTTP Request node.

![Using the Mindee node to extract information from receipt](./Mindee_node.png)

## Further Reading

- [Automatically Adding Expense Receipts to Google Sheets with Telegram, Mindee, Twilio, and n8n 🧾](https://medium.com/n8n-io/automatically-adding-expense-receipts-to-google-sheets-with-telegram-mindee-twilio-and-n8n-c47eb2f8d7a5)
