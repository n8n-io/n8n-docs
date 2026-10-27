---
title: Facebook Graph API credentials
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Graph API credentials
originalFilePath: integrations/builtin/credentials/facebookgraph.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/facebookgraph
url: https://docs.n8n.io/integrations/builtin/credentials/facebookgraph
description: >-
  Documentation for Facebook Graph API credentials. Use these credentials to
  authenticate Facebook Graph API in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Facebook Graph API credentials

You can use these credentials to authenticate the following nodes:

* [Facebook Graph API](../app-nodes/n8n-nodes-base.facebookgraphapi.md)

{% hint style="info" %}
**Facebook Trigger credentials**

If you want to create credentials for the [Facebook Trigger](../trigger-nodes/n8n-nodes-base.facebooktrigger/README.md) node, follow the instructions mentioned in the [Facebook App credentials](facebookapp.md) documentation.
{% endhint %}

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* OAuth2
* App access token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Meta's Graph API documentation](https://developers.facebook.com/docs/graph-api/overview) for more information about the service.

## Prerequisites

Regardless of the authentication method you choose, you'll need a [Meta for Developers](https://developers.facebook.com/) account and a Meta app.

## Create a Meta app <a href="#create-a-meta-app" id="create-a-meta-app"></a>

To create a Meta app:

1. Go to the Meta Developer [App Dashboard](https://developers.facebook.com/apps) and select **Create App**.
2. Complete the app details:
   * Add an **App name**.
   * Add an **App contact email**.
3. Select the **Use case** that aligns with how you wish to use the Facebook Graph API. For products in Meta's **Business** suite (like Messenger, Instagram, WhatsApp, Marketing API, App Events, Audience Network, Commerce API, Fundraisers, Jobs, Threat Exchange, and Webhooks), select **Other**, then select **Next**.
4. For **App type**, select **Business** and **Next**.
5. If you have a business portfolio and you're ready to connect the app to it, select the business portfolio. If you don't have a business portfolio or you're not ready to connect the app to the portfolio, leave it at **No business portfolio selected**.
6. Select **Create app**.
7. The **Add products to your app** page opens. Select the products that make sense for your app.

   {% hint style="info" %}
   **Facebook Login for Business**

   If you're going to use the [OAuth2](facebookgraph.md#using-oauth2) authentication type, you must add **Facebook Login for Business**. You don't need this product if you're only using an app access token.
   {% endhint %}

Refer to Meta's [Create an app](https://developers.facebook.com/docs/development/create-an-app) documentation for more information on creating an app, required fields like the Privacy Policy URL, and adding products.

### Taking a Meta app live

{% hint style="info" %}
**When to take your app Live**

In **Development** mode, only people with a role on the app (Administrator, Developer, or Tester) can authenticate or generate tokens. If you're only connecting your own account, you can leave the app in Development mode.
{% endhint %}

1. Select **App settings > Basic** from the left menu.
2. Enter a **Privacy Policy URL**. (Required before you can take the app Live.)
3. Select **Save changes**.
4. If you need users without a role on the app to authenticate, toggle the **App Mode** from **Development** to **Live**.

For more information on the app modes and switching to **Live** mode, refer to [App Modes](https://developers.facebook.com/docs/development/build-and-test/app-modes) and [Publish | App Types](https://developers.facebook.com/docs/development/release#app-types).

## Using OAuth2

To configure this credential, you'll need a [Meta for Developers](https://developers.facebook.com/) account and:

* A **Client ID**
* A **Client Secret**

There are two steps in setting up your credential:

1. [Create a Meta app](facebookgraph.md#create-a-meta-app) with the products you need to access.
2. [Generate a Client ID and Client Secret](facebookgraph.md#generate-a-client-id-and-client-secret) for that app.

### Generate a Client ID and Client Secret

Generate a Client ID and Client Secret to use with your n8n credential and the products you selected:

1. Go to the Meta Developer [App Dashboard](https://developers.facebook.com/apps).
2. Select the **Meta App** you [created](facebookgraph.md#create-a-meta-app) in the top left dropdown.
3. In the left menu, select **Products** > **Facebook Login for Business** > **Settings**.
4. Copy the **OAuth Redirect URL** from your n8n credential into the **Valid OAuth Redirect URIs** box, then **Save changes**.
5. In the left menu, select **App settings** > **Basic**.
6. Copy the **App ID** and enter it in your n8n credential as the **Client ID**.
7. Copy the **App Secret** and enter it in your n8n credential as the **Client Secret**.
8. In your n8n credential, select **Connect to Facebook Graph (App)**.

Refer to Meta's [Facebook Login for Business](https://developers.facebook.com/docs/facebook-login/facebook-login-for-business) documentation for more information.

## Using app access token <a href="#using-app-access-token" id="using-app-access-token"></a>

To configure this credential, you'll need a [Meta for Developers](https://developers.facebook.com/) account and:

* An app **Access Token**

There are two steps in setting up your credential:

1. [Create a Meta app](facebookgraph.md#create-a-meta-app) with the products you need to access.
2. [Generate an App Access Token](facebookgraph.md#generate-an-app-access-token) for that app.

### Generate an App Access Token <a href="#generate-an-app-access-token" id="generate-an-app-access-token"></a>

Create an app access token to use with your n8n credential and the products you selected:

1. Open the [Graph API explorer](https://developers.facebook.com/tools/explorer/).
2. Select the **Meta App** you [created](facebookgraph.md#create-a-meta-app) in the **Access Token** section.
3. In **User or Page**, select **Get App Token**.
4. Select **Generate Access Token**.
5. The page prompts you to log in and grant access. Follow the on-screen prompts.

   {% hint style="warning" %}
   **App unavailable**

   You may receive a warning that the app isn't available. Once you [take an app live](facebookgraph.md#taking-a-meta-app-live), there may be a few minutes' delay before you can generate an access token.
   {% endhint %}
6. Copy the token and enter it in your n8n credential as the **Access Token**.

Refer to the Meta instructions for [Your First Request](https://developers.facebook.com/docs/graph-api/get-started#get-started) for more information on generating the token.
