---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: In-Memory Vector Store node documentation
description: Learn how to use the In-Memory Vector Store node in n8n. Follow technical documentation to integrate In-Memory Vector Store node into your workflows.
contentType: integration
priority: medium
---

# In-Memory Vector Store node

Use the In Memory Vector Store node to store and retrieve embeddings in n8n's in-app memory. 

On this page, you'll find the node parameters for the In Memory Vector Store node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

/// note | This node is different to AI memory nodes
The in-memory storage described here is different to the AI memory nodes such as [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/).

This node creates a vector database in the app memory.
///

## Node usage patterns

You can use the In-Memory Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

You can use the In-Memory Vector Store as a regular node to insert or get documents. This pattern places the In-Memory Vector Store in the regular connection flow without using an agent.

You can see an example of in step 2 of [this template](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/).

### Connect directly to an AI agent as a tool

You can connect the In-Memory Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) to use vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> In-Memory Vector Store node.

### Use a retriever to fetch documents

You can use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/) node with the In-Memory Vector Store node to fetch documents from the In-Memory Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> In-Memory Vector Store.

### Use the Vector Store Question Answer Tool to answer questions

Another pattern uses the [Vector Store Question Answer Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/) to summarize results and answer questions from the In-Memory Vector Store node. Rather than connecting the In-Memory Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> In-Memory Vector store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

<!-- vale from-write-good.Weasel = NO -->
### Get Many parameters
<!-- vale from-write-good.Weasel = YES -->

* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.


### Insert Documents parameters

* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* **Clear Store**: Use this parameter to control whether to wipe the vector store for the given memory key for this workflow before inserting data (turned on).

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.

### Retrieve Documents (As Tool for AI Agent) parameters

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Memory Key**: Enter the key to use to store the vector memory in the workflow data. n8n prefixes the key with the workflow ID to avoid collisions.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'in-memory-vector-store') ]]

## Related resources

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/integrations/vectorstores/memory/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
