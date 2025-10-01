---
title: Expressions common issues
description: Documentation for common issues and questions related to expressions in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: howto
---

# Expressions common issues

Here are some common errors and issues related to [expressions](/code/expressions.md) and steps to resolve or troubleshoot them.

## The 'JSON Output' in item 0 contains invalid JSON

This error occurs when you use JSON mode but don't provide a valid JSON object. Depending on the problem with the JSON object, the error sometimes display as `The 'JSON Output' in item 0 does not contain a valid JSON object`.

To resolve this, make sure that the code you provide is valid JSON:

- Check the JSON with a [JSON validator](https://jsonlint.com/).
- Check that your JSON object doesn't reference undefined input data. This may occur if the incoming data doesn't always include the same fields.

## Can't get data for expression

This error occurs when n8n can't retrieve the data referenced by an expression. Often, this happens when the preceding node hasn't been run yet.

Another variation of this may appear as `Referenced node is unexecuted`.  In that case, the full text of this error will tell you the exact node that isn't executing in this format:

> An expression references the node '&lt;node-name&gt;', but it hasn’t been executed yet. Either change the expression, or re-wire your workflow to make sure that node executes first.
> 

To begin troubleshooting, test the workflow up to the named node.

For nodes that use JavaScript or other custom code, you can check if a previous node has executed before trying to use its value by checking the following:

```javascript
$("<node-name>").isExecuted
```

As an example, this JSON references the parameters of the input data. This error will display if you test this step without connecting it to another node:

```javascript
{
  "my_field_1": {{ $input.params }}
}
```

## Invalid syntax

This error occurs when you use an expression that has a syntax error.

For example, the expression in this JSON includes a trailing period, which results in an invalid syntax error:

```jsx
{
  "my_field_1": "value",
  "my_field_2": {{ $('If').item.json. }}
}

```

To resolve this error, check your [expression syntax](/code/expressions.md) to make sure they follow the expected format.
