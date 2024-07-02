---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: TheHive credentials
description: Documentation for TheHive credentials. Use these credentials to authenticate TheHive in n8n, a workflow automation platform.
contentType: integration
---

# TheHive credentials

You can use these credentials to authenticate the following nodes:

- [TheHive](/integrations/builtin/app-nodes/n8n-nodes-base.thehive/)

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use these credentials with TheHive node for TheHive 3 or TheHive 4. If you're using TheHive5 node, use [TheHive 5 credentials](/integrations/builtin/credentials/thehive5/).
///

## Prerequisites

Install [TheHive](https://github.com/TheHive-Project/TheHiveDocs/blob/master/installation/install-guide.md){:target=_blank .external-link} on your server.

## Supported authentication methods

- API key

## Related resources

Refer to [TheHive 3's API documentation](https://docs.thehive-project.org/thehive/legacy/thehive3/api/){:target=_blank .external-link} and [TheHive 4's API documentation](https://docs.thehive-project.org/thehive/){:target=_blank .external-link} for more information about the services.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Create an API key from **Organization > Create API Key**. Refer to [API Authentication](https://docs.thehive-project.org/thehive/legacy/thehive3/api/authentication/){:target=_blank .external-link} for more information.
- Your **URL**: The URL of your TheHive server.
- An **API Version**: Choose between:
    - **TheHive 3 (api v0)**
    - **TheHive 4 (api v1)**
    - For TheHive 5, use [TheHive 5 credentials](/integrations/builtin/credentials/thehive5/) instead.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

