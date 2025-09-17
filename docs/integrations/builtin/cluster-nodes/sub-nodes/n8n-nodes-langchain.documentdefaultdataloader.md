---
title: Default Data Loader node documentation
description: Learn how to use the Default Data Loader node in n8n. Follow technical documentation to integrate Default Data Loader node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Default Data Loader node

Use the Default Data Loader node to load binary data files or JSON data for [vector stores](/glossary.md#ai-vector-store) or summarization.

On this page, you'll find a list of parameters the Default Data Loader node supports, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Text Splitting**: Choose from:
	* **Simple**: Uses the [Recursive Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter.md) with a chunk size of 1000 and an overlap of 200.
	* **Custom**: Allows you to connect a text splitter of your choice.
* **Type of Data**: Select **Binary** or **JSON**.
* **Mode**: Choose from:
	* **Load All Input Data**: Use all the node's input data.
	* **Load Specific Data**: Use [expressions](/code/expressions.md) to define the data you want to load. You can add text as well as expressions. This means you can create a custom document from a mix of text and expressions.
* **Data Format**: Displays when you set **Type of Data** to **Binary**. Select the file MIME type for your binary data. Set to **Automatically Detect by MIME Type** if you want n8n to set the data format for you. If you set a specific data format and the incoming file MIME type doesn't match it, the node errors. If you use **Automatically Detect by MIME Type**, the node falls back to text format if it can't match the file MIME type to a supported data format.

## Node options

* **Metadata**: Set the metadata that should accompany the document in the vector store. This is what you match to using the **Metadata Filter** option when retrieving data using the vector store nodes.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'default-data-loader') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-doc-loaders-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

