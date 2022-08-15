# Custom methods

--8<-- "_snippets/code-examples/methods-list.md"

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

This method allows you to return an item at a specific index. The index is zero-based. Hence, `$item(0)` will return the first item, `$item(1)` the second one, and so on. Refer to [this](/integrations/builtin/core-nodes/n8n-nodes-base.function/) documentation to learn more.

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
