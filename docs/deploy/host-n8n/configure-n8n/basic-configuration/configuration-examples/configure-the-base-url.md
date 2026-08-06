---
title: Configure the Base URL for n8n's front end access
description: >-
  Configure the Base URL environment variable to define the front end's access
  path to the back end's REST API for n8n.
contentType: howto
nodeTitle: Configure the Base URL
originalFilePath: hosting/configuration/configuration-examples/base-url.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/base-url'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-the-base-url
layout:
  description:
    visible: false
---

# Configure the Base URL for n8n's front end access <a href="#configure-the-base-url-for-n8ns-front-end-access" id="configure-the-base-url-for-n8ns-front-end-access"></a>

{% hint style="warning" %}
**Requires manual UI build**

This use case involves configuring the `VUE_APP_URL_BASE_API` environmental variable which requires a manual build of the `n8n-editor-ui` package. You can't use it with the default n8n Docker image where the default setting for this variable is `/`, meaning that it uses the root-domain.
{% endhint %}

You can configure the Base URL that the front end uses to connect to the back end's REST API. This is relevant when you want to host n8n's front end and back end separately. 

```bash
export VUE_APP_URL_BASE_API=https://n8n.example.com/
```
Refer to [Environment variables reference](../use-environment-variables/deployment.md) for more information on this variable.
