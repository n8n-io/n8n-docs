---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Token Splitter node documentation
description: Learn how to use the Token Splitter node in n8n. Follow technical documentation to integrate Token Splitter node into your workflows.
contentType: integration
priority: medium
---

# Token Splitter node

The Token Splitter node splits a raw text string by first converting the text into BPE tokens, then splits these tokens into chunks and converts the tokens within a single chunk back into text.

On this page, you'll find the node parameters for the Token Splitter node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Chunk Size**: Enter the number of characters in each chunk.
* **Chunk Overlap**: Enter how much overlap to have between chunks.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'token-splitter') ]]

## Related resources

Refer to [LangChain's token documentation](https://js.langchain.com/docs/concepts/tokens/){:target=_blank .external-link} and [LangChain's text splitter documentation](https://js.langchain.com/docs/concepts/text_splitters/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
