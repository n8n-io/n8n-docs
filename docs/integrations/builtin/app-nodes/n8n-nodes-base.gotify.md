---
title: Gotify node documentation
description: Learn how to use the Gotify node in n8n. Follow technical documentation to integrate Gotify node into your workflows.
contentType: [integration, reference]
---

# Gotify node

Use the Gotify node to automate work in Gotify, and integrate Gotify with other applications. n8n has built-in support for a wide range of Gotify features, including creating, deleting, and getting messages. 

On this page, you'll find a list of operations the Gotify node supports and links to more resources.

/// note | Credentials
Refer to [Gotify credentials](/integrations/builtin/credentials/gotify.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Message
    * Create
    * Delete
    * Get All

## Create message

When creating a message, you can configure the following:

### Additional fields

- **Priority**: The priority of the message (default: 1)
- **Title**: The title of the message

### Options

- **Content Type**: The message content type. Choose between:
    - **Plain**: The message renders as plain text (default)
    - **Markdown**: The message renders as markdown
- **Click URL**: Opens this URL when you click the notification
- **Big Image URL**: Shows a big image in the notification
- **Intent URL**: Opens an intent URL after the notification is delivered (Android only)

/// note | Message extras
The **Options** fields (**Click URL**, **Big Image URL**, **Intent URL**) use Gotify's message extras feature. These allow you to customize how notifications are displayed and behave in Gotify clients. Refer to [Gotify's message extras documentation](https://gotify.net/docs/msgextras){:target="_blank" .external-link} for more details.
///

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'gotify') ]]
