---
title: TheHive 5 credentials
description: >-
  Documentation for TheHive 5 credentials. Use these credentials to authenticate
  TheHive in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: TheHive 5 credentials
originalFilePath: integrations/builtin/credentials/thehive5.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/thehive5'
url: 'https://docs.n8n.io/integrations/builtin/credentials/thehive5'
layout:
  description:
    visible: false
---

# TheHive 5 credentials <a href="#thehive-5-credentials" id="thehive-5-credentials"></a>

You can use these credentials to authenticate the following nodes with TheHive 5.

- [TheHive 5](../app-nodes/n8n-nodes-base.thehive5.md)

{% hint style="info" %}
**TheHive and TheHive 5**

n8n provides two nodes for TheHive. Use these credentials with TheHive 5 node. If you're using TheHive node for TheHive 3 or TheHive 4, use [TheHive credentials](thehive.md).
{% endhint %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Install [TheHive 5](https://docs.strangebee.com/thehive/download/) on your server.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [TheHive's API documentation](https://docs.strangebee.com/thehive/api-docs/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Users with `orgAdmin` and `superAdmin` accounts can generate API keys:
    - `orgAdmin` account: Go to **Organization > Create API Key** for the user you wish to generate a key for.
    - `superAdmin` account: Go to **Users > Create API Key** for the user you wish to generate a key for.
    - Refer to [API Authentication](https://docs.strangebee.com/cortex/api/api-guide/?h=api+key#authentication) for more information.
- A **URL**: The URL of your TheHive server.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.


