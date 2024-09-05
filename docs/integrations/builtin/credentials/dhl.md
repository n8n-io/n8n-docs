---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: DHL credentials
description: Documentation for DHL credentials. Use these credentials to authenticate DHL in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# DHL credentials

You can use these credentials to authenticate the following nodes:

- [DHL](/integrations/builtin/app-nodes/n8n-nodes-base.dhl/)

## Supported authentication methods

- API key

## Related resources

Refer to [DHL's Developer documentation](https://support-developer.dhl.com/support/home){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need a [DHL Developer](https://developer.dhl.com/user/register){:target=_blank .external-link} account and:

- An **API Key**

To get an API key, create an app:

1. In the DHL Developer portal, select the user icon to open your [User Apps](https://developer.dhl.com/user/apps){:target=_blank .external-link}.
2. Select **+ Create App**.
3. Enter an **App name**, like `n8n integration`.
4. Enter a **Machine name**, like `n8n_integration`.
4. In **SELECT APIs**, select **Shipment Tracking - Unified**. The API is added to the **Add API to app** section.
5. In the **Add API to app** section, select the **+** next to the **Shipment Tracking - Unified** API.
6. Select **Create App**. The **Apps** page opens, displaying the app you just created.
7. Select the app you just created to view its details.
8. Select **Show key** next to **API Key**.
9. Copy the **API Key** and enter it in your n8n credential.

Refer to [How to create an app?](https://support-developer.dhl.com/support/solutions/articles/47001177011-how-to-create-an-app-){:target=_blank .external-link} for more information.
