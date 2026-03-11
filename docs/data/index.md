---
contentType: overview
---

# Overview

In n8n, data flows through your workflow from node to node. Each node receives data, processes it, and passes the results to the next node. Understanding how data moves and transforms in your workflows is essential for building effective workflows.

## How data works in n8n

**Data flows through nodes**: When you connect nodes, data automatically passes from one to the next. Each node processes the incoming data and outputs results based on its configuration.

**View data at every stage**: You can inspect data at any point in your workflow:

- **Node details view**: Double-click any node to see its input and output data
- **Execution logs**: Review past workflow runs to see the data that passed through each node

**Reference previous data**: Use [data mapping](/data/data-mapping/index.md) to reference data from earlier nodes in your workflow. You can:

- Select values from previous nodes using the UI
- Write [expressions](/data/expressions.md) to dynamically access and combine data
- Reference specific nodes by name to get their output

**Transform data**: n8n provides multiple ways to modify data:

- Use dedicated transformation nodes (Aggregate, Split Out, Sort, and more)
- Write [expressions](/data/expressions-for-transformation.md) directly in node parameters
- Use the [Code node](/data/expressions.md#code-node) for custom JavaScript or Python logic
- Apply the [AI Transform node](/data/expressions.md#ai-transform-node) for AI-assisted transformations

**Understand the data structure**: n8n uses a [consistent data structure](/data/data-structure.md) across all nodes, making it predictable how data flows and transforms throughout your workflows.

## In this section

* [How n8n structures data](/data/data-structure.md)
* [Transforming data](/data/transforming-data.md)
* [Processing data using code](/data/expressions.md#code-node)
* [Pinning, mocking, and editing data](/data/data-pinning.md) during workflow development
* [Referencing data](/data/data-mapping/index.md) and [item linking](/data/data-mapping/data-item-linking/index.md): how data items link to each other

