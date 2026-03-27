---
description: How to use console.log() or print()
contentType: howto
---

# Output to the browser console with `console.log()` or `print()` in the Code node

You can use `console.log()` or `print()` in the Code node to help when writing and debugging your code.

For help opening your browser console, refer to [this guide by Balsamiq](https://balsamiq.com/support/faqs/browserconsole/).

## console.log (JavaScript)

For technical information on `console.log()`, refer to the [MDN developer docs](https://developer.mozilla.org/en-US/docs/Web/API/Console/log).

For example, copy the following code into a Code node, then open your console and run the node:

```js
let a = "apple";
console.log(a);
```

## print (Python)

For technical information on `print()`, refer to the [Real Python's guide](https://realpython.com/python-print/).

For example, set your Code node **Language** to **Python**, copy the following code into the node, then open your console and run the node:

```python
a = "apple"
print(a)
```

### Handling an output of `[object Object]`

If the console displays `[object Object]` when you print, check the data type, then convert it as needed.

To check the data type:

```python
print(type(myData))
```

#### JsProxy

If `type()` outputs `<class 'pyodide.ffi.JsProxy'>`, you need to convert the JsProxy to a native Python object using `to_py()`. This occurs when working with data in the n8n node data structure, such as node inputs and outputs. For example, if you want to print the data from a previous node in the workflow:

```python
previousNodeData = _("<node-name>").all();
for item in previousNodeData:
	# item is of type <class 'pyodide.ffi.JsProxy'>
	# You need to convert it to a Dict
	itemDict = item.json.to_py()
	print(itemDict)
```

Refer to the Pyodide documentation on [JsProxy](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.JsProxy) for more information on this class.








