---
title: RSS Feed Trigger node documentation
description: Learn how to use the RSS Feed Trigger node in n8n. Follow technical documentation to integrate RSS Feed Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# RSS Feed Trigger node

The RSS Feed Trigger node allows you to start an n8n workflow when a new RSS feed item has been published.

On this page, you'll find a list of operations the RSS Feed Trigger node supports, and links to more resources.

## Node parameters

* **Poll Times**: Select a poll **Mode** to set how often to trigger the poll. Your **Mode** selection will add or remove relevant fields. Refer to the sections below to configure the parameters for each mode type.
* **Feed URL**: Enter the URL of the RSS feed to poll.

--8<-- "_snippets/integrations/builtin/poll-modes.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'rss-feed-trigger') ]]

## Related resources

n8n provides an app node for RSS Feeds. You can find the node docs [here](/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedread.md).
