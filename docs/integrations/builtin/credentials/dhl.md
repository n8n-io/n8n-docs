---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: DHL credentials
description: Documentation for DHL credentials. Use these credentials to authenticate DHL in n8n, a workflow automation platform.
contentType: integration
---

# DHL credentials

You can use these credentials to authenticate the following nodes:

- [DHL](/integrations/builtin/app-nodes/n8n-nodes-base.dhl/)

## Prerequisites

- Create a [DHL Developer](https://developer.dhl.com/user/register){:target=_blank .external-link} account.
- [Create an app](https://support-developer.dhl.com/support/solutions/articles/47001177011-how-to-create-an-app-){:target=_blank .external-link}.

/// note | Recommended API
DHL offers a [variety of APIs](https://developer.dhl.com/api-catalog){:target=_blank .external-link}. If you're testing, n8n recommends creating an app for the `Shipment Tracking - Unifed` API. Other APIs may [require approval](https://support-developer.dhl.com/support/solutions/articles/47001177010-which-apis-have-the-self-service-api-onboarding-available-){:target=_blank .external-link} for access.
///

## Supported authentication methods

- API key

## Related resources

Refer to [DHL's Developer documentation](https://support-developer.dhl.com/support/home){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Once you've created an app, view your app details and **Show key** to view and copy the API key.

