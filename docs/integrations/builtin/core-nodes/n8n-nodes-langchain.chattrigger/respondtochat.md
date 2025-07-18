---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Respond to Chat node documentation
description: Learn how to use the Respond to Chat node in n8n. Follow technical documentation to integrate the Respond to Chat node into your workflows.
priority: critical
---

# Respond to Chat node

Use the Respond to Chat node in correspondence with the Chat Trigger node to send a response into the chat and optionally wait for a response from the user. This allows you to have multiple chat interactions within a single execution and enables human-in-the-loop use cases in the chat.

/// note | Chat Trigger node
The Respond to Chat node requires a [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) node to be present in the workflow.
///

## Node parameters

### Message

This is the message that will be sent into the chat.

### Wait for User Reply

Set whether the workflow execution should wait for a response from the user (turned on) or continue immediately after sending the message (turned off).

## Node options

### Add Memory Input Connection

Choose whether you want to commit the messages from the Respond to Chat node into a connected memory. Using a shared memory between an agent or chain [root node](/integrations/builtin/cluster-nodes/root-nodes/index.md) and the Respond to Chat node will attach the same session key to these messages and let you capture the full message history.

### Limit Wait Time

When Wait for User Reply is turned on, this option decides whether the workflow will automatically resume execution after a specific limit (turned on) or not (turned off).

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Common issues

For common questions or issues and suggested solutions, refer to [Common Issues](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/common-issues.md).
