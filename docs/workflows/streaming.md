
---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Streaming responses
description: Build a workflow with streaming responses
contentType: howto
---

# Streaming responses

/// info | Feature availability
Available on all plans from n8n version 1.101.0.
///

Streaming responses let you send data back to users in real-time as your workflow processes it. This is perfect for long-running tasks or when you want to provide immediate feedback.

You can enable streaming using either:
- The [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) 
- The [Webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook.md) with **Response Mode** set to **Streaming response**

With streaming enabled, your workflows can handle large datasets or complex operations without making users wait for the entire process to complete.

## Configure nodes for streaming

To stream data, you need nodes that support streaming output. Not all nodes currently support this feature.

1. Choose a node that supports streaming, such as:
   - [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md)
   - [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook.md)
2. You can disable streaming in the options of these nodes, by default they are set to stream data when the `Response Mode` is set to `Streaming response`.


## Important considerations

- **Trigger requirement**: Your trigger node must be configured for streaming. Without this, the workflow behaves normally based on your response mode settings.
- **Node configuration**: Even with streaming enabled on the trigger, you need at least one node configured to stream data. Otherwise, no real-time data will be sent to users.
