---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: NocoDB credentials
description: Documentation for NocoDB credentials. Use these credentials to authenticate NocoDB in n8n, a workflow automation platform.
contentType: integration
---

# NocoDB credentials

You can use these credentials to authenticate the following nodes:

- [NocoDB](/integrations/builtin/app-nodes/n8n-nodes-base.nocodb/)

## Prerequisites

Install [NocoDB](https://www.nocodb.com/){:target=_blank .external-link}.

## Supported authentication methods

- API token
- User auth token

/// note | User auth token deprecation
NocoDB deprecated user auth tokens in v0.205.1. Use API tokens instead.
///

## Related resources

Refer to [NocoDB's API documentation](https://data-apis-v2.nocodb.com/){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need:

- An **API Token**: Generate an API token in **Account Settings > Tokens**. Refer to the NocoDB [API Tokens documentation](https://docs.nocodb.com/account-settings/api-tokens/){:target=_blank .external-link} for more detailed instructions.
- Your database **Host**: The host of your NocoDB instance, for example `http://localhost:8080`.

## Using user auth token

User auth token is a temporary token designed for quick experiments with the API. These tokens are valid for a session until the user logs out or for 10 hours and have been deprecated by NocoDB.

/// note | User auth token deprecation
NocoDB deprecated user auth tokens in v0.205.1. Use API tokens instead.
///

To configure this credential, you'll need:

- A **User Token**: Generate a user auth token from the user menu > **Copy Auth token**. Refer to the NocoDB [Auth Tokens documentation](https://docs.nocodb.com/account-settings/api-tokens/#auth-tokens){:target=_blank .external-link} for more detailed instructions. Enter that auth token as the **User Token** in n8n.
- Your database **Host**: The host of your NocoDB instance, for example `http://localhost:8080`.

