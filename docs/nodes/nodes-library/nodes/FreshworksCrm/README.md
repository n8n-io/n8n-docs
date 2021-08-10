---
permalink: /nodes/n8n-nodes-base.freshworksCrm
description: Learn how to use the Freshworks CRM node in n8n
---

# Freshworks CRM

[Freshworks CRM](https://www.freshworks.com/freshsales-crm/) is a cloud-based customer relationship management (CRM) solution that helps businesses manage their interactions with existing and potential customers.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/FreshworksCrm/README.md).
:::

## Basic operations

<Resource node="n8n-nodes-base.freshworksCrm" />

## Example usage

This workflow allows you to fetch all Contacts in Freshworks CRM that you have yet to contact. This example usage workflow would use the following two nodes:
- [Start](../../core-nodes/Start/README.md)
- [Freshworks CRM]()

The final workflow should look like the following image.

![A workflow with the Freshworks CRM node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Freshworks CRM node

1. First enter your credentials for the Freshworks CRM node. You can find out how to do that [here](../../../credentials/FreshworksCrm/README.md).
2. Select **Contact** from the *Resource* dropdown.
3. Select **Get All** from the *Operation* dropdown.
4. Select **Never Contacted** from the *View* dropdown.
5. Click on **Execute Node** to run the workflow.

![The Freshworks CRM node](./freshworksCrm_node.png)
