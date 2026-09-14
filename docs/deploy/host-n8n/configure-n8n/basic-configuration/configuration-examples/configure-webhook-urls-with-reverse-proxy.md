---
title: Configure webhook URLs with reverse proxy
description: Customize n8n webhook URLs for compatibility with reverse proxy setups.
contentType: howto
nodeTitle: Configure webhook URLs with reverse proxy
originalFilePath: hosting/configuration/configuration-examples/webhook-url.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy
layout:
  description:
    visible: false
---

# Configure n8n webhooks with reverse proxy <a href="#configure-n8n-webhooks-with-reverse-proxy" id="configure-n8n-webhooks-with-reverse-proxy"></a>

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443.

When running n8n behind a reverse proxy, it's important to do the following:

* set the webhook URL manually with the `N8N_WEBHOOK_URL` environment variable so that n8n can display it in the editor UI and register the correct webhook URLs with external services. (`N8N_WEBHOOK_URL` replaces `WEBHOOK_URL`, which is deprecated from n8n 2.35.0; n8n logs a deprecation warning if you still use `WEBHOOK_URL`.)
* Set the `N8N_PROXY_HOPS` environment variable to `1`.
* On the last proxy on the request path, set the following headers to pass on information about the initial request:
    * [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For)
    * [`X-Forwarded-Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Host)
    * [`X-Forwarded-Proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Proto)

```bash
export N8N_WEBHOOK_URL=https://n8n.example.com/
export N8N_PROXY_HOPS=1
```
Refer to [Environment variables reference](../use-environment-variables/endpoints.md) for more information on this variable.

If you also run n8n's [instance-level MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) behind the same reverse proxy, make sure it forwards the [MCP request headers](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server#mcp-request-headers) too.
