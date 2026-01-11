---
title: Data mocking and pinning
description: Ways to mock and pin data in your n8n workflow during development.
contentType: howto
---

# Data pinning and mocking

When developing workflows, you often need to test your logic without repeatedly calling external systems or working with live data. n8n provides two related features to help with this:

* **Data pinning**: Save the output data of a node and reuse it in future workflow executions instead of fetching fresh data
* **Data mocking**: Create or simulate test data without connecting to real data sources

Both approaches save time and resources during development, help you work with consistent datasets, and protect live systems from repeated test calls.

/// note | For development only
Data pinning and mocking are features to help test workflows during development. Data pinning isn't available for production workflow executions.
///

## Data pinning

You can 'pin' data during workflow development. Data pinning means saving the output data of a node, and using the saved data instead of fetching fresh data in future workflow executions. 

You can use this when working with data from external sources to avoid having to repeat requests to the external system. This can save time and resources:

* If your workflow relies on an external system to trigger it, such as a webhook call, being able to pin data means you don't need to use the external system every time you test the workflow.
* If the external resource has data or usage limits, pinning data during tests avoids consuming your resource limits.
* You can fetch and pin the data you want to test, then have confidence that the data is consistent in all your workflow tests.

You can only pin data for nodes that have a single main output ("error" outputs don't count for this purpose).

### Pin data

--8<-- "_snippets/data/how-to-pin-data.md"

### Unpin data

When data pinning is active, a banner appears at the top of the node's output panel indicating that n8n has pinned the data. To unpin data and fetch fresh data on the next execution, select the **Unpin** link in the banner.

## Data mocking approaches

Beyond pinning real data, you can create mock data in several ways:

### Generate custom data using the Code or Edit Fields nodes

You can create a custom dataset in your workflow using either the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) or the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md).

In the Code node, you can create any data set you want, and return it as the node output. In the Edit Fields node, select **Add fields** to add your custom data.

The Edit Fields node is a good choice for small tests. To create more complex datasets, use the Code node.

**Use this approach when**: You need complete control over your test data structure and values, or when you want to test edge cases with specific data patterns.

### Output a sample data set from the Customer Datastore node

The Customer Datastore node provides a fake dataset to work with. Add and execute the node to explore the data.

**Use this approach when**: You need some test data when exploring n8n, and you don't have a real use-case to work with.

### Combine mocking with pinning

For the most realistic testing experience, you can combine these approaches:

1. Use data pinning to capture real data from your data source with a single call
2. [Edit the pinned data](/data/data-editing.md) to create specific test scenarios or edge cases
3. Continue developing with this edited, pinned dataset

**Use this approach when**: You need to configure your workflow to handle the exact data structure from your data source, but want to test with modified or edge-case values.
