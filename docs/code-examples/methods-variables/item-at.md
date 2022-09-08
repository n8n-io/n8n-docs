# `$("<node-name>").itemAt(itemIndex:number, branchIndex?:number runIndex?:number)`

This method allows you to return an item at a specific index. The index is zero-based. `$("<node-name>").itemAt(0)` returns the first item, `$("<node-name>").itemAt(1)` the second one, and so on. 

Example:

```typescript
// Returns the first item returned by the Example node
const firstItem = $item(0).$node["Example Node"];

// Returns the second item returned by the Example node
const secondItem = $item(1).$node["Example Node"];
```

<!-- 
Refer to this [example workflow](https://n8n.io/workflows/1330) to learn how this method can be used.
-->
