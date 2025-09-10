---
title: AI environment variables
description: Manage AI features in your n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# AI environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_AI_ENABLED` | Boolean | `false` | Whether AI features are enabled (true) or not (false). Enables Ask AI for the HTTP node.|
| `N8N_AI_PROVIDER` | String | `openai` | The AI provider to use. Currently, n8n only supports OpenAI. |
| `N8N_AI_OPENAI_API_KEY` | String | - | Your OpenAI API key. |

