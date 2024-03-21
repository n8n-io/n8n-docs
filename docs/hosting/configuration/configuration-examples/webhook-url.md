---
title: Webhook URL
description: Overwrite user-folder containing user-specific data. 
contentType: howto
---

# Webhook URL

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but is exposed to the web using the reverse proxy on port 443. In that case, it's important to set the webhook URL manually so that n8n can display it in the Editor UI and register the correct webhook URLs with external services.

```bash
export WEBHOOK_URL=https://n8n.example.com/
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/) for more information on each variable.