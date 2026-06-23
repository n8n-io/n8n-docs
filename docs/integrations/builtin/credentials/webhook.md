---
title: Webhook credentials
description: >-
  Documentation for Webhook credentials. Use these credentials to authenticate
  Webhook in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Webhook credentials
originalFilePath: integrations/builtin/credentials/webhook.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/webhook'
url: 'https://docs.n8n.io/integrations/builtin/credentials/webhook'
layout:
  description:
    visible: false
---

# Webhook credentials <a href="#webhook-credentials" id="webhook-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Webhook](../core-nodes/n8n-nodes-base.webhook/README.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

You must use the authentication method required by the app or service you want to query.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth
- Header auth
- JWT auth
- None

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/19GkzHr83lKOpnZRz4y7/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/2s1bqrmqDMhCa3wUQV2Q/" %}

## Using JWT auth <a href="#using-jwt-auth" id="using-jwt-auth"></a>

[**JWT Auth**](https://jwt.io/introduction/) is a method of authentication that uses JSON Web Tokens (JWT) to digitally sign data. This authentication method uses the **JWT credential** and can use either a **Passphrase** or **PEM Key** as key type. Refer to [JWT credential](jwt.md) for more information.
