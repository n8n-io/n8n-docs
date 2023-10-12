---
description: Methods for working with the input of the current node.
contentType: reference
---

# Current node input

Methods for working with the input of the current node. Some methods and variables aren't available in the Code node.

=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | :x: |
	| `$input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/) for more information on paired items and item linking. | :white_check_mark: |
	| `$input.all()` | All input items in current node. | :white_check_mark: |
	| `$input.first()` | First input item in current node. | :white_check_mark: |
	| `$input.last()` | Last input item in current node. | :white_check_mark: |
	| `$input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | :white_check_mark: |
	| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure/) for information on item structure. | :x: |
	| `$input.context.noItemsLeft` | Boolean. Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | :white_check_mark: |
=== "Python"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `_binary` | Shorthand for `_input.item.binary`. Incoming binary data from a node | :x: |
	| `_input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/) for more information on paired items and item linking. | :white_check_mark: |
	| `_input.all()` | All input items in current node. | :white_check_mark: |
	| `_input.first()` | First input item in current node. | :white_check_mark: |
	| `_input.last()` | Last input item in current node. | :white_check_mark: |
	| `_input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | :white_check_mark: |
	| `_json` | Shorthand for `_input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure/) for information on item structure. | :x: |
	| `_input.context.noItemsLeft` | Boolean. Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | :white_check_mark: |
