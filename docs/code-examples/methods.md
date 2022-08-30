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



