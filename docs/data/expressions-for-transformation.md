---
contentType: explanation
---

# Expressions for data transformation

You can use expression transformation functions anywhere expressions are supported in n8n.

However, if your main goal is to transform data using expressions without performing any other operations, use the **Edit Fields (Set)** node. This node is designed specifically for data transformation, providing a clean interface to:

* Add new fields with expression-based values
* Modify existing field values using transformation functions
* Remove or rename fields

This keeps your workflow organized by separating data transformation from business logic, making it easier to understand and maintain.

**Best practice**: Instead of adding complex expressions to multiple parameters across different nodes, use Edit Fields to prepare your data first, then pass the transformed data to subsequent nodes.
