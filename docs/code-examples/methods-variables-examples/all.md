# `$("<node-name>").all(branchIndex?: number, runIndex?: number)`

This gives access to all the items of the current or parent nodes. If you don't supply any parameters, it returns all the items of the current node.

## Getting items

```typescript
// Returns all the items of the given node and current run
const allItems = $("<node-name>").all();

// Returns all items the node "IF" outputs (index: 0 which is Output "true" of its most recent run)
const allItems = $("IF").all();

// Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
const allItems = $("IF").all(0, $runIndex);

// Returns all items the node "IF" outputs (index: 1 which is Output "false" of run 0 which is the first run)
const allItems = $("IF").all(1, 0);
```

## Accessing item data

Get all items output by a previous node, and log out the data they contain:

```typescript
previousNodeData = $("<node-name>").all();
for(let i=0; i<previousNodeData.length; i++) {
	console.log(previousNodeData[i].json);
}
```
