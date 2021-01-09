---
description: Learn how to use the Freshdesk node in n8n
---

# Freshdesk

[Freshdesk](https://freshdesk.com/) is a customer support software also classified as a ticketing software or a helpdesk that allows companies to effectively manage their customer care and support function.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Freshdesk/README.md).
:::

## Basic Operations

::: details Contact
- Create a new contact
- Delete a contact
- Get a contact
- Get all contacts
- Update a contact
:::

::: details Ticket
- Create a new ticket
- Delete a ticket
- Get a ticket
- Get all tickets
- Update a ticket
:::

## Example Usage

This workflow allows you to create a ticket on Freshdesk. You can also find the [workflow](https://n8n.io/workflows/448) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Freshdesk]()

The final workflow should look like the following image.

![A workflow with the Freshdesk node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Freshdesk node

1. First of all, you'll have to enter credentials for the Freshdesk node. You can find out how to do that [here](../../../credentials/Freshdesk/README.md).
2. Select 'Email' from the *Requester Identification* dropdown.
3. Enter the requester email in the *Value* field.
4. Select 'Open' from the *Status* Dropdown.
5. Click on *Execute Node* to run the workflow.
