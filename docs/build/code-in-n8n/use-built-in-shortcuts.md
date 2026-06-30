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

{% hint style="info" %}
**Availability in the expressions editor and the Code node**

Some methods and variables aren't available in the Code node. These aren't in the documentation.

All data transformation functions are only available in the expressions editor.
{% endhint %}


The [Cookbook](README.md) contains examples for some common tasks, including some [Code node only](cookbook/code-node/README.md) functions.

[^1]: In n8n, expressions allow you to populate node parameters dynamically by executing JavaScript code. Instead of providing a static value, you can use the n8n expression syntax to define the value using data from previous nodes, other workflows, or your n8n environment.
