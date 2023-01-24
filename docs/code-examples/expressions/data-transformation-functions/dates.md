---
title: Data transformation functions for dates
description: A reference document listing built-in convenience functions to support data transformation in expressions for dates.
---

# Dates

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_date %]]
[[ dataFunctions.dataFunctions("date", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
