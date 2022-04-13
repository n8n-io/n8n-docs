# Agile CRM

[Agile CRM](https://www.agilecrm.com/) is a CRM with Sales, Marketing and Service automation in single platform. It has sales tracking, contact management, marketing automation, web analytics, two-way emails, telephony, and a helpdesk.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/agileCrm/).


## Basic Operations

* Company
    * Create a new company
    * Delete a company
    * Get a company
    * Get all companies
    * Update company properties
* Contact
    * Create a new contact
    * Delete a contact
    * Get a contact
    * Get all contacts
    * Update contact properties
* Deal
    * Create a new deal
    * Delete a deal
    * Get a deal
    * Get all deals
    * Update deal properties


## Example Usage

This workflow allows you to create a new contact in Agile CRM. You can also find the [workflow](https://n8n.io/workflows/474) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Agile CRM]()

The final workflow should look like the following image.

![A workflow with the Agile CRM node](/_images/integrations/nodes/agilecrm/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Agile CRM node

1. First of all, you'll have to enter credentials for the Agile CRM node. You can find out how to do that [here](/integrations/credentials/agileCrm/).
2. Select the 'Create' option from the *Operation* dropdown list.
3. Under the *Additional Fields* section, click on the *Add Field* button and select *First Name*.
5. Enter the first name of the contact in the *First Name* field.
6. Click on *Add Field* again and select *Last Name*.
7. Enter the last name of the contact in the *Last name* field.
8. Click on *Execute Node* to run the workflow.
