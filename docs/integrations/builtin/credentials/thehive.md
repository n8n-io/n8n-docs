---
title: TheHive credentials
description: Documentation for TheHive credentials. Use these credentials to authenticate TheHive in n8n, a workflow automation platform.
contentType: integration
---

# TheHive credentials

You can use these credentials to authenticate the following nodes with TheHive.

- [TheHive](/integrations/builtin/app-nodes/n8n-nodes-base.thehive/)

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use these credentials with TheHive node, for version 3 or 4 API of the API. If you are using TheHive5 node for version 5 of the API, use [TheHive 5 credentials](/integrations/builtin/credentials/thehive5/).
///
## Prerequisites

Install [TheHive](https://github.com/TheHive-Project/TheHiveDocs/blob/master/installation/install-guide.md){:target=_blank .external-link} on your server.

## Using API Key

1. Access your TheHive dashboard.
2. Click on the **Organization** tab in the top right.
3. Click on the **Create API Key** button for the user you want to generate the API Key for.
4. Use this **API Key** and your instance **URL** with your TheHive node credentials in n8n.

![Getting TheHive credentials](/_images/integrations/builtin/credentials/thehive/using-api.gif)

