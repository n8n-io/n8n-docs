---
title: Simple Memory node common issues 
description: Documentation for common issues and questions in the Simple Memory node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: high
---

# Simple Memory node common issues

Here are some common errors and issues with the [Simple Memory node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md) and steps to resolve or troubleshoot them.

## Single memory instance

If you add more than one Simple Memory node to your workflow, all nodes access the same memory instance by default. Be careful when doing destructive actions that override existing memory contents, such as the override all messages operation in the [Chat Memory Manager](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager.md) node. If you want more than one memory instance in your workflow, set different session IDs in different memory nodes.

## Managing the Session ID

In most cases, the `sessionId` is automatically retrieved from the **On Chat Message** trigger. But you may run into an error with the phrase `No sessionId`.

If you have this error, first check the output of your Chat trigger to ensure it includes a `sessionId`.

If you're not using the **On Chat Message** trigger, you'll need to manage sessions manually.

For testing purposes, you can use a static key like `my_test_session`. If you use this approach, be sure to set up proper session management before publishing the workflow to avoid potential issues in a live environment.
