---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n provides these methods to make it easier to perform common tasks in expressions.
contentType: reference
hide:
  - toc
---

# Convenience methods

n8n provides these methods to make it easier to perform common tasks in expressions.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///

=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :---------------------: |
	| `$evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. | :white_check_mark: |
	| `$ifEmpty(value, defaultValue)` | The `$ifEmpty()` function takes two parameters, tests the first to check if it's empty, then returns either the parameter (if not empty) or the second parameter (if the first is empty). The first parameter is empty if it's:<ul><li>`undefined`</li><li>`null`</li><li>An empty string `''`</li><li>An array where `value.length` returns `false`</li><li>An object where `Object.keys(value).length` returns `false`</li></ul> | :white_check_mark: |
	| `$if()` | The `$if()` function takes three parameters: a condition, the value to return if true, and the value to return if false. | :x: | 
	| `$max()` | Returns the highest of the provided numbers. | :x: |
	| `$min()` | Returns the lowest of the provided numbers. | :x: |
=== "Python"
	| Method | Description |
	| ------ | ----------- | 
	| `_evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. |
	| `_ifEmpty(value, defaultValue)` | The `_ifEmpty()` function takes two parameters, tests the first to check if it's empty, then returns either the parameter (if not empty) or the second parameter (if the first is empty). The first parameter is empty if it's:<ul><li>`undefined`</li><li>`null`</li><li>An empty string `''`</li><li>An array where `value.length` returns `false`</li><li>An object where `Object.keys(value).length` returns `false`</li></ul> | :white_check_mark: |
