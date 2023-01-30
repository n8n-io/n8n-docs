---
title: Data transformation functions
description: Introduction to data transformation functions for expressions.
---

# Data transformation functions

Data transformation functions are helper functions to make data transformation easier in expressions.

!!! note "JavaScript in expressions"
		You can use any JavaScript in expressions. Refer to [Expressions](/code-examples/expressions/) for more information.

For a list of available functions, refer to the page for your data type:

* [Arrays](/code-examples/expressions/data-transformation-functions/arrays/)
* [Dates](/code-examples/expressions/data-transformation-functions/dates/)
* [Numbers](/code-examples/expressions/data-transformation-functions/numbers/)
* [Objects](/code-examples/expressions/data-transformation-functions/objects/)
* [Strings](/code-examples/expressions/data-transformation-functions/strings/)

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
