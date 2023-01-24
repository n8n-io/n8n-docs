# Freshservice

[Freshdesk](https://freshdesk.com){:target="_blank" .external-link} node allows you to automate work in the Freshdesk platform and integrate Freshdesk with other applications. n8n has built-in support for a wide range of Freshdesk features, which includes basic operations like creating, updating, deleting, and getting contacts and tickets.

On this page, you'll find a list of operations the Freshdesk node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Freshdesk credentials](https://docs.n8n.io/integrations/builtin/credentials/freshdesk/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Freshdesk integrations](https://n8n.io/integrations/freshdesk/){:target="_blank" .external-link} list.


## Basic operations

* Agent
    * Create an agent
    * Delete an agent
    * Retrieve an agent
    * Retrieve all agents
    * Update an agent
* Agent Group
    * Create an agent group
    * Delete an agent group
    * Retrieve an agent group
    * Retrieve all agent groups
    * Update an agent group
* Agent Role
    * Retrieve an agent role
    * Retrieve all agent roles
* Announcement
    * Create an announcement
    * Delete an announcement
    * Retrieve an announcement
    * Retrieve all announcements
    * Update an announcement
* Asset Type
    * Create an asset type
    * Delete an asset type
    * Retrieve an asset type
    * Retrieve all asset types
    * Update an asset type
* Change
    * Create a change
    * Delete a change
    * Retrieve a change
    * Retrieve all changes
    * Update a change
* Department
    * Create a department
    * Delete a department
    * Retrieve a department
    * Retrieve all departments
    * Update a department
* Location
    * Create a location
    * Delete a location
    * Retrieve a location
    * Retrieve all locations
    * Update a location
* Problem
    * Create a problem
    * Delete a problem
    * Retrieve a problem
    * Retrieve all problems
    * Update a problem
* Product
    * Create a product
    * Delete a product
    * Retrieve a product
    * Retrieve all products
    * Update a product
* Release
    * Create a release
    * Delete a release
    * Retrieve a release
    * Retrieve all releases
    * Update a release
* Requester
    * Create a requester
    * Delete a requester
    * Retrieve a requester
    * Retrieve all requesters
    * Update a requester
* Requester Group
    * Create a requester group
    * Delete a requester group
    * Retrieve a requester group
    * Retrieve all requester groups
    * Update a requester group
* Software
    * Create a software application
    * Delete a software application
    * Retrieve a software application
    * Retrieve all software applications
    * Update a software application
* Ticket
    * Create a ticket
    * Delete a ticket
    * Retrieve a ticket
    * Retrieve all tickets
    * Update a ticket

## Example usage

This workflow allows you to fetch all Tickets with an Urgent status in Freshservice. This example usage workflow would use the following two nodes:

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Freshservice]()

The final workflow should look like the following image.

![A workflow with the Freshservice node](/_images/integrations/builtin/app-nodes/freshservice/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Freshservice node

1. First enter your credentials for the Freshservice node. You can find out how to do that [here](/integrations/builtin/credentials/freshservice/).
2. Select **Ticket** from the *Resource* dropdown.
3. Select **Get All** from the *Operation* dropdown.
4. Enable the **Return All** toggle.
5. From the *Add Filter* dropdown select **Priority**.
6. From the new *Priority* dropdown select **Urgent**.
5. Click on **Execute Node** to run the workflow.
