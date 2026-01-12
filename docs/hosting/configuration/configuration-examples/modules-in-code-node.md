---
title: Enable modules in Code node
description: Allow the use of both built-in and external modules within the Code node.
contentType: howto
---

# Enable modules in Code node

For security reasons, the Code node restricts importing modules. It's possible to lift that restriction for built-in and external modules by setting the following environment variables:

- `NODE_FUNCTION_ALLOW_BUILTIN`: For built-in modules
- `NODE_FUNCTION_ALLOW_EXTERNAL`: For external modules sourced from n8n/node_modules directory. External module support is disabled when an environment variable isn't set.

/// warning | Some built-in modules are blocked by sandboxing
n8n's Code node uses vm2 for sandboxing to prevent access to unsafe operations. The following built-in modules **cannot** be enabled, even with environment variables:

- `fs`: File system operations
- `child_process`: Process execution
- `net`: Network operations

For these operations, use dedicated nodes instead:
- **File operations**: Use [Read/Write Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/) nodes
- **Command execution**: Use the [Execute Command](/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/) node
- **Network requests**: Use the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node

///

## Enable built-in modules

Safe built-in modules like `crypto`, `util`, `path`, and others can be enabled using the `NODE_FUNCTION_ALLOW_BUILTIN` environment variable:

```bash
# Allows usage of all builtin modules
export NODE_FUNCTION_ALLOW_BUILTIN=*

# Allows usage of only crypto
export NODE_FUNCTION_ALLOW_BUILTIN=crypto

# Allows usage of only crypto and path
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,path
```

## Enable external modules

External npm modules installed in n8n's node_modules directory can be enabled:

```bash
# Allow usage of external npm modules.
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```

## Docker example

When running n8n in Docker, pass the environment variables using the `-e` flag:

```bash
docker run -it --rm --name n8n -p 5678:5678 \
  -e "NODE_FUNCTION_ALLOW_BUILTIN=crypto,path,url" \
  -e "NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash" \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

Or use a docker-compose.yml file:

```yaml
version: '3.8'
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - NODE_FUNCTION_ALLOW_BUILTIN=crypto,path,url
      - NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
    volumes:
      - ~/.n8n:/home/node/.n8n
```

/// note | If using Task Runners
If n8n instance is setup with [Task Runners](/hosting/configuration/task-runners.md), add the environment variables to the Task Runners instead to the main n8n node.
///

Refer to [Environment variables reference](/hosting/configuration/environment-variables/nodes.md) for more information on these variables.
