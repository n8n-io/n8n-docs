---
title: Item List Output Parser
description: Documentation for the Item List Output Parser node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Item List Output Parser

Use the Item List Output Parser node to return a list of items with a specific length and separator.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Item List Output Parser integrations](https://n8n.io/integrations/item-list-output-parser/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Number of Items**: the maximum items to return. Set to `-1` for unlimited items.
* **Separator**: the separator used to split the results into separate items. Defaults to a new line.

	
## Related resources

View [example workflows and related content](https://n8n.io/integrations/item-list-output-parser/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's custom list parser documentation](https://js.langchain.com/docs/modules/model_io/output_parsers/custom_list_parser){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
