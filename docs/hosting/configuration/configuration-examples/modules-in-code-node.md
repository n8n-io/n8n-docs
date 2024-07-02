---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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
Refer to [Environment variables reference](/hosting/configuration/environment-variables/nodes/) for more information on these variables.
