---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: TheHive 5 credentials
description: Documentation for TheHive 5 credentials. Use these credentials to authenticate TheHive in n8n, a workflow automation platform.
contentType: integration
---

# TheHive 5 credentials

You can use these credentials to authenticate the following nodes with TheHive 5.

- [TheHive 5](/integrations/builtin/app-nodes/n8n-nodes-base.thehive5/)

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use these credentials with TheHive 5 node. If you're using TheHive node for TheHive 3 or TheHive 4, use [TheHive credentials](/integrations/builtin/credentials/thehive/).
///

## Prerequisites

Install [TheHive 5](https://docs.strangebee.com/thehive/download/){:target=_blank .external-link} on your server.

## Supported authentication methods

- API key

## Related resources

Refer to [TheHive's API documentation](https://docs.strangebee.com/thehive/api-docs/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Users with `orgAdmin` and `superAdmin` accounts can generate API keys:
    - `orgAdmin` account: Go to **Organization > Create API Key** for the user you wish to generate a key for.
    - `superAdmin` account: Go to **Users > Create API Key** for the user you wish to generate a key for.
    - Refer to [API Authentication](https://docs.strangebee.com/cortex/api/api-guide/?h=api+key#authentication){:target=_blank .external-link} for more information.
- A **URL**: The URL of your TheHive server.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.


