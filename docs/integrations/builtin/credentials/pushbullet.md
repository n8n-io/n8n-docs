---
title: Pushbullet credentials
description: >-
  Documentation for Pushbullet credentials. Use these credentials to
  authenticate Pushbullet in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Pushbullet credentials
originalFilePath: integrations/builtin/credentials/pushbullet.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/pushbullet'
url: 'https://docs.n8n.io/integrations/builtin/credentials/pushbullet'
layout:
  description:
    visible: false
---

# Pushbullet credentials <a href="#pushbullet-credentials" id="pushbullet-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Pushbullet](../app-nodes/n8n-nodes-base.pushbullet.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Pushbullet](https://www.pushbullet.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Pushbullet's API documentation](https://docs.pushbullet.com/) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a Pushbullet app, also known as an OAuth client.
- A **Client Secret**: Generated when you create a Pushbullet app, also known as an OAuth client.

To generate the **Client ID** and **Client Secret**, go to the [create client](https://www.pushbullet.com/create-client) page. Copy the **OAuth Redirect URL** from n8n and add this as your **redirect_uri** for the app/client. Use the **client_id** and **client_secret** from the OAuth Client in your n8n credential.

Refer to Pushbullet's [OAuth2 Guide](https://docs.pushbullet.com/#oauth2) for more information.

{% hint style="info" %}
**Pushbullet OAuth test link**

Pushbullet offers a test link during the client creation process described above. This link isn't compatible with n8n. To verify the authentication works, use the **Connect my account** button in n8n.
{% endhint %}

