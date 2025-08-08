---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Methods for working with the input of the current node.
contentType: reference
hide:
  - toc
---

<!-- vale off -->

# Reference current node input

The most common pattern is to reference items from the previous node: the current node's input data. You can access all of the previous node's items with the `$input` object.

The most common method for accessing node input are:

* `$json` to access properties of the previous node.
* `$input.first()` to access the first input item from the previous node. This is most useful when working around [item linking problems]().
* `$input.last()` to access the last input item from the previous node, useful in the same situation as above.

The following table lists the `$input` object's accessor methods and properties:

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | :x: |
	| `$input.item` | The input item of the current node that's being processed. Refer to [item linking](/data/data-mapping/data-item-linking/index.md) for more information on paired items and item linking. | :white_check_mark: |
	| `$input.all()` | All input items in current node. | :white_check_mark: |
	| `$input.first()` | First input item in current node. | :white_check_mark: |
	| `$input.last()` | Last input item in current node. | :white_check_mark: |
	| `$input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | :white_check_mark: |
	| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure.md) for information on item structure. | :white_check_mark: (when running once for each item) |
	| `$input.context.noItemsLeft` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_input.item` | The input item of the current node that's being processed. Refer to [item linking](/data/data-mapping/data-item-linking/index.md) for more information on paired items and item linking. | 
	| `_input.all()` | All input items in current node. | 
	| `_input.first()` | First input item in current node. | 
	| `_input.last()` | Last input item in current node. | 
	| `_input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | 
	| `_json` | Shorthand for `_input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure.md) for information on item structure. Available when you set **Mode** to **Run Once for Each Item**. | 
	| `_input.context.noItemsLeft` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | 
