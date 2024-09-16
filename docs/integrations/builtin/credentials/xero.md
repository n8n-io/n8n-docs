---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Xero credentials
description: Documentation for Xero credentials. Use these credentials to authenticate Xero in n8n, a workflow automation platform.
contentType: integration
---

# Xero credentials

You can use these credentials to authenticate the following nodes:

- [Xero](/integrations/builtin/app-nodes/n8n-nodes-base.xero/)

## Prerequisites

Create a [Xero](https://www.xero.com/){:target=_blank .external-link} account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Zero's API documentation](https://developer.xero.com/documentation/api/accounting/overview){:target=_blank .external-link} for more information about the service.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a new app for a custom connection.
- A **Client Secret**: Generated when you create a new app for a custom connection.

To generate your Client ID and Client Secret, [create an OAuth2 custom connection app](https://developer.xero.com/documentation/guides/oauth2/custom-connections/){:target=_blank .external-link} in your Xero developer portal [**My Apps**](https://developer.xero.com/app/manage){:target=_blank .external-link}.

Use these settings for your app:

/// note | Xero App Name

Xero doesn't support app instances within the Xero Developer Centre that contain `n8n` in their name.

///

- Select **Web app** as the **Integration Type**.
- For the **Company or Application URL**, enter the URL of your n8n server or reverse proxy address. For cloud users, for example, this is: `https://your-username.app.n8n.cloud/`.
- Copy the **OAuth Redirect URL** from n8n and add it as an **OAuth 2.0 redirect URI** in your app.
- Select appropriate **scopes** for your app. Refer to [OAuth2 Scopes](https://developer.xero.com/documentation/guides/oauth2/scopes/){:target=_blank .external-link} for more information.
    - To use all functionality in the [Xero](/integrations/builtin/app-nodes/n8n-nodes-base.xero/) node, add the `accounting.contacts` and `accounting.transactions` scopes.

Refer to Xero's [OAuth Custom Connections](https://developer.xero.com/documentation/guides/oauth2/custom-connections){:target=_blank .external-link} documentation for more information.
