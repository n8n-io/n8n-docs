---
title: X credentials
description: Documentation for X credentials. Use these credentials to authenticate X in n8n, a workflow automation platform.
contentType: integration
---

# X credentials

You can use these credentials to authenticate the following nodes:

- [X](/integrations/builtin/app-nodes/n8n-nodes-base.twitter/)

## Prerequisites

- Create an [X developer](https://developer.x.com/en){:target=_blank .external-link} account.
- Create a [Twitter app](https://developer.x.com/en/docs/apps){:target=_blank .external-link} or use the default project and app created when you sign up for the developer portal. Refer to each supported authentication method below for more details on the app's configuration.

## Supported authentication methods

- OAuth: Listed as OAuth in n8n, this corresponds to X's [OAuth 1.0a](https://developer.x.com/en/docs/authentication/oauth-1-0a){:target=_blank .external-link} authentication method.
- OAuth2

## Related resources

Refer to [X's API documentation](https://developer.x.com/en/docs/twitter-api){:target=_blank .external-link} for more information about the service. Refer to [X's API authentication documentation](https://developer.x.com/en/docs/authentication/overview){:target=_blank .external-link} for more information about authenticating with the service.

## Using OAuth

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth from scratch, create a [Twitter app](https://developer.x.com/en/docs/apps){:target=_blank .external-link}.

Use these settings for your app:

1. In the app's **Keys & tokens > Consumer Keys** section, generate or regenerate your keys.
2. Copy the **API Key** and add it to n8n as the **Consumer Key**.
3. Copy the **API Secret** and add it to n8n as the **Consumer Secret**.
4. In the app's **Settings > User Authentication**, set appropriate **App permissions**. Choose **Read and write and Direct message** if you want to use all functions of the n8n X node.
5. Select a **Type of app**.
6. In **App Info**, copy the n8n **OAuth Redirect URL** and paste it in as the **Callback URI / Redirect URL**.
7. Add a **Website URL**.

Refer to X's [API Key and Secret documentation](https://developer.x.com/en/docs/authentication/oauth-1-0a/api-key-and-secret) for more information on API Keys and Secrets. Refer to X's [OAuth 1.0a Authentication documentation](https://developer.x.com/en/docs/authentication/oauth-1-0a){:target=_blank .external-link} for more information on working with this authentication method.

/// note | X rate limits
This credential uses the OAuth 1.0a User Context authentication method, so you'll be subject to user rate limits. Refer to [X rate limits](#x-rate-limits) below for more information.
///

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you configure a Twitter app for OAuth2.
- A **Client Secret**: Generated when you configure a Twitter app for OAuth2.

To generate your Client ID and Client Secret, create a [Twitter app](https://developer.x.com/en/docs/apps){:target=_blank .external-link}.

Use these settings for your app:

1. In the app's **Settings > User Authentication**, set appropriate **App permissions**. Choose **Read and write and Direct message** if you want to use all functions of the n8n X node.
2. Select a **Type of app**.
3. In **App Info**, copy the n8n **OAuth Redirect URL** and paste it in as the **Callback URI / Redirect URL**.
4. Add a **Website URL**.
5. Copy the **Client ID** and **Client Secret** from your Twitter app and enter them into your n8n credential.

Refer to X's [OAuth 2.0 Authentication documentation](https://developer.x.com/en/docs/authentication/oauth-2-0){:target=_blank .external-link} for more information on working with this authentication method.

/// note | X rate limits
This credential uses the OAuth 2.0 Bearer Token authentication method, so you'll be subject to app rate limits. Refer to [X rate limits](#x-rate-limits) below for more information.
///

## Further Reference

- [Application-only Authentication](https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only)

## X rate limits

X has time-based rate limits per endpoint based on your developer access plan level. X calculates app rate limits and user rate limits independently. Refer to [Rate limits](https://developer.x.com/en/docs/twitter-api/rate-limits){:target=_blank .external-link} for the access plan level rate limits and guidance on avoiding hitting them.

Use the guidance below for calculating rate limits:

- If you're [Using OAuth](#using-oauth), user rate limits apply. You'll have one limit per time window for each set of users' access tokens.
- If you're [Using OAuth2](#using-oauth2), app rate limits apply. You'll have a limit per time window for requests made by your app.

X calculates user rate limits and app rate limits independently.

Refer to [Rate limits and authentication methods](https://developer.x.com/en/docs/twitter-api/rate-limits#auth){:target=_blank .external-link} for more information about these rate limit types.