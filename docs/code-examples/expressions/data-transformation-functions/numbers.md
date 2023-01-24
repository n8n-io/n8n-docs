---
title: Data transformation functions for numbers
description: A reference document listing built-in convenience functions to support data transformation in expressions for numbers.
---

# Numbers

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_number %]]
[[ dataFunctions.dataFunctions("number", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
