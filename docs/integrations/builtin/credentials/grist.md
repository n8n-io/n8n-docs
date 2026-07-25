---
title: Grist credentials
description: >-
  Documentation for Grist credentials. Use these credentials to authenticate
  Grist in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Grist credentials
originalFilePath: integrations/builtin/credentials/grist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/grist'
url: 'https://docs.n8n.io/integrations/builtin/credentials/grist'
layout:
  description:
    visible: false
---

# Grist credentials <a href="#grist-credentials" id="grist-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Grist](../app-nodes/n8n-nodes-base.grist.md)
* [Grist Trigger](../trigger-nodes/n8n-nodes-base.gristtrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Grist](https://getgrist.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OAuth2 (PKCE)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Grist's API documentation](https://support.getgrist.com/api/) for more information about the service.

## Grist URL

Both authentication methods use a single **Grist URL** field that points n8n at your Grist server:

- The default, `https://api.getgrist.com`, works for any account on hosted Grist (getgrist.com).
- To restrict the connection to a single team, use `https://YOUR_TEAM.getgrist.com`.
- For a self-managed instance, use its URL, without `/api` and without a trailing slash (for example `https://grist.example.com`).

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Grist URL** (see [Grist URL](#grist-url) above).
- An **API Key**: in Grist, open the account menu (top right), then go to **Account settings** > **Developer** to create or copy your API key. Refer to the [Grist API authentication documentation](https://support.getgrist.com/rest-api/#authentication) for more information.

## Using OAuth2

OAuth2 lets n8n connect to Grist without storing a long-lived API key. Grist uses the PKCE authorization flow.

To configure this credential, you'll need:

- A **Grist URL** (see [Grist URL](#grist-url) above).
- A **Client ID** and **Client Secret** from a Grist OAuth app.

To create the OAuth app in Grist:

1. In Grist, open the account menu (top right), then go to **Account settings** > **Developer** > **OAuth apps** and register a new app.
2. Set the redirect URL to your n8n OAuth callback: `https://<n8n-host>/rest/oauth2-credential/callback`. n8n shows the exact **OAuth Redirect URL** to use on the credential screen.
3. Copy the generated **Client ID** and **Client Secret** into the n8n credential.
4. Select **Connect my account** and complete the Grist consent screen.

The credential requests the following scopes: `offline_access`, `doc:read`, `doc:write`, and `doc:webhooks`. The `doc:webhooks` scope is required for the [Grist Trigger](../trigger-nodes/n8n-nodes-base.gristtrigger.md) node.

{% hint style="info" %}
**Self-managed Grist**

OAuth2 requires a Grist instance with OAuth Apps enabled. Use your instance URL in the **Grist URL** field.
{% endhint %}
