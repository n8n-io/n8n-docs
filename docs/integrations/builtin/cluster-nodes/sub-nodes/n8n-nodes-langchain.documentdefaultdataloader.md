---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Default Data Loader
description: Documentation for the Default Data Loader node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Default Data Loader

Use the Default Data Loader node to load binary data files or JSON data for vector stores or summarization.

On this page, you'll find a list of parameters the Default Data Loader node supports, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Type of Data**: select **Binary** or **JSON**.
* **Data Format**: displays when you set **Type of Data** to **Binary** . The file MIME type for binary data. Set to **Automatically Detect by MIME Type** if you want n8n to set the data format for you. If you set a specific data format and the incoming file MIME type doesn't match it, the node errors. If you use **Automatically Detect by MIME Type**, the node falls back to text format if it can't match the file MIME type to a supported data format.
* **Mode**: displays when you set **Type of Data** to **JSON**. Choose from:
	* **Load All Input Data**: use all the node's input data.
	* **Load Specific Data**: use [expressions](/code/expressions/) to define the data you want to load. You can add text as well as expressions. This means you can create a custom document from a mix of text and expressions.

## Node options

* **Metadata**: set the metadata that should accompany the document in the vector store. This is what you match to using the **Metadata Filter** option when retrieving data using the vector store nodes.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'default-data-loader') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-doc-loaders-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
