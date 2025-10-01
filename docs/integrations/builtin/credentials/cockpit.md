---
title: Cockpit credentials
description: Documentation for Cockpit credentials. Use these credentials to authenticate Cockpit in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Cockpit credentials

You can use these credentials to authenticate the following nodes:

- [Cockpit](/integrations/builtin/app-nodes/n8n-nodes-base.cockpit.md)

## Prerequisites

- Create a [Cockpit](https://getcockpit.com/) account.
- Set up a [self-hosted instance of Cockpit](https://getcockpit.com/documentation/core/quickstart/installation).

## Supported authentication methods

- API access token

## Related resources

Refer to [Cockpit's API documentation](https://getcockpit.com/documentation/core/api/introduction) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- Your **Cockpit URL**: The URL you use to access your Cockpit instance
- An **Access Token**: Refer to the [Cockpit Managing tokens documentation](https://getcockpit.com/documentation/core/api/authentication/#managing-tokens) for instructions on creating an API token. Use the **API token** as the n8n **Access Token**.

