---
title: Raindrop credentials
description: >-
  Documentation for Raindrop credentials. Use these credentials to authenticate
  Raindrop in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Raindrop credentials
originalFilePath: integrations/builtin/credentials/raindrop.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/raindrop'
url: 'https://docs.n8n.io/integrations/builtin/credentials/raindrop'
layout:
  description:
    visible: false
---

# Raindrop credentials <a href="#raindrop-credentials" id="raindrop-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Raindrop](../app-nodes/n8n-nodes-base.raindrop.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Raindrop](https://raindrop.io/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Raindrop's API documentation](https://developer.raindrop.io/) for more information about the service.

## Using OAuth <a href="#using-oauth" id="using-oauth"></a>

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

Generate both by creating a Raindrop app.

To create an app, go to **Settings >** [**Integrations**](https://app.raindrop.io/settings/integrations) and select **+ Create new app** in the **For Developers** section.

Use these settings for your app:

- Copy the **OAuth Redirect URL** from n8n and add it as a **Redirect URI** in your app.
- Copy the **Client ID** and **Client Secret** from the Raindrop app and enter them in your n8n credential.

