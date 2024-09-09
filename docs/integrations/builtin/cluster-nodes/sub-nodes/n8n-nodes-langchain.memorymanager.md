---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Chat Memory Manager
description: Documentation for the Chat Memory Manager node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
priority: medium
---

# Chat Memory Manager

The Chat Memory Manager node manages chat message memories within your workflows. Use this node to load, insert, and delete chat messages in an in-memory vector store.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/chat-memory-manager-purpose.md"

On this page, you'll find a list of operations that the Chat Memory Manager node supports, along with links to more resources.

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'chat-memory-manager') ]]

## Related resources

Refer to [LangChain's Memory documentation](https://js.langchain.com/docs/modules/memory/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
