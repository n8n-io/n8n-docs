---
title: Webhook credentials
description: Documentation for Webhook credentials. Use these credentials to authenticate Webhook in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# Webhook credentials

You can use these credentials to authenticate the following nodes:

- [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md)

## Prerequisites

You must use the authentication method required by the app or service you want to query.

## Supported authentication methods

- Basic auth
- Header auth
- JWT auth
- None

--8<-- "_snippets/integrations/builtin/credentials/generic-auth/basic-auth.md"

--8<-- "_snippets/integrations/builtin/credentials/generic-auth/header-auth.md"

## Using JWT auth

[**JWT Auth**](https://jwt.io/introduction/) is a method of authentication that uses JSON Web Tokens (JWT) to digitally sign data. This authentication method uses the **JWT credential** and can use either a **Passphrase** or **PEM Key** as key type. Refer to [JWT credential](/integrations/builtin/credentials/jwt.md) for more information.
