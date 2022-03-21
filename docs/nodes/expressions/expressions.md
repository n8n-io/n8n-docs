# Expressions


Expressions allow you to set node parameters dynamically based on data from:

- Previous nodes
- The workflow
- Your n8n environment


n8n uses the [riot-tmpl](https://github.com/riot/tmpl) templating language, and extends it with custom methods and variables. 

You can execute JavaScript within an expression. 

n8n supports two libraries that make common tasks easier:

- [Luxon](https://github.com/moment/luxon/), for working with data and time.
- [JMESPath](https://jmespath.org/), for querying JSON.


## Writing expressions

:::v-pre
To use an expression to set a parameter value:

1. Select **Parameter options** for the parameter where you want to use an expression.
2. Select **Add expression**.
3. Write your expression in the expression editor. You can browse some of the available data in the **Variable selector**. All expressions have the format `{{ your expression here }}`.
:::

### Example: get data from webhook body

Consider the following scenario: you have a webhook trigger that receives data through the webhook body. You want to extract some of that data for use in the workflow.

Your webhook data looks similar to this:

:::v-pre
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
:::

In the next node in the workflow, you want to get just the value of `city`. You can use the following expression:

:::v-pre
```js
{{$json.body.city}}
```

This expression:
  1. Accesses the incoming JSON-formatted data using n8n's custom `$json` variable.
  2. Finds the value of `city` (in this example, "New York"). Note that this example uses JMESPath syntax to query the JSON data. You can also write this expression as `{{$json['body']['city']}}`.
:::

### Example: writing longer JavaScript

An expression contains one line of JavaScript. This means you can'd do things like variable assignments or multiple standalone operations.

To understand the limitations of JavaScript in expressions, and start thinking about workarounds, look at the following two pieces of code. Both code examples use the Luxon date and time library to find the time between two dates in months, and encloses the code in handlebar brackets, like an expression. 

However, the first example isn't a valid n8n expression:

:::v-pre
```js
// This example is split over multiple lines for readability
// It is still invalid when formatted as a single line
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
:::

While the second example is valid:

:::v-pre
```js
{{DateTime.fromISO('2017-03-13').diff(DateTime.fromISO('2017-02-13'), 'months').toObject()}}
```
:::

## Custom variables and methods

n8n provides the following variables:

- `$binary`: incoming binary data from a node
- `$data`: incoming raw data from a node
- `$env`: contains environment variables
- `$json`: incoming JSON data from a node
- `$now`: a Luxon object containing the current timestamp. Equivalent to `DateTime.now()`.
- `$parameters`: parameters of the current node
- `$position`: the index of an item in a list of items
- `$resumeWebhookUrl`: the webhook URL to call to resume a waiting workflow.
- `$runIndex`: how many times the node has been executed. Zero-based (the first run is 0, the second is 1, and so on).
- `$today`: a Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`.
- `$workflow`: workflow metadata


n8n provides the following methods:

- `$evaluateExpression`: evaluates a string as an expression.
- `$items`: returns items from a given node
- `$item`: returns an item at a given index
- `$jmespath()`: perform a search on a JSON object using JMESPath.
- `$node`: data from a specified node

## Variables

### $executionId

Contains the unique ID of the current workflow execution.

```typescript
const executionId = $executionId;

return [{json:{executionId}}];
```

### $runIndex

Contains the index of the current run of the node.

```typescript
// Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
const allItems = $items("IF", 0, $runIndex);
```


### $workflow

Gives information about the current workflow.

```js
// Boolean. Whether the workflow is active (true) or not (false)
$workflow.active
// Number. The workflow ID.
$workflow.id
// String. The workflow name.
$workflow.name
```

### $resumeWebhookUrl

The webhook URL to call to resume a [waiting](./nodes-library/core-nodes/Wait/README.md) workflow.

See the [Wait > On webhook call](./nodes-library/core-nodes/Wait/README.md#webhook-call) documentation to learn more.


## Methods

### $evaluateExpression(expression: string, itemIndex: number)

Evaluates a given string as expression.
If no `itemIndex` is provided it uses by default in the Function-Node the data of item 0 and
in the Function Item-Node the data of the current item.

Example:

```javascript
items[0].json.variable1 = $evaluateExpression('{{1+2}}');
items[0].json.variable2 = $evaluateExpression($node["Set"].json["myExpression"], 1);

return items;
```


### $items(nodeName?: string, outputIndex?: number, runIndex?: number)

This gives access to all the items of current or parent nodes. If no parameters are supplied,
it returns all the items of the current node.
If a node-name is given, it returns the items the node output on its first output
(index: 0, most nodes only have one output, exceptions are IF and Switch-Node) on
its last run.

Example:

```typescript
// Returns all the items of the current node and current run
const allItems = $items();

// Returns all items the node "IF" outputs (index: 0 which is Output "true" of its most recent run)
const allItems = $items("IF");

// Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
const allItems = $items("IF", 0, $runIndex);

// Returns all items the node "IF" outputs (index: 1 which is Output "false" of run 0 which is the first run)
const allItems = $items("IF", 1, 0);
```

### $item(index: number, runIndex?: number)

This method allows you to return an item at a specific index. The index is zero-based. Hence, `$item(0)` will return the first item, `$item(1)` the second one, and so on. Refer to [this](./nodes-library/core-nodes/Function/#method-item-index-number-runindex-number) documentation to learn more.

Example:

```typescript
// Returns the first item returned by the Example node
const firstItem = $item(0).$node["Example Node"];

// Returns the second item returned by the Example node
const secondItem = $item(1).$node["Example Node"];
```

Refer to this [example workflow](https://n8n.io/workflows/1330) to learn how this method can be used.

### $node

Returns the data of a specified node. Similar to `$item`, with the difference that it always returns the data of the first output and the last run of the node.

```typescript
// Returns the fileName of binary property "data" of Node "HTTP Request"
const fileName = $node["HTTP Request"].binary["data"]["fileName"]}}

// Returns the context data "noItemsLeft" of Node "SplitInBatches"
const noItemsLeft = $node["SplitInBatches"].context["noItemsLeft"];

// Returns the value of the JSON data property "myNumber" of Node "Set"
const myNumber = $node["Set"].json['myNumber'];

// Returns the value of the parameter "channel" of Node "Slack"
const channel = $node["Slack"].parameter["channel"];

// Returns the index of the last run of Node "HTTP Request"
const runIndex = $node["HTTP Request"].runIndex}}
```

