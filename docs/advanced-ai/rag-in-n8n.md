---
title: RAG in n8n
description: With Retrieval-Augmented Generation (RAG), you can give your models access to context-specific resources to help generate relevant answers. Learn how it works and how to use RAG in n8n.
contentType: overview
---

<!-- vale from-microsoft.Contractions = NO -->
<!-- vale from-microsoft.HeadingPunctuation = NO -->

# RAG in n8n

## What is RAG

[Retrieval-Augmented Generation (RAG)](/glossary.md#ai-retrieval-augmented-generation-rag) is a technique that improves AI responses by combining language models with external data sources. Instead of relying solely on the model's internal training data, RAG systems retrieve relevant documents to [ground](/glossary.md#ai-groundedness) responses in up-to-date, domain-specific, or proprietary knowledge. RAG workflows typically rely on vector stores to manage and search this external data efficiently.

## What is a vector store?

A [vector store](/glossary.md#ai-vector-store) is a special database designed to store and search high-dimensional vectors: numerical representations of text, images, or other data. When you upload a document, the vector store splits it into chunks and converts each chunk into a vector using an [embedding model](/glossary.md#ai-embedding).

You can query these vectors using similarity searches, which construct results based on *semantic meaning*, rather than keyword matches. This makes vector stores a powerful foundation for RAG and other AI systems that need to retrieve and reason over large sets of knowledge.

## How to use RAG in n8n

/// note | Start with a RAG template
👉 Try out RAG in n8n with the [RAG Starter Template](https://n8n.io/workflows/5010-rag-starter-template-using-simple-vector-stores-form-trigger-and-openai). The template includes two ready-made workflows: one for uploading files and one for querying them.
///

### Inserting data into your vector store

Before your agent can access custom knowledge, you need to upload that data to a vector store:

1. Add the nodes needed to fetch your source data.
2. Insert a **Vector Store** node (e.g. the [Simple Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory.md)) and choose the **Insert Documents** operation.
3. Select an **embedding model**, which converts your text into vector embeddings. Consult the FAQ for more information on [choosing the right embedding model](#how-do-i-choose-the-right-embedding-model).
4. Add a [Default Data Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md) node, which splits your content into chunks. You can use the default settings or define your own chunking strategy:
	* **Character Text Splitter:** splits by character length.
	* **Recursive Character Text Splitter:** recursively splits by Markdown, HTML, code blocks or simple characters (recommended for most use cases).
	* **Token Text Splitter:** splits by token count.
5. (Optional) Add **metadata** to each chunk to enrich the context and allow better filtering later.

### Querying your data

You can query the data in two main ways: using an agent or directly through a node.

### Using agents

1. Add an [agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) to your workflow.
2. Add the vector store as a **tool** and give it a **description** to help the agent understand when to use it:
	* Set the **limit** to define how many chunks to return.
	* Enable **Include Metadata** to provide extra context for each chunk.
3. Add the same **embedding model** you used when inserting the data.

/// tip | Pro tip
To save tokens on an expensive model, you can first use the [Vector Store Question Answer tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md) to retrieve relevant data, and only then pass the result to the Agent. To see this in action, check out [this template](https://n8n.io/workflows/5011-save-costs-in-rag-workflows-using-the-qanda-tool-with-multiple-models).
///

### Using the node directly

1. Add your vector store node to the canvas and choose the **Get Many** operation.
2. Enter a query or prompt:
	* Set a **limit** for how many chunks to return.
	* Enable **Include Metadata** if needed.

## FAQs

<!-- vale from-microsoft.FirstPerson = NO -->
### How do I choose the right embedding model?
<!-- vale from-microsoft.FirstPerson = YES -->

The right embedding model differs from case to case.

In general, smaller models (for example, `text-embedding-ada-002`) are faster and cheaper and thus ideal for short, general-purpose documents or lightweight RAG workflows. Larger models (for example, `text-embedding-3-large`) offer better semantic understanding. These are best for long documents, complex topics, or when accuracy is critical.

<!-- vale from-microsoft.FirstPerson = NO -->
### What is the best text splitting for my use case?
<!-- vale from-microsoft.FirstPerson = YES -->

This again depends a lot on your data:

* Small chunks (for example, 200 to 500 tokens) are good for fine-grained retrieval.
* Large chunks may carry more context but can become diluted or noisy.

Using the right overlap size is important for the AI to understand the context of the chunk. That's also why using the Markdown or Code Block splitting can often help to make chunks better.

Another good approach is to add more context to it (for example, about the document where the chunk came from). If you want you can read more about this, you can check out [this great article from Anthropic](https://www.anthropic.com/news/contextual-retrieval).
