# Mautic

The Mautic node allows you to automate work in Mautic, and integrate Mautic with other applications. n8n has built-in support for a wide range of Mautic features, including creating, updating, deleting, and getting companies, and contacts, as well as adding and removing campagin contacts. 

On this page, you'll find a list of operations the Mautic node supports and links to more resources.

!!! note "Credentials"
    Refer to [Mautic credentials](/integrations/builtin/credentials/mautic/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Mautic integrations](https://n8n.io/integrations/mautic/){:target="_blank" .external-link} list.


## Basic Operations

* Campaign Contact
    * Add contact to a campaign
    * Remove contact from a campaign
* Company
    * Create a new company
    * Delete a company
    * Get data of a company
    * Get data of all companies
    * Update a company
* Company Contact
    * Add contact to a company
    * Remove a contact from a company
* Contact
    * Create a new contact
    * Delete a contact
    * Edit contact's points
    * Add/remove contacts from/to the do not contact list
    * Get data of a contact
    * Get data of all contacts
    * Send email to contact
    * Update a contact
* Contact Segment
    * Add contact to a segment
    * Remove contact from a segment
* Segment Email
    * Send

## Example Usage

This workflow allows you to get all contacts from Mautic. You can also find the [workflow](https://n8n.io/workflows/549) on the website. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Mautic]()

The final workflow should look like the following image.

![A workflow with the Mautic node](/_images/integrations/builtin/app-nodes/mautic/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mautic node

1. First of all, you'll have to enter credentials for the Mautic node. You can find out how to do that [here](/integrations/builtin/credentials/mautic/).
2. Select 'Get All' from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.




