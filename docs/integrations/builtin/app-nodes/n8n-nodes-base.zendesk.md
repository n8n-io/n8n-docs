---
title: Zendesk node documentation
description: Learn how to use the Zendesk node in n8n. Follow technical documentation to integrate Zendesk node into your workflows.
contentType: [integration, reference]
---

# Zendesk node

Use the Zendesk node to automate work in Zendesk, and integrate Zendesk with other applications. n8n has built-in support for a wide range of Zendesk features, including creating, and deleting tickets, users, and organizations. 

On this page, you'll find a list of operations the Zendesk node supports and links to more resources.

/// note | Credentials
Refer to [Zendesk credentials](/integrations/builtin/credentials/zendesk.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

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

/// warning | Tag Replacement Behavior
When using the Zendesk node's "Update Ticket" operation and specifying the `Tag Names or IDs` field, the entire list of tags on the ticket **will be replaced**. Any tags not included in the update will be removed from the ticket due to how the Zendesk API processes tag updates by default.

**To avoid accidental tag removal:**

- First retrieve the ticket's tags and merge them with your new tags before updating.
- Alternatively, use the HTTP Request node with Zendesk's `additional_tags` property to add tags without removing existing ones.
- You can also call the ticket's `/tags` endpoint to add tags without replacing existing ones ([Zendesk tags endpoint documentation](https://developer.zendesk.com/api-reference/ticketing/ticket-management/tags/)).

See the official documentation for details: [Adding tags to tickets without overwriting existing tags](https://developer.zendesk.com/documentation/ticketing/managing-tickets/adding-tags-to-tickets-without-overwriting-existing-tags/).
///

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'zendesk') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
