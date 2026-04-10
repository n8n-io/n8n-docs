---
title: WordPress credentials
description: Documentation for WordPress credentials. Use these credentials to authenticate WordPress in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# WordPress credentials

You can use these credentials to authenticate the following nodes:

- [WordPress](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress.md)

## Prerequisites

- **Basic auth**: Create a [WordPress](https://wordpress.com/){:target="_blank" .external-link} account or deploy WordPress on a server.
- **OAuth2**: Create a [WordPress.com](https://wordpress.com/){:target="_blank" .external-link} account with access to the [developer portal](https://developer.wordpress.com/apps/){:target="_blank" .external-link}.

## Supported authentication methods

- Basic auth
- OAuth2

## Related resources

Refer to [WordPress's API documentation](https://developer.wordpress.com/docs/api/){:target="_blank" .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- Your WordPress **Username**
- A WordPress application **Password**
- Your **WordPress URL**
- Decide whether to **Ignore SSL Issues**

Using this credential involves three steps:

1. [Enable two-step authentication](#enable-two-step-authentication).
2. [Create an application password](#create-an-application-password).
3. [Set up the credential](#set-up-the-credential).

Refer to the detailed instructions below for each step.

### Enable two-step authentication

To generate an application password, you must first enable Two-Step Authentication in WordPress. If you've already done this, [skip to the next section](#create-an-application-password).

1. Open your WordPress [profile](https://wordpress.com/me){:target="_blank" .external-link}.
2. Select **Security** from the left menu.
3. Select **Two-Step Authentication**. The **Two-Step Authentication** page opens.
4. If Two-Step Authentication isn't enabled, you must enable it.
5. Choose whether to enable it using an authenticator app or SMS codes and follow the on-screen instructions.

Refer to WordPress's [Enable Two-Step Authentication](https://wordpress.com/support/security/two-step-authentication/){:target="_blank" .external-link} for detailed instructions.

### Create an application password

With Two-Step Authentication enabled, you can now generate an application password:

1. From the WordPress **Security >** [**Two-Step Authentication**](https://wordpress.com/me/security/two-step){:target="_blank" .external-link} page, select **+ Add new application password** in the **Application passwords** section.
2. Enter an **Application name**, like `n8n integration`.
3. Select **Generate Password**.
4. Copy the password it generates. You'll use this in your n8n credential.

### Set up the credential

1. Enter your WordPress **Username** in your n8n credential.
2. Enter the application password you copied above as the **Password** in your n8n credential.
3. Enter the URL of your WordPress site as the **WordPress URL**.
4. Optional: Use **Ignore SSL Issues** to choose whether you want the n8n credential to connect even if SSL certificate validation fails (turned on) or whether to respect SSL certificate validation (turned off).

## Using OAuth2

/// note | WordPress.com only
OAuth2 authentication works with WordPress.com-hosted sites only. For self-hosted WordPress, use basic auth instead.
///

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a WordPress.com developer application.
- A **Client Secret**: Generated when you create a WordPress.com developer application.
- Your **WordPress.com Site**: Your `.wordpress.com` subdomain or custom domain (for example, `myblog.wordpress.com` or `myblog.com`).

Creating this credential involves two steps:

1. [Create a developer application](#create-a-developer-application).
2. [Set up the OAuth2 credential](#set-up-the-oauth2-credential).

### Create a developer application

1. Go to your WordPress.com [developer applications](https://developer.wordpress.com/apps/){:target="_blank" .external-link} page.
2. Select **Create New Application**.
3. Enter a **Name** for your application, for example `n8n integration`.
4. Copy the **OAuth Redirect URL** from the **OAuth2 (WordPress.com)** credential screen in n8n. Paste it into the **Redirect URLs** field in WordPress.
5. Fill out the **Description**, **Website URL**, and other fields as appropriate for your application.
6. Select **Create** to save the application.
7. Return to your WordPress.com [developer applications](https://developer.wordpress.com/apps/){:target="_blank" .external-link} page, and click the integration you just created.
8. Copy the **Client ID** and **Client Secret**.

### Set up the OAuth2 credential

1. In the n8n **OAuth2 (WordPress.com)** credential screen, paste the **Client ID** and **Client Secret** from the previous step.
2. Enter your WordPress.com site identifier in the **WordPress.com Site** field, for example, `myblog.wordpress.com`.
3. Click **Connect to WordPress**.

Refer to WordPress's [OAuth2 authentication documentation](https://developer.wordpress.com/docs/oauth2/){:target="_blank" .external-link} for more information.