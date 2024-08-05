---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook App credentials
description: Documentation for Facebook App credentials. Use these credentials to authenticate Facebook App in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Facebook App credentials

You can use these credentials to authenticate the following nodes:

- [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/)

/// note | Facebook Graph API credentials
If you want to create credentials for the [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi/) node, follow the instructions in the [Facebook Graph API credentials](/integrations/builtin/credentials/facebookgraph/) documentation.
///

## Prerequisites

- Create a [Facebook](https://www.facebook.com/){:target=_blank .external-link} account.
- Sign up for [Meta for Developers](https://developers.facebook.com/){:target=_blank .external-link} with that account.

/// note | Unverified apps
Facebook will only let you have a developer or administrator role on a maximum of 15 apps that aren't already linked to a Meta Verified Business Account. Refer to [Limitations | Create an app](https://developers.facebook.com/docs/development/create-an-app#limitations){:target=_blank .external-link} if you're over that limit.
///

## Supported authentication methods

- App access token

## Related resources

Refer to [Meta's Graph API documentation](https://developers.facebook.com/docs/graph-api/overview){:target=_blank .external-link} for more information about the service.

## Using app access token

To configure this credential, you'll need:

- An app **Access Token**: Generate an access token by creating a Meta app.
- An optional **App Secret**: When you add an App Secret, n8n will verify this signature to validate the integrity and origin of the payload.

There are xx steps in setting up your credential:

1. Create a [Meta app](https://developers.facebook.com/docs/development/create-an-app){:target=_blank .external-link}.
2. Generate an App Access Token for that app.
3. Optional: Generate an **App Secret** for the app.

Refer to the detailed instructions below for each step.

### Create a Meta app

To create a Meta app:

1. Go to the Meta Developer [App Dashboard](https://developers.facebook.com/apps){:target=_blank .external-link} and select **Create App**.
2. If you have a business portfolio and you're ready to connect the app to it, select the business portfolio. If you don't have a business portfolio or you're not ready to connect the app to the portfolio, select **I don’t want to connect a business portfolio yet** and select **Next**. The **Use cases** page opens.
3. Select **Other**, then select **Business** and **Next**.
5. Complete the essential information:
    * Add an **App name**.
    * Add an **App contact email**.
    * Here again you can connect to a business portfolio or skip it.
6. The **Add products to your app** page appears. Select **Webhooks**.
7. The **Webhooks** product opens. **Subscribe** to the objects you want to receive Facebook Trigger notifications about.

### Generate an App Access Token

1. In a separate tab or window, open the [Graph API explorer](https://developers.facebook.com/tools/explorer/).
2. Select the **Meta App** you just created in the **Access Token** section.
3. In **User or Page**, select **App Token**.
4. Select **Generate Access Token**.
5. Copy that token. Enter it in your n8n credential as the **Access Token**.
6. Return to the tab or window where the app's **Webhooks** product configuration is open. **Subscribe** to the objects you want to receive Facebook Trigger notifications about.
7. Enter the **Access Token** you copied above as the **Verify token**.
8. Copy the **Webhook URL** from n8n and enter it as the **Callback URL** in your Meta App.

Refer to the Meta instructions for [Your First Request](https://developers.facebook.com/docs/graph-api/get-started#get-started){:target=_blank .external-link} for more information on generating the token.

### Generate an App Secret

When you add an App Secret, n8n will verify this signature to validate the integrity and origin of the payload.

To generate an App Secret:

1. Return to the window or tab where the **Webhooks** product configuration was open.
2. Select **App settings > Basic** from the left menu.
3. Select the **Show** button next to the **App secret** field.
4. The page prompts you to re-enter your Facebook account credentials. Once you do so, Meta shows the App Secret.
5. Highlight it to select it, copy it, and paste this into your n8n credential as the **App Secret**.

Refer to the [App Dashboard Settings documentation](https://developers.facebook.com/docs/development/create-an-app/app-dashboard#settings){:target=_blank .external-link} and the [App Secret documentation](https://developers.facebook.com/docs/facebook-login/security#appsecret){:target=_blank .external-link} for more information.
