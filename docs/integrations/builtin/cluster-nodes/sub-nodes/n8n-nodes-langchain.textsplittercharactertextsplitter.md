---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Character Text Splitter node documentation
description: Learn how to use the Character Text Splitter node in n8n. Follow technical documentation to integrate Character Text Splitter node into your workflows.
contentType: integration
priority: medium
---

# Character Text Splitter node

Use the Character Text Splitter node to split document data based on characters.

On this page, you'll find the node parameters for the Character Text Splitter node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Separator**: Select the separator used to split the document into separate items.
* **Chunk Size**: Enter the number of characters in each chunk.
* **Chunk Overlap**: Enter how much overlap to have between chunks.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'character-text-splitter') ]]

## Related resources

Refer to [LangChain's text splitter documentation](https://js.langchain.com/docs/concepts/text_splitters){:target=_blank .external-link} and [LangChain's API documentation for character text splitting](https://v03.api.js.langchain.com/classes/langchain.text_splitter.CharacterTextSplitter.html){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
