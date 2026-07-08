---
title: Disable the public REST API
description: Disable the n8n public REST API to prevent others from using it.
contentType: howto
nodeTitle: Disable the public API
originalFilePath: hosting/securing/disable-public-api.md
originalUrl: 'https://docs.n8n.io/hosting/securing/disable-public-api'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/disable-the-public-api
layout:
  description:
    visible: false
---

# Disable the public REST API <a href="#disable-the-public-rest-api" id="disable-the-public-rest-api"></a>

The [n8n public REST API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api) allows you to programmatically perform many of the same tasks as you can in the n8n GUI.

If you don't plan on using this API, n8n recommends disabling it to improve the security of your n8n installation.

To disable the [public REST API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api), set the `N8N_PUBLIC_API_DISABLED` environment variable to `true`, for example:

```bash
export N8N_PUBLIC_API_DISABLED=true
```

## Disable the API playground <a href="#disable-the-api-playground" id="disable-the-api-playground"></a>

To disable the [API playground](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/use-an-api-playground), set the `N8N_PUBLIC_API_SWAGGERUI_DISABLED` environment variable to `true`, for example:

```bash
export N8N_PUBLIC_API_SWAGGERUI_DISABLED=true
```

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md) for more information on these environment variables.

Refer to [Configuration](../basic-configuration.md) for more information on setting environment variables.
