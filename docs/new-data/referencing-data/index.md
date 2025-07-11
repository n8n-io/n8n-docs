<!-- vale off -->
# Referencing data (Data mapping)

The primary method of referencing data in n8n is with [expressions](/glossary.md#expression-n8n).

n8n expressions are JavaScript code that evaluate to a specific value. They allow you to reference dynamic data in your workflows without hardcoding static data that might differ between items, executions, API calls, or over time.

Expressions allow you to reference:

* Data directly connected to a node's input. For example you can a property called `first_name` sent to the node's input with `{{ $input.item.json.first_name }}` or just `{{ $json.first_name }}`.
* The output from any of the other nodes that have already executed. For example, to reference a property called `first_name` in the output of a node called "Get user data", you could use `{{ $("Get user data").item.json.first_name }}`.
* Other data specific to the execution, the workflow, or the environment such as information about your n8n instance or the current time. For example, you could use `{{ $execution.id }}` to get the current execution ID or `{{ $now }}` to output a datetime object for the current time.

## How to use expressions

In n8n, you can use expressions inside of node parameters by toggling the value field from **Fixed** to **Expression**. You delineate expressions by wrapping them in double curly brackets, like this: `{{ <my-expression> }}`.

Expression fields can include a mixture of expressions and fixed values.

Visit the [transforming data](/new-data/transforming-data.md#expressions) page to learn more about modifying data with expressions, 

### Building expressions with drag and drop

To make it easier to find and reference the data you're looking for, each non-trigger node contains an **Input pane** that contains the output of the preceding nodes.

By default, the output from nodes directly connected to the current node are expanded. Alongside the node outputs, the Input panel also includes a **Variables and context** category where you can find data related to the instance, execution, variables, and other details.

In the input pane, you can drill down and expand properties to find specific pieces of data. To reference a piece of data from the Input panel, change the field selector from **Fixed** to **Expression** and then drag the data from the Input panel into the field.

## Referencing specific data

You can find more specifics about how to reference specific types of data on the following pages:

* [Reference linked items in previous nodes](/new-data/referencing-data/itemmatching.md)
* [Reference current node input](/new-data/referencing-data/current-node-input.md)
* [Reference output from already executed nodes](/new-data/referencing-data/output-other-nodes.md)

<!--







## Referencing specific data with expressions

This section contains some of the most common and useful expressions for referencing node data in your workflows. For a more complete reference, consult the reference pages for [current node input](/new-data/referencing-data/current-node-input.md) and [output of other nodes](/new-data/referencing-data/output-other-nodes.md).

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

* [Item linking concepts](/new-data/item-linking/concepts.md)
* [Linking items in the Code node](/new-data/item-linking/item-linkng-code-node.md)
* [Item linking errors](/new-data/item-linking/item-linking-errors.md)

To reference the

* [How to reference previous node items with `.item` and `.itemMatching()`](/new-data/referencing-data/itemmatching.md)

-->
