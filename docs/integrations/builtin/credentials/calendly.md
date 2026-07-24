---
title: Calendly credentials
description: >-
  Documentation for Calendly credentials. Use these credentials to authenticate
  Calendly in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Calendly credentials
originalFilePath: integrations/builtin/credentials/calendly.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/calendly'
url: 'https://docs.n8n.io/integrations/builtin/credentials/calendly'
layout:
  description:
    visible: false
---

# Calendly credentials <a href="#calendly-credentials" id="calendly-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Calendly Trigger](../trigger-nodes/n8n-nodes-base.calendlytrigger.md)

{% hint style="warning" %}
**Supported Calendly plans**

The Calendly Trigger node relies on Calendly webhooks. Calendly only offers access to webhooks in their paid plans.
{% endhint %}

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Personal Access Token
- OAuth2

## Required scopes <a href="#required-scopes" id="required-scopes"></a>

To use Calendly nodes and triggers in n8n, your credentials must have the following scopes:

- `users:read`: Read user information
- `webhooks:read`: Read webhook subscriptions
- `webhooks:write`: Create and manage webhook subscriptions
- `scheduled_events:read`: Read scheduled event information

Personal Access Tokens have all permissions by default. For OAuth2, you must configure these scopes when creating your application.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Calendly's API documentation](https://developer.calendly.com/getting-started) for more information about the service.

## Using Personal Access Token <a href="#using-personal-access-token" id="using-personal-access-token"></a>

To configure this credential, you'll need a [Calendly](https://www.calendly.com/) account and:

- A **Personal Access Token**

To get your access token:

1. Go to the Calendly [**Integrations & apps**](https://calendly.com/integrations) page.
2. Select [**API & Webhooks**](https://calendly.com/integrations/api_webhooks).
3. In **Your Personal Access Tokens**, select **Generate new token**.
4. Enter a **Name** for your access token, like `n8n integration`.
5. Select **Create token**.
6. Select **Copy token** and enter it in your n8n credential.

Refer to [Calendly's API authentication documentation](https://developer.calendly.com/how-to-authenticate-with-personal-access-tokens) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [Calendly developer](https://developer.calendly.com) account and:

- A **Client ID**
- A **Client Secret**

To get both, create a new OAuth app in Calendly:

1. Log in to Calendly's developer portal and go to [**My apps**](https://developer.calendly.com/console/apps).
1. Select **Create new app**.
1. Enter a **Name of app**, like `n8n integration`.
2. In **Kind of app**, select **Web**.
3. In **Environment type**, select the environment that corresponds to your usage, either **Sandbox** or **Production**.
    - Calendly recommends starting with **Sandbox** for development and creating a second application for **Production** when you're ready to go live.
4. Copy the **OAuth Redirect URL** from n8n and enter it as a **Redirect URI** in the OAuth app.
5. In the **Scopes** section, add the following required scopes:
    - `users:read`
    - `webhooks:read`
    - `webhooks:write`
    - `scheduled_events:read`
6. Select **Save & Continue**. The app details display.
7. Copy the **Client ID** and enter this as your n8n **Client ID**.
8. Copy the **Client secret** and enter this as your n8n **Client Secret**.
9. Select **Connect my account** in n8n and follow the on-screen prompts to finish authorizing the credential.

Refer to [Registering your application with Calendly](https://developer.calendly.com/create-a-developer-account) for more information.

{% hint style="info" %}
**Local OAuth2 testing**

When testing OAuth2 with a tunnel (such as ngrok or Cloudflare Tunnel), open n8n through the same public URL you used as the **OAuth Redirect URL**. Otherwise, the OAuth callback may fail because the n8n session cookie belongs to a different host.
{% endhint %}
