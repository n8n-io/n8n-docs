---
title: Respond to Chat node documentation
description: Learn how to use the Respond to Chat node in n8n. Follow technical documentation to integrate the Respond to Chat node into your workflows.
priority: critical
---

# Respond to Chat node

Use the Respond to Chat node in correspondence with the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) node to send a response into the chat and optionally wait for a response from the user. This allows you to have multiple chat interactions within a single execution and enables human-in-the-loop use cases in the chat.

/// note | Chat Trigger node
The Respond to Chat node requires a [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) node to be present in the workflow, with the [Response Mode](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md#response-mode) set to 'Using Response Nodes'.
///

## Node parameters

### Message

The message to send to the chat.

### Wait for User Reply

Set whether the workflow execution should wait for a response from the user (enabled) or continue immediately after sending the message (disabled).

## Node options

### Add Memory Input Connection

Choose whether you want to commit the messages from the Respond to Chat node to a connected memory. Using a shared memory between an agent or chain [root node](/integrations/builtin/cluster-nodes/root-nodes/index.md) and the Respond to Chat node attaches the same session key to these messages and lets you capture the full message history.

### Limit Wait Time

When you enable **Wait for User Reply**, this option decides whether the workflow automatically resumes execution after a specific limit (enabled) or not (disabled).

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Common issues

For common questions or issues and suggested solutions, refer to [Common Issues](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/common-issues.md).
