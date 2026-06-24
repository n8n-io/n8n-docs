---
title: Microsoft Azure Monitor credentials
description: >-
  Documentation for the Microsoft Azure Monitor credentials. Use these
  credentials to authenticate Microsoft Azure Monitor in n8n, a workflow
  automation platform.
contentType:
  - integration
  - reference
nodeTitle: Microsoft Azure Monitor credentials
originalFilePath: integrations/builtin/credentials/microsoftazuremonitor.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/microsoftazuremonitor'
url: 'https://docs.n8n.io/integrations/builtin/credentials/microsoftazuremonitor'
layout:
  description:
    visible: false
---
# Microsoft Azure Monitor credentials <a href="#microsoft-azure-monitor-credentials" id="microsoft-azure-monitor-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tpXm8e1W7wVyh16Nhf6p/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* Create a Microsoft Azure account or subscription
* An app registered in Microsoft Entra ID

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Microsoft Azure Monitor's API documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/azure-monitor-rest-api-index) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a Microsoft Azure account and:

- A **Client ID**
- A **Client Secret**
- A **Tenant ID**
- The **Resource** you plan to access

Refer to [Microsoft Azure Monitor's API documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/api/access-api?tabs=rest#set-up-authentication) for more information about authenticating to the service.
