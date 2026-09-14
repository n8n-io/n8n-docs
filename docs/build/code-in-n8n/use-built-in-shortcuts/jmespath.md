---
description: A method for working with the JMESPath library in n8n.
contentType: reference
hide:
  - toc
nodeTitle: JMESPath
originalFilePath: code/builtin/jmespath.md
originalUrl: 'https://docs.n8n.io/code/builtin/jmespath'
url: 'https://docs.n8n.io/build/code-in-n8n/use-built-in-shortcuts/jmespath'
layout:
  description:
    visible: false
---

# JMESPath method <a href="#jmespath-method" id="jmespath-method"></a>

This is an n8n-provided method for working with the [JMESPath](../../work-with-data/handle-special-data-types/query-json-data.md) library.

{% hint style="info" %}
**JavaScript only**

The Python Code node doesn't provide this method. To query JSON in Python, use standard Python instead. Refer to [Query JSON with JMESPath](../../work-with-data/handle-special-data-types/query-json-data.md) for a Python version of each example.
{% endhint %}

| Method | Description | Available in Code node? |
| ------ | ----------- | :-------------------------: |
| `$jmespath()` | Perform a search on a JSON object using JMESPath. | ✅ |
