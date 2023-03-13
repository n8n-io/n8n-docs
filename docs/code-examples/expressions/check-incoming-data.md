# Check incoming data

At times, you may want to check the incoming data. If the incoming data doesn't satisfy a condition, you may want to return a different value. For example, you want to check if a variable from the previous node is empty and return a string if it is empty. Use the following code snippet to return `not found` if the variable is empty.

```js
{{$json["variable_name"]? $json["variable_name"] :"not found"}}
```

The above expression uses the ternary operator. You can learn more about the ternary operator [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).
