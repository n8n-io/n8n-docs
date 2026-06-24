---
title: Configure workflow timeout settings
description: Set execution timeouts to determine how long workflows can run.
contentType: howto
nodeTitle: Configure workflow timeouts
originalFilePath: hosting/configuration/configuration-examples/execution-timeout.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/configuration-examples/execution-timeout
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-workflow-timeouts
layout:
  description:
    visible: false
---

# Configure workflow timeout settings <a href="#configure-workflow-timeout-settings" id="configure-workflow-timeout-settings"></a>

A workflow times out and gets canceled after this time (in seconds). If the workflow runs in the main process, a soft timeout happens (takes effect after the current node finishes). If a workflow runs in its own process, n8n attempts a soft timeout first, then kills the process after waiting for a fifth of the given timeout duration.

`EXECUTIONS_TIMEOUT` default is `-1`. For example, if you want to set the timeout to one hour:

```bash
export EXECUTIONS_TIMEOUT=3600
```

You can also set maximum execution time (in seconds) for each workflow individually. For example, if you want to set maximum execution time to two hours:

```bash
export EXECUTIONS_TIMEOUT_MAX=7200
```
Refer to [Environment variables reference](../use-environment-variables/executions.md) for more information on these variables.
