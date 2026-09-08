---
description: How to use console.log() or print()
contentType: howto
nodeTitle: Output to the browser console
originalFilePath: code/cookbook/code-node/console-log.md
originalUrl: 'https://docs.n8n.io/code/cookbook/code-node/console-log'
url: >-
  https://docs.n8n.io/build/code-in-n8n/cookbook/code-node/output-to-the-browser-console
layout:
  description:
    visible: false
---

# Output to the browser console with `console.log()` or `print()` in the Code node <a href="#output-to-the-browser-console-with-consolelog-or-print-in-the-code-node" id="output-to-the-browser-console-with-consolelog-or-print-in-the-code-node"></a>

You can use `console.log()` or `print()` in the Code node to help when writing and debugging your code.

For help opening your browser console, refer to [this guide by Balsamiq](https://balsamiq.com/support/faqs/browserconsole/).

## console.log (JavaScript) <a href="#consolelog-javascript" id="consolelog-javascript"></a>

For technical information on `console.log()`, refer to the [MDN developer docs](https://developer.mozilla.org/en-US/docs/Web/API/Console/log).

For example, copy the following code into a Code node, then open your console and run the node:

```js
let a = "apple";
console.log(a);
```

## print (Python) <a href="#print-python" id="print-python"></a>

For technical information on `print()`, refer to the [Real Python's guide](https://realpython.com/python-print/).

For example, set your Code node **Language** to **Python**, copy the following code into the node, then open your console and run the node:

```python
a = "apple"
print(a)
```

### Printing node data <a href="#printing-node-data" id="printing-node-data"></a>

`_items` and `_item` are standard Python objects, so you can print them directly:

```python
print(_items)
```

{% hint style="info" %}
**`type()` isn't available**

The Python Code node denies some built-in functions by default, including `type()`. Refer to [task runners environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/task-runners) for the full list and how to change it when self-hosting.
{% endhint %}








