---
title: Data transformation functions for objects
description: A reference document listing built-in convenience functions to support data transformation in expressions for objects.
---

# Objects

[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_object %]]
[[ dataFunctions.dataFunctions("object", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]
