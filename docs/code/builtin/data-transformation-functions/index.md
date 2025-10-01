---
title: Data transformation functions
description: Introduction to data transformation functions for expressions.
contentType: overview
---

# Data transformation functions

Data transformation functions are helper functions to make data transformation easier in [expressions](/glossary.md#expression-n8n).

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
For a list of available functions, refer to the page for your data type:

* [Arrays](/code/builtin/data-transformation-functions/arrays.md)
* [Dates](/code/builtin/data-transformation-functions/dates.md)
* [Numbers](/code/builtin/data-transformation-functions/numbers.md)
* [Objects](/code/builtin/data-transformation-functions/objects.md)
* [Strings](/code/builtin/data-transformation-functions/strings.md)

## Usage

Data transformation functions are available in the expressions editor.

The syntax is:

```js
{{ dataItem.function() }}
```

For example, to check if a string is an email:

```js
{{ "example@example.com".isEmail() }}

// Returns true
```
