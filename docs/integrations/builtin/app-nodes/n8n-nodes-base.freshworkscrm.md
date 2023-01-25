# Freshworks CRM

Freshworks CRM node allows you to automate work in the Freshworks CRM platform and integrate Freshworks CRM with other applications. n8n has built-in support for a wide range of Freshworks CRM features, which includes basic operations like creating, updating, deleting, and retrieve, accounts, appointments, contacts, deals, notes, sales activity and more. 

On this page, you'll find a list of operations the Freshworks CRM node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Freshworks CRM credentials](https://docs.n8n.io/integrations/builtin/credentials/freshworkscrm/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Freshworks CRM integrations](https://n8n.io/integrations/freshworks-crm/){:target="_blank" .external-link} list.


## Basic operations

* Account
    * Create an account
    * Delete an account
    * Retrieve an account
    * Retrieve all accounts
    * Update an account
* Appointment
    * Create an appointment
    * Delete an appointment
    * Retrieve an appointment
    * Retrieve all appointments
    * Update an appointment
* Contact
    * Create a contact
    * Delete a contact
    * Retrieve a contact
    * Retrieve all contacts
    * Update a contact
* Deal
    * Create a deal
    * Delete a deal
    * Retrieve a deal
    * Retrieve all deals
    * Update a deal
* Note
    * Create a note
    * Delete a note
    * Update a note
* Sales Activity
    * Retrieve a sales activity
    * Retrieve all sales activities
* Task
    * Create a task
    * Delete a task
    * Retrieve a task
    * Retrieve all tasks
    * Update a task

## Example usage

This workflow allows you to fetch all Contacts in Freshworks CRM that you have yet to contact. This example usage workflow would use the following two nodes:

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Freshworks CRM]()

The final workflow should look like the following image.

![A workflow with the Freshworks CRM node](/_images/integrations/builtin/app-nodes/freshworkscrm/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Freshworks CRM node

1. First enter your credentials for the Freshworks CRM node. You can find out how to do that [here](/integrations/builtin/credentials/freshworkscrm/).
2. Select **Contact** from the *Resource* dropdown.
3. Select **Get All** from the *Operation* dropdown.
4. Select **Never Contacted** from the *View* dropdown.
5. Click on **Execute Node** to run the workflow.

![The Freshworks CRM node](/_images/integrations/builtin/app-nodes/freshworkscrm/freshworkscrm_node.png)
