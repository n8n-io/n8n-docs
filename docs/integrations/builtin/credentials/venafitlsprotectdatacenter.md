---
title: Venafi TLS Protect Datacenter credentials
description: Documentation for Venafi TLS Protect Datacenter credentials. Use these credentials to authenticate Venafi TLS Protect Datacenter in n8n, a workflow automation platform.
contentType: [integration, reference]
---
<!-- vale off -->
# Venafi TLS Protect Datacenter credentials

You can use these credentials to authenticate the following nodes:

* [Venafi TLS Protect Datacenter node](/integrations/builtin/app-nodes/n8n-nodes-base.venafitlsprotectdatacenter.md)

## Prerequisites

- Create a Venafi [TLS Protect Datacenter](https://venafi.com/) account.
- Set the expiration and refresh time for tokens. Refer to [Setting up token authentication](https://docs.venafi.com/Docs/current/TopNav/Content/SDK/AuthSDK/t-SDKa-Setup-OAuth.php) for more information.
- Create an [API integration](https://docs.venafi.com/Docs/current/TopNav/Content/API-ApplicationIntegration/c-APIAppIntegrations-about.php) in **API > Integrations**. Refer to [Integrating other systems with Venafi products](https://docs.venafi.com/Docs/current/TopNav/Content/API-ApplicationIntegration/t-APIAppIntegrations-creating.php) for detailed instructions.
    - Take note of the Client ID for your integration.
    - Choose the scopes needed for the operations you want to perform within n8n. Refer to the scopes table in [Integrating other systems with Venafi products](https://docs.venafi.com/Docs/current/TopNav/Content/API-ApplicationIntegration/t-APIAppIntegrations-creating.php) for more details on available scopes.

## Supported authentication methods

- API integration

## Related resources

Refer to [Venafi's API integration documentation](https://docs.venafi.com/Docs/currentSDK/TopNav/Content/SDK/WebSDK/c-sdk-AboutThisGuide.php) for more information about the service.

## Using API integration

To configure this credential, you'll need:

- A **Domain**: Enter your Venafi TLS Protect Datacenter domain.
- A **Client ID**: Enter the **Client ID** from your API integration. Refer to the information and links in [Prerequisites](#prerequisites) for more information on creating an API integration.
- A **Username**: Enter your username.
- A **Password**: Enter your password.
- **Allow Self-Signed Certificates**: If turned on, the credential will allow self-signed certificates.

<!-- vale on -->