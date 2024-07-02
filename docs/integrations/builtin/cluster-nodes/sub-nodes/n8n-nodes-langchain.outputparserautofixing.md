---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Auto-fixing Output Parser
description: Documentation for the Auto-fixing Output Parser node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Auto-fixing Output Parser

The Auto-fixing Output Parser node wraps another output parser, if the first one fails it calls out to another LLM to fix any errors.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, page) ]]

## Related resources

Refer to [LangChain's Auto-fixing parser documentation](https://js.langchain.com/docs/modules/model_io/output_parsers/output_fixing_parser){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
