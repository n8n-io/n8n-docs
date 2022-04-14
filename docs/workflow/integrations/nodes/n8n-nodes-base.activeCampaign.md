# ActiveCampaign

[ActiveCampaign](https://www.activecampaign.com/) is a cloud software platform for small-to-mid-sized business. The company offers software for customer experience automation, which combines the email marketing, marketing automation, sales automation, and CRM categories.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/activeCampaign/).


## Basic Operations

* Account
    * Create an account
    * Delete an account
    * Get data of an account
    * Get data of all accounts
    * Update an account
* Account Contact
    * Create an association
    * Delete an association
    * Update an association
* Contact
    * Create a contact
    * Delete a contact
    * Get data of a contact
    * Get data of all contact
    * Update a contact
* Contact List
    * Add contact to a list
    * Remove contact from a list
* Contact Tag
    * Add a tag to a contact
    * Remove a tag from a contact
* Connection
    * Create a connection
    * Delete a connection
    * Get data of a connection
    * Get data of all connections
    * Update a connection
* Deal
    * Create a deal
    * Delete a deal
    * Get data of a deal
    * Get data of all deals
    * Update a deal
    * Create a deal note
    * Update a deal note
* E-commerce Order
    * Create a order
    * Delete a order
    * Get data of a order
    * Get data of all orders
    * Update a order
* E-Commerce Customer
    * Create a E-commerce Customer
    * Delete a E-commerce Customer
    * Get data of a E-commerce Customer
    * Get data of all E-commerce Customer
    * Update a E-commerce Customer
* E-commerce Order Products
    * Get data of all order products
    * Get data of a ordered product
    * Get data of an order's products
* List
    * Get all lists
* Tag
    * Create a tag
    * Delete a tag
    * Get data of a tag
    * Get data of all tags
    * Update a tag

## Example Usage

This workflow allows you to create a contact in ActiveCampaign. You can also find the [workflow](https://n8n.io/workflows/412) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [ActiveCampaign]()

The final workflow should look like the following image.

![A workflow with the ActiveCampaign node](/_images/integrations/nodes/activecampaign/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ActiveCampaign node

1. First of all, you'll have to enter credentials for the ActiveCampaign node. You can find out how to do that [here](/integrations/credentials/activeCampaign/).
2. Enter the email of the contact in the *Email* field.
3. Toggle the *Update if exists* option to yes.
4. Under the *Additional Fields* section, click on the *Add Field* button and select *First Name*.
5. Enter the first name of the contact in the *First Name* field.
6. Click on *Add Field* again and select *Last Name*.
7. Enter the last name of the contact in the *Last name* field.
8. Click on *Execute Node* to run the workflow.
