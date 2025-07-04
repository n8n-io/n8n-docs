---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Item linking concepts

Item linking allows n8n to track which item or items in earlier nodes were used to generate each item in the current node.

Matching items with previous node items by position (index value) fails when nodes perform sorting, filtering, merging, and other operations. Instead, n8n includes a metadata property called `pairedItem` for each item a node outputs. The value indicates what input item was used to create it.

This creates a link between an item and its original source item or items that persists regardless of sorting, filtering, merging, and other operations.  n8n can follow these links to reference related items in nodes executed earlier in the workflow.

## How item linking works

Item linking works by performing the following techniques:

* **Tracking item origin**: Each item carries hidden metadata that tracks its lineage—which item(s) from the immediately preceding node(s) it originated from. n8n stores this data in `pairedItem` property, a sibling to the main `json` data property.
* **Backwards calculation**: When n8n evaluates an expression that uses paired items (like `$('Node name').pairedItem(0)`, `$('Node name').itemMatching(0)`, or `$('Node name').item)`), it uses this lineage information to trace back through the execution path (node by node, including handling loops and merges) to find the corresponding item in the given ancestor node.
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

* [Item linking in the Code node](/new-data/item-linking/item-linking-code-node.md): learn how to handle item linking in the Code node.
* [Item linking errors](/new-data/item-linking/item-linking-errors.md), to understand the errors you may encounter in the editor UI.

If you're creating your own nodes, you can find more information about how to implement item linking on the [item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md) page.



<!--

## Situations where you might need to manually 

You need to manually link items in the following cases:

* If you're creating an entirely new item, but want to tie it to an input item.
* If the number of output items doesn't equal
* If the number isn't equal, or you create completely new items, n8n can't automatically link items.

* Multiple inputs and outputs:
	* If the number isn't equal, or you create completely new items, n8n can't automatically link items.


This can be complicated to understand, especially if the node splits or merges data. You need to understand item linking when building your own programmatic nodes, or in some scenarios using the Code node. 

* [Item linking in the Code node](/new-data/item-linking/item-linking-code-node.md): learn how to handle item linking in the Code node.
* [Item linking errors](/new-data/item-linking/item-linking-errors.md), to understand the errors you may encounter in the editor UI.

If you're creating your own nodes, you can find more information about how to implement item linking on the [item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md) page.

## n8n's automatic item linking

If a node doesn't control how to link input items to output items, n8n tries to guess how to link the items automatically:

* Single input, single output: the output links to the input.
* Single input, multiple outputs: all outputs link to that input.
* Multiple inputs and outputs:
	* If you keep the input items, but change the order (or remove some but keep others), n8n can automatically add the correct linked item information.
	* If the number of inputs and outputs is equal, n8n links the items in order. This means that output-1 links to input-1, output-2 to input-2, and so on.
	* If the number isn't equal, or you create completely new items, n8n can't automatically link items.

If n8n can't link items automatically, and the node doesn't handle the item linking, n8n displays an error. Refer to [Item linking errors](/new-data/item-linking/item-linking-errors.md) for more information.

## Item linking example



-->
