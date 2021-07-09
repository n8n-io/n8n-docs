---
permalink: /nodes/n8n-nodes-base.functionItem
description: Learn how to use the Function Item node in n8n
---

# Function Item

The Function Item node is used to add custom snippets to JavaScript code that should be executed once for every item that it receives as the input.

::: tip 💡 Keep in mind
Please note that the Function Item node is different from the [Function](../Function/README.md) node. Check out [this](../../../../reference/function-nodes.md) page to learn about the difference between the Function and Function Item nodes.
:::

The Function Item node supports promises. So instead of returning the items directly, it is also possible to return a promise which resolves accordingly.

It also provides the ability to write to your browser console using `console.log`, useful for debugging and troubleshooting your workflows.


## Node Reference

You can also use the methods and variables mentioned in the [Expressions](../../../expressions.md) page in the Function Item node.

### Variable: item

It contains the "json" data of the currently processed item.

The data can be accessed and manipulated like this:

```json
// Uses the data of an already existing key to create a new additional one
item.newIncrementedCounter = item.existingCounter + 1;
return item;
```


### Method: getBinaryData()

Returns all the binary data (all keys) of the item which gets currently processed.
```json
item.filename = getBinaryData().attachment_0.fileName;
return item;
```

### Method: setBinaryData(binaryData)

Sets all the binary data (all keys) of the item which gets currently processed.


### Method: getWorkflowStaticData(type)

This gives access to the static workflow data.
It is possible to save data directly with the workflow. This data should, however, be very small.
A common use case is to for example to save a timestamp of the last item that got processed from
an RSS-Feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n will check automatically if the data
has changed and will save it, if necessary.

There are two types of static data. The "global" and the "node" one. Global static data is the
same in the whole workflow. And every node in the workflow can access it. The node static data,
however, is different for every node and only the node which set it can retrieve it again.

**Note:** The static data cannot be read and written when executing via manual executions. The data will always be empty, and the changes will not persist. The static data will only be saved when a workflow is active.


#### Example

```javascript
// Get the global workflow static data
const staticData = getWorkflowStaticData('global');
// Get the static data of the node
const staticData = getWorkflowStaticData('node');

// Access its data
const lastExecution = staticData.lastExecution;

// Update its data
staticData.lastExecution = new Date().getTime();

// Delete data
delete staticData.lastExecution;
```
