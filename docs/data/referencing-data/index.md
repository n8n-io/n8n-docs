<!-- vale off -->
# Referencing data (Data mapping)

The primary method of referencing data in n8n is with [expressions](/glossary.md#expression-n8n).

## Referencing specific data

You can find more specifics about how to reference specific types of data on the following pages:

* [Reference linked items in previous nodes](/data/referencing-data/itemmatching.md)
* [Reference current node input](/data/referencing-data/current-node-input.md)
* [Reference output from already executed nodes](/data/referencing-data/output-other-nodes.md)

## What to know about item linking

Item linking allows n8n to track items in earlier nodes were used to generate each item in the current node. This makes it easier to associate items across nodes and recombine their data in useful ways.

n8n does this by keeping track of which item or items it used to generate each item for the current node and storing this information with the item in a metadata property called `pairedItem`. Following the `pairedItem` data, it trace the lineage for items back through the workflow. The page on [referencing linked items in previous nodes](/data/referencing-data/itemmatching.md) covers how to access linked items in your workflows.

In most cases, n8n can link items automatically. However, when you generate completely new items, split up multiple items, or create your own nodes, you may have to add this information manually. You can find more information in the following pages:

* [Item linking](/data/referencing-data/item-linking.md): A more complete introduction to item linking in n8n.
* [Item linking in the Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/item-linking-code-node.md): learn how to handle item linking in the Code node.
* [Item linking for node creators](/integrations/creating-nodes/build/reference/paired-items.md): learn how to implement item linking when creating your own nodes.


<!--







## Referencing specific data with expressions

This section contains some of the most common and useful expressions for referencing node data in your workflows. For a more complete reference, consult the reference pages for [current node input](/data/referencing-data/current-node-input.md) and [output of other nodes](/data/referencing-data/output-other-nodes.md).

### Reference items from the previous node

The most common pattern is to reference items from the previous node. You can access all of the previous node's items with the `$input` object. It contains the following properties and accessor methods:

* `$input.item`: The item in the input that matches item currently being processed.
* `$input.item.json`: The properties of the item in the input that matches item currently being processed.
* `$input.first()`: The first item out of the list of input items. Note that this accesses the same input item (the first) each time as the node iterates through its items. So if the current node is processing 5 items, this will access the same input item (the first) 5 times.
* `$input.last()`: The last item out of the list of input items. The same note mentioned above applies here as well.
* `$input.all()`: Returns the array of the node's input items. You drill down to access individual input items by index (0 for the first item, 1 for the second, etc.).
* `$input.params`: Access the parameters of the previous node. You can use this to find information about the operation performed, limits imposed, and more.

Because of its frequent use, the `$json` object is also available as an alias for `$input.item.json`.

### Reference items from earlier nodes

To access items from nodes earlier in the execution chain, use the `$("<name_of_node>")` syntax. You can use this to access the items from any nodes that have been executed before the current node.

The `$("<name_of_node>")` syntax works exactly the same as the `$input` object, so you can access the same child objects (like `.item.json`) and call the same methods (like `.all()`, `.first()`, and `last()`).

You can use `$("<name_of_node>").isExecuted` to see if an earlier node was run during the current execution. This is often useful when using branching workflows.

## Reference data when the link between items is broken

n8n builds a graph of which input items were used produced each item as it executes your workflow. It follows this chain back to previous nodes to establish the item's ancestors for each node.

If item linking data is missing or ambiguous for any node, however, you may need to add the explicit links between items. This most often occurs when data transformations add new items or split existing items in a way that's difficult to trace automatically.

To learn more about how wor, check out the material in item linking section:

* [Item linking concepts](/data/item-linking/concepts.md)
* [Linking items in the Code node](/data/item-linking/item-linkng-code-node.md)
* [Item linking errors](/data/item-linking/item-linking-errors.md)

To reference the

* [How to reference previous node items with `.item` and `.itemMatching()`](/data/referencing-data/itemmatching.md)

-->
