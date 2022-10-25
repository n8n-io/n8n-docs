# Keap

[Keap](https://keap.com/) is an e-mail marketing and sales platform for small businesses, including products to manage and optimize the customer lifecycle, customer relationship management, marketing automation, lead capture, and e-commerce.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/keap/).


## Basic Operations

* Company
    * Create a company
    * Retrieve all companies
* Contact
    * Create/update a contact
    * Delete an contact
    * Retrieve an contact
    * Retrieve all contacts
* Contact Note
    * Create a note
    * Delete a note
    * Get a notes
    * Retrieve all notes
    * Update a note
* Contact Tag
    * Add a list of tags to a contact
    * Delete a contact's tag
    * Retrieve all contact's tags
* Ecommerce Order
    * Create an ecommerce order
    * Get an ecommerce order
    * Delete an ecommerce order
    * Retrieve all ecommerce orders
* Ecommerce Product
    * Create an ecommerce product
    * Delete an ecommerce product
    * Get an ecommerce product
    * Retrieve all ecommerce product
* Email
    * Create a record of an email sent to a contact
    * Retrieve all sent emails
    * Send Email
* File
    * Delete a file
    * Retrieve all files
    * Upload a file

## Example Usage

This workflow allows you to get all contacts from Keap. You can also find the [workflow](https://n8n.io/workflows/553) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Keap]()

The final workflow should look like the following image.

![A workflow with the Keap node](/_images/integrations/builtin/app-nodes/keap/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Keap node

1. First of all, you'll have to enter credentials for the Keap node. You can find out how to do that [here](/integrations/builtin/credentials/keap/).
2. Select the 'Contact' option from the *Resource* dropdown list.
3. Select the 'Get All' option from the *Operation* dropdown list.
4. Click on *Execute Node* to run the workflow.
