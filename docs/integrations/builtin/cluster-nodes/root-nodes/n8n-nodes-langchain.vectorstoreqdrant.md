---
title: Qdrant Vector Store node documentation
description: >-
  Learn how to use the Qdrant Vector Store node in n8n. Follow technical
  documentation to integrate Qdrant Vector Store node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Qdrant Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant
layout:
  description:
    visible: false
---

# Qdrant Vector Store node <a href="#qdrant-vector-store-node" id="qdrant-vector-store-node"></a>

Use the Qdrant node to interact with your Qdrant collection as a [vector store](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-vector-store). You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a [chain](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-chain) or connect it directly to an [agent](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-agent) to use as a [tool](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-tool).

On this page, you'll find the node parameters for the Qdrant node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/qdrant.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the Qdrant Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents <a href="#use-as-a-regular-node-to-insert-and-retrieve-documents" id="use-as-a-regular-node-to-insert-and-retrieve-documents"></a>

You can use the Qdrant Vector Store as a regular node to insert or get documents. This pattern places the Qdrant Vector Store in the regular connection flow without using an agent.

You can see an example of this in the first part of [this template](https://n8n.io/workflows/2440-building-rag-chatbot-for-movie-recommendations-with-qdrant-and-open-ai/).

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the Qdrant Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/README.md) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Qdrant Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Qdrant Vector Store node to fetch documents from the Qdrant Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/README.md) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/2183-ai-crew-to-automate-fundamental-stock-analysis-qanda-workflow/) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Qdrant Vector Store.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Qdrant Vector Store node. Rather than connecting the Qdrant Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2464-scale-deal-flow-with-a-pitch-deck-ai-vision-chatbot-and-qdrant-vector-store/) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Qdrant Vector store.
	
## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wxaa18Qg530lwp4KjOwq/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/EzkuyHx0puco05IkndRC/" %}


### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>


* **Qdrant collection name**: Enter the name of the Qdrant collection to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

This Operation Mode includes one **Node option**, the [Metadata Filter](#metadata-filter).

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Qdrant collection name**: Enter the name of the Qdrant collection to use.

This Operation Mode includes one **Node option**:

* **Collection Config**: Enter JSON options for creating a Qdrant collection creation configuration. Refer to the Qdrant [Collections](https://qdrant.tech/documentation/concepts/collections/) documentation for more information.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters <a href="#retrieve-documents-as-vector-store-for-chaintool-parameters" id="retrieve-documents-as-vector-store-for-chaintool-parameters"></a>

* **Qdrant Collection**: Enter the name of the Qdrant collection to use.

This Operation Mode includes one **Node option**, the [Metadata Filter](#metadata-filter).

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Qdrant Collection**: Enter the name of the Qdrant collection to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options <a href="#node-options" id="node-options"></a>

### Metadata Filter <a href="#metadata-filter" id="metadata-filter"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/bpc4wzHPded8F4exMlrt/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Qdrant Vector Store node documentation integration templates](https://n8n.io/integrations/qdrant-vector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Qdrant documentation](https://js.langchain.com/docs/integrations/vectorstores/qdrant) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Ou1SzleSsYddnaSSV2H2/" %}
