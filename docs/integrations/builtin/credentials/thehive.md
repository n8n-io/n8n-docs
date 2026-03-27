---
title: TheHive credentials
description: Documentation for TheHive credentials. Use these credentials to authenticate TheHive in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# TheHive credentials

You can use these credentials to authenticate the following nodes:

- [TheHive](/integrations/builtin/app-nodes/n8n-nodes-base.thehive.md)

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use these credentials with TheHive node for TheHive 3 or TheHive 4. If you're using TheHive5 node, use [TheHive 5 credentials](/integrations/builtin/credentials/thehive5.md).
///

## Prerequisites

Install [TheHive](https://docs.strangebee.com/thehive/installation/installation-methods/) on your server.

## Supported authentication methods

- API key

## Related resources

Refer to [TheHive 3's API documentation](https://docs.thehive-project.org/thehive/legacy/thehive3/api/) and [TheHive 4's API documentation](https://docs.thehive-project.org/thehive/) for more information about the services.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Create an API key from **Organization > Create API Key**. Refer to [API Authentication](https://docs.thehive-project.org/thehive/legacy/thehive3/api/authentication/) for more information.
- Your **URL**: The URL of your TheHive server.
- An **API Version**: Choose between:
    - **TheHive 3 (api v0)**
    - **TheHive 4 (api v1)**
    - For TheHive 5, use [TheHive 5 credentials](/integrations/builtin/credentials/thehive5.md) instead.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

