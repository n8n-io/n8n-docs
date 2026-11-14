---
title: PayPal credentials
description: >-
  Documentation for PayPal credentials. Use these credentials to authenticate
  PayPal in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: PayPal credentials
originalFilePath: integrations/builtin/credentials/paypal.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/paypal'
url: 'https://docs.n8n.io/integrations/builtin/credentials/paypal'
layout:
  description:
    visible: false
---

# PayPal credentials <a href="#paypal-credentials" id="paypal-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [PayPal](../app-nodes/n8n-nodes-base.paypal.md)
- [PayPal Trigger](../trigger-nodes/n8n-nodes-base.paypaltrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [PayPal developer](https://developer.paypal.com/home) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API client and secret

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Paypal's API documentation](https://developer.paypal.com/api/rest/) for more information about the service.

## Using API client and secret <a href="#using-api-client-and-secret" id="using-api-client-and-secret"></a>

To configure this credential, you'll need:

- A **Client ID**: Generated when you create an app.
- A **Secret**: Generated when you create an app.
- An **Environment**: Select **Live** or **Sandbox**.

To generate the **Client ID** and **Secret**, log in to your Paypal [developer dashboard](https://developer.paypal.com/dashboard/). Select **Apps & Credentials > Rest API apps > Create app**. Refer to [Get client ID and client secret](https://developer.paypal.com/api/rest/#link-getclientidandclientsecret) for more information.


