---
title: Shopify credentials
description: Documentation for Shopify credentials. Use these credentials to authenticate Shopify in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Shopify credentials

You can use these credentials to authenticate the following nodes with Shopify.

- [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify.md)
- [Shopify Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.shopifytrigger.md)

## Supported authentication methods

- Access token (recommended): For private apps/single store use. Can be created by regular admins.
- OAuth2: For public apps. Must be created by partner accounts.
- API key: Deprecated.

## Related resources

Refer to [Shopify's authentication documentation](https://shopify.dev/docs/apps/auth) for more information about the service.

## Using access token

To configure this credential, you'll need a [Shopify](https://shopify.com/) admin account and:

- Your **Shop Subdomain**
- An **Access Token**: Generated when you create a custom app.
- An **APP Secret Key**: Generated when you create a custom app.

To set up the credential, you'll need to create and install a custom app:

1. Enter your **Shop Subdomain**.
    - Your subdomain is within the URL: `https://<subdomain>.myshopify.com`. For example, if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`.
2. In Shopify, go to **Admin > Settings >** [**Apps and sales channels**](https://admin.shopify.com/settings/apps).
3. Select **Develop apps**.
4. Select **Create a custom app**.

    /// note | Don't see this option?
    If you don't see this option, your store probably doesn't have custom app development enabled. Refer to [Enable custom app development](#enable-custom-app-development) for more information.
    ///

5. In the modal window, enter the **App name**.
6. Select an **App developer**. The app developer can be the store owner or any account with the **Develop apps** permission.
7. Select **Create app**.
8. Select **Select scopes**. In the **Admin API access scopes** section, select the API scopes you want for your app.
    - To use all functionality in the [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify.md) node, add the `read_orders`, `write_orders`, `read_products`, and `write_products` scopes.
    - Refer to [Shopify API Access Scopes](https://shopify.dev/docs/api/usage/access-scopes) for more information on the available scopes.
9. Select **Save**.
10. Select **Install app**.
11. In the modal window, select **Install app**.
12. Open the app's **API Credentials** section.
13. Copy the **Admin API Access Token**. Enter this in your n8n credential as the **Access Token**.
14. Copy the **API Secret Key**. Enter this in your n8n credential as the **APP Secret Key**.

Refer to [Creating a custom app](https://help.shopify.com/en/manual/apps/app-types/custom-apps) and [Generate access tokens for custom apps in the Shopify admin](https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/generate-app-access-tokens-admin) for more information on these steps.

## Using OAuth2

To configure this credential, you'll need a [Shopify partner](https://www.shopify.com/partners) account and:

- A **Client ID**: Generated when you create a custom app.
- A **Client Secret**: Generated when you create a custom app.
- Your **Shop Subdomain**

To set up the credential, you'll need to create and install a custom app:

/// note | Custom app development
Shopify provides templates for creating new apps. The instructions below only cover the elements necessary to set up your n8n credential. Refer to Shopify's [Build dev docs](https://shopify.dev/docs/apps/build) for more information on building apps and working with app templates.
///

1. Open your [Shopify Partner dashboard](https://partners.shopify.com/).
2. Select **Apps** from the left navigation.
3. Select **Create app**.
4. In the **Use Shopify Partners** section, enter an **App name**.
6. Select **Create app**.
7. When the app details open, copy the **Client ID**. Enter this in your n8n credential.
8. Copy the **Client Secret**. Enter this in your n8n credential.
9. In the left menu, select **Configuration**.
10. In n8n, copy the **OAuth Redirect URL** and paste it into the **Allowed redirection URL(s)** in the **URLs** section.
10. In the **URLs** section, enter an **App URL** for your app. The host entered here needs to match the host for the **Allowed redirection URL(s)**, like the base URL for your n8n instance.
8. Select **Save and release**.
1. Select **Overview** from the left menu. At this point, you can choose to **Test your app** by installing it to one of your stores, or **Choose distribution** to distribute it publicly.
1. In n8n, enter the **Shop Subdomain** of the store you installed the app to, either as a test or as a distribution.
    - Your subdomain is within the URL: `https://<subdomain>.myshopify.com`. For example, if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`.

## Using API key

/// warning | Method deprecated
Shopify no longer generates API keys with passwords. Use the [Access token](#using-access-token) method instead.
///

To configure this credential, you'll need:

- An **API Key**
- A **Password**
- Your **Shop Subdomain**: Your subdomain is within the URL: `https://<subdomain>.myshopify.com`. For example, if the full URL is `https://n8n.myshopify.com`, the Shop Subdomain is `n8n`.
- _Optional:_ A **Shared Secret**

## Common issues

Here are some common issues setting up the Shopify credential and steps to resolve or troubleshoot them.

### Enable custom app development

If you don't see the option to **Create a custom app**, no one's enabled custom app development for your store.

To enable custom app development, you must log in either as a store owner or as a user with the **Enable app development** permission:

1. In Shopify, go to **Admin > Settings >** [**Apps and sales channels**](https://admin.shopify.com/settings/apps).
2. Select **Develop apps**.
3. Select **Allow custom app development**.
4. Read the warning and information provided and select **Allow custom app development**.

### Forbidden credentials error

<!-- vale off -->
If you get a **Couldn't connect with these settings / Forbidden - perhaps check your credentials** warning when you test the credentials, this may be due to your app's [access scope](https://shopify.dev/docs/api/usage/access-scopes) dependencies. For example, the `read_orders` scope also requires `read_products` scope. Review the scopes you have assigned and the action you're trying to complete.
<!-- vale on -->
