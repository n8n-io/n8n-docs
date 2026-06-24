---
title: Credentials environment variables
description: >-
  Manage default credentials and override them through environment variables
  your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Credentials
originalFilePath: hosting/configuration/environment-variables/credentials.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/credentials'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/credentials
layout:
  description:
    visible: false
---

# Credentials environment variables <a href="#credentials-environment-variables" id="credentials-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

Enable credential overwrites using the following environment variables. Refer to [Credential overwrites](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/credential-overwrites) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `CREDENTIALS_OVERWRITE_DATA`<br>/`_FILE` | * | - | Overwrites for credentials. |
| `CREDENTIALS_OVERWRITE_ENDPOINT` | String | - | The API endpoint to fetch credentials. |
| `CREDENTIALS_OVERWRITE_PERSISTENCE` | Boolean | `false` | Enable database persistence for credential overwrites. Required for multi-instance or queue mode to propagate overwrites to workers through a publish/subscribe approach. |
| `CREDENTIALS_DEFAULT_NAME` | String | `My credentials` | The default name for credentials. |
