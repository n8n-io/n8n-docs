---
title: Notion credentials
description: Documentation for Notion credentials. Use these credentials to authenticate Notion in n8n, a workflow automation platform.
---

# Notion credentials

You can use these credentials to authenticate the following nodes with Notion.

- [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/)
- [Notion Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.notiontrigger/)

## Prerequisites

Notion provides access using API keys. To get and use the API key, you need:

* A [Notion](https://notion.so){:target=_blank .external-link} account, with admin level access.
* A [Notion integration](https://developers.notion.com/docs/getting-started){:target=_blank .external-link}.

## Get your API key

Follow Step 1 in the [Notion integration guide](https://developers.notion.com/docs/create-a-notion-integration){:target=_blank .external-link} to create your integration and get your Notion integration token (API key).

On the **Capabilities** screen, enable the following:

* Read content
* Update content
* Insert content
* Read user information without email addresses

You can then enter the API key in n8n, in your Notion credential.

