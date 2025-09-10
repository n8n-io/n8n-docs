---
title: Grist credentials
description: Documentation for Grist credentials. Use these credentials to authenticate Grist in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Grist credentials

You can use these credentials to authenticate the following nodes:

* [Grist](/integrations/builtin/app-nodes/n8n-nodes-base.grist.md)

## Prerequisites

Create a [Grist](https://getgrist.com/) account.

## Supported authentication methods

- API key

## Related resources

Refer to [Grist's API documentation](https://support.getgrist.com/api/) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Refer to the [Grist API authentication documentation](https://support.getgrist.com/rest-api/#authentication) for instructions on creating an API key.
- To select your Grist **Plan Type**. Options include:
    - Free
    - Paid: If selected, provide your Grist **Custom Subdomain**. This is the portion that comes before `.getgrist.com`. For example, if our full Grist domain was `n8n.getgrist.com`, we'd enter `n8n` here.
    - Self-Hosted: If selected, provide your Grist **Self-Hosted URL**. This should be the full URL.

