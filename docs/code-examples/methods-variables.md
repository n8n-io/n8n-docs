# Methods

n8n provides built-in methods for working with data. This document provides a reference list of available methods, with a short description, and whether they're available in the expressions editor, Function node, or both.

For usage examples, refer to [Expressions examples - Methods](/code-examples/expressions/methods/) and [JavaScript examples - Methods](/code-examples/javascript-functions/methods/).

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$evaluateExpression` | Evaluates a string as an expression | Both |
| `$jmespath()` | Perform a search on a JSON object using JMESPath. | Both |


## Node output

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$("<node-name>").all(branchIndex, runIndex)` | Returns all items from a given node. Replaces `$items`. | Both |
| `$("<node-name>").first(branchIndex, runIndex)` | | Both |
| `$("<node-name>").last(branchIndex, run Index)` | | Both |
| `$("<node-name>").item` | The paired item. [TODO: explain what this is]. | Expressions editor |
| `$("<node-name>").itemAt(itemIndex, branchIndex, runIndex)` | Returns an item at a given index. Replaces `$item()`. | Both |
| `$("<node-name>").itemMatching(currentNodeinputIndex)` | [TODO: not yet implemented?] | Both |
| `$("<node-name>").params` | | |
| `$("<node-name>").context` | | |

## Node input

| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$input.item` | The paired item. [TODO: explain what this is] | Expressions editor |
| `$input.all()` | | Both |
| `$input.first()` | | Both |
| `$input.last()` | | Both |
| `$input.params` | | Both |
| `$input.context` | | Both |



# Variables

n8n provides built-in variables for working with data. This document provides a reference list of available variables, with a short description, and whether they're available in the expressions editor, Function node, or both.

For usage examples, refer to [Expressions examples - Variables](/code-examples/expressions/variables/) and [JavaScript examples - Variables](/code-examples/javascript-functions/variables/).


| Method | Description | Availability |
| ------ | ----------- | ------------ |
| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | Expressions editor |
| `$data` | Incoming raw data from a node. | Both |
| `$env` | Contains [environment variables](/hosting/environment-variables/). | Both |
| `$execution.id` | | Both |
| `$execution.mode` | | Both |
| `$execution.resumeUrl` | The webhook URL to call to resume a waiting workflow. | Both |
| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node | Expressions editor |
| `$now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | Both |
| `$parameters` | Parameters of the current node. | |
| `$position` | The index of an item in a list of itemd. | |
| `$prevNode.name` | Note that `$prevNode` always takes the first input. This is important when using it in a node with multiple inputs, such as the Merge node. | Both |
| `$prevNode.outputIndex` | Note that `$prevNode` always takes the first input. This is important when using it in a node with multiple inputs, such as the Merge node. | Both |
| `$prevNode.runIndex` | Note that `$prevNode` always takes the first input. This is important when using it in a node with multiple inputs, such as the Merge node. | Both |
| `$runIndex` | How many times n8n has executed the node. Zero-based (the first run is 0, the second is 1, and so on). | Both |
| `$today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | Both |
| `$workflow.active` |  | Both |
| `$workflow.id` |  | Both |
| `$workflow.name` |  | Both |


