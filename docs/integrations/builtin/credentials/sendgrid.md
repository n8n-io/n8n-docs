---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SendGrid credentials
description: Documentation for SendGrid credentials. Use these credentials to authenticate SendGrid in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# SendGrid credentials

You can use these credentials to authenticate the following nodes:

- [SendGrid](/integrations/builtin/app-nodes/n8n-nodes-base.sendgrid/)

## Supported authentication methods

- API key

## Related resources

Refer to [SendGrid's API documentation](https://www.twilio.com/docs/sendgrid/api-reference){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need a [SendGrid](https://sendgrid.com){:target=_blank .external-link} account and:

- An **API Key**

To create an API key:

1. In the Twilio SendGrid app, go to **Settings >** [**API Keys**](https://app.sendgrid.com/settings/api_keys){:target=_blank .external-link}.
2. Select **Create API Key**.
3. Enter a **Name** for your API key, like `n8n integration`.
4. Select **Full Access**.
5. Select **Create & View**.
6. Copy the key and enter it in your n8n credential.

Refer to [Create API Keys](https://www.twilio.com/docs/sendgrid/api-reference/api-keys/create-api-keys){:target=_blank .external-link} for more information.
