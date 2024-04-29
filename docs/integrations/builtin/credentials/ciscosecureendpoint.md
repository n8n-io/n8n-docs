---
title: Cisco Secure Endpoint credentials
description: Documentation for the Cisco Secure Endpoint credentials. Use these credentials to authenticate Cisco Secure Endpoint in n8n, a workflow automation platform.
---

# Cisco Secure Endpoint credentials

You can use these credentials to authenticate when using the [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](/integrations/custom-operations/).

## Prerequisites

- Create a [Cisco DevNet developer account](https://developer.cisco.com){:target=_blank .external-link}.
- Access to a [Cisco Secure Endpoint license](https://www.cisco.com/site/us/en/products/security/endpoint-security/secure-endpoint/index.html){:target=_blank .external-link}.

## Authentication methods

- OAuth2

## Related resources

Refer to [Cisco Secure Endpoint's documentation](https://developer.cisco.com/docs/secure-endpoint/introduction/){:target=_blank .external-link} for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/cisco-secure-endpoint/){:target=_blank .external-link} on n8n's website.

## Using OAuth2

To configure this credential, you'll need:

- The **Region** for your Cisco Secure Endpoint. Options are:
    - Asia Pacific, Japan, and China
    - Europe
    - North America
- A **Client ID**
- A **Client Secret**

In order to obtain the Client ID and Client Secret, you'll need to Register a SecureX API Client. Refer to [Cisco Secure Endpoint's authentication documentation](https://developer.cisco.com/docs/secure-endpoint/authentication/#authentication){:target=_blank .external-link} for detailed instructions. Use the SecureX **Client Password** as the **Client Secret** within the n8n credential.

