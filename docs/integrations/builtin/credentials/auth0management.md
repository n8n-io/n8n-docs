---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Auth0 Management credentials
description: Documentation for the Auth0 Management credentials. Use these credentials to authenticate Auth0 Management in n8n, a workflow automation platform.
---

# Auth0 Management credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

Create an [Auth0](https://auth0.com){:target=_blank .external-link} account.

## Supported authentication methods

- API client secret

## Related resources

Refer to [Auth0 Management's documentation](https://auth0.com/docs/api/management/v2){:target=_blank .external-link} for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/auth0-management-api/){:target=_blank .external-link} on n8n's website.

## Using API client secret

To configure this credential, you'll need:

- An Auth0 **Domain**
- A **Client ID**
- A **Client Secret**

Refer to the [Auth0 Management API Get Access Tokens documentation](https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens){:target=_blank .external-link} for instructions on obtaining the Client ID and Client Secret from the application's **Settings** tab.