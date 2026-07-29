---
title: QuickBooks credentials
description: >-
  Documentation for QuickBooks credentials. Use these credentials to
  authenticate QuickBooks in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: QuickBooks credentials
originalFilePath: integrations/builtin/credentials/quickbooks.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/quickbooks'
url: 'https://docs.n8n.io/integrations/builtin/credentials/quickbooks'
layout:
  description:
    visible: false
---

# QuickBooks credentials <a href="#quickbooks-credentials" id="quickbooks-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [QuickBooks](../app-nodes/n8n-nodes-base.quickbooks.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [Intuit developer](https://developer.intuit.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Intuit's API documentation](https://developer.intuit.com/app/developer/qbo/docs/develop) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**: Generated when you create an app.
- A **Client Secret**: Generated when you create an app.
- An **Environment**: Select whether this credential should access your **Production** or **Sandbox** environment. 

To generate your **Client ID** and **Client Secret**, [create an app](https://developer.intuit.com/app/developer/qbo/docs/get-started/start-developing-your-app#create-an-app).

Use these settings when creating your app:

- Select appropriate scopes for your app. Refer to [Learn about scopes](https://developer.intuit.com/app/developer/qbo/docs/learn/scopes) for more information.
- Enter the **OAuth Redirect URL** from n8n as a **Redirect URI** in the app's **Development > Keys & OAuth** section.
- Copy the **Client ID** and **Client Secret** from the app's **Development > Keys & OAuth** section to enter in n8n. Refer to [Get the Client ID and Client Secret for your app](https://developer.intuit.com/app/developer/qbo/docs/get-started/get-client-id-and-client-secret) for more information.

Refer to Intuit's [Set up OAuth 2.0 documentation](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0) for more information on the entire process.

{% hint style="info" %}
**Environment selection**

If you're creating a new app from scratch, start with the **Sandbox** environment. Production apps need to fulfill all Intuit's requirements. Refer to Intuit's [Publish your app documentation](https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app) for more information.
{% endhint %}
