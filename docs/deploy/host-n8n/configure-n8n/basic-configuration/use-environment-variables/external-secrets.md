---
title: External secrets environment variables
description: >-
  Configure the update interval and the connect and refresh timeouts for
  external secrets in a self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: External secrets
originalFilePath: hosting/configuration/environment-variables/external-secrets.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/environment-variables/external-secrets
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/external-secrets
layout:
  description:
    visible: false
---

# External secrets environment variables <a href="#external-secrets-environment-variables" id="external-secrets-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

You can use an external secrets store to manage credentials for n8n. Refer to [External secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | `300` (5 minutes) | How often (in seconds) to check for secret updates. |
| `N8N_EXTERNAL_SECRETS_CONNECT_TIMEOUT` | Number | `20` | How long (in seconds) to wait for a secrets provider to connect. When the time is up, n8n marks the provider as errored, continues startup, and retries the connection in the background. |
| `N8N_EXTERNAL_SECRETS_REFRESH_TIMEOUT` | Number | `20` | How long (in seconds) to wait for a secrets provider to fetch its secrets. When the time is up, n8n stops waiting but the fetch continues and fills the cache when it finishes. Raise this value for stores with many secrets. |
