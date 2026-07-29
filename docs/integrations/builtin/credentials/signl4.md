---
title: SIGNL4 credentials
description: >-
  Documentation for SIGNL4 credentials. Use these credentials to authenticate
  SIGNL4 in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: SIGNL4 credentials
originalFilePath: integrations/builtin/credentials/signl4.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/signl4'
url: 'https://docs.n8n.io/integrations/builtin/credentials/signl4'
layout:
  description:
    visible: false
---

# SIGNL4 credentials <a href="#signl4-credentials" id="signl4-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [SIGNL4](../app-nodes/n8n-nodes-base.signl4.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [SIGNL4](https://www.signl4.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Webhook secret

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [SIGNL4's Inbound Webhook documentation](https://connect.signl4.com/webhook/docs/index.html) for more information about the service.

## Using webhook secret <a href="#using-webhook-secret" id="using-webhook-secret"></a>

To configure this credential, you'll need:

- A **Team Secret**: SIGNL4 includes this secret in the "✅ Sign up complete" email as the last part of the webhook URL. If your webhook URL is `https://connect.signl4.com/webhook/helloworld`, your team secret would be `helloworld`.

