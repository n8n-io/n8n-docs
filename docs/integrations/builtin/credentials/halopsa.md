---
title: HaloPSA credentials
description: >-
  Documentation for HaloPSA credentials. Use these credentials to authenticate
  HaloPSA in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: HaloPSA credentials
originalFilePath: integrations/builtin/credentials/halopsa.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/halopsa'
url: 'https://docs.n8n.io/integrations/builtin/credentials/halopsa'
layout:
  description:
    visible: false
---

# HaloPSA credentials <a href="#halopsa-credentials" id="halopsa-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [HaloPSA](../app-nodes/n8n-nodes-base.halopsa.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [HaloPSA](https://halopsa.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [HaloPSA's API documentation](https://usehalo.com/halopsa/guides/1823/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- To select your **Hosting Type**:
    - **On Premise Solution**: Choose this option if you're hosting the Halo application on your own server
    - **Hosted Solution Of Halo**: Choose this option if your application is hosted by Halo. If this option is selected, you'll need to provide your **Tenant**.
- The **HaloPSA Authorisation Server URL**: Your Authorisation Server URL is displayed within HaloPSA in **Configuration > Integrations > Halo API** in [API Details](https://halopsa.com/guides/article/?kbid=1737).
- The **Resource Server** URL: Your Resource Server is displayed within HaloPSA in **Configuration > Integrations > Halo API** in [API Details](https://halopsa.com/guides/article/?kbid=1737).
- A **Client ID**: Obtained by registering the application in the Halo API settings. Refer to [HaloPSA's Authorisation documentation](https://usehalo.com/halopsa/guides/1823/) for detailed instructions. n8n recommends using these settings:
    - Choose `Client Credentials` as your **Authentication Method**.
    - Use the `all` permission.
- A **Client Secret**: Obtained by registering the application in the Halo API settings.
- Your **Tenant** name: If **Hosted Solution of Halo** is selected as the **Hosting Type**, you must provide your tenant name. Your tenant name is displayed within HaloPSA in **Configuration > Integrations > Halo API** in [API Details](https://halopsa.com/guides/article/?kbid=1737).

HaloPSA uses both the application permissions and the agent's permissions to determine API access.
