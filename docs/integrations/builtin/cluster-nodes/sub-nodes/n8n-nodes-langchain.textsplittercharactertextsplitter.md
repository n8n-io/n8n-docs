---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Character Text Splitter
description: Documentation for the Character Text Splitter node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Character Text Splitter

Use the Character Text Splitter node to split document data based on characters.

On this page, you'll find the node parameters for the Character Text Splitter node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Separator**: the separator used to split the document into separate items.
* **Chunk Size**: number of characters in each chunk.
* **Chunk Overlap**: how much overlap to have between chunks.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, page) ]]

## Related resources

Refer to [LangChain's split by character documentation](https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/character_text_splitter){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
