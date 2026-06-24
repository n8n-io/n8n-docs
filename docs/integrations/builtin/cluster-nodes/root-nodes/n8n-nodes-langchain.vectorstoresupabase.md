---
title: Supabase Vector Store node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Supabase Vector Store node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase
description: >-
  Learn how to use the Supabase Vector Store node in n8n. Follow technical
  documentation to integrate Supabase Vector Store node into your workflows.
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

# Supabase Vector Store

Use the Supabase Vector Store to interact with your Supabase database as vector store. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

Use the Supabase Vector Store to interact with your Supabase database as [vector store](#user-content-fn-1)[^1]. You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a chain[^2], or connect it directly to an agent[^3] to use as a tool[^4]. You can also update an item in a vector store by its ID.

On this page, you'll find the node parameters for the Supabase node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/supabase.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

Supabase provides a [quickstart for setting up your vector store](https://supabase.com/docs/guides/ai/langchain?database-method=sql). If you use settings other than the defaults in the quickstart, this may affect parameter settings in n8n. Make sure you understand what you're doing.

## Node usage patterns <a href="#node-usage-patterns" id="node-usage-patterns"></a>

You can use the Supabase Vector Store node in the following patterns.

### Use as a regular node to insert, update, and retrieve documents <a href="#use-as-a-regular-node-to-insert-update-and-retrieve-documents" id="use-as-a-regular-node-to-insert-update-and-retrieve-documents"></a>

You can use the Supabase Vector Store as a regular node to insert, update, or get documents. This pattern places the Supabase Vector Store in the regular connection flow without using an agent.

You can see an example of this in scenario 1 of [this template](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/).

### Connect directly to an AI agent as a tool <a href="#connect-directly-to-an-ai-agent-as-a-tool" id="connect-directly-to-an-ai-agent-as-a-tool"></a>

You can connect the Supabase Vector Store node directly to the tool connector of an [AI agent](n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Supabase Vector Store node.

### Use a retriever to fetch documents <a href="#use-a-retriever-to-fetch-documents" id="use-a-retriever-to-fetch-documents"></a>

You can use the [Vector Store Retriever](../sub-nodes/n8n-nodes-langchain.retrievervectorstore.md) node with the Supabase Vector Store node to fetch documents from the Supabase Vector Store node. This is often used with the [Question and Answer Chain](n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the example uses Pinecone, but the pattern in the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Supabase Vector Store.

### Use the Vector Store Question Answer Tool to answer questions <a href="#use-the-vector-store-question-answer-tool-to-answer-questions" id="use-the-vector-store-question-answer-tool-to-answer-questions"></a>

Another pattern uses the [Vector Store Question Answer Tool](../sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to summarize results and answer questions from the Supabase Vector Store node. Rather than connecting the Supabase Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2621-ai-agent-to-chat-with-files-in-supabase-storage/) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Supabase Vector store.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Operation Mode <a href="#operation-mode" id="operation-mode"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/5aeZAt5P1m2YndTmiFTG/" %}

### Rerank Results <a href="#rerank-results" id="rerank-results"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KcxcfJWhy81cjCSzO4vQ/" %}

### Get Many parameters <a href="#get-many-parameters" id="get-many-parameters"></a>

* **Table Name**: Enter the Supabase table to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters <a href="#insert-documents-parameters" id="insert-documents-parameters"></a>

* **Table Name**: Enter the Supabase table to use.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters <a href="#retrieve-documents-as-vector-store-for-chaintool-parameters" id="retrieve-documents-as-vector-store-for-chaintool-parameters"></a>

* **Table Name**: Enter the Supabase table to use.

### Retrieve Documents (As Tool for AI Agent) parameters <a href="#retrieve-documents-as-tool-for-ai-agent-parameters" id="retrieve-documents-as-tool-for-ai-agent-parameters"></a>

* **Name**: The name of the vector store.
* **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
* **Table Name**: Enter the Supabase table to use.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Update Documents <a href="#update-documents" id="update-documents"></a>

* **Table Name**: Enter the Supabase table to use.
* **ID**: The ID of an embedding entry.

Parameters for **Update Documents**

* ID

## Node options <a href="#node-options" id="node-options"></a>

### Query Name <a href="#query-name" id="query-name"></a>

The name of the matching function you set up in Supabase. If you follow the [Supabase quickstart](https://supabase.com/docs/guides/ai/langchain?database-method=sql), this will be `match_documents`.

### Metadata Filter <a href="#metadata-filter" id="metadata-filter"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/9OWZ8hSpVqky4D4xRnYP/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse Supabase Vector Store node documentation integration templates](https://n8n.io/integrations/supabase-vector-store) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's Supabase documentation](https://js.langchain.com/docs/integrations/vectorstores/supabase/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
[^2]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
[^3]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^4]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
