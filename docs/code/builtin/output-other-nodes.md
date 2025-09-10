---
description: Methods for working with the output of other nodes.
contentType: reference
hide:
  - toc
---

# Output of other nodes

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
	| `_("<node-name>").itemMatching(currentNodeInputIndex)` | Use instead of `_("<node-name>").item` in the Code node if you need to trace back from an input item. Refer to [Retrieve linked items from earlier in the workflow](/code/cookbook/builtin/itemmatching.md) for an example. | :white_check_mark: |
