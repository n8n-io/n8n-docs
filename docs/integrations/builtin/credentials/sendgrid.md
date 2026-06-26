---
title: SendGrid credentials
description: >-
  Documentation for SendGrid credentials. Use these credentials to authenticate
  SendGrid in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: SendGrid credentials
originalFilePath: integrations/builtin/credentials/sendgrid.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/sendgrid'
url: 'https://docs.n8n.io/integrations/builtin/credentials/sendgrid'
layout:
  description:
    visible: false
---

# SendGrid credentials <a href="#sendgrid-credentials" id="sendgrid-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [SendGrid](../app-nodes/n8n-nodes-base.sendgrid.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [SendGrid's API documentation](https://www.twilio.com/docs/sendgrid/api-reference) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [SendGrid](https://sendgrid.com) account and:

- An **API Key**

To create an API key:

1. In the Twilio SendGrid app, go to **Settings >** [**API Keys**](https://app.sendgrid.com/settings/api_keys).
2. Select **Create API Key**.
3. Enter a **Name** for your API key, like `n8n integration`.
4. Select **Full Access**.
5. Select **Create & View**.
6. Copy the key and enter it in your n8n credential.

Refer to [Create API Keys](https://www.twilio.com/docs/sendgrid/api-reference/api-keys/create-api-keys) for more information.
