---
title: Chat Trigger
description: Documentation for the Chat Trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Chat Trigger

Use the Chat Trigger node when AI workflows for chatbots and other chat interfaces.

You must connect either an agent or chain [root node](/integrations/builtin/cluster-nodes/root-nodes/).


///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Chat Trigger integrations](https://n8n.io/integrations/chat-trigger/){:target=_blank .external-link} page.
///

## Node parameters

* **Make Chat Publicly Available**: enable this when you're ready to activate the workflow and allow users to access the chat. Leave it disabled when building the workflow.
* **Mode**: choose how users access the chat. 
	* Choose **Hosted Chat** to use n8n's hosted chat interface. n8n recommends this for most users: you can configure the interface using the [node options](#node-options), and don't have to do any other setup.
	* **Embedded Chat** requires you to create your own chat interface. You can use n8n's [chat widget](https://www.npmjs.com/package/@n8n/chat){:target=_blank .external-link} or build your own. Your chat interface must call the webhook URL shown in **Chat URL** in the node.
* **Authentication**: you can restrict access to the chat.
	* **None**: no authentication. Anyone can use the chat.
	* **Basic Auth**: set up a username and password. The same username and password must be used by all users.
	* **n8n User Auth**: the user must have an n8n account.
* If using hosted chat, you can configure the **Initial Message(s)**. This is the message the n8n chat interface displays when the user arrives on the page.

## Node options

Available options depend on the chat mode.

### Hosted chat

* **Input Placeholder**, **Title**, and **Subtitle**: set text elements in the chat interface.
	??? Details "View screenshot"
		![Customizable text elements](/_images/integrations/builtin/core-nodes/chat-trigger/hosted-text-elements.png)
* **Load Previous Session**: whether to load chat messages from a previous chat session.
* **Response Mode**: use this when building a workflow with steps after the agent or chain that's handling the chat.
	* **When Last Node Finishes**: the Chat Trigger node returns the response code and the data output from the last node executed in the workflow.
	* **Using 'Respond to Webhook' Node**: the Chat Trigger node responds as defined in the [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/) node.
* **Require Button Click to Start Chat**: display a **New Conversation** button on the chat interface.
	??? Details "View screenshot"
		![New Conversation button](/_images/integrations/builtin/core-nodes/chat-trigger/new-conversation-button.png)
* **Allowed Origin (CORS)**: which origins can access the chat URL.

### Embedded chat

* **Load Previous Session**: whether to load chat messages from a previous chat session.
* **Response Mode**: use this when building a workflow with steps after the agent or chain that's handling the chat.
	* **When Last Node Finishes**: the Chat Trigger node returns the response code and the data output from the last node executed in the workflow.
	* **Using 'Respond to Webhook' Node**: the Chat Trigger node responds as defined in the [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/) node.
* **Allowed Origin (CORS)**: which origins can access the chat URL.

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
