---
title: Todoist credentials
description: >-
  Documentation for Todoist credentials. Use these credentials to authenticate
  Todoist in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Todoist credentials
originalFilePath: integrations/builtin/credentials/todoist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/todoist'
url: 'https://docs.n8n.io/integrations/builtin/credentials/todoist'
layout:
  description:
    visible: false
---

# Todoist credentials <a href="#todoist-credentials" id="todoist-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Todoist](../app-nodes/n8n-nodes-base.todoist.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Todoist's REST API documentation](https://developer.todoist.com/rest/v2/#overview) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [Todoist](https://todoist.com/) account and:

- An **API Key**

To get your **API Key**:

1. In Todoist, open your [**Integration settings**](https://todoist.com/prefs/integrations).
2. Select the **Developer** tab.
3. Copy your **API token** and enter it as the **API Key** in your n8n credential.

Refer to [Find your API token](https://todoist.com/help/articles/find-your-api-token-Jpzx9IIlB) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you'll need a [Todoist](https://todoist.com/) account and:

- A **Client ID**
- A **Client Secret**

Get both by creating an application:

1. Open the Todoist [App Management Console](https://developer.todoist.com/appconsole.html).
2. Select **Create a new app**.
3. Enter an **App name** for your app, like `n8n integration`.
4. Select **Create app**.
5. Copy the n8n **OAuth Redirect URL** and enter it as the **OAuth redirect URL** in Todoist.
6. Copy the **Client ID** from Todoist and enter it in your n8n credential.
7. Copy the **Client Secret** from Todoist and enter it in your n8n credential.
8. Configure the rest of your Todoist app as it makes sense for your use case.

Refer to the Todoist [Authorization Guide](https://developer.todoist.com/guides/#authorization) for more information.
