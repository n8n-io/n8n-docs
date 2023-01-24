---
title: Data transformation functions
description: Introduction to data transformation functions for expressions.
---

# Data transformation functions

Data transformation functions are helper functions to make data transformation easier in expressions.

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
