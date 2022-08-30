# Function

Using the function node, you can:

* Transform data from other nodes
* Implement custom functionality

!!! note "Function node and function item node"
    Note that the Function node is different from the [Function Item](/integrations/builtin/core-nodes/n8n-nodes-base.functionItem/) node. Refer to [Data | Code](/data/code/) to learn about the difference between the two.


The Function node supports:

* Promises. Instead of returning the items directly, you can return a promise which resolves accordingly.
* Writing to your browser console using `console.log`. This is useful for debugging and troubleshooting your workflows.

When working with the Function node, you need to understand the following concepts:

* [Data structure](/data/data-structure/): understand the data you receive in the Function node, and requirements for outputting data from the node.
* [Item linking](/data/data-item-linking/): learn how data items work.

n8n provides built-in methods and variables. These provide support for:

* Accessing specific item data
* Accessing data about workflows, executions, and your n8n environment
* Convenience variables to help with data and time

Refer to [code examples](/code-examples/) for more information.



## Output items

When using the Function node, you must return data in the format described in [data structure](/data/data-structure/).

This example creates 10 items with the IDs 0 to 9:

```typescript
const newItems = [];

for (let i=0;i<10;i++) {
  newItems.push({
    json: {
      id: i
    }
  });
}

return newItems;
```


### Method: $item(index: number, runIndex?: number)

With `$item` it is possible to access the data of parent nodes. That can be the item data but also
the parameters. It expects as input an index of the item the data should be returned for. This is
needed because for each item the data returned can be different. This is probably straightforward for the
item data itself but maybe less for data like parameters. The reason why it is also needed, is
that they may contain an expression. Expressions get always executed of the context for an item.
If that would not be the case, for example, the Email Send node not would be able to send multiple
emails at once to different people. Instead, the same person would receive multiple emails.

The index is 0 based. So `$item(0)` will return the first item, `$item(1)` the second one, and so on.

By default the item of the last run of the node  will be returned. So if the referenced node ran
3x (its last runIndex is 2) and the current node runs the first time (its runIndex is 0) the
data of runIndex 2 of the referenced node will be returned.

For more information about what data can be accessed via `$node`, check out the `Variable: $node` [section](/code-examples/expressions/variables/#variable-node).

Example:

```typescript
// Returns the value of the JSON data property "myNumber" of Node "Set" (first item)
const myNumber = $item(0).$node["Set"].json["myNumber"];
// Like above but data of the 6th item
const myNumber = $item(5).$node["Set"].json["myNumber"];

// Returns the value of the parameter "channel" of Node "Slack".
// If it contains an expression the value will be resolved with the
// data of the first item.
const channel = $item(0).$node["Slack"].parameter["channel"];
// Like above but resolved with the value of the 10th item.
const channel = $item(9).$node["Slack"].parameter["channel"];
```


### Method: getWorkflowStaticData(type)

This gives access to the static workflow data.
It is possible to save data directly with the workflow. This data should, however, be very small.
A common use case is to for example to save a timestamp of the last item that got processed from
an RSS-Feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n will check automatically if the data
has changed and will save it, if necessary.

There are two types of static data. The "global" and the "node" one. Global static data is the
same in the whole workflow. And every node in the workflow can access it. The node static data
, however, is different for every node and only the node which set it can retrieve it again.

Example:

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

It is important to know that the static data can not be read and written when testing via the UI.
The data there will always be empty and the changes will not persist. Only when a workflow
is active and it gets called by a Trigger or Webhook, the static data will be saved.

## External libraries

If you self-host n8n, you can import and use built-in and external npm modules in the Function node. To learn how to enable external modules, refer the [Configuration](/hosting/configuration/#use-built-in-and-external-modules-in-function-nodes) guide.
