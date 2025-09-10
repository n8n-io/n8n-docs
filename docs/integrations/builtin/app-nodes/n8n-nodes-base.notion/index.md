---
title: Notion node documentation
description: Learn how to use the Notion node in n8n. Follow technical documentation to integrate Notion node into your workflows.
contentType: [integration, reference]
priority: high
---

# Notion node

Use the Notion node to automate work in Notion, and integrate Notion with other applications. n8n has built-in support for a wide range of Notion features, including getting and searching databases, creating pages, and getting users.

On this page, you'll find a list of operations the Notion node supports and links to more resources.

/// note | Credentials
Refer to [Notion credentials](/integrations/builtin/credentials/notion.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Block
	* Append After
	* Get Child Blocks
* Database
	* Get
	* Get Many
	* Search
* Database Page
	* Create
	* Get
	* Get Many
	* Update
* Page
	* Archive
	* Create
	* Search
* User
	* Get
	* Get Many

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'notion') ]]

## Related resources

n8n provides an app node for Notion. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.notiontrigger.md).

Refer to [Notion's documentation](https://developers.notion.com/) for details about their API.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common issues](/integrations/builtin/app-nodes/n8n-nodes-base.notion/common-issues.md).
