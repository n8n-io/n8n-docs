---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Edit Fields (Set) node common issues 
description: Documentation for common issues and questions in the Execute Command node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: high
---

# Edit Fields (Set) node common issues

Here are some common errors and issues with the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set/) and steps to resolve or troubleshoot them.

## The 'JSON Output' in item 0 contains invalid JSON

This error occurs when you use JSON mode but don't provide a valid JSON object. Depending on the problem with the JSON object, the error sometimes display as `The 'JSON Output' in item 0 does not contain a valid JSON object`.

To resolve this, make sure that the code you provide is valid JSON:

* Check the JSON with a [JSON validator](https://jsonlint.com/){:target=_blank .external-link}.
* Check that your JSON object doesn't reference undefined input data. This may occur if the incoming data doesn't always include the same fields.

## Can't get data for expression

This error occurs when the Edit Fields (Set) node can't retrieve the data referenced by an expression. This happens when n8n tries to find an item through [item linking](/data/data-mapping/data-item-linking/) but runs into problems.

For example, this JSON references the parameters of the input data. This error will display if you test this step without connecting it to another node:

```javascript
{
  "my_field_1": {{ $input.params }}
}
```

To troubleshoot this problem, see the [item linking errors](/data/data-mapping/data-item-linking/item-linking-errors/) page to understand how to reference data from nodes that don't include pairing information.

## Invalid syntax

This error occurs when you use an expression in your Edit Fields (Set) node configuration that has a syntax error.

For example, the expression in this JSON includes a trailing period, which results in an invalid syntax error:

```javascript
{
  "my_field_1": "value",
  "my_field_2": {{ $('If').item.json. }}
}
```

To resolve this error, check your [expression syntax](/code/expressions/) to make sure they follow the expected format.

--8<-- "_snippets/integrations/referenced-node-unexecuted.md"
