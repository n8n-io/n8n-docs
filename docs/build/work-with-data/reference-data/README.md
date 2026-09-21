---
contentType: overview
nodeTitle: Reference data
originalFilePath: data/data-mapping/index.md
originalUrl: 'https://docs.n8n.io/data/data-mapping'
url: 'https://docs.n8n.io/build/work-with-data/reference-data'
layout:
  description:
    visible: false
---

# Referencing data <a href="#referencing-data" id="referencing-data"></a>

Referencing data, or data mapping, means accessing information from previous nodes in your workflow. This allows you to use output from earlier steps as input for later nodes, creating dynamic workflows that pass data through multiple operations.

When you reference data, you're not changing it. You're pointing to values that already exist so you can use them in node parameters, expressions, or custom code.

If you want to change the data you're referencing, see [Transforming data](../transform-data/approaches-for-transforming-data.md).

## How to reference data <a href="#how-to-reference-data" id="how-to-reference-data"></a>

The main way to reference data is using [expressions](../expressions-versus-data-nodes.md#expressions). You can create expressions by typing them in a parameter's field or dragging and dropping fields from the Input panel in the UI. Expressions will automatically figure out the correct item to use using [item linking](link-data-items/README.md).

## In this section

* [Use the UI mapper](use-the-ui-mapper.md): reference data by dragging and dropping fields in the editor.
* [Reference previous nodes](reference-previous-nodes.md): methods for working with the input of the current node and the output of previous nodes.
* [Link data items](link-data-items/README.md): how items link back to the items that generated them.

## Related resources

* [Work with data](../)
* [Overview](../overview.md)
* [Understand n8n's data structure](../understand-n8ns-data-structure.md)
* [Expressions versus data nodes](../expressions-versus-data-nodes.md)
* [Transform data](../transform-data/README.md)
* [Filter out unwanted data](../filter-out-unwanted-data.md)
* [Pin and mock data](../pin-and-mock-data.md)
* [Handle special data types](../handle-special-data-types/README.md)
* [Data tables](../data-tables.md)
