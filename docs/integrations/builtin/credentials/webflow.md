---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Webflow credentials
description: Documentation for Webflow credentials. Use these credentials to authenticate Webflow in n8n, a workflow automation platform.
contentType: integration
---

# Webflow credentials

You can use these credentials to authenticate the following nodes:

- [Webflow](/integrations/builtin/app-nodes/n8n-nodes-base.webflow/)
- [Webflow Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger/)

## Prerequisites

- Create a [Webflow](https://webflow.com/){:target=_blank .external-link} account.
- [Create a site](https://developers.webflow.com/data/v1.0.0/docs/access-token#1-create-a-new-site){:target=_blank .external-link}: Required for API access token authentication only.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Webflow's API documentation](https://developers.webflow.com/data/reference/rest-introduction){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- A Site **Access Token**: Access tokens are site-specific. Go to your site's **Project Settings > Integrations > API Access** and select **Generate API token**. Refer to [Generate an API token](https://developers.webflow.com/data/v1.0.0/docs/access-token#2-generate-an-api-token){:target=_blank .external-link} for more information.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, [register an application](https://developers.webflow.com/data/v1.0.0/docs/oauth#app-registration){:target=_blank .external-link} in your workspace.

Use these settings for your application:

- Copy the **OAuth callback URL** from n8n and add it as a **Redirect URI** in your application.
- Once you've created your application, copy the **Client ID** and **Client Secret** and enter them in your n8n credential.

Refer to [OAuth 2.0](https://developers.webflow.com/data/v1.0.0/docs/oauth){:target=_blank .external-link}  for more information on Webflow's OAuth web flow.

