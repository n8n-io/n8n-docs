# `$evaluateExpression(expression: string, itemIndex?: number)`

Evaluates a given string as expression.

If you don't provide `itemIndex`, n8n uses:

* The data from item 0 in the Function node.
* The data from the current item in the Function Item node.

Example:

```javascript
items[0].json.variable1 = $evaluateExpression('{{1+2}}');
items[0].json.variable2 = $evaluateExpression($node["Set"].json["myExpression"], 1);

return items;
```
