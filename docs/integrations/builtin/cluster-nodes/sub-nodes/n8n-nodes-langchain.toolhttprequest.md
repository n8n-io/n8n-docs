---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HTTP Request Tool node documentation
description: Learn how to use the HTTP Request Tool node in n8n. Follow technical documentation to integrate HTTP Request Tool node into your workflows.
contentType: [integration, reference]
---

# HTTP Request Tool node

/// warning | Stand-alone tool deprecated
The stand alone HTTP Request tool is deprecated and its functionality is now incorporated in the standard [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node. You can now attach the standard HTTP Request node to AI agents to use it as a tool.
///

The HTTP Request tool works just like the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node, but it's designed to be used with an [AI agent](/glossary.md#ai-agent) as a tool to collect information from a website or API.

On this page, you'll find a list of operations the HTTP Request node supports and links to more resources.

/// note | Credentials
Refer to [HTTP Request credentials](/integrations/builtin/credentials/httprequest.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'http-request-tool') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
