---
title: Source control environment variables
description: Environment variable to set the default SSH key type for source control setup.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Source control
originalFilePath: hosting/configuration/environment-variables/source-control.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/source-control'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/source-control
layout:
  description:
    visible: false
---

# Source control environment variables <a href="#source-control-environment-variables" id="source-control-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

n8n uses Git-based source control to support environments. Refer to [Source control and environments](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/set-up-source-control) for more information on how to link a Git repository to an n8n instance and configure your source control.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE` | String | `ed25519` | Set to `rsa` to make RSA the default SSH key type for [Source control setup](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/set-up-source-control). |
