---
title: Facebook App credentials
description: Documentation for Facebook App credentials. Use these credentials to authenticate Facebook App in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Facebook App credentials

You can use these credentials to authenticate the following nodes:

- [Facebook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/index.md)

/// note | Facebook Graph API credentials
If you want to create credentials for the [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi.md) node, follow the instructions in the [Facebook Graph API credentials](/integrations/builtin/credentials/facebookgraph.md) documentation.
///

## Supported authentication methods

- OAuth2
- App access token

For both methods, you need to:

1. [Create a Meta app](#create-a-meta-app) with the Webhooks product.
2. Provide the access token to n8n, either:
    - [Using OAuth2](#using-oauth2), or
    - [Using an App Access Token](#using-an-app-access-token)
3. [Configure the Facebook Trigger](#configure-the-facebook-trigger).
4. Optional: [Add an app secret](#optional-add-an-app-secret).
5. Optional: Complete [App Review](#app-review)

## Related resources

Refer to [Meta's Graph API documentation](https://developers.facebook.com/docs/graph-api/overview) for more information about the service.

## Prerequisites

Regardless of the authentication method you choose, you'll need a [Meta for Developers](https://developers.facebook.com/) account and a Meta app with the Webhooks product. The app provides the **App ID** and **App Secret** used by both authentication methods.

### Create a Meta app

To create a Meta app:

1. Go to the Meta Developer [App Dashboard](https://developers.facebook.com/apps) and select **Create App**.
1. Complete the app details:
    * Add an **App name**.
    * Add an **App contact email**.
1. Select the **Use case** that aligns with how you wish to use the Facebook Graph API. For products in Meta's **Business** suite (like Messenger, Instagram, WhatsApp, Marketing API, App Events, Audience Network, Commerce API, Fundraisers, Jobs, Threat Exchange, and Webhooks), select **Other**, then select **Next**.
1. For **App type**, select **Business** and **Next**.
1. If you have a business portfolio and you're ready to connect the app to it, select the business portfolio. If you don't have a business portfolio or you're not ready to connect the app to the portfolio, leave it at **No business portfolio selected**.
1. Select **Create app**.
1. The **Add products to your app** page opens. Select **Webhooks** > **Set up**. Leave the configuration blank for now.

Refer to Meta's [Create an app](https://developers.facebook.com/docs/development/create-an-app) documentation for more information on creating an app, required fields like the Privacy Policy URL, and adding products.

### Taking a Meta app live

/// note | When to take your app Live
In **Development** mode, only people with a role on the app (Administrator, Developer, or Tester) can authenticate or generate tokens. If you're only connecting your own account, you can leave the app in Development mode..
///

1. Select **App settings > Basic** from the left menu.
1. Enter a **Privacy Policy URL**. (Required before you can take the app Live.)
1. Select **Save changes**.
1. If you need users without a role on the app to authenticate, toggle the **App Mode** from **Development** to **Live**.

For more information on the app modes and switching to **Live** mode, refer to [App Modes](https://developers.facebook.com/docs/development/build-and-test/app-modes) and [Publish | App Types](https://developers.facebook.com/docs/development/release#app-types).

## Using OAuth2

To configure this credential, you'll need a [Meta for Developers](https://developers.facebook.com/) account and:

- A **Client ID**
- A **Client Secret**

Ensure you have already [created a Meta app](#create-a-meta-app) with the Webhooks product.

1. In the Meta Developer [App Dashboard](https://developers.facebook.com/apps), navigate to dashboard of the app [you created](#create-a-meta app).
2. In the side menu, select **Products** > **Add Product**.
3. The **Add products to your app** page opens. Select **Facebook Login for Business** > **Set up**. This product is necessary for OAuth2 credential types.
4. In n8n, create a new **Facebook Graph (App) OAuth2** credential.
5. Copy the **OAuth Redirect URL** shown in the credential. Paste it under **Valid OAuth Redirect URIs** in the **Facebook Login for Business** setup page.
6. Ensure **Client OAuth Login** and **Web OAuth Login** are enabled, then **Save changes**.
7. In your Meta app, from the side menu open **App settings > Basic** and copy the **App ID** and **App Secret**.
8. Back in the n8n credential, enter:
    * **Client ID**: the **App ID**.
    * **Client Secret**: the **App Secret**.
9. Select **Connect my account** / **Sign in with Facebook** and approve the requested permissions in the Meta popup.
10. On success, n8n stores and manages the token. Save your n8n credential.

Refer to Meta's [Facebook Login](https://developers.facebook.com/docs/facebook-login) documentation for more information on the authorization flow and redirect URIs.

To complete credential setup, you must now [configure the Facebook Trigger](#configure-the-facebook-trigger).

You can then optionally:
- [Add an app secret](#optional-add-an-app-secret).
- Complete [App Review](#app-review)

## Using an App Access Token

To configure this credential, you'll need a [Meta for Developers](https://developers.facebook.com/) account and:

- An **App Access Token**

Ensure you have already [created a Meta app](#create-a-meta-app) with the Webhooks product.

1. Open the [Graph API explorer](https://developers.facebook.com/tools/explorer/).
2. Select the **Meta App** you just created in the **Access Token** section.
3. In **User or Page**, select **Get App Token**.
4. Select **Generate Access Token**.
5. The page prompts you to log in and grant access. Follow the on-screen prompts.

    /// warning | App unavailable
    You may receive a warning that the app isn't available. Once you take an app live, there may be a few minutes' delay before you can generate an access token.
    ///

5. Open n8n in a separate tab or window, and create a new **Facebook Graph (App) Access Token** credential.
6. Copy the token you generated at step 5  and enter it in your n8n credential as the **Access Token**. Save this token somewhere else, too, since you'll need it for the Webhooks configuration.
7. Save your n8n credential.

Refer to the Meta instructions for [Your First Request](https://developers.facebook.com/docs/graph-api/get-started#get-started) for more information on generating the token.

To complete credential setup, you must now [configure the Facebook Trigger](#configure-the-facebook-trigger).

You can then optionally:
- [Add an app secret](#optional-add-an-app-secret).
- Complete [App Review](#app-review)

## Configure the Facebook Trigger

Now that your credential is connected, you can configure the Facebook Trigger node:

1. In your Meta app, copy the **App ID** from the top navigation bar.
2. In n8n, open your Facebook Trigger node.
3. Under **Credential**, select the credential you created.
4. Paste the **App ID** into the **APP ID** field.
5. Select **Execute step** to shift the trigger into listening mode.
6. In your Meta app, from the left menu select the **Webhooks** product 
7. Subscribe to the objects you want to receive Facebook Trigger notifications about. For each subscription:
    - Copy the **Webhook URL** from n8n and enter it as the **Callback URL** in your Meta App.
    - Enter the **Access Token** you copied above as the Verify token.
    - Select **Verify and save**. (This step fails if you don't have your n8n trigger listening.)
    - Some webhook subscriptions, like **User**, prompt you to subscribe to individual events. Subscribe to the events you're interested in.
    - You can send some **Test events** from Meta to confirm things are working. If you send a test event, verify its receipt in n8n.

## Optional: Add an app secret

You can add an **App Secret** to verify the integrity and origin of the webhook payload Meta sends to n8n.

1. In your Meta app, open **App settings > Basic** and copy the **App Secret** (select **Show** and re-enter your password if needed).
2. In your n8n credential, enter the value in the **App Secret** field.
3. Save your n8n credential.

## Optional: App Review

App Review is only required if your app's users don't have roles on the app itself. If you're creating the app for your own internal purposes (your account has a role on the app), this isn't necessary.

When you need other users' data in production, submit the permissions your trigger uses for [App Review](https://developers.facebook.com/docs/app-review).
