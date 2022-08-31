# $item(index: number, runIndex?: number)

With `$item` it is possible to access the data of parent nodes. That can be the item data but also
the parameters. It expects as input an index of the item the data should be returned for. This is
needed because for each item the data returned can be different. This is probably straightforward for the
item data itself but maybe less for data like parameters. The reason why it is also needed, is
that they may contain an expression. Expressions get always executed of the context for an item.
If that would not be the case, for example, the Email Send node not would be able to send multiple
emails at once to different people. Instead, the same person would receive multiple emails.

The index is 0 based. So `$item(0)` will return the first item, `$item(1)` the second one, and so on.

By default the item of the last run of the node  will be returned. So if the referenced node ran
3x (its last runIndex is 2) and the current node runs the first time (its runIndex is 0) the
data of runIndex 2 of the referenced node will be returned.

For more information about what data can be accessed via `$node`, check out the `Variable: $node` [section](/code-examples/javascript-functions/methods-variables/node/).

Example:

```typescript
// Returns the value of the JSON data property "myNumber" of Node "Set" (first item)
const myNumber = $item(0).$node["Set"].json["myNumber"];
// Like above but data of the 6th item
const myNumber = $item(5).$node["Set"].json["myNumber"];

// Returns the value of the parameter "channel" of Node "Slack".
// If it contains an expression the value will be resolved with the
// data of the first item.
const channel = $item(0).$node["Slack"].parameter["channel"];
// Like above but resolved with the value of the 10th item.
const channel = $item(9).$node["Slack"].parameter["channel"];
```
