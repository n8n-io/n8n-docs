---
title: Figma credentials
description: >-
  Documentation for Figma credentials. Use these credentials to authenticate
  Figma in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Figma credentials
originalFilePath: integrations/builtin/credentials/figma.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/figma'
url: 'https://docs.n8n.io/integrations/builtin/credentials/figma'
layout:
  description:
    visible: false
---

# Figma credentials <a href="#figma-credentials" id="figma-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Figma Trigger (Beta)](../trigger-nodes/n8n-nodes-base.figmatrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Figma](https://www.figma.com/) account. You need an admin or owner level account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Access token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Figma's API documentation](https://www.figma.com/developers/api) for more information about the service.

## Using Access token <a href="#using-access-token" id="using-access-token"></a>

To configure this credential, you'll need:

- A Personal **Access Token** (PAT): Refer to the [Figma API Access Tokens documentation](https://www.figma.com/developers/api#access-tokens) for instructions on generating a Personal **Access Token**.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [Figma](https://www.figma.com/) account.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you'll need to register an application to set up OAuth:

1. Open the Figma [developer apps](https://www.figma.com/developers/apps) page.
2. Select **Create a new app**.
3. Enter a **Name** for your app, like `n8n integration`.
4. In n8n, copy the **OAuth Redirect URL**.
5. In Figma, select **Add a callback** and enter the URL you copied from n8n.
6. Save the app.
7. Copy the **Client ID** from Figma and enter it in your n8n credential.
8. Copy the **Client Secret** from Figma and enter it in your n8n credential.

Refer to the [Figma OAuth documentation](https://www.figma.com/developers/api#oauth2) for more information.

## Setting custom scopes <a href="#setting-custom-scopes" id="setting-custom-scopes"></a>

Figma OAuth2 credentials use the following scopes by default:

* `webhooks:read`
* `webhooks:write`

To select different scopes for your credentials, enable the **Custom Scopes** slider and edit the **Enabled Scopes** list. Keep in mind that some features may not work as expected with more restrictive scopes. Refer to [Figma's OAuth scopes](https://developers.figma.com/docs/rest-api/scopes/) for the full list of available scopes.
