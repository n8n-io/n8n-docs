---
title: Raindrop credentials
description: Documentation for Raindrop credentials. Use these credentials to authenticate Raindrop in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Raindrop credentials

You can use these credentials to authenticate the following nodes:

- [Raindrop](/integrations/builtin/app-nodes/n8n-nodes-base.raindrop.md)

## Prerequisites

Create a [Raindrop](https://raindrop.io/) account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Raindrop's API documentation](https://developer.raindrop.io/) for more information about the service.

## Using OAuth

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

Generate both by creating a Raindrop app.

To create an app, go to **Settings >** [**Integrations**](https://app.raindrop.io/settings/integrations) and select **+ Create new app** in the **For Developers** section.

Use these settings for your app:

- Copy the **OAuth Redirect URL** from n8n and add it as a **Redirect URI** in your app.
- Copy the **Client ID** and **Client Secret** from the Raindrop app and enter them in your n8n credential.

