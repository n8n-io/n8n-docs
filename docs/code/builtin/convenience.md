---
description: n8n provides these methods to make it easier to perform common tasks in expressions.
contentType: reference
---

# Convenience methods

n8n provides these methods to make it easier to perform common tasks in expressions.

=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :---------------------: |
	| `$evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. | :white_check_mark: |
	| `$if()` | The `$if()` function takes three parameters: a condition, the value to return if true, and the value to return if false. | :x: | 
	| `$max()` | Returns the highest of the provided numbers. | :x: |
	| `$min()` | Returns the lowest of the provided numbers. | :x: |
=== "Python"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :---------------------: |
	| `_evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. | :white_check_mark: |
	| `_if()` | The `_if()` function takes three parameters: a condition, the value to return if true, and the value to return if false. | :x: | 
	| `_max()` | Returns the highest of the provided numbers. | :x: |
	| `_min()` | Returns the lowest of the provided numbers. | :x: |
