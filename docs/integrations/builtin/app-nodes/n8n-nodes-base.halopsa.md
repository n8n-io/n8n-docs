---
title: HaloPSA
description: Documentation for the HaloPSA node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# HaloPSA

Use the HaloPSA node to automate work in HaloPSA, and integrate HaloPSA with other applications. n8n has built-in support for a wide range of HaloPSA features, including creating, updating, deleting, and getting clients, sites and tickets. 

On this page, you'll find a list of operations the HaloPSA node supports and links to more resources.

/// note | Credentials
Refer to [HaloPSA credentials](/integrations/builtin/credentials/halopsa/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [HaloPSA integrations](https://n8n.io/integrations/halopsa/){:target="_blank" .external-link} list.
///

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

1. First of all, you'll have to enter credentials for the HaloPSA node. You can find out how to do that [here](/integrations/builtin/credentials/halopsa/).
2. Select 'Client' in the ***Resource*** field.
3. Select 'Create' in the ***Operation*** field.
4. Enter the client name in the ***Name*** field.
5. Add additional fields such as ***VIP*** or ***Website*** by clicking ***Add Field***.

In the below screenshot you can see how the node creates a new client in HaloPSA.

![Using the HaloPSA node to create a client](/_images/integrations/builtin/app-nodes/halopsa/halopsa-client-create.png)

