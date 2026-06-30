---
title: Storyblok credentials
description: >-
  Documentation for Storyblok credentials. Use these credentials to authenticate
  Storyblok in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Storyblok credentials
originalFilePath: integrations/builtin/credentials/storyblok.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/storyblok'
url: 'https://docs.n8n.io/integrations/builtin/credentials/storyblok'
layout:
  description:
    visible: false
---

# Storyblok credentials <a href="#storyblok-credentials" id="storyblok-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Storyblok](../app-nodes/n8n-nodes-base.storyblok.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Storyblok](https://www.storyblok.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Content API key: For read-only access
- Management API key: For full CRUD operations

{% hint style="info" %}
**Content API support**

n8n supports Content API v1 only.
{% endhint %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to Storyblok's [Content v1 API documentation](https://www.storyblok.com/docs/api/content-delivery/v1) and [Management API documentation](https://www.storyblok.com/docs/api/management/getting-started/introduction) for more information about the services.

## Using Content API key <a href="#using-content-api-key" id="using-content-api-key"></a>

To configure this credential, you'll need:

- A Content **API Key**: Go to your Storyblok workspace's **Settings > Access Tokens** to get an API key. Choose an **Access Level** of either **Public** (`version=published`) or **Preview** (`version-published` and `version=draft`). Enter this access token as your **API Key**. Refer to [How to retrieve and generate access tokens](https://www.storyblok.com/faq/retrieve-and-generate-access-tokens) for more detailed instructions.

Refer to [Content v1 API Authentication](https://www.storyblok.com/docs/api/content-delivery/v1#topics/authentication) for more information about supported operations with each Access Level.

## Using Management API key <a href="#using-management-api-key" id="using-management-api-key"></a>

To configure this credential, you'll need:

- A **Personal Access Token**: Go to [**My Account**](https://app.storyblok.com/#!/me/account) **> Personal access tokens** to generate a new access token. Enter this access token as your **Personal Access Token**.

