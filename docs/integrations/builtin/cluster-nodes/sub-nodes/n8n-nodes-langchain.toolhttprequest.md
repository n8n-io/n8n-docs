---
title: HTTP Request Tool node documentation
description: Learn how to use the HTTP Request Tool node in n8n. Follow technical documentation to integrate HTTP Request Tool node into your workflows.
search:
  exclude: true
contentType: [integration, reference]
---

# HTTP Request Tool node

/// warning | Legacy tool version
New instances of the HTTP Request tool node that you add to workflows use the standard [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node as a tool. This page is describes the legacy, standalone HTTP Request tool node.

You can identify which tool version is in your workflow by checking if the node has an **Add option** property when you open the node on the canvas. If that button is present, you're using the new version, not the one described on this page.
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

