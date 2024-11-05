---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Summarization Chain node documentation
description: Learn how to use the Summarize Chain node in n8n. Follow technical documentation to integrate Summarize Chain node into your workflows.
contentType: integration
priority: high
---

# Summarization Chain node

Use the Summarization Chain node to summarize multiple documents.

On this page, you'll find the node parameters for the Summarization Chain node, and links to more resources.

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

* **Map Reduce**: this is the recommended option. Learn more about [Map Reduce](https://js.langchain.com/v0.1/docs/modules/chains/document/map_reduce/){:target=_blank .external-link} in the LangChain documentation.
* **Refine**: learn more about [Refine](https://js.langchain.com/v0.1/docs/modules/chains/document/refine/){:target=_blank .external-link} in the LangChain documentation.
* **Stuff**: learn more about [Stuff](https://js.langchain.com/v0.1/docs/modules/chains/document/stuff/){:target=_blank .external-link} in the LangChain documentation.

You can customize the **Individual Summary Prompts** and the **Final Prompt to Combine**. There are examples in the node. You must include the `"{text}"` placeholder.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'summarization-chain') ]]

## Related resources

Refer to [LangChain's documentation on summarization](https://js.langchain.com/docs/tutorials/summarization/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
