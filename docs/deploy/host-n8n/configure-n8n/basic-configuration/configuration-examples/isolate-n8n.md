---
title: Isolate n8n
description: Prevent your n8n instance from connecting with n8n's servers.
contentType: howto
nodeTitle: Isolate n8n
originalFilePath: hosting/configuration/configuration-examples/isolation.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/isolation'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/isolate-n8n
layout:
  description:
    visible: false
---

# Isolate n8n <a href="#isolate-n8n" id="isolate-n8n"></a>

By default, a self-hosted n8n instance sends data to n8n's servers. It notifies users about available updates, workflow templates, and diagnostics. 

To prevent your n8n instance from connecting to n8n's servers, set these environment variables to false: 

```
N8N_DIAGNOSTICS_ENABLED=false
N8N_VERSION_NOTIFICATIONS_ENABLED=false
N8N_TEMPLATES_ENABLED=false
```

Unset n8n's diagnostics configuration:

```
EXTERNAL_FRONTEND_HOOKS_URLS=
N8N_DIAGNOSTICS_CONFIG_FRONTEND=
N8N_DIAGNOSTICS_CONFIG_BACKEND=
```

Refer to [Environment variables reference](../use-environment-variables/deployment.md) for more information on these variables.
