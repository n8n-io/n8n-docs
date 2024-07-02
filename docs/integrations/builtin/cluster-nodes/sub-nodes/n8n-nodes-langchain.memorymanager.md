---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Chat Memory Manager
description: Documentation for the Chat Memory Manager node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Chat Memory Manager

The Chat Memory Manager node manages chat message memories within your workflows. Use this node to load, insert, and delete chat messages in an in-memory vector store.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/chat-memory-manager-purpose.md"

On this page, you'll find a list of operations that the Chat Memory Manager node supports, along with links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Chat Memory Manager integrations](https://n8n.io/integrations/chat-memory-manager/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Operation Mode**: choose between **Get Many Messages**, **Insert Messages**, and **Delete Messages** operations.
* **Insert Mode**: available in **Insert Messages** mode. Choose between **Insert Messages** to add alongside existing messages or **Override All Messages** to replace current memory.
* **Delete Mode**: available in **Delete Messages** mode. Select either **Last N** to delete the last N messages or **All Messages** to clear all messages from memory.
* **Chat Messages**: available in **Insert Messages** mode. Define the chat messages to insert into the memory, including:
	* **Type Name or ID**: set the message type. Select one of:
		* **AI**: use this for messages from the AI.
		* **System**: add a message containing instructions for the AI.
		* **User**: use this for messages from the user. This message type is sometimes called the 'human' message in other AI tools and guides.
	* **Message**: the message contents.
	* **Hide Message in Chat**: whether n8n should display the message to the user in the chat UI.
* **Messages Count**: available in **Delete Messages** mode and when you select **Last N**. Specify the number of latest messages to delete.
* **Simplify Output**: available in **Get Many Messages** mode. Toggle to simplify the output to include only the sender (AI, user, or system) and the text.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/chat-messages-manager/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Memory documentation](https://js.langchain.com/docs/modules/memory/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
