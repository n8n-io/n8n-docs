---
title: NocoDB node documentation
description: Learn how to use the NocoDB node in n8n. Follow technical documentation to integrate NocoDB node into your workflows.
contentType: [integration, reference]
priority: medium
---

# NocoDB node

Use the NocoDB node to automate work in NocoDB, and integrate NocoDB with other applications. n8n has built-in support for a wide range of NocoDB features, including creating, updating, deleting, and retrieving rows. 

On this page, you'll find a list of operations the NocoDB node supports and links to more resources.

/// note | Credentials
Refer to [NocoDB credentials](/integrations/builtin/credentials/nocodb.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Base
    * Get
    * Get Many
* Row
    * Create
    * Update
    * Create or Update
    * Delete
    * Get
    * Search
    * Count
    * Upload Attachment to Cell
* Linked Row
    * List
    * Link
    * Unlink

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'nocodb') ]]

## Relates resources

Refer to [NocoDB's documentation](https://docs.nocodb.com/) for more information about the service.

n8n provides a trigger node for NocoDB. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.nocodbtrigger.md).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"