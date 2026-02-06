---
contentType: howto
---

# Expressions versus data nodes

n8n provides multiple ways to work with and transform data. Understanding when to use each approach helps you build efficient workflows.

| Approach	| Use when you need to... | Examples | Available on |
|---|---|---|---|
| Expressions | Set a single parameter value using existing data | Pull `{{$json.city}}`, format dates, simple math | Cloud and Self-hosted |
| Code node	| Write full JavaScript/Python for complex transformations | Restructure data, loop through items, use external libraries | Cloud and Self-hosted |
| AI Transform node | Generate transformation code from natural language	| `Group by user and sum totals`, `categorize by sentiment`	| Cloud only |
| Other data transformation nodes | Perform common operations with a visual interface | Aggregate items, split arrays, sort data, remove duplicates | Cloud and Self-hosted |

### Expressions

Expressions are small pieces of JavaScript-like code you put directly into node parameters using n8n's `{{ ... }}` syntax. They can dynamically set parameter values by using data from previous nodes, workflow metadata, or environment variables.

/// info | Use expressions when you can
Expressions have the advantage of providing an immediate preview of the computed values, so use expressions where you can.
///

**When to use expressions:**

* To pull a value from previous node data. For example, `{{$json.body.city}}`.
* To perform light transformations or calculations directly in a field.
* To avoid adding extra nodes and to keep logic close to the parameter that you are setting.

### Code node

The [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) is a dedicated node where you write JavaScript or Python that runs as a workflow step. It gives you access to incoming data from previous nodes, which you can manipulate by adding, removing, or updating items. You can create any custom function you need, and also use n8n's built‑in methods and variables through `$` syntax.

**When to use the Code node:**

* You need more complex logic or data transformation than an expression can enable, such as restructuring arrays and objects, aggregating or splitting items, and custom algorithms.
* You want to transform many items at once.
* You want to use promises, `console.log`, or in the case of self‑hosted setups, use external npm modules.

### AI Transform node

This node generates code snippets based on a short natural‑language prompt. It's context‑aware and understands your workflow's nodes and data types. The generated code is read‑only in the node; you can copy it into a Code node to edit.

**When to use the AI Transform node:**

* You know what transformation you want but don't want to hand‑write the code.
* You want AI to draft the transformation logic and then run it directly in the node, or copy into a Code node for further customization.

### Other data transformation nodes

n8n provides a collection of nodes to transform data:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.limit.md): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): organize lists in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate items together, in a manner similar to Excel pivot tables. 

**When to use data transformation nodes:**

* The operation you need matches a specific transformation node's purpose.
* You want a no-code solution with a guided UI.
* You prefer visual workflow building over writing expressions or code.

