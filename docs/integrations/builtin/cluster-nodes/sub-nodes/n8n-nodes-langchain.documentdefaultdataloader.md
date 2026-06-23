---
title: Default Data Loader node documentation
description: >-
  Learn how to use the Default Data Loader node in n8n. Follow technical
  documentation to integrate Default Data Loader node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Default Data Loader node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader
layout:
  description:
    visible: false
---

# Default Data Loader node <a href="#default-data-loader-node" id="default-data-loader-node"></a>

Use the Default Data Loader node to load binary data files or JSON data for [vector stores](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-vector-store) or summarization.

On this page, you'll find a list of parameters the Default Data Loader node supports, and links to more resources.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Text Splitting**: Choose from:
	* **Simple**: Uses the [Recursive Character Text Splitter](n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter.md) with a chunk size of 1000 and an overlap of 200.
	* **Custom**: Allows you to connect a text splitter of your choice.
* **Type of Data**: Select **Binary** or **JSON**.
* **Mode**: Choose from:
	* **Load All Input Data**: Use all the node's input data.
	* **Load Specific Data**: Use [expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes) to define the data you want to load. You can add text as well as expressions. This means you can create a custom document from a mix of text and expressions.
* **Data Format**: Displays when you set **Type of Data** to **Binary**. Select the file MIME type for your binary data. Set to **Automatically Detect by MIME Type** if you want n8n to set the data format for you. If you set a specific data format and the incoming file MIME type doesn't match it, the node errors. If you use **Automatically Detect by MIME Type**, the node falls back to text format if it can't match the file MIME type to a supported data format.

## Node options <a href="#node-options" id="node-options"></a>

* **Metadata**: Set the metadata that should accompany the document in the vector store. This is what you match to using the **Metadata Filter** option when retrieving data using the vector store nodes.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Default Data Loader node documentation integration templates](https://n8n.io/integrations/default-data-loader) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lI07fWkeQzomTBNz6BxS/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

