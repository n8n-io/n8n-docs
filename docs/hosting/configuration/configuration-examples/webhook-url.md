---
title: Configure webhook URLs with reverse proxy
description: Customize n8n webhook URLs for compatibility with reverse proxy setups.
contentType: howto
---

# Configure n8n webhooks with reverse proxy

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443.

When running n8n behind a reverse proxy, it's important to do the following:

* set the webhook URL manually with the `WEBHOOK_URL` environment variable so that n8n can  display it in the editor UI and register the correct webhook URLs with external services.
* Set the `N8N_PROXY_HOPS` environment variable to `1`.
* On the last proxy on the request path, set the following headers to pass on information about the initial request:
    * [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For)
    * [`X-Forwarded-Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Host)
    * [`X-Forwarded-Proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Proto)

```bash
export WEBHOOK_URL=https://n8n.example.com/
export N8N_PROXY_HOPS=1
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/endpoints.md) for more information on this variable.
