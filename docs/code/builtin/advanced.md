---
description: Built-in methods for advances tasks.
contentType: reference
---

# Advanced

| Method | Description | Available in Code node? |
| ------ | ----------- | :---------------------: |
| `$evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. | :white_check_mark: |
| `$jmespath()` | Perform a search on a JSON object using JMESPath. | :white_check_mark: |
| `$vars` | Contains the [Variables](/variables/) available in the active environment. | :white_check_mark: |
