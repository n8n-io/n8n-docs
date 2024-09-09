---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Cockpit credentials
description: Documentation for Cockpit credentials. Use these credentials to authenticate Cockpit in n8n, a workflow automation platform.
contentType: integration
---

# Cockpit credentials

You can use these credentials to authenticate the following nodes:

- [Cockpit](/integrations/builtin/app-nodes/n8n-nodes-base.cockpit/)

## Prerequisites

- Create a [Cockpit](https://getcockpit.com/){:target=_blank .external-link} account.
- Set up a [self-hosted instance of Cockpit](https://getcockpit.com/documentation/core/quickstart/installation){:target=_blank .external-link}.

## Supported authentication methods

- API access token

## Related resources

Refer to [Cockpit's API documentation](https://getcockpit.com/documentation/core/api/introduction){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- Your **Cockpit URL**: The URL you use to access your Cockpit instance
- An **Access Token**: Refer to the [Cockpit Managing tokens documentation](https://getcockpit.com/documentation/core/api/authentication/#managing-tokens){:target=_blank .external-link} for instructions on creating an API token. Use the **API token** as the n8n **Access Token**.

