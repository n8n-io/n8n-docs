---
contentType: howto
---

# Expressions versus data nodes

Expressions are a powerful feature implemented in all n8n nodes. They allow node parameters to be set dynamically based on data from:

- Previous node executions
- The workflow
- Your n8n environment

You can also execute JavaScript within an expression, making this a convenient and easy way to manipulate data into useful parameter values without writing extensive extra code.

n8n created and uses a templating language called [Tournament](https://github.com/n8n-io/tournament), and extends it with [custom methods and variables](/code/builtin/overview.md) and [data transformation functions](/code/builtin/data-transformation-functions/index.md). These features make it easier to perform common tasks like getting data from other nodes or accessing workflow metadata.

n8n additionally supports two libraries:

- [Luxon](https://github.com/moment/luxon/), for working with dates and time.
- [JMESPath](https://jmespath.org/), for querying JSON.

/// note | Data in n8n
When writing expressions, it's helpful to understand data structure and behavior in n8n. See [How n8n structures data](/data/data-structure.md) for more information on working with data in your workflows.
///

## Expressions compared to other approaches

n8n provides multiple ways to work with and transform data. Understanding when to use each approach helps you build efficient workflows.

| Approach	| Use when you need to... | Examples | Available on |
|---|---|---|---|
| Expressions | Set a single parameter value using existing data | Pull `{{$json.city}}`, format dates, simple math | Cloud and Self-hosted |
| Code node	| Write full JavaScript/Python for complex transformations | Restructure data, loop through items, use external libraries | Cloud and Self-hosted |
| AI Transform | Generate transformation code from natural language	| `Group by user and sum totals`, `categorize by sentiment`	| Cloud only |
| Data transformation nodes | Perform common operations with a visual interface | Aggregate items, split arrays, sort data, remove duplicates | Cloud and Self-hosted |

### Expressions

Expressions are small pieces of JavaScript-like code you put directly into node parameters using n8n's `{{ ... }}` syntax. They can dynamically set parameter values by using data from previous nodes, workflow metadata, or environment variables.

/// info | Use expressions when you can
Expressions have the advantage of providing an immediate preview of the computed values, so use expressions where you can.
///

**When to use expressions:**

* To pull a value from previous node data. For example, `{{$json.body.city}}`.
* To perform light transformations or calculations directly in a field.
* To avoid adding extra nodes and to keep logic close to the parameter that you are setting.

### Code node

The [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) is a dedicated node where you write JavaScript or Python that runs as a workflow step. It gives you access to incoming data from previous nodes, which you can manipulate by adding, removing, or updating items. You can create any custom function you need, and also use n8n's built‑in methods and variables through `$` syntax.

**When to use the Code node:**

* You need more complex logic or data transformation than an expression can enable, such as restructuring arrays and objects, aggregating or splitting items, and custom algorithms.
* You want to transform many items at once.
* You want to use promises, `console.log`, or in the case of self‑hosted setups, use external npm modules.

### AI Transform node

This node generates code snippets based on a short natural‑language prompt. It's context‑aware and understands your workflow's nodes and data types. The generated code is read‑only in the node; you can copy it into a Code node to edit.

**When to use the AI Transform node:**

* You know what transformation you want but don't want to hand‑write the code.
* You want AI to draft the transformation logic and then run it directly in the node, or copy into a Code node for further customization.

### Data transformation nodes

n8n provides dedicated nodes for common data operations like [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md), [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md), [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md), and more.

**When to use data transformation nodes:**

* The operation you need matches a specific transformation node's purpose.
* You want a no-code solution with a guided UI.
* You prefer visual workflow building over writing expressions or code.

## Writing expressions

To use an expression to set a parameter value:

1. Hover over the parameter where you want to use an expression.
2. Select **Expressions** in the **Fixed/Expression** toggle.
3. Write your expression in the parameter, or select **Open expression editor** <span class="n8n-inline-image">![Open expressions editor icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the expressions editor. If you use the expressions editor, you can browse the available data in the **Variable selector**. All expressions have the format `{{ your expression here }}`.


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


### Example: Writing longer JavaScript

You can do things like variable assignments or multiple statements in an expression, but you need to wrap your code using the syntax for an IIFE (Immediately Invoked Function Expression).


The following code use the Luxon date and time library to find the time between two dates in months. We surround the code in both the handlebar brackets for an expression and the IIFE syntax.


```js
{{(()=>{
  let end = DateTime.fromISO('2017-03-13');
  let start = DateTime.fromISO('2017-02-13');
  let diffInMonths = end.diff(start, 'months');
  return diffInMonths.toObject();
})()}}
```

## Common issues

For common errors or issues with expressions and suggested resolution steps, refer to [Common Issues](/code/cookbook/expressions/common-issues.md).
