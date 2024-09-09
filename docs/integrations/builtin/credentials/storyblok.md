---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Storyblok credentials
description: Documentation for Storyblok credentials. Use these credentials to authenticate Storyblok in n8n, a workflow automation platform.
contentType: integration
---

# Storyblok credentials

You can use these credentials to authenticate the following nodes:

- [Storyblok](/integrations/builtin/app-nodes/n8n-nodes-base.storyblok/)

## Prerequisites

Create a [Storyblok](https://www.storyblok.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Content API key: For read-only access
- Management API key: For full CRUD operations

/// note | Content API support
n8n supports Content API v1 only.
///

## Related resources

Refer to Storyblok's [Content v1 API documentation](https://www.storyblok.com/docs/api/content-delivery/v1){:target=_blank .external-link} and [Management API documentation](https://www.storyblok.com/docs/api/management/getting-started/introduction){:target=_blank .external-link} for more information about the services.

## Using Content API key

To configure this credential, you'll need:

- A Content **API Key**: Go to your Storyblok workspace's **Settings > Access Tokens** to get an API key. Choose an **Access Level** of either **Public** (`version=published`) or **Preview** (`version-published` and `version=draft`). Enter this access token as your **API Key**. Refer to [How to retrieve and generate access tokens](https://www.storyblok.com/faq/retrieve-and-generate-access-tokens){:target=_blank .external-link} for more detailed instructions.

Refer to [Content v1 API Authentication](https://www.storyblok.com/docs/api/content-delivery/v1#topics/authentication){:target=_blank .external-link} for more information about supported operations with each Access Level.

## Using Management API key

To configure this credential, you'll need:

- A **Personal Access Token**: Go to [**My Account**](https://app.storyblok.com/#!/me/account){:target=_blank .external-link} **> Personal access tokens** to generate a new access token. Enter this access token as your **Personal Access Token**.

