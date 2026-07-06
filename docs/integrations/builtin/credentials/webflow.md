---
title: Webflow credentials
description: >-
  Documentation for Webflow credentials. Use these credentials to authenticate
  Webflow in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Webflow credentials
originalFilePath: integrations/builtin/credentials/webflow.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/webflow'
url: 'https://docs.n8n.io/integrations/builtin/credentials/webflow'
layout:
  description:
    visible: false
---

# Webflow credentials <a href="#webflow-credentials" id="webflow-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Webflow](../app-nodes/n8n-nodes-base.webflow.md)
- [Webflow Trigger](../trigger-nodes/n8n-nodes-base.webflowtrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Webflow](https://webflow.com/) account.
- [Create a site](https://developers.webflow.com/data/reference/structure-1#sites): Required for API access token authentication only.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Webflow's API documentation](https://developers.webflow.com/data/reference/rest-introduction) for more information about the service.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need:

- A Site **Access Token**: Access tokens are site-specific. Go to your site's **Site Settings > Apps & integrations > API access** and select **Generate API token**. Refer to [Get a Site Token](https://developers.webflow.com/data/v1.0.0/docs/get-a-site-token) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you need to configure OAuth2 from scratch, [register an application](https://developers.webflow.com/data/docs/register-an-app) in your workspace.

Use these settings for your application:

- Copy the **OAuth callback URL** from n8n and add it as a **Redirect URI** in your application.
- Once you've created your application, copy the **Client ID** and **Client Secret** and enter them in your n8n credential.
- If you are using the Webflow Data API V1 (deprecated), enable the **Legacy** toggle. Otherwise, leave this inactive.

Refer to [OAuth](https://developers.webflow.com/data/reference/oauth-app) for more information on Webflow's OAuth web flow.
