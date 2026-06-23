---
title: Zabbix credentials
description: >-
  Documentation for the Zabbix credentials. Use these credentials to
  authenticate Zabbix in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Zabbix credentials
originalFilePath: integrations/builtin/credentials/zabbix.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/zabbix'
url: 'https://docs.n8n.io/integrations/builtin/credentials/zabbix'
layout:
  description:
    visible: false
---

# Zabbix credentials <a href="#zabbix-credentials" id="zabbix-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tpXm8e1W7wVyh16Nhf6p/" %}


## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Zabbix Cloud](https://www.zabbix.com/) account or self-host your own Zabbix server.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Zabbix's API documentation](https://www.zabbix.com/documentation/current/en/manual/api) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/zabbix/) on n8n's website.


## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- an **API Token**: An API key for your Zabbix user.
- the **URL**: The URL of your Zabbix server. Don't include `/zabbix` as part of the URL.

Refer to [Zabbix's API documentation](https://www.zabbix.com/documentation/current/en/manual/api#authentication) for more information about authenticating to the service.
