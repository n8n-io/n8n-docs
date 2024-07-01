---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mailjet credentials
description: Documentation for Mailjet credentials. Use these credentials to authenticate Mailjet in n8n, a workflow automation platform.
contentType: integration
---

# Mailjet credentials

You can use these credentials to authenticate the following nodes:

- [Mailjet](/integrations/builtin/app-nodes/n8n-nodes-base.mailjet/)
- [Mailjet Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.mailjettrigger/)

## Prerequisites

Create a [Mailjet](https://www.mailjet.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Email API key: For use with Mailjet's Email API
- SMS token: For use with Mailjet's SMS API

## Related resources

Refer to [Mailjet's Email API documentation](https://dev.mailjet.com/email/guides/){:target=_blank .external-link} and [Mailjet's SMS API documentation](https://dev.mailjet.com/sms/guides/){:target=_blank .external-link} for more information about each service.

## Using Email API key

To configure this credential, you'll need:

- An **API Key**: View and generate API keys in your Mailjet [API Key Management](https://app.mailjet.com/account/api_keys){:target=_blank .external-link} page.
- A **Secret Key**: View your API Secret Keys in your Mailjet [API Key Management](https://app.mailjet.com/account/api_keys){:target=_blank .external-link} page.
- _Optional:_ Select whether to use **Sandbox Mode** for calls made using this credential. When turned on, all API calls use Sandbox mode: the API will still validate the payloads but won't deliver the actual messages. This can be useful to troubleshoot any payload error messages without actually sending messages. Refer to Mailjet's [Sandbox Mode documentation](https://dev.mailjet.com/email/guides/send-api-v31/#sandbox-mode){:target=_blank .external-link} for more information.

For this credential, you can use either:

- Mailjet's primary API key and secret key
- A subaccount API key and secret key

Refer to Mailjet's [How to create a subaccount (or additional API key) documentation](https://documentation.mailjet.com/hc/en-us/articles/360042561974-How-to-create-a-subaccount-or-additional-API-Key){:target=_blank .external-link} for detailed instructions on creating more API keys. Refer to [What are subaccounts and how does it help me?](https://documentation.mailjet.com/hc/en-us/articles/360042561854-What-are-subaccounts-and-how-does-it-help-me){:target=_blank .external-link} page for more information on Mailjet subaccounts and when you might want to use one.

## Using SMS Token

To configure this credential, you'll need:

- An access **Token**: Generate a new token from Mailjet's [SMS Dashboard](https://app.mailjet.com/sms){:target=_blank .external-link}. Refer to the [SMS API Getting Started guide](https://dev.mailjet.com/sms/guides/getting-started/){:target=_blank .external-link} for more detailed instructions.

