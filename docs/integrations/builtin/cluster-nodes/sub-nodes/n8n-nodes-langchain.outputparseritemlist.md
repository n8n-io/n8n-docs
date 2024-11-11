---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Item List Output Parser node documentation
description: Learn how to use the Item List Output Parser node in n8n. Follow technical documentation to integrate Item List Output Parser node into your workflows.
contentType: integration
priority: high
---

# Item List Output Parser node

Use the Item List Output Parser node to return a list of items with a specific length and separator.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Number of Items**: Enter the maximum items to return. Set to `-1` for unlimited items.
* **Separator**: Select the separator used to split the results into separate items. Defaults to a new line.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'item-list-output-parser') ]]

## Related resources

Refer to [LangChain's output parser documentation](https://js.langchain.com/docs/concepts/output_parsers){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
