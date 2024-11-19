---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Expressions

--8<-- "_snippets/code/tournament-notes.md"

Use expressions to set node parameters dynamically based on data from:

- Previous nodes
- The workflow
- Your n8n environment

You can execute JavaScript within an expression. 

n8n created and uses a templating language called [Tournament](https://github.com/n8n-io/tournament){:target=_blank .external-link}, and extends it with [custom methods and variables](/code-examples/methods-variables-reference/) and [data transformation functions](/code-examples/expressions/data-transformation-functions/) that help with common tasks, such as retrieving data from other nodes, or accessing metadata.

n8n supports two libraries:

- [Luxon](https://github.com/moment/luxon/){:target=_blank .external-link}, for working with data and time.
- [JMESPath](https://jmespath.org/){:target=_blank .external-link}, for querying JSON.

/// note | No Python support
Expressions must use JavaScript.
///
/// note | Data in n8n
When writing expressions, it's helpful to understand data structure and behavior in n8n. Refer to [Data](/data/) for more information on working with data in your workflows.
///
## Writing expressions


To use an expression to set a parameter value:

1. Hover over the parameter where you want to use an expression.
2. Select **Expressions** in the **Fixed/Expression** toggle.
3. Write your expression in the parameter, or select **Open expression editor** <span class="inline-image">![Open expressions editor icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the expressions editor. If you use the expressions editor, you can browse the available data in the **Variable selector**. All expressions have the format `{{ your expression here }}`.


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

An expression contains one line of JavaScript. This means you cannot do things like variable assignments or multiple standalone operations.

To understand the limitations of JavaScript in expressions, and start thinking about workarounds, look at the following two pieces of code. Both code examples use the Luxon date and time library to find the time between two dates in months, and encloses the code in handlebar brackets, like an expression. 

However, the first example isn't a valid n8n expression:


```js
// This example is split over multiple lines for readability
// It's still invalid when formatted as a single line
{{
  function example() {
    let end = DateTime.fromISO('2017-03-13');
    let start = DateTime.fromISO('2017-02-13');
    let diffInMonths = end.diff(start, 'months');
    return diffInMonths.toObject();
  }
  example();
}}
```


While the second example is valid:


```js
{{DateTime.fromISO('2017-03-13').diff(DateTime.fromISO('2017-02-13'), 'months').toObject()}}
```

## Common issues

For common errors or issues with expressions and suggested resolution steps, refer to [Common Issues](/code/cookbook/expressions/common-issues/).
