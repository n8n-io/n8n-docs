# Built-in methods and variables

n8n provides built-in methods and variables for working with data and accessing n8n data. This document provides a reference list of available methods and variables, with a short description, and whether they're available in the expressions editor, Function node, or both.

For usage examples, refer to [Expressions examples](/code-examples/expressions/methods-variables/) and [JavaScript examples](/code-examples/javascript-functions/methods-variables/).


## Node input

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | Expressions editor |
| `$data` | Incoming raw data from a node. | Both |
| `$input.item` | The paired item. This is the input item that the previous node used to produce this item. Refer to [Item linking](/data/data-item-linking/) for more information on paired items and item linking. | Expressions editor |
| `$input.all()` | All input items. | Both |
| `$input.first()` | First input item. | Both |
| `$input.last()` | Last input item. | Both |
| `$input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | Both |
| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node | Expressions editor |
| `$input.context` | Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | Both |


## Node output

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. Replaces `$items`. | Both |
| `$("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node | Both |
| `$("<node-name>").last(branchIndex?, run Index?)` | The last item output by the given node. | Both |
| `$("<node-name>").item` | The paired item. This is the input item that the previous node used to produce this item. Refer to [Item linking](/data/data-item-linking/) for more information on paired items and item linking. | Expressions editor |
| `$("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | Both |
| `$("<node-name>").context` | Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | Both |

<!-- possibly not live yet? 


| `$("<node-name>").itemAt(itemIndex, branchIndex?, runIndex?)` | [TODO: is this in? not working in expr] Returns an item at a given index. Replaces `$item()`. | Both |
| `$("<node-name>").itemMatching(currentNodeinputIndex)` | [TODO: not yet implemented?] | Both |

-->

## Working with data

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$evaluateExpression` | Evaluates a string as an expression | Both |
| `$jmespath()` | Perform a search on a JSON object using JMESPath. | Both |
| `$now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | Both |
| `$today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | Both |


## n8n data

This includes:

* Access to n8n environment variables for self-hosted n8n.
* Metadata about workflows, executions, and nodes.

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$env` | Contains [environment variables](/hosting/environment-variables/). | Both |
| `$execution.id` | The unique ID of the current workflow execution. | Function node |

| `$execution.resumeUrl` | The webhook URL to call to resume a waiting workflow. | Function node |
| `$parameters` | Parameters of the current node. | Both |
| `$position` | The index of an item in a list of items. | Both |
| `$prevNode.name` | Note that `$prevNode` always takes the first input. This is important when using it in a node with multiple inputs, such as the Merge node. | Both |
| `$prevNode.outputIndex` | Note that `$prevNode` always takes the first input. This is important when using it in a node with multiple inputs, such as the Merge node. | Both |
| `$prevNode.runIndex` | Note that `$prevNode` always takes the first input. This is important when using it in a node with multiple inputs, such as the Merge node. | Both |
| `$runIndex` | How many times n8n has executed the node. Zero-based (the first run is 0, the second is 1, and so on). | Both |
| `$workflow.active` | Whether the workflow is active (true) or not (false). | Both |
| `$workflow.id` | The workflow ID. | Both |
| `$workflow.name` | The workflow name. | Both |

<!-- maybe internal only?
| `$execution.mode` | | Function node |
-->
