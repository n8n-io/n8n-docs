---
title: Webflow credentials
description: Documentation for Webflow credentials. Use these credentials to authenticate Webflow in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Webflow credentials

You can use these credentials to authenticate the following nodes:

- [Webflow](/integrations/builtin/app-nodes/n8n-nodes-base.webflow.md)
- [Webflow Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger.md)

## Prerequisites

- Create a [Webflow](https://webflow.com/) account.
- [Create a site](https://developers.webflow.com/data/reference/structure-1#sites): Required for API access token authentication only.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Webflow's API documentation](https://developers.webflow.com/data/reference/rest-introduction) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- A Site **Access Token**: Access tokens are site-specific. Go to your site's **Site Settings > Apps & integrations > API access** and select **Generate API token**. Refer to [Get a Site Token](https://developers.webflow.com/data/v1.0.0/docs/get-a-site-token) for more information.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, [register an application](https://developers.webflow.com/data/docs/register-an-app) in your workspace.

Use these settings for your application:

- Copy the **OAuth callback URL** from n8n and add it as a **Redirect URI** in your application.
- Once you've created your application, copy the **Client ID** and **Client Secret** and enter them in your n8n credential.
- If you are using the Webflow Data API V1 (deprecated), enable the **Legacy** toggle. Otherwise, leave this inactive.

Refer to [OAuth](https://developers.webflow.com/data/reference/oauth-app) for more information on Webflow's OAuth web flow.
