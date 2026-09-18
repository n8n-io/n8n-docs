---
title: Metabase credentials
description: >-
  Documentation for Metabase credentials. Use these credentials to authenticate
  Metabase in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Metabase credentials
originalFilePath: integrations/builtin/credentials/metabase.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/metabase'
url: 'https://docs.n8n.io/integrations/builtin/credentials/metabase'
layout:
  description:
    visible: false
---

# Metabase credentials <a href="#metabase-credentials" id="metabase-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Metabase node](../app-nodes/n8n-nodes-base.metabase.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Metabase](https://www.metabase.com/) account with access to a Metabase instance.
- For API key authentication, a Metabase admin must create an API key in **Admin settings > Settings > Authentication > API keys > Manage**. Refer to [Metabase API keys](https://www.metabase.com/docs/latest/people-and-groups/api-keys) for more information.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth
- API key: Use this method if your Metabase instance uses SSO, or if you don't want to store a user password in n8n.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Metabase's API documentation](https://www.metabase.com/docs/latest/api-documentation) for more information about the service.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- A **URL**: Enter the base URL of your Metabase instance. If you're using a custom domain, use that URL.
- A **Username**: Enter your Metabase username.
- A **Password**: Enter your Metabase password.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **URL**: Enter the base URL of your Metabase instance. If you're using a custom domain, use that URL.
- An **API Key**: Enter a Metabase API key. To create one, go to **Admin settings > Settings > Authentication > API keys > Manage** and select **Create API Key**. Enter a name and select a **Group** for the key. The key gets the permissions of that group. Copy the key when Metabase displays it, as Metabase can't show it again.
