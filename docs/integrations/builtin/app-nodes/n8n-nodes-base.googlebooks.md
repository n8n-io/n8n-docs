---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Books node documentation
description: Learn how to use the Google Books node in n8n. Follow technical documentation to integrate Google Books node into your workflows.
contentType: integration
---

# Google Books node

Use the Google Books node to automate work in Google Books, and integrate Google Books with other applications. n8n has built-in support for a wide range of Google Books features, including retrieving a specific bookshelf resource for the specified user, adding volume to a bookshelf, and getting volume.

On this page, you'll find a list of operations the Google Books node supports and links to more resources.

/// note | Credentials
Refer to [Google credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///

## Operations

* Bookshelf
    * Retrieve a specific bookshelf resource for the specified user
    * Get all public bookshelf resource for the specified user
* Bookshelf Volume
    * Add a volume to a bookshelf
    * Clears all volumes from a bookshelf
    * Get all volumes in a specific bookshelf for the specified user
    * Moves a volume within a bookshelf
    * Removes a volume from a bookshelf
* Volume
    * Get a volume resource based on ID
    * Get all volumes filtered by query

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-books') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
