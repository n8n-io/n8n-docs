---
title: Enable modules in Code node
description: Allow the use of both built-in and external modules within the Code node.
contentType: howto
---

# Enable modules in Code node

For security reasons, the Code node restricts importing modules. It's possible to lift that restriction for built-in and external modules by setting the following environment variables:

- `NODE_FUNCTION_ALLOW_BUILTIN`: For built-in modules
- `NODE_FUNCTION_ALLOW_EXTERNAL`: For external modules sourced from n8n/node_modules directory. External module support is disabled when an environment variable isn't set.

```bash
# Allows usage of all builtin modules
export NODE_FUNCTION_ALLOW_BUILTIN=*

# Allows usage of only crypto
export NODE_FUNCTION_ALLOW_BUILTIN=crypto

# Allows usage of only crypto and fs
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,fs

# Allow usage of external npm modules.
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```
/// note | If using Task Runners
If n8n instance is setup with [Task Runners](/hosting/configuration/task-runners.md), add the environment variables to the Task Runners instead to the main n8n node.
///

Refer to [Environment variables reference](/hosting/configuration/environment-variables/nodes.md) for more information on these variables.
