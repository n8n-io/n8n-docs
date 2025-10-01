---
title: Data transformation functions for strings
description: A reference document listing built-in convenience functions to support data transformation in expressions for strings.
contentType: reference
---

# Strings

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for strings.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_string %]]
[[ dataFunctions.dataFunctions("string", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
