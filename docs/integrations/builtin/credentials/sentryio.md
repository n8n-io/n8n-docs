---
title: Sentry.io credentials
description: Documentation for Sentry.io credentials. Use these credentials to authenticate Sentry.io in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Sentry.io credentials

You can use these credentials to authenticate the following nodes:

- [Sentry.io](/integrations/builtin/app-nodes/n8n-nodes-base.sentryio.md)

## Prerequisites

Create a [Sentry.io](https://sentry.io/) account.

## Supported authentication methods

- API token
- OAuth2
- Server API token: Use for [self-hosted Sentry](https://develop.sentry.dev/self-hosted/).

## Related resources

Refer to [Sentry.io's API documentation](https://docs.sentry.io/api/) for more information about the service.

## Using API token

To configure this credential, you'll need:

- An API **Token**: Generate a [**User Auth Token**](https://sentry.io/settings/account/api/auth-tokens/) in **Account > Settings > User Auth Tokens**. Refer to [User Auth Tokens](https://docs.sentry.io/account/auth-tokens/#user-auth-tokens) for more information.

## Using OAuth

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, [create an integration](https://docs.sentry.io/organization/integrations/integration-platform/#creating-an-integration) with these settings:

- Copy the n8n **OAuth Callback URL** and add it as an **Authorized Redirect URI**.
- Copy the **Client ID** and **Client Secret** and add them to your n8n credential.

Refer to [Public integrations](https://docs.sentry.io/organization/integrations/integration-platform/public-integration/) for more information on creating the integration.

## Using Server API token

To configure this credential, you'll need:

- An API **Token**: Generate a [**User Auth Token**](https://sentry.io/settings/account/api/auth-tokens/) in **Account > Settings > User Auth Tokens**. Refer to [User Auth Tokens](https://docs.sentry.io/account/auth-tokens/#user-auth-tokens) for more information.
- The **URL** of your self-hosted Sentry instance.
