---
title: MultiQuery Retriever node documentation
description: Learn how to use the MultiQuery Retriever node in n8n. Follow technical documentation to integrate MultiQuery Retriever node into your workflows.
contentType: [integration, reference]
priority: medium
---

# MultiQuery Retriever node

The MultiQuery Retriever node automates the process of prompt tuning by using an LLM to generate multiple queries from different perspectives for a given user input query.

On this page, you'll find the node parameters for the MultiQuery Retriever node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Query Count**: Enter how many different versions of the query to generate.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'multiquery-retriever') ]]

## Related resources

Refer to [LangChain's retriever conceptual documentation](https://js.langchain.com/docs/concepts/retrievers) and [LangChain's multiquery retriever API documentation](https://v03.api.js.langchain.com/classes/langchain.retrievers_multi_query.MultiQueryRetriever.html) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

