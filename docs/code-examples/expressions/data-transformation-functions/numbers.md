---
title: Data transformation functions for numbers
description: A reference document listing built-in convenience functions to support data transformation in expressions for numbers.
---

# Numbers

A reference document listing built-in convenience functions to support data transformation in expressions for numbers.

You can use any JavaScript in expressions. Refer to [Expressions](/code-examples/expressions/) for more information.

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_number %]]
[[ dataFunctions.dataFunctions("number", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
