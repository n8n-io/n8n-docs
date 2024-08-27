---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Bubble credentials
description: Documentation for Bubble credentials. Use these credentials to authenticate Bubble in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Bubble credentials

You can use these credentials to authenticate the following nodes:

- [Bubble](/integrations/builtin/app-nodes/n8n-nodes-base.bubble/)

/// note | API access
You need a paid plan to access the Bubble APIs.
///

## Supported authentication methods

- API key

## Related resources

Refer to [Bubble's API documentation](https://manual.bubble.io/help-guides/integrations/api){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need a paid [Bubble](https://bubble.io){:target=_blank .external-link} account and:

- An **API Token**
- An **App Name**
- Your **Domain**, if you're using a custom domain

To set it up, you'll need to create an app:

1. Go to the [**Apps**](https://bubble.io/home/apps){:target=_blank .external-link} page in Bubble.
1. Select **Create an app**.
1. Enter a **Name** for your app, like `n8n-integration`.
1. Select **Get started**. The app's details open.
1. In the left navigation, select **Settings** (the gear cog icon).
1. Select the **API** tab.
1. In the **Public API Endpoints** section, check the box to **Enable Data API**.
1. The page displays the **Data API root URL**, for example: `https://n8n-integration.bubbleapps.io/version-test/api/1.1/obj`.
1. Copy the part of the URL after `https://` and before `.bubbleapps.io` and enter it in n8n as the **App Name**. In the above example, you'd enter `n8n-integration`.
1. Select **Generate a new API token**.
8. Enter an **API Token Label**, like `n8n integration`.
1. Copy the **Private key** and enter it as the **API Token** in your n8n credential.
    - Refer to [Data API | Authentication](https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/authentication){:target=_blank .external-link} for more information on generating API tokens.
1. In n8n, select the **Environment** that best matches your app:
    - Select **Development** for an app that you haven't deployed, accessed at `https://appname.bubbleapps.io/version-test` or `https://www.mydomain.com/version-test`.
    - Select **Live** for an app that you've [deployed](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/deploying-your-app){:target=_blank .external-link}, accessed at `https://appname.bubbleapps.io` or `https://www.mydomain.com`.
1. In n8n, select your **Hosting**:
    - If you haven't set up a custom domain, select **Bubble Hosting**.
    - If you've set up a [custom domain](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/custom-domain-and-dns){:target=_blank .external-link}, select **Self Hosted** and enter your custom **Domain**.

Refer to Bubble's [Creating and managing apps](https://manual.bubble.io/help-guides/getting-started/creating-and-managing-apps){:target=_blank .external-link} documentation for more information.
