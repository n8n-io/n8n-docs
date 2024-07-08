---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for booleans
description: A reference document listing built-in convenience functions to support data transformation in expressions for booleans.
contentType: reference
---

# Booleans

A reference document listing built-in convenience functions to support data transformation in expressions for arrays.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions/) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_boolean %]]
[[ dataFunctions.dataFunctions("boolean", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
