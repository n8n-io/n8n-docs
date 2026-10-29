---
title: Strava credentials
description: >-
  Documentation for Strava credentials. Use these credentials to authenticate
  Strava in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Strava credentials
originalFilePath: integrations/builtin/credentials/strava.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/strava'
url: 'https://docs.n8n.io/integrations/builtin/credentials/strava'
layout:
  description:
    visible: false
---

# Strava credentials <a href="#strava-credentials" id="strava-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Strava](../app-nodes/n8n-nodes-base.strava.md)
- [Strava Trigger](../trigger-nodes/n8n-nodes-base.stravatrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Strava](https://strava.com) account.
- Create a Strava application in [**Settings > API**](https://www.strava.com/settings/api). Refer to [Using OAuth2](#using-oauth2) for more information.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Strava's API documentation](https://developers.strava.com/docs/reference/) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**: Generated when you [create a Strava app](https://developers.strava.com/docs/getting-started/#account).
- A **Client Secret**: Generated when you [create a Strava app](https://developers.strava.com/docs/getting-started/#account).

Use these settings for your Strava app:

- In n8n, copy the **OAuth Callback URL**. Paste this URL into your Strava app's **Authorization Callback Domain**.
- Remove the protocol (`https://` or `http://`) and the relative URL (`/oauth2/callback` or `/rest/oauth2-credential/callback`) from the **Authorization Callback Domain**. For example, if the OAuth Redirect URL was originally `https://oauth.n8n.cloud/oauth2/callback`, the **Authorization Callback Domain** would be `oauth.n8n.cloud`.
- Copy the **Client ID** and **Client Secret** from your app and add them to your n8n credential.

Refer to [Authentication](https://developers.strava.com/docs/authentication/) for more information about Strava's OAuth flow.
