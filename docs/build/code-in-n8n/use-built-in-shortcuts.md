---
description: n8n's built-in custom methods and variables.
contentType: overview
nodeTitle: Use built-in shortcuts
originalFilePath: code/builtin/overview.md
originalUrl: 'https://docs.n8n.io/code/builtin/overview'
url: 'https://docs.n8n.io/build/code-in-n8n/use-built-in-shortcuts'
layout:
  description:
    visible: false
---

# Built-in methods and variables <a href="#built-in-methods-and-variables" id="built-in-methods-and-variables"></a>

n8n provides built-in methods and variables for working with data and accessing n8n data. This section provides a reference of available methods and variables for use in expressions[^1], with a short description. 

{% hint style="warning" %}
**Availability in the expressions editor and the Code node**

Not every method and variable in this reference works in the [Code node](code-node.md). The Code node runs plain JavaScript against native Luxon, not n8n's expression engine, so any entry marked **Source: Custom n8n functionality** on a reference page (for example, [`DateTime.format()`](/build/work-with-data/transform-data/expression-reference/datetime.md#datetimeformat)) is an n8n-only extension that may not exist, or may behave differently, in the Code node.

If code in the Code node throws `... is not a function`, or silently produces the wrong result:

* Check whether the method's reference entry is tagged **Custom n8n functionality**.
* Look for a native Luxon or JavaScript equivalent. For example, use [`toFormat()`](https://moment.github.io/luxon/api-docs/index.html#datetimetoformat) instead of the n8n-only `DateTime.format()`.
* Watch for methods that exist in both places but with different signatures, such as `DateTime.plus()`/`minus()`: n8n's expression version accepts `(amount, unit)`, while native Luxon's version only accepts a single Duration-like object (`{ days: 7 }`). Using the expression-style signature in the Code node won't error, but won't produce the expected result either.

All data transformation functions (the top-level helper functions listed in this section, such as `$if()` or `$jmespath()`) are only available in the expressions editor, not the Code node.
{% endhint %}

The [Cookbook](README.md) contains examples for some common tasks, including some [Code node only](cookbook/code-node/README.md) functions.

[^1]: In n8n, expressions allow you to populate node parameters dynamically by executing JavaScript code. Instead of providing a static value, you can use the n8n expression syntax to define the value using data from previous nodes, other workflows, or your n8n environment.