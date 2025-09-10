---
title: Auto-fixing Output Parser node documentation
description: Learn how to use the Auto-fixing Output Parser node in n8n. Follow technical documentation to integrate Auto-fixing Output Parser node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Auto-fixing Output Parser node

The Auto-fixing Output Parser node wraps another output parser. If the first one fails, it calls out to another LLM to fix any errors.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'auto-fixing-output-parser') ]]

## Related resources

Refer to [LangChain's output parser documentation](https://js.langchain.com/docs/concepts/output_parsers/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

