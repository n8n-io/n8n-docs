---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HaloPSA credentials
description: Documentation for HaloPSA credentials. Use these credentials to authenticate HaloPSA in n8n, a workflow automation platform.
contentType: integration
---

# HaloPSA credentials

You can use these credentials to authenticate the following nodes:

- [HaloPSA](/integrations/builtin/app-nodes/n8n-nodes-base.halopsa/)

## Prerequisites

Create a [HaloPSA](https://halopsa.com/) account.

## Supported authentication methods

- API key

## Related resources

Refer to [HaloPSA's API documentation](https://halopsa.com/apidoc/info){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- To select your **Hosting Type**:
    - **On Premise Solution**: Choose this option if you're hosting the Halo application on your own server
    - **Hosted Solution Of Halo**: Choose this option if your application is hosted by Halo. If this option is selected, you'll need to provide your **Tenant**.
- The **HaloPSA Authorisation Server URL**: Your Authorisation Server URL is displayed within HaloPSA in **Configuration > Integrations > Halo API** in [API Details](https://halopsa.com/guides/article/?kbid=1737){:target=_blank .external-link}.
- The **Resource Server** URL: Your Resource Server is displayed within HaloPSA in **Configuration > Integrations > Halo API** in [API Details](https://halopsa.com/guides/article/?kbid=1737){:target=_blank .external-link}.
- A **Client ID**: Obtained by registering the application in the Halo API settings. Refer to [HaloPSA's Authorisation documentation](https://halopsa.com/apidoc/authorisation){:target=_blank .external-link} for detailed instructions. n8n recommends using these settings:
    - Choose `Client Credentials` as your **Authentication Method**.
    - Use the `all` permission.
- A **Client Secret**: Obtained by registering the application in the Halo API settings.
- Your **Tenant** name: If **Hosted Solution of Halo** is selected as the **Hosting Type**, you must provide your tenant name. Your tenant name is displayed within HaloPSA in **Configuration > Integrations > Halo API** in [API Details](https://halopsa.com/guides/article/?kbid=1737){:target=_blank .external-link}.

HaloPSA uses both the application permissions and the agent's permissions to determine API access.
