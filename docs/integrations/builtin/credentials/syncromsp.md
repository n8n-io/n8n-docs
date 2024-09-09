---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SyncroMSP credentials
description: Documentation for SyncroMSP credentials. Use these credentials to authenticate SyncroMSP in n8n, a workflow automation platform.
contentType: integration
---

# SyncroMSP credentials

You can use these credentials to authenticate the following nodes:

- [SyncroMSP](/integrations/builtin/app-nodes/n8n-nodes-base.syncromsp/)

## Prerequisites

Create a [SyncroMSP](https://syncromsp.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [SyncroMSP's API documentation](https://api-docs.syncromsp.com/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Called an **API token** in SyncroMSP. To create an API token, go to your **user menu > Profile/Password > API Tokens** and select the option to **Create New Token**. Select **Custom Permissions** to enter a name for your token and adjust the permissions to match your requirements.
- Your **Subdomain**: Enter your SyncroMSP subdomain. This is visible in the URL of your SyncroMSP, located between `https://` and `.syncromsp.com`. If your full URL is `https://n8n-instance.syncromsp.com`, you'd enter `n8n-instance` as the subdomain.

Refer to [API Tokens](https://community.syncromsp.com/t/api-tokens/2297){:target=_blank .external-link} for more information on creating new tokens.
