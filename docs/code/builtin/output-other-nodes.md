---
description: Methods for working with the output of other nodes.
contentType: reference
---

# Output of other nodes

Methods for working with the output of other nodes. Some methods and variables aren't available in the Code node.

!!! note "Python support"
	You can use Python in the Code node. It isn't available in expressions.

=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. | :white_check_mark: |
	| `$("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node | :white_check_mark: |
	| `$("<node-name>").last(branchIndex?, run Index?)` | The last item output by the given node. | :white_check_mark: |
	| `$("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/) for more information on item linking. | :x: |
	| `$("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
	| `$("<node-name>").context` | Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | :white_check_mark: |
	| `$("<node-name>").itemMatching(currentNodeinputIndex)` | Use instead of `$("<node-name>").item` in the Code node if you need to trace back from an input item. | :white_check_mark: |
=== "Python"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `_("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. | :white_check_mark: |
	| `_("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node | :white_check_mark: |
	| `_("<node-name>").last(branchIndex?, run Index?)` | The last item output by the given node. | :white_check_mark: |
	| `_("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/) for more information on item linking. | :x: |
	| `_("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
	| `_("<node-name>").context` | Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | :white_check_mark: |
	| `_("<node-name>").itemMatching(currentNodeinputIndex)` | Use instead of `_("<node-name>").item` in the Code node if you need to trace back from an input item. | :white_check_mark: |
