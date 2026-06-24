---
title: MongoDB Atlas Vector Store node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: MongoDB Atlas Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremongodbatlas.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremongodbatlas
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremongodbatlas
description: >-
  Learn how to use the MongoDB Atlas Vector Store node in n8n. Follow technical
  documentation to integrate MongoDB Atlas Vector Store node into your
  workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# MongoDB Atlas Vector Store

MongoDB Atlas Vector Search is a feature of MongoDB Atlas that enables users to store and query vector embeddings. Use this node to interact with Vector Search indexes in your MongoDB Atlas collections. You can insert documents, retrieve documents, and use the vector store in chains or as a tool for agents.

On this page, you'll find the node parameters for the MongoDB Atlas Vector Store node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/mongodb.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Before using this node, create a [Vector Search index](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-type/) in your MongoDB Atlas collection. Follow these steps to create one:

1. Log in to the [MongoDB Atlas dashboard](https://cloud.mongodb.com/).
2. Select your organization and project.
3. Find "Search & Vector Search" section.
4. Select your cluster and click "Go to search".
5. Click "Create Search Index".
6.  Choose "Vector Search" mode and use the visual or JSON editors. For example:

    ```json
    {
      "fields": [
        {
          "type": "vector",
          "path": "<field-name>",
          "numDimensions": 1536, // any other value
          "similarity": "<similarity-function>"
        }
      ]
    }
    ```
7. Adjust the "dimensions" value according to your embedding model (For example, `1536` for OpenAI's `text-embedding-small-3`).
8. Name your index and create.

Make sure to note the following values which are required when configuring the node:

* Collection name
* Vector index name
* Field names for embeddings and metadata

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the MongoDB Atlas Vector Store node in the following patterns:

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the MongoDB Atlas Vector Store as a regular node to insert or get documents. This pattern places the MongoDB Atlas Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) (the template uses the Supabase Vector Store, but the pattern is the same).

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the MongoDB Atlas Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/) to use the vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> MongoDB Atlas Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the MongoDB Atlas Vector Store node to fetch documents from the MongoDB Atlas Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> MongoDB Atlas Vector Store.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the MongoDB Atlas Vector Store node. Rather than connecting the MongoDB Atlas Vector Store directly as a tool, this pattern uses a tool specifically designed to summarize data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) (the linked example uses the In-Memory Vector Store, but the pattern is the same) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> In-Memory Vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wxaa18Qg530lwp4KjOwq/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/EzkuyHx0puco05IkndRC/" %}

### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>

* **Mongo Collection**: Enter the name of the MongoDB collection to use.
* **Vector Index Name**: Enter the name of the Vector Search index in your MongoDB Atlas collection.
* **Embedding Field**: Enter the field name in your documents that contains the vector embeddings.
* **Metadata Field**: Enter the field name in your documents that contains the text metadata.

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Mongo Collection**: Enter the name of the MongoDB collection to use.
* **Vector Index Name**: Enter the name of the Vector Search index in your MongoDB Atlas collection.
* **Embedding Field**: Enter the field name in your documents that contains the vector embeddings.
* **Metadata Field**: Enter the field name in your documents that contains the text metadata.

### Retrieve Documents parameters (As Vector Store for Chain/Tool) <a href="#retrieve-documents-parameters-as-vector-store-for-chaintool" id="retrieve-documents-parameters-as-vector-store-for-chaintool"></a>

* **Mongo Collection**: Enter the name of the MongoDB collection to use.
* **Vector Index Name**: Enter the name of the Vector Search index in your MongoDB Atlas collection.
* **Embedding Field**: Enter the field name in your documents that contains the vector embeddings.
* **Metadata Field**: Enter the field name in your documents that contains the text metadata.

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Mongo Collection**: Enter the name of the MongoDB collection to use.
* **Vector Index Name**: Enter the name of the Vector Search index in your MongoDB Atlas collection.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options <a href="#node-options" id="node-options"></a>

### Options <a href="#options" id="options"></a>

* **Metadata Filter**: Filters results based on metadata.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse MongoDB Atlas Vector Store node documentation integration templates](https://n8n.io/integrations/mongodb-atlas-vector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to:

* [LangChain's MongoDB Atlas Vector Search documentation](https://js.langchain.com/docs/integrations/vectorstores/mongodb_atlas) for more information about the service.
* [MongoDB Atlas Vector Search documentation](https://www.mongodb.com/docs/atlas/atlas-vector-search/) for more information about MongoDB Atlas Vector Search.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ou1SzleSsYddnaSSV2H2/" %}
