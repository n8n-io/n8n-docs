---
title: What are vector databases?
description: >-
  Understand vector databases. Learn how n8n provides vector databases, along
  with the key components to work with them, including embeddings, retrievers,
  and document loaders.
contentType: explanation
nodeTitle: Store and search data with vectors
originalFilePath: advanced-ai/examples/understand-vector-databases.md
originalUrl: 'https://docs.n8n.io/advanced-ai/examples/understand-vector-databases'
url: >-
  https://docs.n8n.io/build/integrate-ai/understand-ai-components/store-and-search-data-with-vectors
layout:
  description:
    visible: false
---

# What are vector databases? <a href="#what-are-vector-databases" id="what-are-vector-databases"></a>

Vector databases store information as numbers:

> A vector database is a type of database that stores data as high-dimensional vectors, which are mathematical representations of features or attributes. ([source](https://learn.microsoft.com/en-us/semantic-kernel/memories/vector-db))

This enables fast and accurate similarity searches. With a vector database, instead of using conventional database queries, you can search for relevant data based on semantic and contextual meaning.

## A simplified example <a href="#a-simplified-example" id="a-simplified-example"></a>

A vector database could store the sentence "n8n is a source-available automation tool that you can self-host", but instead of storing it as text, the vector database stores an array of dimensions (numbers between 0 and 1) that represent its features. This doesn't mean turning each letter in the sentence into a number. Instead, the vectors in the vector database describe the sentence. 

Suppose that in a vector store `0.1` represents `automation tool`, `0.2` represents `source available`, and `0.3` represents `can be self-hosted`. You could end up with the following vectors:

| Sentence | Vector (array of dimensions) |
| -------- | ------ |
| n8n is a source-available automation tool that you can self-host | [0.1, 0.2, 0.3] |
| Zapier is an automation tool | [0.1] |
| Make is an automation tool | [0.1] |
| Confluence is a wiki tool that you can self-host | [0.3] |

{% hint style="info" %}
**This example is very simplified**

In practice, vectors are far more complex. A vector can range in size from tens to thousands of dimensions. The dimensions don't have a one-to-one relationship to a single feature, so you can't translate individual dimensions directly into single concepts. This example gives an approximate mental model, not a true technical understanding.
{% endhint %}


## Demonstrating the power of similarity search <a href="#demonstrating-the-power-of-similarity-search" id="demonstrating-the-power-of-similarity-search"></a>

Qdrant provides [vector search demos](https://qdrant.tech/demo/) to help users understand the power of vector databases. The [food discovery demo](https://food-discovery.qdrant.tech/) shows how a vector store can help match pictures based on visual similarities.

> This demo uses data from Delivery Service. Users may like or dislike the photo of a dish, and the app will recommend more similar meals based on how they look. It's also possible to choose to view results from the restaurants within the delivery radius. ([source](https://qdrant.tech/demo/))

For full technical details, refer to the [Qdrant demo-food-discovery GitHub repository](https://github.com/qdrant/demo-food-discovery).

## Embeddings, retrievers, text splitters, and document loaders <a href="#embeddings-retrievers-text-splitters-and-document-loaders" id="embeddings-retrievers-text-splitters-and-document-loaders"></a>

Vector databases require other tools to function:

- Document loaders and text splitters: document loaders pull in documents and data, and prepare them for embedding[^1]. Document loaders can use text splitters to break documents into chunks.
- Embeddings: these are the tools that turn the data (text, images, and so on) into vectors, and back into raw data. Note that n8n only supports text embeddings.
- Retrievers: retrievers fetch documents from vector databases. You need to pair them with an embedding to translate the vectors back into data.

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
