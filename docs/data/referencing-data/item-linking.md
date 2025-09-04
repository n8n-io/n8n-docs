# Item linking

Item linking allows n8n to track which item or items in earlier nodes were used to generate each item in the current node.

Matching items with previous node items by position (index value) fails when nodes perform sorting, filtering, merging, and other operations. Instead, n8n includes a metadata property called `pairedItem` for each item a node outputs. The value indicates what input item was used to create it.

This creates a link between an item and its original source item or items that persists regardless of sorting, filtering, merging, and other operations.  n8n can follow these links to reference related items in nodes executed earlier in the workflow.

## How item linking works

Item linking works by performing the following techniques:

* **Tracking item origin**: Each item carries hidden metadata that tracks its lineage—which item(s) from the immediately preceding node(s) it originated from. n8n stores this data in `pairedItem` property, a sibling to the main `json` data property.
* **Backwards calculation**: When n8n evaluates an expression that uses item linking (like `$('Node name').pairedItem(0)`, `$('Node name').itemMatching(0)`, or `$('Node name').item)`), it uses this lineage information to trace back through the execution path (node by node, including handling loops and merges) to find the corresponding item in the given ancestor node.
* **Internal information**: n8n automatically injects information about the previous node, the specific output used, and the run ID into the data flow. It uses this internal information to help the linked items navigate the workflow structure correctly.
* **Merge handling**: In cases like merge nodes where an output item might originate from multiple input items (for example, when merging two branches), the `pairedItem` can store the data as an array, allowing n8n to trace back multiple paths if necessary.

## Item linking example 

![A diagram showing the threads linking multiple items back through a workflow](/_images/data/data-mapping/data-item-linking/item-linking-multiple-lines.png)

In this example, it's possible for n8n to link an item in one node back several steps, despite the item order changing. This means the node that sorts movies alphabetically can access information about the linked item in the node that gets famous movie actors.

The methods for accessing linked items are different depending on whether you're using the UI, expressions, or the code node.

## Automatic item linking

In simple cases, as when each input item produces a single output item, the links between items are easy to reason about. n8n automatically creates the `pairedItem` metadata where possible, allowing you to trace item lineage throughout the workflow.

n8n automatically manages `pairedItems` in the following scenarios:

* When the node only has a single input item, every output item links back to that input item.
* If the output items are just sorted or filtered input items, n8n matches the items as expected.
* If the output items aren't the same as the input items, but there are equal numbers of each, n8n pairs them by index (the first input item is linked to the first output item, etc.).

## Manual item linking

You may have to manually link items when n8n can't determine which input item generated the current item. This occurs most frequently when you are adding completely new items in the node or splitting multiple items up.

You can find out more about manually linking your items on the following pages:

* [Item linking in the Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/item-linking-code-node.md): learn how to handle item linking in the Code node.
* [Item linking for node creators](/integrations/creating-nodes/build/reference/paired-items.md): learn how to link data items when you're creating your own nodes.

## Item linking errors

In most cases, n8n can automatically add `pairedItem` data to link corresponding items across nodes as described above.

However, `.item` lookup fails if information is missing or ambiguous. n8n displays an error when:

* The thread linking items between nodes is broken
* The thread points to more than one item in the previous node (as it's unclear which one to use)

To solve these errors, you can either:

* **Avoid using `.item`**: You may be able to reference specific items with the `.first()`, `.last()` or `.all()[index]` accessor methods instead of using `.item`. They require you to know the position of the item that you’re targeting within the target node's output. Consult the [reference output from already executed nodes](/data/referencing-data/output-other-nodes.md) page for more detail on these methods.
* **Manually set item linking**: This fixes the root of the problem by restoring the correct link information for all items in the execution chain. The specific way to do this depends on the context.

### Error types

The following list describes some of the item linking errors that can occur, what causes them, and steps you can take to resolve them.

#### Fix for "Invalid expression: No path back to referenced node"

This error occurs when you are attempting to access item information for a node that wasn't in the execution path.

To resolve this, connect the referenced node so that it executes before the current node.

#### Fix for "Can't get data for expression: Can’t get data for expression under &lt;parameter&gt; field"

This error occurs when n8n can't find `pairedItem` data because the intermediate nodes between the current node and the referenced node haven't executed yet.

To resolve this, execute all of the nodes in the chain between the current node and the referenced nodes.

#### Fix for "Paired item data for &lt;access-method&gt; from node &lt;node-name&gt; is unavailable. Ensure &lt;node-name&gt; is providing the required output."

This error occurs when there's a node in the chain that doesn't return pairing information. The error message often includes the name of the node that appears to be missing the item linking information.

The solution depends on the type of the previous node:

- Code nodes: make sure you return which input items the node used to produce each output item. Refer to [item linking in the code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/item-linking-code-node.md) for more information.
- Custom or community nodes: the node creator needs to update the node to return which input items it uses to produce each output item. Refer to [item linking for node creators](/integrations/creating-nodes/build/reference/paired-items.md) for more information.

#### Fix for "Branch not found: Paired item references non-existent branch"

This error occurs when the `pairedItem` data for an item references an [execution branch](/flow-logic/index.md) that doesn't exist.

To resolve this error, check any manually linked items to make sure the branches they reference use the correct names.

#### Fix for "Paired item resolution failed: Unable to find paired item source"

This error occurs when n8n can't trace back the item lineage back to the referenced node.  Sometimes n8n uses multiple items to create a single item. Examples include the Summarize, Aggregate, and Merge nodes. These nodes can combine information from multiple items.

When you use `.item` and there are multiple possible matches, n8n doesn't know which one to use. To solve this you can either:

- Use `.first()`, `.last()` or `.all()[index]` instead. Consult the [reference output from already executed nodes](/data/referencing-data/output-other-nodes.md) page for more detail on these methods.
- Reference a different node that contains the same information, but doesn't have multiple matching items.
