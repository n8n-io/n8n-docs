---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Medium credentials
description: Documentation for Medium credentials. Use these credentials to authenticate Medium in n8n, a workflow automation platform.
contentType: integration
---

# Medium credentials

You can use these credentials to authenticate the following nodes:

- [Medium](/integrations/builtin/app-nodes/n8n-nodes-base.medium/)

/// warning | Medium API no longer supported
Medium has stopped supporting the Medium API. These credentials still appear within n8n, but you can't configure new integrations using them.
///

## Prerequisites

- Create an account on [Medium](https://www.medium.com/){:target=_blank .external-link}.
- For OAuth2, request access to credentials by emailing [yourfriends@medium.com](mailto:yourfriends@medium.com).

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Medium's API documentation](https://github.com/Medium/medium-api-docs){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An API **Access Token**: Generate a token in **Settings >** [**Security and apps**](https://medium.com/me/settings/security){:target=_blank .external-link} **> Integration tokens**. Use the integration token this generates as your n8n **Access Token**.

Refer to the Medium API [Self-issued access tokens documentation](https://github.com/Medium/medium-api-docs?tab=readme-ov-file#21-self-issued-access-tokens){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate a **Client ID** and **Client Secret**, you'll need access to the **Developers** menu. From there, create a new application to generate the Client ID and Secret.

Use these settings for your new application:

- Select **OAuth 2** as the **Authorization Protocol**
- Copy the **OAuth Callback URL** from n8n and use this as the **Callback URL** in Medium.
