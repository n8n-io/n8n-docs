---
title: Taiga credentials
description: >-
  Documentation for Taiga credentials. Use these credentials to authenticate
  Taiga in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Taiga credentials
originalFilePath: integrations/builtin/credentials/taiga.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/taiga'
url: 'https://docs.n8n.io/integrations/builtin/credentials/taiga'
layout:
  description:
    visible: false
---

# Taiga credentials <a href="#taiga-credentials" id="taiga-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Taiga](../app-nodes/n8n-nodes-base.taiga.md)
- [Taiga Trigger](../trigger-nodes/n8n-nodes-base.taigatrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Taiga](https://taiga.io/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Taiga's API documentation](https://docs.taiga.io/api.html) for more information about the service.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- A **Username**: Enter your username or user email address. Refer to [Normal login](https://docs.taiga.io/api.html#auth-normal-login) for more information.
- A **Password**: Enter your password.
- The **Environment**: Choose between **Cloud** or **Self-Hosted**. For **Self-Hosted** instances, you'll also need to add:
    - The **URL**: Enter your Taiga URL.

