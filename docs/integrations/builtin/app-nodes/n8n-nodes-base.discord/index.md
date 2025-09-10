---
title: Discord node documentation
description: Learn how to use the Discord node in n8n. Follow technical documentation to integrate Discord node into your workflows.
contentType: [integration, reference]
priority: high
---

# Discord node

Use the Discord node to automate work in Discord, and integrate Discord with other applications. n8n has built-in support for a wide range of Discord features, including sending messages in a Discord channel and managing channels.

On this page, you'll find a list of operations the Discord node supports and links to more resources.

/// note | Credentials
Refer to [Discord credentials](/integrations/builtin/credentials/discord.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations
<!-- vale off -->
<!-- "Many" triggers warnings -->

- Channel
	- Create
	- Delete
	- Get
	- Get Many
	- Update
- Message
	- Delete
	- Get
	- Get Many
	- React with Emoji
	- Send
	* Send and Wait for Response
- Member
	- Get Many
	- Role Add
	- Role Remove

--8<-- "_snippets/integrations/builtin/send-and-wait-operation.md"

<!-- vale on -->

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'discord') ]]

## Related resources

Refer to [Discord's documentation](https://discord.com/developers/docs/intro) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-base.discord/common-issues.md).
