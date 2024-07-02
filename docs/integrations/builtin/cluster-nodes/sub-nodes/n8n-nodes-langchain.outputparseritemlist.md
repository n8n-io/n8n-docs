---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Item List Output Parser
description: Documentation for the Item List Output Parser node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Item List Output Parser

Use the Item List Output Parser node to return a list of items with a specific length and separator.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Number of Items**: the maximum items to return. Set to `-1` for unlimited items.
* **Separator**: the separator used to split the results into separate items. Defaults to a new line.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, slug) ]]

## Related resources

Refer to [LangChain's custom list parser documentation](https://js.langchain.com/docs/modules/model_io/output_parsers/custom_list_parser){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
