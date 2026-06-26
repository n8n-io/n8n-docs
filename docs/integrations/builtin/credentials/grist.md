---
title: Grist credentials
description: >-
  Documentation for Grist credentials. Use these credentials to authenticate
  Grist in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Grist credentials
originalFilePath: integrations/builtin/credentials/grist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/grist'
url: 'https://docs.n8n.io/integrations/builtin/credentials/grist'
layout:
  description:
    visible: false
---

# Grist credentials <a href="#grist-credentials" id="grist-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Grist](../app-nodes/n8n-nodes-base.grist.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Grist](https://getgrist.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Grist's API documentation](https://support.getgrist.com/api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Refer to the [Grist API authentication documentation](https://support.getgrist.com/rest-api/#authentication) for instructions on creating an API key.
- To select your Grist **Plan Type**. Options include:
    - Free
    - Paid: If selected, provide your Grist **Custom Subdomain**. This is the portion that comes before `.getgrist.com`. For example, if our full Grist domain was `n8n.getgrist.com`, we'd enter `n8n` here.
    - Self-Hosted: If selected, provide your Grist **Self-Hosted URL**. This should be the full URL.

