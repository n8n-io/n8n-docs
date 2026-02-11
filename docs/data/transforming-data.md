---
contentType: explanation
---

# Approaches for transforming data

Data transformation in n8n involves modifying, restructuring, or enriching data as it moves through your workflow. This includes changing data formats, filtering or aggregating values, adding computed fields, and converting data structures to work with different nodes.

n8n uses a predefined [data structure](/data/data-structure.md) that allows all nodes to process incoming data correctly. When your data doesn't match this structure, or when you need to modify it for your use case, you'll need to transform it.

n8n provides several approaches for data transformation:

* [Expressions](/data/expressions-basics.md) allow you to transform data directly in node parameters using n8n's expression syntax (`{{ }}`)
* The [Code node](/data/expressions.md#code-node) lets you write custom JavaScript or Python for complex transformations.
* The [AI Transform node](/data/expressions.md#ai-transform-node) generates transformation code from natural language prompts.
* Advanced transformation techniques: For sophisticated data manipulation, n8n supports:
   * **Ternary operators**: Conditional logic directly in expressions (`condition ? valueIfTrue : valueIfFalse`)
   * **Chained functions**: Combine multiple transformation functions
   * **Complex expressions**: Use JavaScript methods and operators within expression syntax
* Specialized transformation nodes for common structural transformations:
   * [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): group separate items together
   * [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.limit.md): restrict the number of items
   * [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): eliminate identical items
   * [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): order items or randomize
   * [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate lists into individual items
   * [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate data like Excel pivot tables

For a comparison of these approaches, see [Expressions versus data nodes](/data/expressions.md).