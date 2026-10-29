---
title: Bitwarden credentials
description: >-
  Documentation for Bitwarden credentials. Use these credentials to authenticate
  Bitwarden in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Bitwarden credentials
originalFilePath: integrations/builtin/credentials/bitwarden.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/bitwarden'
url: 'https://docs.n8n.io/integrations/builtin/credentials/bitwarden'
layout:
  description:
    visible: false
---

# Bitwarden credentials <a href="#bitwarden-credentials" id="bitwarden-credentials"></a>

You can use these credentials to authenticate the following node:

- [Bitwarden](../app-nodes/n8n-nodes-base.bitwarden.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Bitwarden](https://vault.bitwarden.com/#/register?org=teams) Teams organization or Enterprise organization account. (Bitwarden only makes the Bitwarden Public API available for these [organization](https://bitwarden.com/help/about-organizations/) plans.)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Bitwarden's Public API documentation](https://bitwarden.com/help/public-api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Client ID**: Provided when you generate an API key
- A **Client Secret**: Provided when you generate an API key
- The **Environment**:
    - Choose **Cloud-hosted** if you don't self-host Bitwarden. No further configuration required.
    - Choose **Self-hosted** if you host Bitwarden on your own server. Enter your **Self-hosted domain** in the appropriate field.

The Client ID and Client Secret must be for an **Organization API Key**, not a Personal API Key. Refer to the [Bitwarden Public API Authentication documentation](https://bitwarden.com/help/public-api/#authentication) for instructions on generating an Organization API Key.

