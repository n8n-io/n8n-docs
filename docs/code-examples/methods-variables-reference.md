# Built-in methods and variables

n8n provides built-in methods and variables for working with data and accessing n8n data. This document provides a reference list of available methods and variables, with a short description. Note that some methods and variables aren't available in the Function node.


## Current node input

| Method | Description | Available in Function node? |
| ------ | ----------- | :-------------------------: |
| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | :x: |
| `$input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/) for more information on paired items and item linking. | :x: |
| `$input.all()` | All input items in current node. | :white_check_mark: |
| `$input.first()` | First input item in current node. | :white_check_mark: |
| `$input.last()` | Last input item in current node. | :white_check_mark: |
| `$input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | :white_check_mark: |
| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure/) for information on item structure. | :x: |
| `$input.context.noItemsLeft` | Boolean. Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | :white_check_mark: |


## Output of other nodes

| Method | Description | Available in Function node? |
| ------ | ----------- | :-------------------------: |
| `$("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. | :white_check_mark: |
| `$("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node | :white_check_mark: |
| `$("<node-name>").last(branchIndex?, run Index?)` | The last item output by the given node. | :white_check_mark: |
| `$("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/) for more information on item linking. | :x: |
| `$("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
| `$("<node-name>").context` | Only available when working with the Split in Batches node. Provides information about what's happening in the node, allowing you to see if the node is still processing items. | :white_check_mark: |
| `$("<node-name>").itemMatching(currentNodeinputIndex)` | Use instead of `$("<node-name>").item` in the Function node if you need to trace back from an input item. | :white_check_mark: |



<!-- possibly not live yet? 


| `$("<node-name>").itemAt(itemIndex, branchIndex?, runIndex?)` | [TODO: is this in? not working in expr] Returns an item at a given index. Replaces `$item()`. | :white_check_mark: | :white_check_mark: | :white_check_mark: |


-->



## Date and time

| Method | Description | Available in Function node? |
| ------ | ----------- | :-------------------------: |
| `$now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | :white_check_mark: |
| `$today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | :white_check_mark: |


## n8n metadata

This includes:

* Access to n8n environment variables for self-hosted n8n.
* Metadata about workflows, executions, and nodes.

| Method | Description | Available in Function node? |
| ------ | ----------- | :-------------------------: |
| `$env` | Contains [environment variables](/hosting/environment-variables/). | :white_check_mark: |
| `$execution.id` | The unique ID of the current workflow execution. | :white_check_mark: |
| `$execution.mode` | Whether the execution was triggered automatically, or by manually running the workflow. Possible values are `test` and `production`. | :white_check_mark: |
| `$execution.resumeUrl` | The webhook URL to call to resume a workflow waiting at a [Wait node](/integrations/builtin/core-nodes/n8n-nodes-base.wait/). | :white_check_mark: |
| `$getWorkflowStaticData(type)` | Static data isn't available when testing workflows. The workflow must be active and called by a trigger or webhook to save static data. This gives access to the static workflow data. | :white_check_mark: |
| `$itemIndex` | The index of an item in a list of items. | :x: |
| `$prevNode.name` | The name of the node that the current input came from. When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
| `$prevNode.outputIndex` | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an If or Switch node).  When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
| `$prevNode.runIndex` | The run of the previous node that generated the current input. When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
| `$runIndex` | How many times n8n has executed the current node. Zero-based (the first run is 0, the second is 1, and so on). | :white_check_mark: |
| `$workflow.active` | Whether the workflow is active (true) or not (false). | :white_check_mark: |
| `$workflow.id` | The workflow ID. | :white_check_mark: |
| `$workflow.name` | The workflow name. | :white_check_mark: |


## Advanced

| Method | Description | Available in Function node? |
| ------ | ----------- | :-------------------------: |
| `$evaluateExpression` | Evaluates a string as an expression | :white_check_mark: |
| `$jmespath()` | Perform a search on a JSON object using JMESPath. | :white_check_mark: |
