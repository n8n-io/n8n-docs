---
description: Methods for working with the input of the current node and the output of previous nodes.
contentType: reference
---

# Referencing previous nodes

When working with data in n8n, you'll often need to reference information from the current node or from previous nodes in your workflow. 

## Common ways of referencing

The most frequently used methods for accessing data are:

- **`$json`**: Access JSON data from the current input item
- **`$('<node-name>').item.json`**: Access JSON data from a [linked item](/data/data-mapping/data-item-linking/index.md) in a previous node

## Other referencing methods

These methods work in both expressions and the Code node:

| Method | Description |
| ------ | ----------- |
| `$binary` | Access binary data from the current input item |
| `$input.item` | The input item currently being processed |
| `$('<node-name>').first()` | Get the first item from a specified node |
| `$('<node-name>').last()` | Get the last item from a specified node |
| `$('<node-name>').all()` | Get all items from a specified node |

## Current node input

Methods for working with the input of the current node. Some methods and variables aren't available in the Code node.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | :x: |
	| `$input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on paired items and item linking. | :white_check_mark: |
	| `$input.all()` | All input items in current node. | :white_check_mark: |
	| `$input.first()` | First input item in current node. | :white_check_mark: |
	| `$input.last()` | Last input item in current node. | :white_check_mark: |
	| `$input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | :white_check_mark: |
	| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure.md) for information on item structure. | :white_check_mark: (when running once for each item) |
	| `$input.context.noItemsLeft` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on paired items and item linking. | 
	| `_input.all()` | All input items in current node. | 
	| `_input.first()` | First input item in current node. | 
	| `_input.last()` | Last input item in current node. | 
	| `_input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | 
	| `_json` | Shorthand for `_input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure.md) for information on item structure. Available when you set **Mode** to **Run Once for Each Item**. | 
	| `_input.context.noItemsLeft` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | 


## Output of other nodes

Methods for working with the output of other nodes. Some methods and variables aren't available in the Code node.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. If `branchIndex` isn't given it will default to the output that connects `node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `$("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node. If `branchIndex` isn't given it will default to the output that connects `node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `$("<node-name>").last(branchIndex?, runIndex?)` | The last item output by the given node. If `branchIndex` isn't given it will default to the output that connects `node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `$("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on item linking. | :white_check_mark: |
	| `$("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
	| `$("<node-name>").context` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
	| `$("<node-name>").itemMatching(currentNodeInputIndex)` | Use instead of `$("<node-name>").item` in the Code node if you need to trace back from an input item. | :white_check_mark: |
=== "Python"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `_("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. If `branchIndex` isn't given it will default to the output that connects`node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `_("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node. If `branchIndex` isn't given it will default to the output that connects`node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `_("<node-name>").last(branchIndex?, runIndex?)` | The last item output by the given node. If `branchIndex` isn't given it will default to the output that connects`node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `_("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on item linking. | :white_check_mark: |
	| `_("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
	| `_("<node-name>").context` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
	| `_("<node-name>").itemMatching(currentNodeInputIndex)` | Use instead of `_("<node-name>").item` in the Code node if you need to trace back from an input item. Refer to [Retrieve linked items from earlier in the workflow](/data/data-mapping/itemmatching.md) for an example. | :white_check_mark: |
