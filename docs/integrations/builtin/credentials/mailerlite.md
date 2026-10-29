---
title: MailerLite credentials
description: >-
  Documentation for MailerLite credentials. Use these credentials to
  authenticate MailerLite in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: MailerLite credentials
originalFilePath: integrations/builtin/credentials/mailerlite.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mailerlite'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mailerlite'
layout:
  description:
    visible: false
---

# MailerLite credentials <a href="#mailerlite-credentials" id="mailerlite-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [MailerLite](../app-nodes/n8n-nodes-base.mailerlite.md)
- [MailerLite Trigger](../trigger-nodes/n8n-nodes-base.mailerlitetrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [MailerLite](https://www.mailerlite.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [MailerLite's API documentation](https://developers.mailerlite.com/docs/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Generate an API key from the **Integrations** menu. Refer to the [API Authentication documentation](https://developers.mailerlite.com/docs/#authentication) for more detailed instructions.

Enable the **Classic API** toggle if the API key is for a MailerLite Classic account instead of the newer MailerLite experience.

{% hint style="info" %}
Most new MailerLite accounts and all free accounts should disable the **Classic API** toggle. You can find out [which version of MailerLite you are using](https://www.mailerlite.com/help/which-version-of-mailerlite-am-i-using) and learn more about the differences between the two in the [MailerLite FAQ](https://www.mailerlite.com/help/new-mailerlite-faq).
{% endhint %}
