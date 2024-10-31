---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: If node common issues 
description: Documentation for common issues and questions in the If node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: high
---

# If node common issues

Here are some common errors and issues with the [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if/) and steps to resolve or troubleshoot them.

## Can't get data for expression

This error occurs when the If node can't retrieve the data referenced by an expression. This happens when n8n tries to find an item through [item linking](/data/data-mapping/data-item-linking/) but runs into problems.

For example, this JSON references the parameters of the input data. This error will display if you test this step without connecting it to another node:

```javascript
{
  "my_field_1": {{ $input.params }}
}
```

To troubleshoot this problem, see the [item linking errors](/data/data-mapping/data-item-linking/item-linking-errors/) page to understand how to reference data from nodes that don't include pairing information.

--8<-- "_snippets/integrations/referenced-node-unexecuted.md"
