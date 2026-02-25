---
contentType: explanation
---

# Expressions for data transformation

You can use expression transformation functions anywhere expressions are supported in n8n.

However, if your main goal is to transform data using expressions without performing any other operations, use the **Edit Fields (Set)** node. This node is designed specifically for data transformation, providing a clean interface to:

* Add new fields with expression-based values
* Modify existing field values using transformation functions
* Remove or rename fields

This keeps your workflow organized by separating data transformation from business logic, making it easier to understand and maintain.

**Best practice**: Instead of adding complex expressions to multiple parameters across different nodes, use Edit Fields to prepare your data first, then pass the transformed data to subsequent nodes.

![Creating expressions in the UI](/_images/data/data-mapping/expressionDot.gif)

See [Expression reference](/data/expression-reference/index.md) for more information and examples.

### Example: Get data from webhook body

Consider the following scenario: you have a webhook trigger that receives data through the webhook body. You want to extract some of that data for use in the workflow.

Your webhook data looks similar to this:


```json
[
  {
    "headers": {
      "host": "n8n.instance.address",
      ...
    },
    "params": {},
    "query": {},
    "body": {
      "name": "Jim",
      "age": 30,
      "city": "New York"
    }
  }
]
```


In the next node in the workflow, you want to get just the value of `city`. You can use the following expression:


```js
{{$json.body.city}}
```

This expression:

1. Accesses the incoming JSON-formatted data using n8n's custom `$json` variable.
2. Finds the value of `city` (in this example, "New York"). Note that this example uses JMESPath syntax to query the JSON data. You can also write this expression as `{{$json['body']['city']}}`.

## Example: Writing longer JavaScript as expressions

You can do things like variable assignments or multiple statements in an expression, but you need to wrap your code using the syntax for an Immediately Invoked Function Expression (IIFE).

The following code use the Luxon date and time library to find the time between two dates in months. We surround the code in both the handlebar brackets for an expression and the IIFE syntax.

```js
{{(()=>{
  let end = DateTime.fromISO('2017-03-13');
  let start = DateTime.fromISO('2017-02-13');
  let diffInMonths = end.diff(start, 'months');
  return diffInMonths.toObject();
})()}}
```
