---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Microsoft Azure Monitor credentials
description: Documentation for the Microsoft Azure Monitor credentials. Use these credentials to authenticate Microsoft Azure Monitor in n8n, a workflow automation platform.
contentType: [integration, reference]
---
# Microsoft Azure Monitor credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

* Create a Microsoft Azure account or subscription
* An app registered in Microsoft Entra ID

## Supported authentication methods

* OAuth2

## Related resources

Refer to [Microsoft Azure Monitor's API documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/azure-monitor-rest-api-index){:target=_blank .external-link} for more information about the service.

## Using OAuth2

To configure this credential, you'll need a Microsoft Azure account and:

- A **Client ID**
- A **Client Secret**
- A **Tenant ID**
- The **Resource** you plan to access

Refer to [Microsoft Azure Monitor's API documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/api/access-api?tabs=rest#set-up-authentication){:target=_blank .external-link} for more information about authenticating to the service.
