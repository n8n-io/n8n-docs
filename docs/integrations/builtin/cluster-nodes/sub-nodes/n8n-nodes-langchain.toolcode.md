---
title: Code Tool
description: Documentation for the Code Tool node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Code Tool

The Code Tool node allows you to write code that an agent can run.

On this page, you'll find the node parameters for the Code Tool node, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/code-tool/){:target=_blank .external-link} page.
	
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
return myString.lowerCase();
```

## Node reference

--8<-- "_snippets/integrations/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/code-tool/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
