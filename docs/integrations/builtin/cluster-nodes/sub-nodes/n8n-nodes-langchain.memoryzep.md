---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Zep node documentation
description: Learn how to use the Zep node in n8n. Follow technical documentation to integrate Zep node into your workflows.
contentType: integration
priority: medium
---

# Zep node

Use the Zep node to use Zep as a memory server.

On this page, you'll find a list of operations the Zep node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/zep/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Session ID**: Enter the ID to use to store the memory in the workflow data.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'zep') ]]

## Related resources

Refer to [LangChain's Zep documentation](https://js.langchain.com/docs/integrations/memory/zep_memory){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]

--8<-- "_glossary/ai-glossary.md"
