---
title: Paddle credentials
description: >-
  Documentation for Paddle credentials. Use these credentials to authenticate
  Paddle in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Paddle credentials
originalFilePath: integrations/builtin/credentials/paddle.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/paddle'
url: 'https://docs.n8n.io/integrations/builtin/credentials/paddle'
layout:
  description:
    visible: false
---

# Paddle credentials <a href="#paddle-credentials" id="paddle-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Paddle](../app-nodes/n8n-nodes-base.paddle.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Paddle](https://paddle.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token (Classic)

{% hint style="warning" %}
**Paddle Classic API**

This credential works with Paddle Classic's API. If you joined Paddle after August 2023, you're using the [Paddle Billing API](https://developer.paddle.com/api-reference/overview) and this credential may not work for you.
{% endhint %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Paddle Classic's API documentation](https://developer.paddle.com/classic/api-reference/1384a288aca7a-api-reference) for more information about the service.

## Using API access token (Classic) <a href="#using-api-access-token-classic" id="using-api-access-token-classic"></a>

To configure this credential, you'll need:

- A **Vendor Auth Code**: Created when you generate an API key.
- A **Vendor ID**: Displayed when you generate an API key.
- **Use Sandbox Environment API**: When turned on, nodes using this credential will hit the Sandbox API endpoint instead of the live API endpoint.

To generate an auth code and view your Vendor ID, go to **Paddle > Developer Tools > Authentication > Generate Auth Code**. Select **Reveal Auth Code** to display the Auth Code. Refer to [API Authentication](https://developer.paddle.com/api-reference/about/authentication) for more information.
