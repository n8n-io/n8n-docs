---
title: Google Chat node documentation
description: Learn how to use the Google Chat node in n8n. Follow technical documentation to integrate Google Chat node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Google Chat node

Use the Google Chat node to automate work in Google Chat, and integrate Google Chat with other applications. n8n has built-in support for a wide range of Google Chat features, including getting membership and spaces, as well as creating and deleting messages. 

On this page, you'll find a list of operations the Google Chat node supports and links to more resources.

/// note | Credentials
Refer to [Google credentials](/integrations/builtin/credentials/google/index.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Member
    * Get a membership
    * Get all memberships in a space
* Message
    * Create a message
    * Delete a message
    * Get a message
	* Send and Wait for Response
    * Update a message
* Space
    * Get a space
    * Get all spaces the caller is a member of

--8<-- "_snippets/integrations/builtin/send-and-wait-operation.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-chat') ]]
