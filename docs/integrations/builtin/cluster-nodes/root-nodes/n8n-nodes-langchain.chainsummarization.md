---
title: Summarization Chain node documentation
description: >-
  Learn how to use the Summarize Chain node in n8n. Follow technical
  documentation to integrate Summarize Chain node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Summarization Chain node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization
layout:
  description:
    visible: false
---

# Summarization Chain node <a href="#summarization-chain-node" id="summarization-chain-node"></a>

Use the Summarization Chain node to summarize multiple documents.

On this page, you'll find the node parameters for the Summarization Chain node, and links to more resources.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Choose the type of data you need to summarize in **Data to Summarize**. The data type you choose determines the other node parameters.

* **Use Node Input (JSON)** and **Use Node Input (Binary)**: summarize the data coming into the node from the workflow. 
	* You can configure the **Chunking Strategy**: choose what strategy to use to define the data chunk sizes.
		* If you choose **Simple (Define Below)** you can then set **Characters Per Chunk** and **Chunk Overlap (Characters)**.
		* Choose **Advanced** if you want to connect a splitter sub-node that provides more configuration options.
* **Use Document Loader**: summarize data provided by a document loader sub-node.

## Node Options <a href="#node-options" id="node-options"></a>

You can configure the summarization method and prompts. Select **Add Option** > **Summarization Method and Prompts**.

Options in **Summarization Method**:

* **Map Reduce**: summarizes each chunk on its own, then combines the summaries. This is the recommended option.
* **Refine**: summarizes the first chunk, then updates that summary with each next chunk in turn.
* **Stuff**: sends all the text to the model in one prompt. Use it for short text that fits in the model's context window.

You can customize the **Individual Summary Prompts** and the **Final Prompt to Combine**. There are examples in the node. You must include the `"{text}"` placeholder.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Summarization Chain node documentation integration templates](https://n8n.io/integrations/summarization-chain) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

