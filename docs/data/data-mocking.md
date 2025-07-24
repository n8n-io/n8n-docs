---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data mocking
description: Ways to mock data in your n8n workflow.
contentType: howto
---

# Data mocking

Data mocking is simulating or faking data. It's useful when developing a workflow. By mocking data, you can:

- Avoid making repeated calls to your data source. This saves time and costs.
- Work with a small, predictable dataset during initial development.
- Avoid the risk of overwriting live data: in the early stages of building your workflow, you don't need to connect your real data source.


## Mocking with real data using data pinning

Using [data pinning](/data/data-pinning.md), you load real data into your workflow, then pin it in the output panel of a node. Using this approach you have realistic data, with only one call to your data source. You can [edit pinned data](/data/data-editing.md).

Use this approach when you need to configure your workflow to handle the exact data structure and parameters provided by your data source.

--8<-- "_snippets/data/how-to-pin-data.md"


## Generate custom data using the Code or Edit Fields nodes

You can create a custom dataset in your workflow using either the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) or the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md).

In the Code node, you can create any data set you want, and return it as the node output. In the Edit Fields node, select **Add fields** to add your custom data.

The Edit Fields node is a good choice for small tests. To create more complex datasets, use the Code node.

## Output a sample data set from the Customer Datastore node

The Customer Datastore node provides a fake dataset to work with. Add and execute the node to explore the data.

Use this approach if you need some test data when exploring n8n, and you don't have a real use-case to work with.
