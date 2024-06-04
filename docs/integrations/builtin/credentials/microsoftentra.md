---
title: Microsoft Entra ID credentials
description: Documentation for the Microsoft Entra ID credentials. Use these credentials to authenticate Microsoft Entra ID in n8n, a workflow automation platform.
---

# Microsoft Entra ID credentials

You can use these credentials to authenticate when using the [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](/integrations/custom-operations/).

## Prerequisites

Create a Microsoft Entra ID account or subscription.

Microsoft includes an Entra ID free plan when you create a [Microsoft Azure](https://azure.microsoft.com/){:target=_blank .external-link} account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Microsoft Entra ID's documentation](https://www.microsoft.com/en-us/security/business/identity-access/azure-active-directory){:target=_blank .external-link} for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/microsoft-entra-id-azure-active-directory/){:target=_blank .external-link} on n8n's website.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need more detail on what's happening in the Microsoft OAuth web flow, refer to [Microsoft authentication and authorization basics](https://learn.microsoft.com/en-us/graph/auth/auth-concepts){:target=_blank .external-link}.

To configure OAuth2 from scratch, [register an application with the Microsoft Identity Platform](https://learn.microsoft.com/en-us/graph/auth-register-app-v2){:target=_blank .external-link}.

Use these settings for your application:

- For **Supported account types**, select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (for example, Skype, Xbox)**.
- Copy the **OAuth Callback URL** from n8n and use that as the **Redirect URI** in your Microsoft application.
- Copy the **Application (client) ID** from your Microsoft application and add it as the **Client ID** in n8n.
- Generate a new client secret in your application. Refer to the instructions in [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials){:target=_blank .external-link}.
- Copy the secret's **Value** and add it as the **Client Secret** in n8n.