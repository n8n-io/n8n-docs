---
title: Rocket.Chat credentials
description: Documentation for Rocket.Chat credentials. Use these credentials to authenticate Rocket.Chat in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Rocket.Chat credentials

You can use these credentials to authenticate the following nodes:

- [Rocket.Chat](/integrations/builtin/app-nodes/n8n-nodes-base.rocketchat.md)

## Prerequisites

- Create a [Rocket.Chat](https://rocket.chat/) account.
- Your account must have the `create-personal-access-tokens` permission to generate personal access tokens.

## Supported authentication methods

- API access token

## Related resources

<!--vale off-->
Refer to [Rocket.Chat's API documentation](https://developer.rocket.chat/reference/api/rest-api) for more information about the service.
<!--vale on-->

## Using API access token

To configure this credential, you'll need:

- Your **User ID**: Displayed when you generate an access token.
- An **Auth Key**: Your personal access token. To generate an access token, go to your **avatar > Account > Personal Access Tokens**. Copy the token and add it as the n8n **Auth Key**.
- Your Rocket.Chat **Domain**: Also known as your default URL or workspace URL.

Refer to [Personal Access Tokens](https://docs.rocket.chat/docs/manage-your-account-settings#personal-access-tokens) for more information.

