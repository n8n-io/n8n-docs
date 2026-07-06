---
title: Cockpit credentials
description: >-
  Documentation for Cockpit credentials. Use these credentials to authenticate
  Cockpit in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Cockpit credentials
originalFilePath: integrations/builtin/credentials/cockpit.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/cockpit'
url: 'https://docs.n8n.io/integrations/builtin/credentials/cockpit'
layout:
  description:
    visible: false
---

# Cockpit credentials <a href="#cockpit-credentials" id="cockpit-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Cockpit](../app-nodes/n8n-nodes-base.cockpit.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Cockpit](https://getcockpit.com/) account.
- Set up a [self-hosted instance of Cockpit](https://getcockpit.com/documentation/core/quickstart/installation).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Cockpit's API documentation](https://getcockpit.com/documentation/core/api/introduction) for more information about the service.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need:

- Your **Cockpit URL**: The URL you use to access your Cockpit instance
- An **Access Token**: Refer to the [Cockpit Managing tokens documentation](https://getcockpit.com/documentation/core/api/authentication/#managing-tokens) for instructions on creating an API token. Use the **API token** as the n8n **Access Token**.

