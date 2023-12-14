---
title: Summarization Chain
description: Documentation for the Summarization Chain node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Summarization Chain

Use the Summarization Chain node to summarize multiple documents.

On this page, you'll find the node parameters for the Summarization Chain node, and links to more resources.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Summarization Chain integrations](https://n8n.io/integrations/summarization-chain/){:target=_blank .external-link} page.
///	

## Node parameters

Choose the type of data you need to summarize in **Data to Summarize**. The data type you choose determines the other node parameters.

* **Use Node Input (JSON)** and **Use Node Input (Binary)**: summarize the data coming into the node from the workflow. 
	* You can configure the **Chunking Strategy**: choose what strategy to use to define the data chunk sizes.
		* If you choose **Simple (Define Below)** you can then set **Characters Per Chunk** and **Chunk Overlap (Characters)**.
		* Choose **Advanced** if you want to connect a splitter sub-node that provides more configuration options.
* **Use Document Loader**: summarize data provided by a document loader sub-node.

## Node Options

You can configure the summarization method and prompts. Select **Add Option** > **Summarization Method and Prompts**.

Options in **Summarization Method**:

* **Map Reduce**: this is the recommended option. Learn more about [Map Reduce](https://js.langchain.com/docs/modules/chains/document/map_reduce){:target=_blank .external-link} in the LangChain documentation.
* **Refine**: learn more about [Refine](https://js.langchain.com/docs/modules/chains/document/refine){:target=_blank .external-link} in the LangChain documentation.
* **Stuff**: learn more about [Stuff](https://js.langchain.com/docs/modules/chains/document/stuff){:target=_blank .external-link} in the LangChain documentation.

You can define the prompts for individual summaries and the final summary combination. There are examples in the node. You must include the `"{text}"` placeholder.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/summarization-chain/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's documentation on summarization](https://js.langchain.com/docs/modules/chains/popular/summarize){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
