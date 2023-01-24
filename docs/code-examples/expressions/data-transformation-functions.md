---
title: Data transformation functions
description: A reference document listing built-in convenience functions to support data transformation in expressions.
---

# Data transformation functions

[[% import "_macros/data-functions.html" as dataFunctions %]]

## Arrays

## Dates

[[% for func in df_date %]]
[[ dataFunctions.dataFunctions(func.funcName, func.returns, func.description, func.args ) ]]
[[% endfor %]]

## Numbers

[[% for func in df_number %]]
[[ dataFunctions.dataFunctions(func.funcName, func.returns, func.description, func.args ) ]]
[[% endfor %]]

## Objects

[[% for func in df_object %]]
[[ dataFunctions.dataFunctions(func.funcName, func.returns, func.description, func.args ) ]]
[[% endfor %]]

## Strings

[[% for func in df_string %]]
[[ dataFunctions.dataFunctions(func.funcName, func.returns, func.description, func.args ) ]]
[[% endfor %]]







