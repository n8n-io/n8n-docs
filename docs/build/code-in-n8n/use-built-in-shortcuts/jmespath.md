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
**Python support**

You can use Python in the Code node. It isn't available in expressions.
{% endhint %}
{% tabs %}
{% tab title="JavaScript" %}
| Method | Description | Available in Code node? |
| ------ | ----------- | :-------------------------: |
| `$jmespath()` | Perform a search on a JSON object using JMESPath. | ✅ |
{% endtab %}

{% tab title="Python" %}
| Method | Description | 
| ------ | ----------- | 
| `_jmespath()` | Perform a search on a JSON object using JMESPath. | 
{% endtab %}
{% endtabs %}
