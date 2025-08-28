---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

<!-- vale off -->

# Item linking errors

In n8n, you can [reference data](/new-data/referencing-data/index.md) from the previous node with `$input.item` or nodes further back in the execution chain with `$("<node-name>").item` expression syntax. In most cases, n8n can automatically add `pairedItem` data to link corresponding items across nodes as described in [item linking concepts](/new-data/item-linking/concepts.md).

However, `.item` lookup fails if information is missing or ambiguous. n8n displays an error when:

* The thread linking items between nodes is broken
* The thread points to more than one item in the previous node (as it's unclear which one to use)

To solve these errors, you can either:

* **Avoid using `.item`**: You may be able to reference specific items with the `.first()`, `.last()` or `.all()[index]` accessor methods instead of using `.item`. They require you to know the position of the item that you’re targeting within the target node's output. Consult the [reference output from already executed nodes](/new-data/referencing-data/output-other-nodes.md) page for more detail on these methods.
* **Manually set item linking**: This fixes the root of the problem by restoring the correct link information for all items in the execution chain. The specific way to do this depends on the context.

## Error types

The following list describes some of the item linking errors that can occur, what causes them, and steps you can take to resolve them.

### Fix for "Invalid expression: No path back to referenced node"

This error occurs when you are attempting to access item information for a node that wasn't in the execution path.

To resolve this, connect the referenced node so that it executes before the current node.

### Fix for "Can't get data for expression: Can’t get data for expression under &lt;parameter&gt; field"

This error occurs when n8n can't find `pairedItem` data because the intermediate nodes between the current node and the referenced node haven't executed yet.

To resolve this, execute all of the nodes in the chain between the current node and the referenced nodes.

### Fix for "Paired item data for &lt;access-method&gt; from node &lt;node-name&gt; is unavailable. Ensure &lt;node-name&gt; is providing the required output."

This error occurs when there's a node in the chain that doesn't return pairing information. The error message often includes the name of the node that appears to be missing the item linking information.

The solution depends on the type of the previous node:

- Code nodes: make sure you return which input items the node used to produce each output item. Refer to [item linking in the code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/item-linking-code-node.md) for more information.
- Custom or community nodes: the node creator needs to update the node to return which input items it uses to produce each output item. Refer to [item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md) for more information.

### Fix for "Branch not found: Paired item references non-existent branch"

This error occurs when the `pairedItem` data for an item references an [execution branch](/flow-logic/index.md) that doesn't exist.

To resolve this error, check any manually linked items to make sure the branches they reference use the correct names.

### Fix for "Paired item resolution failed: Unable to find paired item source"

This error occurs when n8n can't trace back the item lineage back to the referenced node.  Sometimes n8n uses multiple items to create a single item. Examples include the Summarize, Aggregate, and Merge nodes. These nodes can combine information from multiple items.

When you use `.item` and there are multiple possible matches, n8n doesn't know which one to use. To solve this you can either:

- Use `.first()`, `.last()` or `.all()[index]` instead. Consult the [reference output from already executed nodes](/new-data/referencing-data/output-other-nodes.md) page for more detail on these methods.
- Reference a different node that contains the same information, but doesn't have multiple matching items.
