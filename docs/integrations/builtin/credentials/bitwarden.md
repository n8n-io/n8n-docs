---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Bitwarden credentials
description: Documentation for Bitwarden credentials. Use these credentials to authenticate Bitwarden in n8n, a workflow automation platform.
contentType: integration
---

# Bitwarden credentials

You can use these credentials to authenticate the following node:

- [Bitwarden](/integrations/builtin/app-nodes/n8n-nodes-base.bitwarden/)

## Prerequisites

Create a [Bitwarden](https://vault.bitwarden.com/#/register?org=teams){:target=_blank .external-link} Teams organization or Enterprise organization account. (Bitwarden only makes the Bitwarden Public API available for these [organization](https://bitwarden.com/help/about-organizations/){:target=_blank .external-link} plans.)

## Supported authentication methods

- API key

## Related resources

Refer to [Bitwarden's Public API documentation](https://bitwarden.com/help/public-api/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- A **Client ID**: Provided when you generate an API key
- A **Client Secret**: Provided when you generate an API key
- The **Environment**:
    - Choose **Cloud-hosted** if you don't self-host Bitwarden. No further configuration required.
    - Choose **Self-hosted** if you host Bitwarden on your own server. Enter your **Self-hosted domain** in the appropriate field.

The Client ID and Client Secret must be for an **Organization API Key**, not a Personal API Key. Refer to the [Bitwarden Public API Authentication documentation](https://bitwarden.com/help/public-api/#authentication){:target=_blank .external-link} for instructions on generating an Organization API Key.

