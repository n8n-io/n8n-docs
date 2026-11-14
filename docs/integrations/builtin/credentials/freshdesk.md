---
title: Freshdesk credentials
description: >-
  Documentation for Freshdesk credentials. Use these credentials to authenticate
  Freshdesk in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Freshdesk credentials
originalFilePath: integrations/builtin/credentials/freshdesk.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/freshdesk'
url: 'https://docs.n8n.io/integrations/builtin/credentials/freshdesk'
layout:
  description:
    visible: false
---

# Freshdesk credentials <a href="#freshdesk-credentials" id="freshdesk-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Freshdesk](../app-nodes/n8n-nodes-base.freshdesk.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Freshdesk](https://freshdesk.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Freshdesk's API documentation](https://developers.freshdesk.com/api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Refer to the [Freshdesk API authenticaton documentation](https://developers.freshdesk.com/api/#authentication) for detailed instructions on getting your API key.
- A Freshdesk **Domain**: Use the subdomain of your Freshdesk account. This is part of the URL, for example `https://<subdomain>.freshdesk.com`. So if you access Freshdesk through `https://n8n.freshdesk.com`, enter `n8n` as your **Domain**.

