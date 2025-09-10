---
title: Action Network credentials
description: Documentation for Action Network credentials. Use these credentials to authenticate Action Network in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Action Network credentials

You can use these credentials to authenticate the following nodes:

- [Action Network](/integrations/builtin/app-nodes/n8n-nodes-base.actionnetwork.md)

## Supported authentication methods

- API key

## Related resources

Refer to [Action Network's API documentation](https://actionnetwork.org/docs/) for more information about working with the service.

## Using API key

To configure this credential, you'll need an [Action Network](https://actionnetwork.org/) account with [API key access enabled](#request-api-access) and:

- An **API Key**

To get an API key:

1. Log in to your Action Network account.
2. From the **Start Organizing** menu, select **Details >** [**API & Sync**](https://actionnetwork.org/apis).
3. Select the list you want to generate an API key for.
4. Generate an API key for that list.
5. Copy the **API Key** and enter it in your n8n credential.

Refer to the [Action Network API Authentication instructions](https://actionnetwork.org/docs/v2/#auth) for more information.

## Request API access

Each user account and group on the Action Network has a separate API key to access that user or group's data.

You must explicitly request API access from Action Network, which you can do in one of two ways:

1. If you're already a paying customer, [contact them](https://actionnetwork.org/contact) to request partner access. Partner access includes API key access.
2. If you're a developer, [request a developer account](https://actionnetwork.org/developers). Once your account request is granted, you'll have API key access.
