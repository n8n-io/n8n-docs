# HaloPSA

[HaloPSA](https://halopsa.com/) is a intuitive PSA software. Standardise your processes and keep your customers at the center of every conversation.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/haloPSA/).


## Basic Operations

* Client
    * Create a client
    * Delete a client
    * Get a client
    * Get all clients
    * Update a client
* Site
    * Create a site
    * Delete a site
    * Get a site
    * Get all sites
    * Update a site
* Ticket
    * Create a ticket
    * Delete a ticket
    * Get a ticket
    * Get all tickets
    * Update a ticket
* User
    * Create a user
    * Delete a user
    * Get a user
    * Get all users
    * Update a user

## Example Usage

This workflow allows you to create a client in HaloPSA. This example workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [HaloPSA]()

![A workflow with the Harvest node](/_images/integrations/builtin/app-nodes/halopsa/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. HaloPSA node (resource: client)

This node will create a new client in HaloPSA.

1. First of all, you'll have to enter credentials for the HaloPSA node. You can find out how to do that [here](/integrations/builtin/credentials/haloPSA/).
2. Select 'Client' in the ***Resource*** field.
3. Select 'Create' in the ***Operation*** field.
4. Enter the client name in the ***Name*** field.
5. Add additional fields such as ***VIP*** or ***Website*** by clicking ***Add Field***.

In the below screenshot you can see how the node creates a new client in HaloPSA.

![Using the HaloPSA node to create a client](/_images/integrations/builtin/app-nodes/halopsa/halopsa-client-create.png)
