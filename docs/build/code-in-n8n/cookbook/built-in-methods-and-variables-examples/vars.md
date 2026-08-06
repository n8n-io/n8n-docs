---
description: Access your environment's custom variables.
contentType: reference
nodeTitle: vars
originalFilePath: code/cookbook/builtin/vars.md
originalUrl: 'https://docs.n8n.io/code/cookbook/builtin/vars'
url: >-
  https://docs.n8n.io/build/code-in-n8n/cookbook/built-in-methods-and-variables-examples/vars
layout:
  description:
    visible: false
---

# `vars` <a href="#vars" id="vars"></a>

{% hint style="info" %}
**Feature availability**

* Available on Self-hosted Enterprise and Pro and Enterprise Cloud plans.
* You need access to the n8n instance owner account to create variables.
{% endhint %}

`vars` contains all [Variables](../../define-custom-variables.md) for the active environment. It's read-only: you can access variables using `vars`, but must set them using the UI.

{% tabs %}
{% tab title="JavaScript" %}
```js
// Access a variable
$vars.<variable-name>
```
{% endtab %}

{% tab title="Python" %}
```python
# Access a variable
_vars.<variable-name>
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**`vars` and `env`**

`vars` gives access to user-created variables. It's part of the [Environments](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments) feature. `env` gives access to the [configuration environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables) for your n8n instance.
{% endhint %}
