---
title: Disable the public REST API
description: "Disable the n8n public REST API to prevent others from using it."
contentType: howto
---

# Disable the public REST API

The [n8n public REST API](/api/index.md) allows you to programmatically perform many of the same tasks as you can in the n8n GUI.

If you don't plan on using this API, n8n recommends disabling it to improve the security of your n8n installation.

To disable the [public REST API](/api/index.md), set the `N8N_PUBLIC_API_DISABLED` environment variable to `true`, for example:

```bash
export N8N_PUBLIC_API_DISABLED=true
```

## Disable the API playground

To disable the [API playground](/api/using-api-playground.md), set the `N8N_PUBLIC_API_SWAGGERUI_DISABLED` environment variable to `true`, for example:

```bash
export N8N_PUBLIC_API_SWAGGERUI_DISABLED=true
```

## Related resources

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md) for more information on these environment variables.

Refer to [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.
