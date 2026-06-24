---
title: Auth0 Management credentials
description: >-
  Documentation for the Auth0 Management credentials. Use these credentials to
  authenticate Auth0 Management in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Auth0 Management credentials
originalFilePath: integrations/builtin/credentials/auth0management.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/auth0management'
url: 'https://docs.n8n.io/integrations/builtin/credentials/auth0management'
layout:
  description:
    visible: false
---

# Auth0 Management credentials <a href="#auth0-management-credentials" id="auth0-management-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tpXm8e1W7wVyh16Nhf6p/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [Auth0](https://auth0.com) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API client secret

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Auth0 Management's documentation](https://auth0.com/docs/api/management/v2) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/auth0-management-api/) on n8n's website.

## Using API client secret <a href="#using-api-client-secret" id="using-api-client-secret"></a>

To configure this credential, you'll need:

- An Auth0 **Domain**
- A **Client ID**
- A **Client Secret**

Refer to the [Auth0 Management API Get Access Tokens documentation](https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens) for instructions on obtaining the Client ID and Client Secret from the application's **Settings** tab.
