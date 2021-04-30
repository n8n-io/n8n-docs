---
permalink: /nodes/n8n-nodes-base.activeCampaign
description: Learn how to use the ActiveCampaign node in n8n
---

# ActiveCampaign

[ActiveCampaign](https://www.activecampaign.com/) is a cloud software platform for small-to-mid-sized business. The company offers software for customer experience automation, which combines the email marketing, marketing automation, sales automation, and CRM categories.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ActiveCampaign/README.md).
:::

## Basic Operations

<Resource node="ActiveCampaign" />

## Example Usage

This workflow allows you to create a contact in ActiveCampaign. You can also find the [workflow](https://n8n.io/workflows/412) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [ActiveCampaign]()

The final workflow should look like the following image.

![A workflow with the ActiveCampaign node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ActiveCampaign node

1. First of all, you'll have to enter credentials for the ActiveCampaign node. You can find out how to do that [here](../../../credentials/ActiveCampaign/README.md).
2. Enter the email of the contact in the *Email* field.
3. Toggle the *Update if exists* option to yes.
4. Under the *Additional Fields* section, click on the *Add Field* button and select *First Name*.
5. Enter the first name of the contact in the *First Name* field.
6. Click on *Add Field* again and select *Last Name*.
7. Enter the last name of the contact in the *Last name* field.
8. Click on *Execute Node* to run the workflow.
