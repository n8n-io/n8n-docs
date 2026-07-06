---
title: Enable modules in Code node
description: Allow the use of both built-in and external modules within the Code node.
contentType: howto
nodeTitle: Enable modules in Code node
originalFilePath: hosting/configuration/configuration-examples/modules-in-code-node.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/configuration-examples/modules-in-code-node
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-modules-in-code-node
layout:
  description:
    visible: false
---

# Enable modules in Code node <a href="#enable-modules-in-code-node" id="enable-modules-in-code-node"></a>

For security reasons, the Code node restricts importing modules. It's possible to lift that restriction for built-in and external modules by setting the following environment variables:

- `NODE_FUNCTION_ALLOW_BUILTIN`: For built-in modules
- `NODE_FUNCTION_ALLOW_EXTERNAL`: For external modules sourced from n8n/node_modules directory. External module support is disabled when an environment variable isn't set.

```bash
# Allows usage of all builtin modules <a href="#allows-usage-of-all-builtin-modules" id="allows-usage-of-all-builtin-modules"></a>
export NODE_FUNCTION_ALLOW_BUILTIN=*

# Allows usage of only crypto <a href="#allows-usage-of-only-crypto" id="allows-usage-of-only-crypto"></a>
export NODE_FUNCTION_ALLOW_BUILTIN=crypto

# Allows usage of only crypto and fs <a href="#allows-usage-of-only-crypto-and-fs" id="allows-usage-of-only-crypto-and-fs"></a>
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,fs

# Allow usage of external npm modules. <a href="#allow-usage-of-external-npm-modules" id="allow-usage-of-external-npm-modules"></a>
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```
{% hint style="info" %}
**If using Task Runners**

If n8n instance is setup with [Task Runners](../../set-up-task-runners.md), add the environment variables to the Task Runners instead to the main n8n node.
{% endhint %}

Refer to [Environment variables reference](../use-environment-variables/nodes.md) for more information on these variables.
