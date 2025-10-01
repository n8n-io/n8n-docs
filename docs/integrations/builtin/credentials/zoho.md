---
title: Zoho credentials
description: Documentation for Zoho credentials. Use these credentials to authenticate Zoho in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Zoho credentials

You can use these credentials to authenticate the following nodes:

- [Zoho CRM](/integrations/builtin/app-nodes/n8n-nodes-base.zohocrm.md)

## Prerequisites

Create a [Zoho](https://www.zoho.com/) account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Zoho's CRM API documentation](https://www.zoho.com/crm/developer/docs/api/v3/) for more information about the service.

## Using OAuth2

To configure this credential, you'll need:

- An **Access Token URL**: Zoho provides region-specific access token URLs. Select the region that best fits your Zoho data center:
    - **AU**: Select this option for Australia data center.
    - **CN**: Select this option for Canada data center.
    - **EU**: Select this option for the European Union data center.
    - **IN**: Select this option for the India data center.
    - **US**: Select this option for the United States data center.

Refer to [Multi DC](https://www.zoho.com/crm/developer/docs/api/v3/multi-dc.html) for more information about selecting a data center.

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, [register an application](https://www.zoho.com/accounts/protocol/oauth-setup.html) with Zoho.

Use these settings for your application:

- Select **Server-based Applications** as the **Client Type**.
- Copy the **OAuth Callback URL** from n8n and enter it in the Zoho **Authorized Redirect URIs** field.
- Copy the **Client ID** and **Client Secret** from the application and enter them in your n8n credential.

