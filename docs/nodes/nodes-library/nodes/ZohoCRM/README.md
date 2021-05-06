---
permalink: /nodes/n8n-nodes-base.zohoCrm
description: Learn how to use the Zoho CRM node in n8n
---

# Zoho CRM

[Zoho CRM](https://www.zoho.com/crm/) is an online Sales CRM software that manages sales, marketing and support.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Zoho/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.zohoCrm" />

## Example Usage

This workflow allows you to get the data of all leads from Zoho CRM. You can also find the [workflow](https://n8n.io/workflows/552) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Zoho CRM]()

The final workflow should look like the following image.

![A workflow with the Zoho CRM node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zoho CRM node

1. First of all, you'll have to enter credentials for the Zoho CRM node. You can find out how to do that [here](../../../credentials/Zoho/README.md).
2. Select the 'Get All' option from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
