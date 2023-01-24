---
title: Data transformation functions for arrays
description: A reference document listing built-in convenience functions to support data transformation in expressions for arrays.
---

# Arrays

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_array %]]
[[ dataFunctions.dataFunctions("array", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
