---
title: Xero credentials
description: >-
  Documentation for Xero credentials. Use these credentials to authenticate Xero
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Xero credentials
originalFilePath: integrations/builtin/credentials/xero.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/xero'
url: 'https://docs.n8n.io/integrations/builtin/credentials/xero'
layout:
  description:
    visible: false
---

# Xero credentials <a href="#xero-credentials" id="xero-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Xero](../app-nodes/n8n-nodes-base.xero.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Xero](https://www.xero.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Zero's API documentation](https://developer.xero.com/documentation/api/accounting/overview) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a new app for a custom connection.
- A **Client Secret**: Generated when you create a new app for a custom connection.

To generate your Client ID and Client Secret, [create an OAuth2 custom connection app](https://developer.xero.com/documentation/guides/oauth2/custom-connections/) in your Xero developer portal [**My Apps**](https://developer.xero.com/app/manage).

Use these settings for your app:

{% hint style="info" %}
**Xero App Name**

Xero doesn't support app instances within the Xero Developer Centre that contain `n8n` in their name.
{% endhint %}

- Select **Web app** as the **Integration Type**.
- For the **Company or Application URL**, enter the URL of your n8n server or reverse proxy address. For cloud users, for example, this is: `https://your-username.app.n8n.cloud/`.
- Copy the **OAuth Redirect URL** from n8n and add it as an **OAuth 2.0 redirect URI** in your app.
- Select appropriate **scopes** for your app. Refer to [OAuth2 Scopes](https://developer.xero.com/documentation/guides/oauth2/scopes/) for more information.
    - To use all functionality in the [Xero](../app-nodes/n8n-nodes-base.xero.md) node, add the `accounting.contacts` and `accounting.transactions` scopes.

Refer to Xero's [OAuth Custom Connections](https://developer.xero.com/documentation/guides/oauth2/custom-connections) documentation for more information.
