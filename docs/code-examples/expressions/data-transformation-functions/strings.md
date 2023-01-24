---
title: Data transformation functions for strings
description: A reference document listing built-in convenience functions to support data transformation in expressions for strings.
---

# Strings

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_string %]]
[[ dataFunctions.dataFunctions("string", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
