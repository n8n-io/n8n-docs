---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure webhook URLs with reverse proxy
description: Customize n8n webhook URLs for compatibility with reverse proxy setups.
contentType: howto
---

# Configure n8n webhooks with reverse proxy

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443. In that case, it's important to set the webhook URL manually so that n8n can display it in the Editor UI and register the correct webhook URLs with external services.

```bash
export WEBHOOK_URL=https://n8n.example.com/
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/endpoints/) for more information on this variable.
