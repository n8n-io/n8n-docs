---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure workflow timeout settings
description: Set execution timeouts to determine how long workflows can run.  
contentType: howto
---

# Configure workflow timeout settings

A workflow times out and gets canceled after this time (in seconds). If the workflow runs in the main process, a soft timeout happens (takes effect after the current node finishes). If a workflow runs in its own process, n8n attempts a soft timeout first, then kills the process after waiting for a fifth of the given timeout duration.

`EXECUTIONS_TIMEOUT` default is `-1`. For example, if you want to set the timeout to one hour:

```bash
export EXECUTIONS_TIMEOUT=3600
```

You can also set maximum execution time (in seconds) for each workflow individually. For example, if you want to set maximum execution time to two hours:

```bash
export EXECUTIONS_TIMEOUT_MAX=7200
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/executions/) for more information on these variables.
