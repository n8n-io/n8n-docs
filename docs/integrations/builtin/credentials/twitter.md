---
title: X (formerly Twitter) credentials
description: Documentation for X credentials. Use these credentials to authenticate X in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# X (formerly Twitter) credentials

You can use these credentials to authenticate the following nodes:

- [X (formerly Twitter)](/integrations/builtin/app-nodes/n8n-nodes-base.twitter.md)

## Prerequisites

- Create an [X developer](https://developer.x.com/en) account.
- Create a [Twitter app](https://developer.x.com/en/docs/apps) or use the default project and app created when you sign up for the developer portal. Refer to each supported authentication method below for more details on the app's configuration.

## Supported authentication methods

- OAuth2

/// note | Deprecation warning
n8n used to support an **OAuth** authentication method, which used X's [OAuth 1.0a](https://developer.x.com/en/docs/authentication/oauth-1-0a) authentication method. n8n deprecated this method with the release of V2 of the X node in n8n version [0.236.0](/release-notes/0-x.md#n8n02360).
///

## Related resources

Refer to [X's API documentation](https://developer.x.com/en/docs/twitter-api) for more information about the service. Refer to [X's API authentication documentation](https://developer.x.com/en/docs/authentication/overview) for more information about authenticating with the service.

Refer to [Application-only Authentication](https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only) for more information about app-only authentication.

## Using OAuth2

Use this method if you're using n8n version 0.236.0 or later.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate your Client ID and Client Secret:

1. In the Twitter [developer portal](https://developer.x.com/en/portal/dashboard), open your project.
2. On the project's **Overview** tab, find the **Apps** section and select **Add App**.
3. Give your app a **Name** and select **Next**.
1. Go to the **App Settings**.
4. In the **User authentication settings**, select **Set Up**.
1. Set the **App permissions**. Choose **Read and write and Direct message** if you want to use all functions of the n8n X node.
5. In the **Type of app** section, select **Web App, Automated App or Bot**.
1. In n8n, copy the **OAuth Redirect URL**.
7. In your X app, find the **App Info** section and paste that URL in as the **Callback URI / Redirect URL**.
7. Add a **Website URL**.
8. Save your changes.
1. Copy the **Client ID** and **Client Secret** displayed in X and add them to the corresponding fields in your n8n credential.

Refer to X's [OAuth 2.0 Authentication documentation](https://developer.x.com/en/docs/authentication/oauth-2-0) for more information on working with this authentication method.

/// note | X rate limits
This credential uses the OAuth 2.0 Bearer Token authentication method, so you'll be subject to app rate limits. Refer to [X rate limits](#x-rate-limits) below for more information.
///

## X rate limits

X has time-based rate limits per endpoint based on your developer access plan level. X calculates app rate limits and user rate limits independently. Refer to [Rate limits](https://developer.x.com/en/docs/twitter-api/rate-limits) for the access plan level rate limits and guidance on avoiding hitting them.

Use the guidance below for calculating rate limits:

- If you're using the deprecated OAuth method, user rate limits apply. You'll have one limit per time window for each set of users' access tokens.
- If you're [Using OAuth2](#using-oauth2), app rate limits apply. You'll have a limit per time window for requests made by your app.

X calculates user rate limits and app rate limits independently.

Refer to X's [Rate limits and authentication methods](https://developer.x.com/en/docs/twitter-api/rate-limits#auth) for more information about these rate limit types.
