---
title: Chat Memory Manager node documentation
description: >-
  Learn how to use the Chat Memory Manager node in n8n. Follow technical
  documentation to integrate Chat Memory Manager node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Chat Memory Manager node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager
layout:
  description:
    visible: false
---

# Chat Memory Manager node <a href="#chat-memory-manager-node" id="chat-memory-manager-node"></a>

The Chat Memory Manager node manages chat message [memories](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-memory) within your workflows. Use this node to load, insert, and delete chat messages in an in-memory [vector store](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-vector-store).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/AX0w52P6UHDs42hQvuqR/" %}

On this page, you'll find a list of operations that the Chat Memory Manager node supports, along with links to more resources.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Chat Memory Manager node documentation integration templates](https://n8n.io/integrations/chat-memory-manager) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Memory documentation](https://langchain-ai.github.io/langgraphjs/concepts/memory/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}


