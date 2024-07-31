---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Line credentials
description: Documentation for Line credentials. Use these credentials to authenticate Line in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Line credentials

You can use these credentials to authenticate the following nodes:

- [Line](/integrations/builtin/app-nodes/n8n-nodes-base.line/)

## Prerequisites

- Create a [Line](https://line.me/en/){:target=_blank .external-link} account.
- Connect Line with [Line Notify](https://notify-bot.line.me/en/)

## Supported authentication methods

- Notify OAuth2

## Related resources

Refer to [Line Notify's API documentation](https://notify-bot.line.me/doc/en/){:target=_blank .external-link} for more information about the service.

## Using Notify OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated once you add a new registered service.
- A **Client Secret**: Generated once you add a new registered service.

To generate a **Client ID** and **Client Secret**, [add a new registered service](https://notify-bot.line.me/my/services/new){:target=_blank .external-link}. Use the **OAuth Callback URL** from n8n as the **Callback URL** for the service. Once you've saved the new service, copy the **Client ID** and **Client Secret** from the service and paste them into the n8n credential.