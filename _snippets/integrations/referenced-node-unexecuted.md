<!-- vale off -->
## Referenced node is unexecuted
<!-- vale on -->

This error displays when a previous node in the workflow hasn't executed and isn't providing output that this node needs as input.

The full text of this error will tell you the exact node that isn't executing in this format:
```
An expression references the node '<node-name>', but it hasn’t been executed yet. Either change the expression, or re-wire your workflow to make sure that node executes first.
```

To begin troubleshooting, test the workflow up to the named node.

For nodes that call JavaScript or other custom code, determine if a node has executed before trying to use the value by calling:

```js
$("<node-name>").isExecuted
```