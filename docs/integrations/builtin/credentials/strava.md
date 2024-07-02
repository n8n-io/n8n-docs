---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Strava credentials
description: Documentation for Strava credentials. Use these credentials to authenticate Strava in n8n, a workflow automation platform.
contentType: integration
---

# Strava credentials

You can use these credentials to authenticate the following nodes:

- [Strava](/integrations/builtin/app-nodes/n8n-nodes-base.strava/)
- [Strava Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger/)

## Prerequisites

- Create a [Strava](https://strava.com){:target=_blank .external-link} account.
- Create a Strava application in [**Settings > API**](https://www.strava.com/settings/api){:target=_blank .external-link}. Refer to [Using OAuth2](#using-oauth2) for more information.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Strava's API documentation](https://developers.strava.com/docs/reference/){:target=_blank .external-link} for more information about the service.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you [create a Strava app](https://developers.strava.com/docs/getting-started/#account){:target=_blank .external-link}.
- A **Client Secret**: Generated when you [create a Strava app](https://developers.strava.com/docs/getting-started/#account){:target=_blank .external-link}.

Use these settings for your Strava app:

- In n8n, copy the **OAuth Callback URL**. Paste this URL into your Strava app's **Authorization Callback Domain**.
- Remove the protocol (`https://` or `http://`) and the relative URL (`/oauth2/callback` or `/rest/oauth2-credential/callback`) from the **Authorization Callback Domain**. For example, if the OAuth Redirect URL was originally `https://oauth.n8n.cloud/oauth2/callback`, the **Authorization Callback Domain** would be `oauth.n8n.cloud`.
- Copy the **Client ID** and **Client Secret** from your app and add them to your n8n credential.

Refer to [Authentication](https://developers.strava.com/docs/authentication/){:target=_blank .external-link} for more information about Strava's OAuth flow.
