---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Chat Trigger node common issues 
description: Documentation for common issues and questions in the Chat Trigger node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: high
---

# Chat Trigger node common issues

Here are some common errors and issues with the [Chat Trigger node](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) and steps to resolve or troubleshoot them.

## Pass data from a website to an embedded Chat Trigger node

When [embedding](https://www.npmjs.com/package/@n8n/chat) the Chat Trigger node in a website, you might want to pass extra information to the Chat Trigger. For example, passing a user ID stored in a site cookie.

To to this, use the `metadata` field in the JSON object you pass to the `createChat` function in your embedded chat window:

```javascript
createChat({
	webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
	metadata: {
		'YOUR_KEY': 'YOUR_DATA'
	};
});
```

The `metadata` field can contain arbitrary data that will appear in the Chat Trigger output alongside other output data. From there, you can query and process the data from downstream nodes as usual using	n8n's [data processing features](/data/).

## Embedded Chat Trigger node doesn't fetch previous messages

When you configure an [embedded Chat Trigger](https://www.npmjs.com/package/@n8n/chat) node, when it sends the `loadPreviousSession` action, you may receive a `workflow could not be started!` of there is a problem retrieving the session.

The `loadPreviousSession` action retrieves previous chat messages for a session using the `sessionID`. When using [**From memory**](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/#load-previous-session) for the **Load Previous Session** option, you typically want to connect the same memory node for both the Chat Trigger and the Agent in your workflow.

However, if you use an expression to retrieve the `sessionID` in the memory node instead of populating it automatically, the above error may occur. In this case, use [two separate memory nodes](https://community.n8n.io/t/n8n-chat-trigger-failing-to-fetch-previous-messages-loadprevioussession/49015) for the Chat Trigger and the Agent. Set the **Session ID** for the Chat Trigger memory node to **Take from previous node automatically**. For the Agent node, you can continue to use the expression to retrieve the session ID.
