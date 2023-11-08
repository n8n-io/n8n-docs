# Function

/// warning | Deprecated in 0.198.0
n8n deprecated this node in version 0.198.0. Older workflows continue to work, and the node is still available in older versions n8n. From 0.198.0, n8n replaces the Function node with the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node.
///
Using the function node, you can:

* Transform data from other nodes
* Implement custom functionality

///  note  | Function node and function item node
Note that the Function node is different from the [Function Item](/integrations/builtin/core-nodes/n8n-nodes-base.functionitem/) node. Refer to [Data | Code](/data/code/) to learn about the difference between the two.
///

The Function node supports:

* Promises. Instead of returning the items directly, you can return a promise which resolves accordingly.
* Writing to your browser console using `console.log`. This is useful for debugging and troubleshooting your workflows.

When working with the Function node, you need to understand the following concepts:

* [Data structure](/data/data-structure/): understand the data you receive in the Function node, and requirements for outputting data from the node.
* [Item linking](/data/data-mapping/data-item-linking/): learn how data items work. You need to handle item linking when the number of input and output items doesn't match.

n8n provides built-in methods and variables. These provide support for:

* Accessing specific item data
* Accessing data about workflows, executions, and your n8n environment
* Convenience variables to help with data and time

Refer to [methods and variables](/code-examples/methods-variables-reference/) for more information.


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

## Manage item linking

--8<-- "_snippets/data/data-mapping/item-linking-code-node.md"

## External libraries

If you self-host n8n, you can import and use built-in and external npm modules in the Function node. To learn how to enable external modules, refer the [Configuration](/hosting/configuration/#use-built-in-and-external-modules-in-function-nodes) guide.
