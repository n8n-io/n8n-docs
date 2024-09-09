---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: PayPal credentials
description: Documentation for PayPal credentials. Use these credentials to authenticate PayPal in n8n, a workflow automation platform.
contentType: integration
---

# PayPal credentials

You can use these credentials to authenticate the following nodes:

- [PayPal](/integrations/builtin/app-nodes/n8n-nodes-base.paypal/)
- [PayPal Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.paypaltrigger/)

## Prerequisites

Create a [PayPal developer](https://developer.paypal.com/home){:target=_blank .external-link} account.

## Supported authentication methods

- API client and secret

## Related resources

Refer to [Paypal's API documentation](https://developer.paypal.com/api/rest/){:target=_blank .external-link} for more information about the service.

## Using API client and secret

To configure this credential, you'll need:

- A **Client ID**: Generated when you create an app.
- A **Secret**: Generated when you create an app.
- An **Environment**: Select **Live** or **Sandbox**.

To generate the **Client ID** and **Secret**, log in to your Paypal [developer dashboard](https://developer.paypal.com/dashboard/). Select **Apps & Credentials > Rest API apps > Create app**. Refer to [Get client ID and client secret](https://developer.paypal.com/api/rest/#link-getclientidandclientsecret){:target=_blank .external-link} for more information.


