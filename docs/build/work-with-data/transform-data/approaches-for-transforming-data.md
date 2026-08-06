---
contentType: explanation
nodeTitle: Approaches for transforming data
originalFilePath: data/transforming-data.md
originalUrl: 'https://docs.n8n.io/data/transforming-data'
url: >-
  https://docs.n8n.io/build/work-with-data/transform-data/approaches-for-transforming-data
layout:
  description:
    visible: false
---

# Approaches for transforming data <a href="#approaches-for-transforming-data" id="approaches-for-transforming-data"></a>

Data transformation in n8n involves modifying, restructuring, or enriching data as it moves through your workflow. This includes changing data formats, filtering or aggregating values, adding computed fields, and converting data structures to work with different nodes.

n8n uses a predefined [data structure](../understand-n8ns-data-structure.md) that allows all nodes to process incoming data correctly. When your data doesn't match this structure, or when you need to modify it for your use case, you'll need to transform it.

n8n provides several approaches for data transformation:

* [Expressions](../expressions-versus-data-nodes.md#expressions) allow you to transform data directly in node parameters using n8n's expression syntax (`{{ }}`)
* The [Code node](../expressions-versus-data-nodes.md#code-node) lets you write custom JavaScript or Python for complex transformations.
* The [AI Transform node](../expressions-versus-data-nodes.md#ai-transform-node) generates transformation code from natural language prompts.
* Advanced transformation techniques: For sophisticated data manipulation, n8n supports:
   * **Ternary operators**: Conditional logic directly in expressions (`condition ? valueIfTrue : valueIfFalse`)
   * **Chained functions**: Combine multiple transformation functions
   * **Complex expressions**: Use JavaScript methods and operators within expression syntax
* Specialized transformation nodes for common structural transformations:
   * [Aggregate](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.aggregate): group separate items together
   * [Limit](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.limit): restrict the number of items
   * [Remove Duplicates](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.removeduplicates): eliminate identical items
   * [Sort](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.sort): order items or randomize
   * [Split Out](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.splitout): separate lists into individual items
   * [Summarize](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.summarize): aggregate data like Excel pivot tables

For a comparison of these approaches, see [Expressions versus data nodes](../expressions-versus-data-nodes.md).
