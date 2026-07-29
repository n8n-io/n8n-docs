---
contentType: overview
nodeTitle: Overview
originalFilePath: data/index.md
originalUrl: 'https://docs.n8n.io/data'
url: 'https://docs.n8n.io/build/work-with-data/overview'
layout:
  description:
    visible: false
---

# Overview <a href="#overview" id="overview"></a>

In n8n, data flows through your workflow from node to node. Each node receives data, processes it, and passes the results to the next node. Understanding how data moves and transforms in your workflows is essential for building effective workflows.

## How data works in n8n <a href="#how-data-works-in-n8n" id="how-data-works-in-n8n"></a>

**Data flows through nodes**: When you connect nodes, data automatically passes from one to the next. Each node processes the incoming data and outputs results based on its configuration.

**View data at every stage**: You can inspect data at any point in your workflow:

- **Node details view**: Double-click any node to see its input and output data. Choose between **Schema**, **Table** and **JSON** views. Schema view shows a simplified structure from the first item only, Table and JSON display the full dataset.
- **Execution logs**: Review past workflow runs to see the data that passed through each node.

**Reference previous data**: Use [data mapping](reference-data/README.md) to reference data from earlier nodes in your workflow. You can:

- Select values from previous nodes using the UI
- Write [expressions](expressions-versus-data-nodes.md) to dynamically access and combine data
- Reference specific nodes by name to get their output

**Transform data**: n8n provides multiple ways to modify data:

- Use dedicated transformation nodes (Aggregate, Split Out, Sort, and more)
- Write [expressions](transform-data/expressions-for-data-transformation.md) directly in node parameters
- Use the [Code node](expressions-versus-data-nodes.md#code-node) for custom JavaScript or Python logic
- Apply the [AI Transform node](expressions-versus-data-nodes.md#ai-transform-node) for AI-assisted transformations

**Understand the data structure**: n8n uses a [consistent data structure](understand-n8ns-data-structure.md) across all nodes, making it predictable how data flows and transforms throughout your workflows.

## In this section <a href="#in-this-section" id="in-this-section"></a>

* [How n8n structures data](understand-n8ns-data-structure.md)
* [Transforming data](transform-data/approaches-for-transforming-data.md)
* [Processing data using code](expressions-versus-data-nodes.md#code-node)
* [Pinning, mocking, and editing data](pin-and-mock-data.md) during workflow development
* [Referencing data](reference-data/README.md) and [item linking](reference-data/link-data-items/README.md): how data items link to each other

