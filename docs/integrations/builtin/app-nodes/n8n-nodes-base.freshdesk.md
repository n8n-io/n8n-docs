# Freshdesk

[Freshdesk](https://freshdesk.com){:target="_blank" .external-link} node allows you to automate work in the Freshdesk platform and integrate Freshdesk with other applications. n8n has built-in support for a wide range of Freshdesk features, which includes basic operations like creating, updating, deleting, and getting contacts and tickets.

On this page, you'll find a list of operations the Freshdesk node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Freshdesk credentials](https://docs.n8n.io/integrations/builtin/credentials/freshdesk/){:target="_blank" .external-link} for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Freshdesk integrations](https://n8n.io/integrations/freshdesk/){:target="_blank" .external-link} list.


## Basic Operations

* Contact
    * Create a new contact
    * Delete a contact
    * Get a contact
    * Get all contacts
    * Update a contact
* Ticket
    * Create a new ticket
    * Delete a ticket
    * Get a ticket
    * Get all tickets
    * Update a ticket

## Example Usage

This workflow allows you to create a ticket on Freshdesk. You can also find the [workflow](https://n8n.io/workflows/448) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Freshdesk]()

The final workflow should look like the following image.

![A workflow with the Freshdesk node](/_images/integrations/builtin/app-nodes/freshdesk/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Freshdesk node

1. First of all, you'll have to enter credentials for the Freshdesk node. You can find out how to do that [here](/integrations/builtin/credentials/freshdesk/).
2. Select 'Email' from the *Requester Identification* dropdown.
3. Enter the requester email in the *Value* field.
4. Select 'Open' from the *Status* Dropdown.
5. Click on *Execute Node* to run the workflow.
