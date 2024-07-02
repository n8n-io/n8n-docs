---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Taiga credentials
description: Documentation for Taiga credentials. Use these credentials to authenticate Taiga in n8n, a workflow automation platform.
contentType: integration
---

# Taiga credentials

You can use these credentials to authenticate the following nodes:

- [Taiga](/integrations/builtin/app-nodes/n8n-nodes-base.taiga/)
- [Taiga Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.taigatrigger/)

## Prerequisites

Create a [Taiga](https://taiga.io/){:target=_blank .external-link} account.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Taiga's API documentation](https://docs.taiga.io/api.html){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- A **Username**: Enter your username or user email address. Refer to [Normal login](https://docs.taiga.io/api.html#auth-normal-login){:target=_blank .external-link} for more information.
- A **Password**: Enter your password.
- The **Environment**: Choose between **Cloud** or **Self-Hosted**. For **Self-Hosted** instances, you'll also need to add:
    - The **URL**: Enter your Taiga URL.

