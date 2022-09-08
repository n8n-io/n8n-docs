# `$runIndex`

Contains the index of the current run of the node.

```typescript
// Returns all items the node "IF" outputs (index: -1)
const allItems = $("<node-name").all("IF", 0, $runIndex-1);
```
