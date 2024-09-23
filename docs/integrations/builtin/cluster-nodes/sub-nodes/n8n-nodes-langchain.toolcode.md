---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Custom Code Tool node documentation
description: Learn how to use the Custom Code Tool node in n8n. Follow technical documentation to integrate Custom Code Tool node into your workflows.
contentType: integration
priority: high
---

# Custom Code Tool node

Use the Custom Code Tool node to write code that an agent can run.

On this page, you'll find the node parameters for the Custom Code Tool node and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Name

Give your custom code a name. It can't contain whitespace.

### Description

Give your custom code a description. This tells the agent when to use this tool. For example:

> Call this tool to get a random color. The input should be a string with comma separated names of colors to exclude.

### Language

You can use JavaScript or Python.

### JavaScript / Python box

Write the code here.

You can access the tool input using `query`. For example, to take the input string and lowercase it:

```js
let myString = query;
return myString.toLowerCase();
```

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'code-tool') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md"
