---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Motorhead node documentation
description: Learn how to use the Motorhead node in n8n. Follow technical documentation to integrate Motorhead node into your workflows.
contentType: integration
priority: medium
---

# Motorhead node

Use the Motorhead node to use Motorhead as a memory server.

On this page, you'll find a list of operations the Motorhead node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/motorhead/).
///

## Node parameters

* **Session ID**: Enter the ID to use to store the memory in the workflow data.

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'motorhead') ]]

## Related resources

Refer to [LangChain's Motorhead documentation](https://js.langchain.com/docs/integrations/memory/motorhead_memory){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Single memory instance

[[% include "_includes/integrations/cluster-nodes/memory-shared.html" %]]

--8<-- "_glossary/ai-glossary.md"
