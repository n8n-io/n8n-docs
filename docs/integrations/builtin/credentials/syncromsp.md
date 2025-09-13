---
title: SyncroMSP credentials
description: Documentation for SyncroMSP credentials. Use these credentials to authenticate SyncroMSP in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# SyncroMSP credentials

You can use these credentials to authenticate the following nodes:

- [SyncroMSP](/integrations/builtin/app-nodes/n8n-nodes-base.syncromsp.md)

## Prerequisites

Create a [SyncroMSP](https://syncromsp.com/) account.

## Supported authentication methods

- API key

## Related resources

Refer to [SyncroMSP's API documentation](https://api-docs.syncromsp.com/) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Called an **API token** in SyncroMSP. To create an API token, go to your **user menu > Profile/Password > API Tokens** and select the option to **Create New Token**. Select **Custom Permissions** to enter a name for your token and adjust the permissions to match your requirements.
- Your **Subdomain**: Enter your SyncroMSP subdomain. This is visible in the URL of your SyncroMSP, located between `https://` and `.syncromsp.com`. If your full URL is `https://n8n-instance.syncromsp.com`, you'd enter `n8n-instance` as the subdomain.

Refer to [API Tokens](https://docs.syncromsp.com/imported/api-tokens) for more information on creating new tokens.
