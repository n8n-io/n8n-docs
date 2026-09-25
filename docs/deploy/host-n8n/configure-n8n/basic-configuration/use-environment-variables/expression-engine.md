---
title: Expression engine environment variables
description: >-
  Choose the expression engines for the n8n backend and editor, and configure
  the sandbox pool for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Expression engine
originalFilePath: hosting/configuration/environment-variables/expression-engine.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/environment-variables/expression-engine
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/expression-engine
layout:
  description:
    visible: false
---

# Expression engine environment variables <a href="#expression-engine-environment-variables" id="expression-engine-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

[Expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes) are the JavaScript snippets n8n evaluates at runtime to set node parameters dynamically. The expression engine is the component that runs that evaluation. This page lists environment variables for configuring it.

{% hint style="warning" %}
**Avoid the `legacy` expression engine**

The `legacy` engine runs expressions without isolation, so it gives less protection against malicious expressions than the sandboxed engines. n8n plans to deprecate `legacy` in a future release. For the strongest security posture:

* Keep `N8N_EXPRESSION_ENGINE` set to `vm`, the backend default.
* Set `N8N_EXPRESSION_ENGINE_FRONTEND` to `quickjs`. The editor still uses `legacy` by default.
{% endhint %}

## Choose the expression engine

n8n evaluates expressions in two places, and each has its own engine setting:

* **Backend:** the n8n server evaluates expressions when a workflow runs. `N8N_EXPRESSION_ENGINE` selects this engine.
* **Editor:** your browser evaluates expressions while you build a workflow, for example to preview an expression's result. `N8N_EXPRESSION_ENGINE_FRONTEND` selects this engine.

The two settings are independent.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_EXPRESSION_ENGINE` | Enum string: `vm`, `quickjs`, `legacy` | `vm` | Which expression engine the backend uses. `vm` runs expressions in a sandboxed V8 isolate. `quickjs` runs them in a QuickJS sandbox compiled to WebAssembly. `legacy` runs them without isolation, and n8n plans to deprecate it. `vm` is the default from n8n 2.35.0. Earlier n8n versions default to `legacy`. |
| `N8N_EXPRESSION_ENGINE_FRONTEND` | Enum string: `legacy`, `quickjs` | `legacy` | Which expression engine the editor uses in the browser. `quickjs` runs expressions in a QuickJS sandbox compiled to WebAssembly, isolated from the rest of the page. `legacy` runs them without isolation. n8n strongly recommends `quickjs`. Available from n8n 2.41.0. |

## Configure the sandboxed backend engines

These variables configure the backend `vm` and `quickjs` engines. They have no effect when `N8N_EXPRESSION_ENGINE` is `legacy`, and they don't affect the editor's engine.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_EXPRESSION_ENGINE_POOL_SIZE` | Number | `1` | Number of sandboxes kept warm in the pool. |
| `N8N_EXPRESSION_ENGINE_MAX_CODE_CACHE_SIZE` | Number | `1024` | Maximum number of compiled expressions to cache. |
| `N8N_EXPRESSION_ENGINE_TIMEOUT` | Number | `5000` | Execution timeout in milliseconds for each expression evaluation. |
| `N8N_EXPRESSION_ENGINE_MEMORY_LIMIT` | Number | `128` | Memory limit in MiB for each sandbox. |
| `N8N_EXPRESSION_ENGINE_IDLE_TIMEOUT` | Number | - | If set, scales the pool to zero warm sandboxes after this many seconds with no activity. |

## Related resources

* [Environment variables](./)
