---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workflow Retriever node documentation
description: Learn how to use the Workflow Retriever node in n8n. Follow technical documentation to integrate Workflow Retriever node into your workflows.
contentType: integration
priority: medium
---

# Workflow Retriever node

Use the Workflow Retriever node to retrieve data from an n8n workflow for use in a Retrieval QA Chain or another Retriever node.

On this page, you'll find the node parameters for the Workflow Retriever node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Source

Tell n8n which workflow to call. You can choose either:

* **Database** and enter a workflow ID.
* **Parameter** and copy in a complete [workflow JSON](/workflows/export-import/).

### Workflow values

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/workflow-values.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'workflow-retriever') ]]

## Related resources

Refer to [LangChain's general retriever documentation](https://js.langchain.com/docs/concepts/retrievers/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
