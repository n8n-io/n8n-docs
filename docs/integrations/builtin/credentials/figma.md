---
title: Figma credentials
description: Documentation for Figma credentials. Use these credentials to authenticate Figma in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Figma credentials

You can use these credentials to authenticate the following nodes:

- [Figma Trigger (Beta)](/integrations/builtin/trigger-nodes/n8n-nodes-base.figmatrigger.md)

## Prerequisites

Create a [Figma](https://www.figma.com/) account. You need an admin or owner level account.

## Supported authentication methods

- Access token
- OAuth2

## Related resources

Refer to [Figma's API documentation](https://www.figma.com/developers/api) for more information about the service.

## Using Access token

To configure this credential, you'll need:

- A Personal **Access Token** (PAT): Refer to the [Figma API Access Tokens documentation](https://www.figma.com/developers/api#access-tokens) for instructions on generating a Personal **Access Token**.

## Using OAuth2

To configure this credential, you'll need a [Figma](https://www.figma.com/) account.

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/index.md) n8n, you'll need to register an application to set up OAuth:

1. Open the Figma [developer apps](https://www.figma.com/developers/apps) page.
2. Select **Create a new app**.
3. Enter a **Name** for your app, like `n8n integration`.
4. In n8n, copy the **OAuth Redirect URL**.
5. In Figma, select **Add a callback** and enter the URL you copied from n8n.
6. Save the app.
7. Copy the **Client ID** from Figma and enter it in your n8n credential.
8. Copy the **Client Secret** from Figma and enter it in your n8n credential.

Refer to the [Figma OAuth documentation](https://www.figma.com/developers/api#oauth2) for more information.

## Setting custom scopes

Figma OAuth2 credentials use the following scopes by default:

* `webhooks:read`
* `webhooks:write`

To select different scopes for your credentials, enable the **Custom Scopes** slider and edit the **Enabled Scopes** list. Keep in mind that some features may not work as expected with more restrictive scopes. Refer to [Figma's OAuth scopes](https://developers.figma.com/docs/rest-api/scopes/) for the full list of available scopes.
