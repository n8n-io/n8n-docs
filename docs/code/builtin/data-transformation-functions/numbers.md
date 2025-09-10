---
title: Data transformation functions for numbers
description: A reference document listing built-in convenience functions to support data transformation in expressions for numbers.
contentType: reference
---

# Numbers

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for numbers.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_number %]]
[[ dataFunctions.dataFunctions("number", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
