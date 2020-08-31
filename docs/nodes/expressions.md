# Expressions

::: v-pre
With the help of expressions, it is possible to set node parameters dynamically by referencing other data. That can be data from the flow, nodes, the environment or self-generated data. Expressions are normal text with placeholders (everything between {{...}}) that can execute JavaScript code, which offers access to special variables to access data.

An expression could look like this:

My name is: `{{$node["Webhook"].json["query"]["name"]}}`

This one would return "My name is: " and then attach the value that the node with the name "Webhook" outputs and there select the property "query" and its key "name". So if the node would output this data:

```json
{
  "query": {
    "name": "Jim"
  }
}
```
:::

the value would be: "My name is: Jim"

The following special variables are available:

 - **$items**: Incoming data from an input node
 - **$evaluateExpression**: Evaluates a string as expression
 - **$node**: Data of other nodes (binary, context, json, parameter, runIndex)
 - **$runIndex**: The current run index (first time node gets executed it is 0, second time 1, ...)
 - **$workflow**: Returns workflow metadata like: active, id, name
 - **$binary**: Incoming binary data of a node
 - **$env**: Environment variables
 - **$json**: Incoming JSON data of a node
 - **$parameters**: Parameters of the current node

Normally it is not needed to write the JavaScript variables manually as they can be selected with the help of the Expression Editor.


## Method: $items(nodeName?: string, outputIndex?: number, runIndex?: number)

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


## Method: $evaluateExpression(expression: string, itemIndex: number)

Evaluates a given string as expression.
If no `itemIndex` is provided it uses by default in the Function-Node the data of item 0 and
in the Function Item-Node the data of the current item.

Example:

```javascript
items[0].json.variable1 = $evaluateExpression('{{1+2}}');
items[0].json.variable2 = $evaluateExpression($node["Set"].json["myExpression"], 1);

return items;
```


## Variable: $node

Works exactly like `$item` with the difference that it will always return the data of the first item and
the last run of the node.

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


## Variable: $runIndex

Contains the index of the current run of the node.

```typescript
// Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
const allItems = $items("IF", 0, $runIndex);
```


## Variable: $workflow

Gives information about the current workflow.

```typescript
const isActive = $workflow.active;
const workflowId = $workflow.id;
const workflowName = $workflow.name;
```


## Parameters

Parameters can be set for most nodes in n8n. The values that get set define what exactly a node does.

Parameter values are static by default and are always the same no matter what kind of data the node processes. However, it is possible to set the values dynamically with the help of an Expression. Using Expressions, it is possible to make the parameter value dependent on other factors like the data of flow or parameters of other nodes.
