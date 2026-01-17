---
contentType: overview
---

# Referencing data

Referencing data, or data mapping, means accessing information from previous nodes in your workflow. This allows you to use output from earlier steps as input for later nodes, creating dynamic workflows that pass data through multiple operations.

When you reference data, you're not changing it—you're pointing to values that already exist so you can use them in node parameters, expressions, or custom code.

## Ways to reference data

n8n provides multiple approaches for referencing data from previous nodes:

**Using the UI**: The simplest way to reference data is through [drag and drop mapping](/data/data-mapping/data-mapping-ui.md). Click and hold data from the INPUT panel and drag it into node parameters. n8n automatically generates the expression for you.

**Using expressions**: You can [write expressions](/data/data-mapping/data-mapping-expressions.md) directly in node parameters to access data from previous nodes. Expressions give you more control and allow you to combine multiple data sources or apply transformations.

**Referencing specific nodes**: When you need data from a particular node in your workflow, you can [reference nodes by name](/data/data-mapping/referencing-other-nodes.md). This is useful when your workflow has multiple branches or when you need to access data from several steps back.

**Advanced item matching**: For complex workflows, you may need to [retrieve linked items](/data/data-mapping/itemmatching.md) from earlier in the workflow using `itemMatching()`. This helps you access the correct data when items have been split, merged, or transformed.

## Understanding item linking

Every item in n8n links back to the items that created it. This [item linking](/data/data-mapping/data-item-linking/index.md) behavior is important when:

- Building custom nodes with complex input/output behavior
- Using the Code node to access data from earlier workflow steps
- Working with workflows where items are split, merged, or transformed
- Troubleshooting data mapping issues

For most workflows, n8n handles item linking automatically. You only need to understand the details if you're building nodes, using the Code node for complex operations, or debugging data flow issues. 
