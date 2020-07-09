---
permalink: /nodes/n8n-nodes-base.hubspot
---

# HubSpot

[HubSpot](https://www.hubspot.com/) provides tools for social media marketing, content management, web analytics, landing pages, customer support, and search engine optimization.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Hubspot/README.md).
:::

## Basic Operations

- Contact
    - Create/Update a contact
    - Delete a contact
	- Get a contact
	- Get all contacts
	- Get recently created/updated contacts

- Company
	- Create/Update a company
    - Delete a company
	- Get a company
	- Get all companies
	- Get recently created/updated company

- Deal
	- Create/Update a deal
    - Delete a deal
	- Get a deal
	- Get all deals
	- Get recently created deals
	- Get recently modified deals
	- Update a deal

- Form
	- Get all fields from a form
	- Submit data to a form

- Ticket
	- Create/Update a ticket
    - Delete a ticket
	- Get a ticket
	- Get all tickets
	- Update a ticket

## Example Usage

This workflow allows you to retrieve a contact from HubSpot. You can also find the [workflow](https://n8n.io/workflows/466) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [HubSpot]()

The final workflow should look like the following image.

![A workflow with the HubSpot node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. HubSpot node

1. First of all, you'll have to enter credentials for the HubSpot node. You can find out how to do that [here](../../../credentials/Hubspot/README.md).
2. Select the 'Contact' option under the *Resource* field.
3. Select the 'Get' option under the *Operation* field.
4. Enter the 'Contact ID' under the *Contact ID* field.
3. Click on *Execute Node* to run the workflow.
