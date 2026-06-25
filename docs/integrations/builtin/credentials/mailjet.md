---
title: Mailjet credentials
description: >-
  Documentation for Mailjet credentials. Use these credentials to authenticate
  Mailjet in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Mailjet credentials
originalFilePath: integrations/builtin/credentials/mailjet.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mailjet'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mailjet'
layout:
  description:
    visible: false
---

# Mailjet credentials <a href="#mailjet-credentials" id="mailjet-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Mailjet](../app-nodes/n8n-nodes-base.mailjet.md)
- [Mailjet Trigger](../trigger-nodes/n8n-nodes-base.mailjettrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Mailjet](https://www.mailjet.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Email API key: For use with Mailjet's Email API
- SMS token: For use with Mailjet's SMS API

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Mailjet's Email API documentation](https://dev.mailjet.com/email/guides/) and [Mailjet's SMS API documentation](https://dev.mailjet.com/sms/reference/send-message/) for more information about each service.

## Using Email API key <a href="#using-email-api-key" id="using-email-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: View and generate API keys in your Mailjet [API Key Management](https://app.mailjet.com/signin) page.
- A **Secret Key**: View your API Secret Keys in your Mailjet [API Key Management](https://app.mailjet.com/signin) page.
- _Optional:_ Select whether to use **Sandbox Mode** for calls made using this credential. When turned on, all API calls use Sandbox mode: the API will still validate the payloads but won't deliver the actual messages. This can be useful to troubleshoot any payload error messages without actually sending messages. Refer to Mailjet's [Sandbox Mode documentation](https://dev.mailjet.com/email/guides/send-api-v31/#sandbox-mode) for more information.

For this credential, you can use either:

- Mailjet's primary API key and secret key
- A subaccount API key and secret key

Refer to Mailjet's [How to create a subaccount (or additional API key) documentation](https://documentation.mailjet.com/hc/en-us/articles/360042561974-How-to-create-a-subaccount-or-additional-API-Key) for detailed instructions on creating more API keys. Refer to [What are subaccounts and how does it help me?](https://documentation.mailjet.com/hc/en-us/articles/360042561854-What-are-subaccounts-and-how-does-it-help-me) page for more information on Mailjet subaccounts and when you might want to use one.

## Using SMS Token <a href="#using-sms-token" id="using-sms-token"></a>

To configure this credential, you'll need:

- An access **Token**: Generate a new token from Mailjet's [SMS Dashboard](https://app.mailjet.com/sms).

