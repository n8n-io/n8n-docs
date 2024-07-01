---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Isolate n8n
description: Prevent your n8n instance from connecting with n8n's servers. 
contentType: howto
---

# Isolate n8n

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

Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment/) for more information on these variables.
