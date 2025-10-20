---
title: Facebook Lead Ads credentials
description: Documentation for the Facebook Lead Ads credentials. Use these credentials to authenticate Facebook Lead Ads in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Facebook Lead Ads credentials

You can use these credentials to authenticate the following nodes:

* [Facebook Lead Ads trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger.md)

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Facebook Lead Ads' documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/) for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/facebook-lead-ads-trigger/) on n8n's website.

## Using OAuth2

To configure this credential, you'll need a [Meta for Developers](https://developers.facebook.com/) account and:

- A **Client ID**
- A **Client Secret**

To get both, [create a Meta app](https://developers.facebook.com/docs/development/create-an-app) with either the Facebook Login product or the Facebook Login for Business product.

To create your app and set up the credential with **Facebook Login for Business**:

1. Go to the Meta Developer [App Dashboard](https://developers.facebook.com/apps) and select **Create App**.
2. If you have a business portfolio and you're ready to connect the app to it, select the business portfolio. If you don't have a business portfolio or you're not ready to connect the app to the portfolio, select **I don’t want to connect a business portfolio yet** and select **Next**. The **Use cases** page opens.
3. Select **Other**, then select **Next**.
4. Select **Business** and **Next**.
5. Complete the essential information:
    * Add an **App name**.
    * Add an **App contact email**.
    * Here again you can connect to a business portfolio or skip it.
1. Select **Create app**. The **Add products to your app** page opens.
1. Select **Facebook Login for Business**. The **Settings** page for this product opens.
1. Copy the **OAuth Redirect URL** from your n8n credential.
1. In your Meta app settings in **Client OAuth settings**, paste that URL as the **Valid OAuth Redirect URIs**.
1. Select **App settings > Basic** from the left menu.
1. Copy the **App ID** and enter it as the **Client ID** within your n8n credential.
1. Copy the **App Secret** and enter it as the **Client Secret** within your n8n credential.

Your credential should successfully connect now, but you'll need to go through the steps to take your Meta app live before you can use it with the [Facebook Lead Ads trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger.md). Here's a summary of what you'll need to do:

1. In your Meta app, select **App settings > Basic** from the left menu.
1. Enter a **Privacy Policy URL**. (Required to take the app "Live.")
1. Select **Save changes**.
1. At the top of the page, toggle the **App Mode** from **Development** to **Live**.
1. Facebook Login for Business requires Advanced Access for `public_profile`. To add it, go to **App Review > Permissions and Features**.
1. Search for `public_profile` and select **Request advanced access**.
1. Complete the steps for [business verification](https://www.facebook.com/business/tools/meta-verified-for-business/).
1. Use the [Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing) to trigger some demo form submissions and test your workflow.

Refer to Meta's [Create an app](https://developers.facebook.com/docs/development/create-an-app) documentation for more information on creating an app, required fields like the Privacy Policy URL, and adding products.

For more information on the app modes and switching to **Live** mode, refer to [App Modes](https://developers.facebook.com/docs/development/build-and-test/app-modes) and [Publish | App Types](https://developers.facebook.com/docs/development/release#app-types).
