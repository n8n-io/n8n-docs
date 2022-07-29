# HubSpot

[HubSpot](https://www.hubspot.com/) provides tools for social media marketing, content management, web analytics, landing pages, customer support, and search engine optimization.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/hubspot/).


## Basic Operations

* Contact
    * Create/Update a contact
    * Delete a contact
    * Get a contact
    * Get all contacts
    * Get recently created/updated contacts
    * Search contacts
* Contact List
    * Add contact to a list
    * Remove a contact from a list
* Company
    * Create a company
    * Delete a company
    * Get a company
    * Get all companies
    * Get recently created companies
    * Get recently modified companies
    * Search companies by domain
    * Update a company
* Deal
    * Create a deal
    * Delete a deal
    * Get a deal
    * Get all deals
    * Get recently created deals
    * Get recently modified deals
    * Search deals
    * Update a deal
* Engagement
    * Create an engagement
    * Delete an engagement
    * Get an engagement
    * Get all engagements
* Form
    * Get all fields from a form
    * Submit data to a form
* Ticket
    * Create a ticket
    * Delete a ticket
    * Get a ticket
    * Get all tickets
    * Update a ticket

## Example Usage

This workflow allows you to retrieve a contact from HubSpot. You can also find the [workflow](https://n8n.io/workflows/466) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [HubSpot]()

The final workflow should look like the following image.

![A workflow with the HubSpot node](/_images/integrations/nodes/hubspot/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. HubSpot node

1. First of all, you'll have to enter credentials for the HubSpot node. You can find out how to do that [here](/integrations/credentials/hubspot/).
2. Select the 'Contact' option under the *Resource* field.
3. Select the 'Get' option under the *Operation* field.
4. Enter the contact ID under the *Contact ID* field.
3. Click on *Execute Node* to run the workflow.




