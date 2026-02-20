---
contentType: overview
---

# Referencing data

Referencing data, or data mapping, means accessing information from previous nodes in your workflow. This allows you to use output from earlier steps as input for later nodes, creating dynamic workflows that pass data through multiple operations.

When you reference data, you're not changing it. You're pointing to values that already exist so you can use them in node parameters, expressions, or custom code.

If you want to change the data you're referencing, see [Transforming data](/data/transforming-data.md).

## How to reference data

The main way to reference data is using [expressions](/data/expressions-basics.md). You can create expressions by typing them in a parameter's field or dragging and dropping fields from the Input panel in the UI. Expressions will automatically figure out the correct item to use using [item linking](/data/data-mapping/data-item-linking/index.md).

When you need data from a particular node in your workflow, you can [reference nodes by name](/data/data-mapping/referencing-other-nodes.md). This is useful when your workflow has multiple branches or when you need to access data from several steps back.
