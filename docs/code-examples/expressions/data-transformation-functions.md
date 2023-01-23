---
title: Data transformation functions
description: A reference document listing built-in convenience functions to support data transformation in expressions.
---

# Data transformation functions

## Arrays

## Dates

## Numbers

## Objects

## Strings

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_string %]]
[[ dataFunctions.dataFunctions(func.funcName, func.returns, func.description, func.args ) ]]
[[% endfor %]]







