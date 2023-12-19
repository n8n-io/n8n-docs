---
title: Auto-fixing Output Parser
description: Documentation for the Auto-fixing Output Parser node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Auto-fixing Output Parser

The Auto-fixing Output Parser node wraps another output parser, if the first one fails it calls out to another LLM to fix any errors

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Auto-fixing Output Parser integrations](https://n8n.io/integrations/auto-fixing-output-parser/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"


## Related resources

View [example workflows and related content](https://n8n.io/integrations/auto-fixing-output-parser/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Auto-fixing parser documentation](https://js.langchain.com/docs/modules/model_io/output_parsers/output_fixing_parser){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
