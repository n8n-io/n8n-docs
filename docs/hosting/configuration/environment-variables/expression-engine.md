---
title: Expression engine environment variables
description: Configure the expression evaluation engine and its V8 isolate pool for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Expression engine environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

[Expressions](/data/expressions.md) are the JavaScript snippets n8n evaluates at runtime to set node parameters dynamically. The expression engine is the component that runs that evaluation. This page lists environment variables for configuring it.

/// info | Experimental
The `vm` engine is experimental. n8n runs the `legacy` engine by default. The variables below other than `N8N_EXPRESSION_ENGINE` only take effect when you set `N8N_EXPRESSION_ENGINE` to `vm`.
///

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_EXPRESSION_ENGINE` | Enum string: `legacy`, `vm` | `legacy` | Which expression engine to use. `legacy` runs expressions without isolation. `vm` runs them in a sandboxed V8 isolate. `vm` is experimental; `legacy` remains the default. |
| `N8N_EXPRESSION_ENGINE_POOL_SIZE` | Number | `1` | Number of V8 isolates kept warm in the pool. |
| `N8N_EXPRESSION_ENGINE_MAX_CODE_CACHE_SIZE` | Number | `1024` | Maximum number of compiled expressions to cache. |
| `N8N_EXPRESSION_ENGINE_TIMEOUT` | Number | `5000` | Execution timeout in milliseconds for each expression evaluation. |
| `N8N_EXPRESSION_ENGINE_MEMORY_LIMIT` | Number | `128` | Memory limit in MiB for each V8 isolate. |
| `N8N_EXPRESSION_ENGINE_IDLE_TIMEOUT` | Number | - | If set, scales the isolate pool to zero warm isolates after this many seconds with no activity. |
