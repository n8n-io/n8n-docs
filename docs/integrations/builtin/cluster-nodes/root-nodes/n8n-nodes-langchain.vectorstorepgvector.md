---
title: PGVector Vector Store node documentation
description: >-
  Learn how to use the PGVector Vector Store node in n8n. Follow technical
  documentation to integrate PGVector Vector Store node into your workflows.
priority: medium
nodeTitle: PGVector Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepgvector.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepgvector
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepgvector
layout:
  description:
    visible: false
---

# PGVector Vector Store node <a href="#pgvector-vector-store-node" id="pgvector-vector-store-node"></a>

PGVector is an extension of Postgresql. Use this node to interact with the PGVector tables in your Postgresql database. You can insert documents into a vector table, get documents from a vector table, retrieve documents to provide them to a retriever connected to a [chain](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-chain), or connect directly to an [agent](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-agent) as a [tool](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-tool).

On this page, you'll find the node parameters for the PGVector node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/postgres.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the PGVector Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the PGVector Vector Store as a regular node to insert or get documents. This pattern places the PGVector Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) (the template uses the Supabase Vector Store, but the pattern is the same).

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the PGVector Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/README.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> PGVector Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the PGVector Vector Store node to fetch documents from the PGVector Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/README.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> PGVector Vector Store.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the PGVector Vector Store node. Rather than connecting the PGVector Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) (the linked example uses the Simple Vector Store, but the pattern is the same) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Simple Vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wxaa18Qg530lwp4KjOwq/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/EzkuyHx0puco05IkndRC/" %}


### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>


* **Table name**: Enter the name of the table you want to query.
* **Prompt**: Enter your search query.
* **Limit**: Enter a number to set how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Table name**: Enter the name of the table you want to query.

### Retrieve Documents parameters (As Vector Store for Chain/Tool) <a href="#retrieve-documents-parameters-as-vector-store-for-chaintool" id="retrieve-documents-parameters-as-vector-store-for-chaintool"></a>

* **Table name**: Enter the name of the table you want to query.

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Table Name**: Enter the PGVector table to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options <a href="#node-options" id="node-options"></a>

### Collection <a href="#collection" id="collection"></a>

A way to separate datasets in PGVector. This creates a separate table and column to keep track of which collection a vector belongs to.

* **Use Collection**: Select whether to use a collection (turned on) or not (turned off).
* **Collection Name**: Enter the name of the collection you want to use.
* **Collection Table Name**: Enter the name of the table to store collection information in.

### Column Names <a href="#column-names" id="column-names"></a>

The following options specify the names of the columns to store the vectors and corresponding information in:

* **ID Column Name**
* **Vector Column Name**
* **Content Column Name**
* **Metadata Column Name**

### Metadata Filter <a href="#metadata-filter" id="metadata-filter"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/bpc4wzHPded8F4exMlrt/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse PGVector Vector Store node documentation integration templates](https://n8n.io/integrations/postgres-pgvector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's PGVector documentation](https://js.langchain.com/docs/integrations/vectorstores/pgvector) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ou1SzleSsYddnaSSV2H2/" %}
