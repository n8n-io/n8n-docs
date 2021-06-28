# Looping in n8n

By default, the nodes process all the incoming items. n8n handles the looping for you.

Below are the answers to some common questions that might help you understand them better.

## FAQs

### What does the number on the node represent?

After successful execution, a number gets displayed on the node. This number represents the number of times the node got executed. It **doesn\'t** represents the number of items returned by the node.

For example, in the screenshot below, the Hacker News node gets executed once. This is represented by the number 1.

![Hacker News node executed once](./images/node_execution.png)

### What is an item in n8n?

n8n uses a pre-defined data structure that allows all the nodes to process the incoming data correctly. The data structure of the incoming data should be as follow. If the data structure of the incoming data is different, refer to [Modify Data Structure](./javascript-code-snippets.md##Modify-Data-Structure) to learn how to modify the data structure.

```json
[
  {
    "data": 1
  },
  {
    "data": 2
  },
  {
    "data": 3
  }
]
```

In the above example, each `data` value is an individual item.

### Only the first time gets displayed in the Variable Selector. Does the node only process this first item?

In the Variable Selector, only the first item gets displayed. The Variable Selector doesn't display all the incoming items. However, the node processes each incoming item. For example, if the incoming data contains ten items, the Variable Selector in the node will display only the first item. The node, however, will process all ten items.

### How to execute a node only once?

As mentioned, if the incoming data contains multiple items, the node will get executed multiple times (once for each item). If you want the node to get executed only once, follow the instructions below
1. Click on the ***Settings*** tab inside the node.
2. Toggle ***Execute Once*** to `true`. This option will execute the node only once.

### When should the Split In Batches node be used?

The [Split In Batches](../nodes/nodes-library/core-nodes/SplitInBatches/README.md) node should be used when you want to batch the data in groups. Batching data into smaller groups helps with avoiding API rate limits. The Split In Batches node should be used when the incoming data is huge.