---
title: Data transformation functions
description: Introduction to data transformation functions for expressions.
contentType: overview
---

# Data transformation functions

Data transformation functions are helper functions to make data transformation easier in expressions.

!!! note "JavaScript in expressions"
	You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions/) for more information.

For a list of available functions, refer to the page for your data type:

* [Arrays](/code/builtin/data-transformation-functions/arrays/)
* [Dates](/code/builtin/data-transformation-functions/dates/)
* [Numbers](/code/builtin/data-transformation-functions/numbers/)
* [Objects](/code/builtin/data-transformation-functions/objects/)
* [Strings](/code/builtin/data-transformation-functions/strings/)

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
