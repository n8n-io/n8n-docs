---
title: TheHive credentials
description: >-
  Documentation for TheHive credentials. Use these credentials to authenticate
  TheHive in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: TheHive credentials
originalFilePath: integrations/builtin/credentials/thehive.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/thehive'
url: 'https://docs.n8n.io/integrations/builtin/credentials/thehive'
layout:
  description:
    visible: false
---

# TheHive credentials <a href="#thehive-credentials" id="thehive-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [TheHive](../app-nodes/n8n-nodes-base.thehive.md)

{% hint style="info" %}
**TheHive and TheHive 5**

n8n provides two nodes for TheHive. Use these credentials with TheHive node for TheHive 3 or TheHive 4. If you're using TheHive5 node, use [TheHive 5 credentials](thehive5.md).
{% endhint %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Install [TheHive](https://docs.strangebee.com/thehive/installation/installation-methods/) on your server.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [TheHive 3's API documentation](https://docs.thehive-project.org/thehive/legacy/thehive3/api/) and [TheHive 4's API documentation](https://docs.thehive-project.org/thehive/) for more information about the services.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Create an API key from **Organization > Create API Key**. Refer to [API Authentication](https://docs.thehive-project.org/thehive/legacy/thehive3/api/authentication/) for more information.
- Your **URL**: The URL of your TheHive server.
- An **API Version**: Choose between:
    - **TheHive 3 (api v0)**
    - **TheHive 4 (api v1)**
    - For TheHive 5, use [TheHive 5 credentials](thehive5.md) instead.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

