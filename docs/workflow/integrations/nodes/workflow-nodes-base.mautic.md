# Mautic

[Mautic](https://www.mautic.org/) is an open-source marketing automation software that helps online businesses automate their repetitive marketing tasks such as lead generation, contact scoring, contact segmentation, and marketing campaigns.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/mautic/).


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

- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Mautic]()

The final workflow should look like the following image.

![A workflow with the Mautic node](/_images/integrations/nodes/mautic/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mautic node

1. First of all, you'll have to enter credentials for the Mautic node. You can find out how to do that [here](/workflow/integrations/credentials/mautic/).
2. Select 'Get All' from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.




