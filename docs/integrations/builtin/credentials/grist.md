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

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Grist](https://getgrist.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Grist's API documentation](https://support.getgrist.com/api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: in Grist, open the account menu (top right), then go to **Account settings** > **Developer** to create or copy your API key. Refer to the [Grist API authentication documentation](https://support.getgrist.com/rest-api/#authentication) for more information.
- A **Grist URL**. This points n8n at your Grist server:
    - The default, `https://api.getgrist.com`, works for any account on hosted Grist (getgrist.com).
    - To restrict the connection to a single team, use `https://YOUR_TEAM.getgrist.com`.
    - For a self-managed instance, use its URL (for example `https://grist.example.com`).

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

On self-managed Grist, OAuth apps are part of the [full Grist edition](https://support.getgrist.com/self-managed/#how-do-i-enable-the-full-edition-of-grist). If your instance doesn't offer them, use an API key.

To configure this credential, you'll need:

- A **Client ID**: Grist gives you this when you register an OAuth app.
- A **Client Secret**: Grist gives you this when you register an OAuth app.
- A **Grist URL**. This points n8n at your Grist server:
    - The default, `https://api.getgrist.com`, works for any account on hosted Grist (getgrist.com).
    - To restrict the connection to a single team, use `https://YOUR_TEAM.getgrist.com`.
    - For a self-managed instance, use its URL (for example `https://grist.example.com`).

To register the app and connect:

1. In n8n, start creating a **Grist OAuth2 API** credential and copy the **OAuth Redirect URL**.
2. In Grist, open the account menu (top right), then go to **Account settings** > **Developer**.
3. In the **OAuth apps** section, select **Register app**. Enter an **Application name**, for example `n8n`, and paste the n8n redirect URL as the **Redirect URI**.
4. Select these scopes: `offline_access`, `doc:read`, `doc:write`, and `doc:webhooks`.
5. Select **Register**, then copy the **Client ID** and **Client Secret**. Grist shows the secret only once.
6. Back in n8n, enter the Client ID and Client Secret, then select **Connect my account**.
7. On Grist's authorization screen, choose what the credential can reach: **All documents (now and in the future)**, or **Selected resources** to pick individual documents, workspaces, or sites. Then select **Authorize**.

The selection in step 7 narrows the credential further than the scopes do. Grist enforces it on every call: a request for a document outside the grant fails, even if you can open that document yourself. Pointing a credential at a single document is a good way to give a workflow access to only the data it needs. To change the selection later, or to revoke a credential's access on its own, go to **Account settings** > **Authorized apps** in Grist.

Refer to [Grist's connected apps documentation](https://support.getgrist.com/connected-apps/) for how authorizations work and how to manage them, and [Grist's OAuth apps documentation](https://support.getgrist.com/oauth-apps/) for details on registering an app.

{% hint style="info" %}
**Register the app with all four scopes**

Select all four scopes, including any you don't expect to use. Grist refuses an authorization that asks for a scope the app wasn't registered with, and connecting fails with an `invalid_scope` error.
{% endhint %}

{% hint style="info" %}
**Use the credential at least once a month**

Grist's refresh token expires after 60 days. A workflow that runs at least every 30 days keeps its credential working indefinitely. If a credential sits unused for longer, reconnect it with **Connect my account**. API key credentials don't expire.
{% endhint %}

