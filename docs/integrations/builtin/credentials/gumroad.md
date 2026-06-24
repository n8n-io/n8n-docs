---
title: Gumroad credentials
description: >-
  Documentation for Gumroad credentials. Use these credentials to authenticate
  Gumroad in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Gumroad credentials
originalFilePath: integrations/builtin/credentials/gumroad.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/gumroad'
url: 'https://docs.n8n.io/integrations/builtin/credentials/gumroad'
layout:
  description:
    visible: false
---

# Gumroad credentials <a href="#gumroad-credentials" id="gumroad-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Gumroad Trigger](../trigger-nodes/n8n-nodes-base.gumroadtrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Gumroad](https://gumroad.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Gumroad's API documentation](https://app.gumroad.com/api) for more information about the service.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need:

- An API **Access Token**: Create an application to generate an access token. Refer to the [Gumroad Create an application for the API documentation](https://gumroad.com/help/article/280-create-application-api) for detailed instructions on creating a new application and generating an access token.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8WBawhAsMzeYnydxU5Sr/" %}

If you're [self-hosting n8n](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n), you'll need:

- An **OAuth Redirect URL**
- A **Client ID**
- A **Client Secret**

To get this information, create a Gumroad application:

1. In Gumroad, go to **Settings > Advanced**. Refer to the [Gumroad Create an application for the API documentation](https://gumroad.com/help/article/280-create-application-api) for detailed instructions.
2. Copy the **OAuth Redirect URL** from your n8n credential and enter it as the **Redirect URI** when you create the application in Gumroad.
3. Create the application. Gumroad generates an **Application ID** and **Application Secret**.
4. Copy the **Application ID** and paste it into the **Client ID** in your n8n credential.
5. Copy the **Application Secret** and paste it into the **Client Secret** in your n8n credential.
6. To request scopes beyond the default `view_sales`, enable **Custom Scopes** in your n8n credential and enter the scopes you need. Otherwise, leave it off.

