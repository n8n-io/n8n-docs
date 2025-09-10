---
contentType: howto
title: Populate a Pinecone vector database from a website
description: Scrape a website, load the data into Pinecone, then query it using a chat workflow.
---

# Populate a Pinecone vector database from a website

Use n8n to scrape a website, load the data into Pinecone, then query it using a chat workflow. This workflow uses the [HTTP node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) to get website data, extracts the relevant content using the [HTML node](/integrations/builtin/core-nodes/n8n-nodes-base.html.md), then uses the [Pinecone Vector Store node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone.md) to send it to Pinecone. 

[[ workflowDemo("file:///advanced-ai/examples/populate_a_pinecone_vector_database_from_a_website.json") ]]

## Key features

This workflow uses:

* [HTTP node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md): fetches website data.
* [HTML node](/integrations/builtin/core-nodes/n8n-nodes-base.html.md): simplifies the data by extracting the main content from the page.
* [Pinecone Vector Store node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone.md) and [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md): transform the data into vectors and store it in Pinecone.
* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) and [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) to query the vector database.


## Using the example

--8<-- "_snippets/examples-color-key.md"
