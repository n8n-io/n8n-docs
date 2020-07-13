---
permalink: /nodes/n8n-nodes-base.intercom
---

# Intercom

[Intercom](https://www.intercom.com/) is a company that produces a messaging platform which allows businesses to communicate with prospective and existing customers within their app, on their website, through social media, or via email.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Intercom/README.md).
:::

## Basic Operations

- Company
    - Create a new company
    - Get data of a company
    - Get data of all companies
    - Update a company
    - List company's users
- Lead
    - Create a new lead
    - Get data of a lead
    - Get data of all leads
    - Update a new lead
    - Delete a lead
- User
    - Create a new user
    - Get data of a user
    - Get data of all users
    - Update a user
    - Delete a user

## Example Usage

This workflow allows you to create a new user in Intercom. You can also find the [workflow](https://n8n.io/workflows/464) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Intercom]()

The final workflow should look like the following image.

![A workflow with the Intercom node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Intercom node

1. First of all, you'll have to enter credentials for the Intercom node. You can find out how to do that [here](../../../credentials/Intercom/README.md).
2. Select 'Email' from the dropdown list for the *Identifier Type* field.
3. Enter the email in the *Value* field.
4. Click on *Execute Node* to run the workflow.
