---
title: Data transformation functions
description: A reference document listing built-in convenience functions to support data transformation in expressions.
---

# Data transformation functions

[[% import "_macros/data-functions.html" as dataFunctions %]]

## Arrays

[[% for func in df_array %]]
[[ dataFunctions.dataFunctions("array", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]

## Dates

[[% for func in df_date %]]
[[ dataFunctions.dataFunctions("date", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]

## Numbers

[[% for func in df_number %]]
[[ dataFunctions.dataFunctions("number", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]

## Objects

[[% for func in df_object %]]
[[ dataFunctions.dataFunctions("object", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]

## Strings

[[% for func in df_string %]]
[[ dataFunctions.dataFunctions("string", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]







