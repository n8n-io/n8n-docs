---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Chat Memory Manager node documentation
description: Learn how to use the Chat Memory Manager node in n8n. Follow technical documentation to integrate Chat Memory Manager node into your workflows.
contentType: integration
priority: medium
---

# Chat Memory Manager node

The Chat Memory Manager node manages chat message memories within your workflows. Use this node to load, insert, and delete chat messages in an in-memory vector store.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/chat-memory-manager-purpose.md"

On this page, you'll find a list of operations that the Chat Memory Manager node supports, along with links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Operation Mode**: Choose between **Get Many Messages**, **Insert Messages**, and **Delete Messages** operations.
* **Insert Mode**: Available in **Insert Messages** mode. Choose from:
    * **Insert Messages**: Insert messages alongside existing messages.
    * **Override All Messages**: Replace current memory.
* **Delete Mode**: available in **Delete Messages** mode. Choose from:
    * **Last N**: Delete the last N messages.
    * **All Messages**: Delete messages from memory.
* **Chat Messages**: available in **Insert Messages** mode. Define the chat messages to insert into the memory, including:
	* **Type Name or ID**: Set the message type. Select one of:
		* **AI**: Use this for messages from the AI.
		* **System**: Add a message containing instructions for the AI.
		* **User**: Use this for messages from the user. This message type is sometimes called the 'human' message in other AI tools and guides.
	* **Message**: Enter the message contents.
	* **Hide Message in Chat**: Select whether n8n should display the message to the user in the chat UI (turned off) or not (turned on).
* **Messages Count**: Available in **Delete Messages** mode when you select **Last N**. Enter the number of latest messages to delete.
* **Simplify Output**: Available in **Get Many Messages** mode. Turn on to simplify the output to include only the sender (AI, user, or system) and the text.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'chat-memory-manager') ]]

## Related resources

Refer to [LangChain's Memory documentation](https://langchain-ai.github.io/langgraphjs/concepts/memory/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
