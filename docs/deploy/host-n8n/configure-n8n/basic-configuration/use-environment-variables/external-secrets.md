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
| `N8N_EXTERNAL_SECRETS_CONNECT_TIMEOUT` | Number | `20` | Maximum time (in seconds) n8n waits for a secrets vault to connect. If the vault doesn't answer in time, n8n marks it as errored, retries the connection in the background with increasing delays, and startup continues without its secrets. Available from n8n 2.41.0. |
| `N8N_EXTERNAL_SECRETS_REFRESH_TIMEOUT` | Number | `20` | Maximum time (in seconds) n8n waits for a secrets vault to deliver its secrets, at startup and on each update interval. If the fetch takes longer, n8n stops waiting and the fetch keeps running in the background. When it completes successfully, n8n stores the secrets. At startup, workflows that use secrets from that vault fail until the first fetch completes. On an update interval, the previously fetched secrets stay available. Increase this value for vaults with many secrets. For HashiCorp Vault and Infisical, n8n also cancels each single HTTP request after the larger of the two timeouts. Available from n8n 2.41.0. |
