---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Moorcheh Vector Store node documentation
description: Learn how to use the Moorcheh Vector Store node in n8n. Follow technical documentation to integrate the Moorcheh Vector Store node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Moorcheh Vector Store node

Use the Moorcheh Vector Store to interact with your Moorcheh deployment as a [vector store](/glossary.md#ai-vector-store). You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a [chain](/glossary.md#ai-chain), or connect it directly to an [agent](/glossary.md#ai-agent) to use as a [tool](/glossary.md#ai-tool).

On this page, you'll find the node parameters for the Moorcheh Vector Store node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/moorcheh.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node usage patterns

You can use the Moorcheh Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents

Use the Moorcheh Vector Store as a regular node to insert or get documents. This pattern places the Moorcheh Vector Store in the regular connection flow without using an agent.

### Connect directly to an AI agent as a tool

Connect the Moorcheh Vector Store node directly to the tool connector of an [AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Moorcheh Vector Store node.

### Use a retriever to fetch documents

Use the [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Moorcheh Vector Store node to fetch documents from the Moorcheh Vector Store node. This is often used with the [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) node to fetch documents from the vector store that match the given chat input.

An example connection flow would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Moorcheh Vector Store.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Rerank Results

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-rerank-results.md"

<!-- vale from-write-good.Weasel = NO -->
### Get Many parameters
<!-- vale from-write-good.Weasel = YES -->

* **Moorcheh Namespace**: Enter the Moorcheh Namespace to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Moorcheh Namespace**: Enter the Moorcheh Namespace to use.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters

* **Moorcheh Namespace**: Enter the Moorcheh Namespace to use.

### Retrieve Documents (As Tool for AI Agent) parameters

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Moorcheh Namespace**: Enter the Moorcheh Namespace to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'moorcheh-vector-store') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_snippets/self-hosting/starter-kits/self-hosted-ai-starter-kit.md"


