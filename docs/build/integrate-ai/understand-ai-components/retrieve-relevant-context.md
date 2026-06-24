---
title: RAG in n8n
description: >-
  With Retrieval-Augmented Generation (RAG), you can give your models access to
  context-specific resources to help generate relevant answers. Learn how it
  works and how to use RAG in n8n.
contentType: overview
nodeTitle: Retrieve relevant context
originalFilePath: advanced-ai/rag-in-n8n.md
originalUrl: 'https://docs.n8n.io/advanced-ai/rag-in-n8n'
url: >-
  https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context
layout:
  description:
    visible: false
---




# RAG in n8n <a href="#rag-in-n8n" id="rag-in-n8n"></a>

## What is RAG <a href="#what-is-rag" id="what-is-rag"></a>

[Retrieval-Augmented Generation (RAG)](#user-content-fn-1)[^1] is a technique that improves AI responses by combining language models with external data sources. Instead of relying solely on the model's internal training data, RAG systems retrieve relevant documents to ground[^2] responses in up-to-date, domain-specific, or proprietary knowledge. RAG workflows typically rely on vector stores to manage and search this external data efficiently.

## What is a vector store? <a href="#what-is-a-vector-store" id="what-is-a-vector-store"></a>

A [vector store](#user-content-fn-3)[^3] is a special database designed to store and search high-dimensional vectors: numerical representations of text, images, or other data. When you upload a document, the vector store splits it into chunks and converts each chunk into a vector using an [embedding model](#user-content-fn-4)[^4].

You can query these vectors using similarity searches, which construct results based on *semantic meaning*, rather than keyword matches. This makes vector stores a powerful foundation for RAG and other AI systems that need to retrieve and reason over large sets of knowledge.

## How to use RAG in n8n <a href="#how-to-use-rag-in-n8n" id="how-to-use-rag-in-n8n"></a>

{% hint style="info" %}
**Start with a RAG template**

👉 Try out RAG in n8n with the [RAG Starter Template](https://n8n.io/workflows/5010-rag-starter-template-using-simple-vector-stores-form-trigger-and-openai). The template includes two ready-made workflows: one for uploading files and one for querying them.
{% endhint %}

### Inserting data into your vector store <a href="#inserting-data-into-your-vector-store" id="inserting-data-into-your-vector-store"></a>

Before your agent can access custom knowledge, you need to upload that data to a vector store:

1. Add the nodes needed to fetch your source data.
2. Insert a **Vector Store** node (e.g. the [Simple Vector Store](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory)) and choose the **Insert Documents** operation.
3. Select an **embedding model**, which converts your text into vector embeddings. Consult the FAQ for more information on [choosing the right embedding model](#how-do-i-choose-the-right-embedding-model).
4. Add a [Default Data Loader](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader) node, which splits your content into chunks. You can use the default settings or define your own chunking strategy:
	* **Character Text Splitter:** splits by character length.
	* **Recursive Character Text Splitter:** recursively splits by Markdown, HTML, code blocks or simple characters (recommended for most use cases).
	* **Token Text Splitter:** splits by token count.
5. (Optional) Add **metadata** to each chunk to enrich the context and allow better filtering later.

### Querying your data <a href="#querying-your-data" id="querying-your-data"></a>

You can query the data in two main ways: using an agent or directly through a node.

### Using agents <a href="#using-agents" id="using-agents"></a>

1. Add an [agent](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent) to your workflow.
2. Add the vector store as a **tool** and give it a **description** to help the agent understand when to use it:
	* Set the **limit** to define how many chunks to return.
	* Enable **Include Metadata** to provide extra context for each chunk.
3. Add the same **embedding model** you used when inserting the data.

{% hint style="info" %}
**Pro tip**

To save tokens on an expensive model, you can first use the [Vector Store Question Answer tool](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore) to retrieve relevant data, and only then pass the result to the Agent. To see this in action, check out [this template](https://n8n.io/workflows/5011-save-costs-in-rag-workflows-using-the-qanda-tool-with-multiple-models).
{% endhint %}

### Using the node directly <a href="#using-the-node-directly" id="using-the-node-directly"></a>

1. Add your vector store node to the canvas and choose the **Get Many** operation.
2. Enter a query or prompt:
	* Set a **limit** for how many chunks to return.
	* Enable **Include Metadata** if needed.

## FAQs <a href="#faqs" id="faqs"></a>


### How do I choose the right embedding model? <a href="#how-do-i-choose-the-right-embedding-model" id="how-do-i-choose-the-right-embedding-model"></a>


The right embedding model differs from case to case.

In general, smaller models (for example, `text-embedding-ada-002`) are faster and cheaper and thus ideal for short, general-purpose documents or lightweight RAG workflows. Larger models (for example, `text-embedding-3-large`) offer better semantic understanding. These are best for long documents, complex topics, or when accuracy is critical.


### What is the best text splitting for my use case? <a href="#what-is-the-best-text-splitting-for-my-use-case" id="what-is-the-best-text-splitting-for-my-use-case"></a>


This again depends a lot on your data:

* Small chunks (for example, 200 to 500 tokens) are good for fine-grained retrieval.
* Large chunks may carry more context but can become diluted or noisy.

Using the right overlap size is important for the AI to understand the context of the chunk. That's also why using the Markdown or Code Block splitting can often help to make chunks better.

Another good approach is to add more context to it (for example, about the document where the chunk came from). If you want you can read more about this, you can check out [this great article from Anthropic](https://www.anthropic.com/news/contextual-retrieval).

[^1]: Retrieval-augmented generation, or RAG, is a technique for providing LLMs access to new information from external sources to improve AI responses. RAG systems retrieve relevant documents to ground responses in up-to-date, domain-specific, or proprietary knowledge to supplement their original training data. RAG systems often rely on vector stores to manage and search this external data efficiently.
[^2]: In AI, and specifically in retrieval-augmented generation (RAG) contexts, groundedness and ungroundedness are measures of how much a model's responses accurately reflect source information. The model uses its source documents to generate grounded responses, while ungrounded responses involve speculation or hallucination unsupported by those same sources.
[^3]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
[^4]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
