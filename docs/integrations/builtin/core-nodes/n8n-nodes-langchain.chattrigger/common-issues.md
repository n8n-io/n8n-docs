---
title: Chat Trigger node common issues 
description: Documentation for common issues and questions in the Chat Trigger node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: high
---

# Chat Trigger node common issues

Here are some common errors and issues with the [Chat Trigger node](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) and steps to resolve or troubleshoot them.

## Pass data from a website to an embedded Chat Trigger node

When [embedding](https://www.npmjs.com/package/@n8n/chat) the Chat Trigger node in a website, you might want to pass extra information to the Chat Trigger. For example, passing a user ID stored in a site cookie.

To do this, use the `metadata` field in the JSON object you pass to the `createChat` function in your embedded chat window:

```javascript
createChat({
	webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
	metadata: {
		'YOUR_KEY': 'YOUR_DATA'
	};
});
```

The `metadata` field can contain arbitrary data that will appear in the Chat Trigger output alongside other output data. From there, you can query and process the data from downstream nodes as usual using	n8n's [data processing features](/data/index.md).

## Chat Trigger node doesn't fetch previous messages

When you configure a Chat Trigger node, you might experience problems fetching previous messages if you aren't careful about how you configure session loading. This often manifests as a `workflow could not be started!` error.

In Chat Triggers, the **Load Previous Session** option retrieves previous chat messages for a session using the `sessionID`. When you set the **Load Previous Session** option to **From memory**, it's almost always best to [connect the same memory node](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md#load-previous-session) to both the Chat Trigger and the Agent in your workflow:

1. In your **Chat Trigger** node, set the **Load Previous Session** option to **From Memory**. This is only visible if you've made the chat publicly available.
2. Attach a **Simple Memory** node to the **Memory** connector.
3. Attach the same **Simple Memory** node to **Memory** connector of your **Agent**.
4. In the **Simple Memory** node, set **Session ID** to **Connected Chat Trigger Node**.

One instance where you may want to attach separate memory nodes to your Chat Trigger and the Agent is if you want to set the **Session ID** in your memory node to **Define below**.

If you're retrieving the session ID from an expression, the same expression must work for each of the nodes attached to it. If the expression isn't compatible with each of the nodes that need memory, you might need to use separate memory nodes so you can customize the expression for the session ID on a per-node basis.
