---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MultiQuery Retriever
description: Documentation for the MultiQuery Retriever node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# MultiQuery Retriever

The MultiQuery Retriever node automates the process of prompt tuning by using an LLM to generate multiple queries from different perspectives for a given user input query.

On this page, you'll find the node parameters for the MultiQuery Retriever node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

**Query Count**: how many different versions of the query to generate.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, page) ]]

## Related resources

Refer to [LangChain's multiquery retriever documentation](https://js.langchain.com/docs/modules/data_connection/retrievers/how_to/multi-query-retriever){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
