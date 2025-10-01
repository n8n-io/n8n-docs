---
title: Zabbix credentials
description: Documentation for the Zabbix credentials. Use these credentials to authenticate Zabbix in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Zabbix credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

<!-- If this credential has numerous prerequisites, include the Prerequisites section below and remove the account reference in the in the Using_Auth method_ section.
If a single prereq. like having an account, delete the Prerequisites section here and just update the intro statement in the Using _Auth method_ section -->
## Prerequisites

Create a [Zabbix Cloud](https://www.zabbix.com/) account or self-host your own Zabbix server.

## Supported authentication methods

* API key

## Related resources

Refer to [Zabbix's API documentation](https://www.zabbix.com/documentation/current/en/manual/api) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/zabbix/) on n8n's website.


## Using API key

To configure this credential, you'll need:

- an **API Token**: An API key for your Zabbix user.
- the **URL**: The URL of your Zabbix server. Don't include `/zabbix` as part of the URL.

Refer to [Zabbix's API documentation](https://www.zabbix.com/documentation/current/en/manual/api#authentication) for more information about authenticating to the service.
