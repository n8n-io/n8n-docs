---
title: Zendesk node documentation
description: >-
  Learn how to use the Zendesk node in n8n. Follow technical documentation to
  integrate Zendesk node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Zendesk node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.zendesk.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.zendesk'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.zendesk'
layout:
  description:
    visible: false
---

# Zendesk node <a href="#zendesk-node" id="zendesk-node"></a>

Use the Zendesk node to automate work in Zendesk, and integrate Zendesk with other applications. n8n has built-in support for a wide range of Zendesk features, including creating, and deleting tickets, users, and organizations. 

On this page, you'll find a list of operations the Zendesk node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Zendesk credentials](../credentials/zendesk.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

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

{% hint style="warning" %}
**Tag Replacement Behavior**

When using the Zendesk node's "Update Ticket" operation and specifying the `Tag Names or IDs` field, the entire list of tags on the ticket **will be replaced**. Any tags not included in the update will be removed from the ticket due to how the Zendesk API processes tag updates by default.

**To avoid accidental tag removal:**

- First retrieve the ticket's tags and merge them with your new tags before updating.
- Alternatively, use the HTTP Request node with Zendesk's `additional_tags` property to add tags without removing existing ones.
- You can also call the ticket's `/tags` endpoint to add tags without replacing existing ones ([Zendesk tags endpoint documentation](https://developer.zendesk.com/api-reference/ticketing/ticket-management/tags/)).

See the official documentation for details: [Adding tags to tickets without overwriting existing tags](https://developer.zendesk.com/documentation/ticketing/managing-tickets/adding-tags-to-tickets-without-overwriting-existing-tags/).
{% endhint %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Zendesk node documentation integration templates](https://n8n.io/integrations/zendesk) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}
