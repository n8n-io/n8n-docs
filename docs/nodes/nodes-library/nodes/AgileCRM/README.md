---
permalink: /nodes/n8n-nodes-base.agileCrm
description: Learn how to use the Agile CRM node in n8n
---

# Agile CRM

[Agile CRM](https://www.agilecrm.com/) is a CRM with Sales, Marketing and Service automation in single platform. It has sales tracking, contact management, marketing automation, web analytics, two-way emails, telephony, and a helpdesk.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/AgileCRM/README.md).
:::

## Basic Operations

<Resource node="ActiveCampaign" />


## Example Usage

This workflow allows you to create a new contact in Agile CRM. You can also find the [workflow](https://n8n.io/workflows/474) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Agile CRM]()

The final workflow should look like the following image.

![A workflow with the Agile CRM node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Agile CRM node

1. First of all, you'll have to enter credentials for the Agile CRM node. You can find out how to do that [here](../../../credentials/AgileCRM/README.md).
2. Select the 'Create' option from the *Operation* dropdown list.
3. Under the *Additional Fields* section, click on the *Add Field* button and select *First Name*.
5. Enter the first name of the contact in the *First Name* field.
6. Click on *Add Field* again and select *Last Name*.
7. Enter the last name of the contact in the *Last name* field.
8. Click on *Execute Node* to run the workflow.
