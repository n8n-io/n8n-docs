---
contentType: explanation
---

# Choose your approach

## Expressions

Expressions are small pieces of JavaScript-like code you put directly into node parameters. Expressions can dynamically set parameter values by using data from previous nodes, workflow metadata, or environment variables.

Use n8n’s expression syntax `{{ ... }}` with built‑in methods and variables and data transformation functions.

/// info | Use expressions when you can
Expressions have the advantage of providing an immediate preview of the computed values, so use expressions where you can.
///

### When to use

* To pull a value from previous node data. For example, `{{$json.body.city}}`.
* To perform light transformations or calculations directly in a field.
* To avoid adding extra nodes and to keep logic close to the parameter that you are setting.

## Code node

Code node is a dedicated node where you write JavaScript or Python that runs as a workflow step. This node gives you access to n8n’s built‑in methods and variables, through `$` syntax.

### When to use

* You need more complex logic or data transformation than an expression can enable, such as restructuring arrays and objects, aggregating or splitting items, and custom algorithms.
* You want to transform many items at once.
* You want to use promises, `console.log`, or in the case of self‑hosted setups, use external npm modules.

## AI Transform node

This node generates code snippets based on a short natural‑language prompt. It’s context‑aware and understands your workflow’s nodes and data types. The generated code is read‑only in the node; you can copy it into a Code node to edit.

### When to use

* You know what transformation you want but don’t want to hand‑write the code.
* You want AI to draft the transformation logic and then run it directly in the node, or copy into a Code node for further customization.

## How to choose between these approaches

| Approach	| Use when you need to... | Examples | Available on |
|---|---|---|---|
| Expressions | Set a single parameter value using existing data | Pull `{{$json.city}}`, format dates, simple math | Cloud and Self-hosted |
| Code node	| Write full JavaScript/Python for complex transformations | Restructure data, loop through items, use external libraries | Cloud and Self-hosted |
| AI Transform | Generate transformation code from natural language	| `Group by user and sum totals`, `categorize by sentiment`	| Cloud only |