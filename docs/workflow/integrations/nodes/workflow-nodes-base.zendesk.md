---
title: Zendesk
description: Use Zendesk with Workflow²
tags:
  - Workflow²
  - Zendesk
---
# Zendesk

[Zendesk](https://www.zendesk.com/) is a support ticketing system, designed to help track, prioritize, and solve customer support interactions. More than just a help desk, Zendesk Support helps nurture customer relationships with personalized, responsive support across any channel.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/zendesk/).


## Basic Operations

* Ticket
    * Create a ticket
    * Delete a ticket
    * Get a ticket
    * Get all tickets
    * Recover a suspended ticket
    * Update a ticket
* Ticket Field
    * Get a ticket field
    * Get all system and custom ticket fields
* User
    * Create a user
    * Delete a user
    * Get a user
    * Get all users
    * Get a user's organizations
    * Get data related to the user
    * Search users
    * Update a user
* Organization
    * Create an organization
    * Delete an organization
    * Count organizations
    * Get an organization
    * Get all organizations
    * Get data related to the organization
    * Update a organization

## Example Usage

This workflow allows you to create a ticket in Zendesk. You can also find the [workflow](https://n8n.io/workflows/496) on the website. This example usage workflow would use the following two nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Zendesk]()

The final workflow should look like the following image.

![A workflow with the Zendesk node](/_images/integrations/nodes/zendesk/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zendesk node

1. First of all, you'll have to enter credentials for the Zendesk node. You can find out how to do that [here](/workflow/integrations/credentials/zendesk/).
2. Enter the description of the ticket in the *Description* field.
3. Click on *Execute Node* to run the workflow.
