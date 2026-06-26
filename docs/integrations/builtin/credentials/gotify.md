---
title: Gotify credentials
description: >-
  Documentation for Gotify credentials. Use these credentials to authenticate
  Gotify in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Gotify credentials
originalFilePath: integrations/builtin/credentials/gotify.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/gotify'
url: 'https://docs.n8n.io/integrations/builtin/credentials/gotify'
layout:
  description:
    visible: false
---

# Gotify credentials <a href="#gotify-credentials" id="gotify-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Gotify](../app-nodes/n8n-nodes-base.gotify.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Install [Gotify](https://gotify.net/docs/install) on your server.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Gotify's API documentation](https://gotify.net/api-docs) for more information about the service.

## Using API token <a href="#using-api-token" id="using-api-token"></a>

To configure this credential, you'll need:

- An **App API Token**: Only required if you'll use this credential to create messages. To generate an App API token, create an application from the **Apps** menu. Refer to [Gotify's Push messages documentation](https://gotify.net/docs/pushmsg) for more information.
- A **Client API Token**: Required for all actions other than creating messages (such as deleting or retrieving messages). To generate a Client API token, create a client from the **Clients** menu.
- The **URL** of the Gotify host

