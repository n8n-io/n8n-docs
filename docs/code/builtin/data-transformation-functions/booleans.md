---
title: Data transformation functions for booleans
description: A reference document listing built-in convenience functions to support data transformation in expressions for booleans.
contentType: reference
---

# Booleans

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for arrays.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_boolean %]]
[[ dataFunctions.dataFunctions("boolean", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
