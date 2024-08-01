---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Baserow credentials
description: Documentation for Baserow credentials. Use these credentials to authenticate Baserow in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Baserow credentials

You can use these credentials to authenticate the following node:

- [Baserow](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/)

## Prerequisites

Create a [Baserow](https://baserow.io/){:target=_blank .external-link} account on any hosted Baserow instance or a self-hosted instance.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Baserow's documentation](https://baserow.io/docs/index){:target=_blank .external-link} for more information about the service.

Refer to [Baserow's auto-generated API documentation](https://baserow.io/api-docs){:target=_blank .external-link} for more information about the API specifically.

## Using basic auth

To configure this credential, you'll need:

- Your Baserow **Host**
- A **Username** and **Password** to log in with

Follow these steps:

1. Enter the **Host** for the Baserow instance:
    - For a Baserow-hosted instance: leave as `https://api.baserow.io`.
    - For a self-hosted instance: set to your self-hosted instance API URL.
2. Enter the **Username** for the user account n8n should use.
3. Enter the **Password** for that user account.

Refer to [Baserow's API Authentication documentation](https://baserow.io/docs/apis/rest-api#authentication) for information on creating user accounts.

