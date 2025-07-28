
---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Streaming responses
description: Build a workflow with streaming responses
contentType: howto
---

# Streaming responses

/// info | Feature availability
Available on all plans from n8n version 1.105.2.
///

Streaming responses let you send data back to users as an AI Agent node generates it. This is useful for chatbots, where you want to show the user the answer as it's generated to provide a better user experience.

You can enable streaming using either:
- The [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) 
- The [Webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook.md) 
with **Response Mode** set to **Streaming**


## Configure nodes for streaming

To stream data, you need to add nodes to the workflow that support streaming output. Not all nodes currently support this feature.

1. Choose a node that supports streaming, such as:
   - [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md)
   - [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook.md)
2. You can disable streaming in the options of these nodes, by default they will stream data when the `Response Mode` in the executed trigger is set to `Streaming response`.


## Important

- **Trigger**: Your trigger node must be configured for streaming. Without this, the workflow behaves normally based on your response mode settings.
- **Node configuration**: Even with streaming enabled on the trigger, you need at least one node configured to stream data. Otherwise, no data will be sent from the workflow.
