---
title: Rocket.Chat credentials
description: >-
  Documentation for Rocket.Chat credentials. Use these credentials to
  authenticate Rocket.Chat in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Rocket.Chat credentials
originalFilePath: integrations/builtin/credentials/rocketchat.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/rocketchat'
url: 'https://docs.n8n.io/integrations/builtin/credentials/rocketchat'
layout:
  description:
    visible: false
---

# Rocket.Chat credentials <a href="#rocketchat-credentials" id="rocketchat-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Rocket.Chat](../app-nodes/n8n-nodes-base.rocketchat.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Rocket.Chat](https://rocket.chat/) account.
- Your account must have the `create-personal-access-tokens` permission to generate personal access tokens.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token

## Related resources <a href="#related-resources" id="related-resources"></a>


Refer to [Rocket.Chat's API documentation](https://developer.rocket.chat/reference/api/rest-api) for more information about the service.


## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need:

- Your **User ID**: Displayed when you generate an access token.
- An **Auth Key**: Your personal access token. To generate an access token, go to your **avatar > Account > Personal Access Tokens**. Copy the token and add it as the n8n **Auth Key**.
- Your Rocket.Chat **Domain**: Also known as your default URL or workspace URL.

Refer to [Personal Access Tokens](https://docs.rocket.chat/docs/manage-your-account-settings#personal-access-tokens) for more information.

