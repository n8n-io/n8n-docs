---
title: SyncroMSP credentials
description: >-
  Documentation for SyncroMSP credentials. Use these credentials to authenticate
  SyncroMSP in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: SyncroMSP credentials
originalFilePath: integrations/builtin/credentials/syncromsp.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/syncromsp'
url: 'https://docs.n8n.io/integrations/builtin/credentials/syncromsp'
layout:
  description:
    visible: false
---

# SyncroMSP credentials <a href="#syncromsp-credentials" id="syncromsp-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [SyncroMSP](../app-nodes/n8n-nodes-base.syncromsp.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [SyncroMSP](https://syncromsp.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [SyncroMSP's API documentation](https://api-docs.syncromsp.com/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Called an **API token** in SyncroMSP. To create an API token, go to your **user menu > Profile/Password > API Tokens** and select the option to **Create New Token**. Select **Custom Permissions** to enter a name for your token and adjust the permissions to match your requirements.
- Your **Subdomain**: Enter your SyncroMSP subdomain. This is visible in the URL of your SyncroMSP, located between `https://` and `.syncromsp.com`. If your full URL is `https://n8n-instance.syncromsp.com`, you'd enter `n8n-instance` as the subdomain.

Refer to [API Tokens](https://docs.syncromsp.com/imported/api-tokens) for more information on creating new tokens.
