---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Nextcloud credentials
description: Documentation for Nextcloud credentials. Use these credentials to authenticate Nextcloud in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Nextcloud credentials

You can use these credentials to authenticate the following nodes:

- [Nextcloud](/integrations/builtin/app-nodes/n8n-nodes-base.nextcloud/)

## Supported authentication methods

- Basic auth
- OAuth2

## Related resources

Refer to [Nextcloud's API documentation](https://nextcloud-server.netlify.app/){:target=_blank .external-link} for more information about the service.

Refer to [Nextcloud's user manual](https://docs.nextcloud.com/server/stable/user_manual/en/contents.html){:target=_blank .external-link} for more information on installing and configuring Nextcloud.

## Using basic auth

To configure this credential, you'll need a [Nextcloud](https://nextcloud.com/){:target=_blank .external-link} account and:

- Your **Web DAV URL**
- Your **User** name
- Your **Password** or an app password

To set it up:

1. To create your **Web DAV URL**: If Nextcloud is in the root of your domain: Enter the URL you use to access Nextcloud and add `/remote.php/dav/`. For example, if you access Nextcloud at `https://cloud.n8n.com`, your WebDAV URL is `https://cloud.n8n.com/remote.php/dav`.
    - If you have Nextcloud installed in a subdirectory, enter the URL you use to access Nextcloud and add `/<subdirectory>/remote.php/dav/`. Replace `<subdirectory>` with the subdirectory Nextcloud's installed in.
    - Refer to Nextcloud's [Third-party WebDAV clients](https://docs.nextcloud.com/server/stable/user_manual/en/files/access_webdav.html#third-party-webdav-clients){:target=_blank .external-link} documentation for more information on constructing your WebDAV URL.
2. Enter your **User** name.
3. For the **Password**, Nextcloud recommends using an app password rather than your user password. To create an app password:
    1. In the Nextcloud Web interface, select your avatar in the top right and select **Personal settings**.
    2. In the left menu, choose **Security**.
    3. Scroll to the bottom to the **App Password** section and create a new app password.
    4. Copy that app password and enter it in n8n as your **Password**.

## Using OAuth2

To configure this credential, you'll need a [Nextcloud](https://nextcloud.com/){:target=_blank .external-link} account and:

- An **Authorization URL** and **Access Token URL**: These depend on the URL you use to access Nextcloud.
- A **Client ID**: Generated once you add an OAuth2 client application in **Administrator Security Settings**.
- A **Client Secret**: Generated once you add an OAuth2 client application in **Administrator Security Settings**.
- A **Web DAV URL**: This depends on the URL you use to access Nextcloud.

To set it up:

1. In Nextcloud, open your **Administrator Security Settings**.
2. Find the **Add client** section under **OAuth 2.0 clients**.
3. Enter a **Name** for your client, like `n8n integration`.
4. Copy the **OAuth Callback URL** from n8n and enter it as the **Redirection URI**.
5. Then select **Add** in Nextcloud.
6. In n8n, update the **Authorization URL** to replace `https://nextcloud.example.com` with the URL you use to access Nextcloud. For example, if you access Nextcloud at `https://cloud.n8n.com`, the Authorization URL is `https://cloud.n8n.com/apps/oauth2/authorize`.
7. In n8n, update the **Access Token URL** to replace `https://nextcloud.example.com` with the URL you use to access Nextcloud. For example, if you access Nextcloud at `https://cloud.n8n.com`, the Access Token URL is `https://cloud.n8n.com/apps/oauth2/api/v1/token`.

    /// note | Pretty URL configuration
    The **Authorization URL** and **Access Token URL** assume that you've configured Nextcloud to use [Pretty URLs](https://docs.nextcloud.com/server/latest/admin_manual/installation/source_installation.html#pretty-urls){:target=_blank .external-link}. If you haven't, you must add `/index.php/` between your Nextcloud URL and the `/apps/oauth2` portion, for example: `https://cloud.n8n.com/index.php/apps/oauth2/api/v1/token`.
    ///
    
8. Copy the Nextcloud **Client Identifier** for your OAuth2 client and enter it as the **Client ID** in n8n.
9. Copy the Nextcloud **Secret** and enter it as the **Client Secret** in n8n.
10. In n8n, to create your **Web DAV URL**: If Nextcloud is in the root of your domain, enter the URL you use to access Nextcloud and add `/remote.php/dav/`. For example, if you access Nextcloud at `https://cloud.n8n.com`, your WebDAV URL is `https://cloud.n8n.com/remote.php/dav`.
    - If you have Nextcloud installed in a subdirectory, enter the URL you use to access Nextcloud and add `/<subdirectory>/remote.php/dav/`. Replace `<subdirectory>` with the subdirectory Nextcloud's installed in.
    - Refer to Nextcloud's [Third-party WebDAV clients](https://docs.nextcloud.com/server/stable/user_manual/en/files/access_webdav.html#third-party-webdav-clients){:target=_blank .external-link} documentation for more information on constructing your WebDAV URL.

Refer to the Nextcloud [OAuth2 Configuration documentation](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/oauth2.html){:target=_blank .external-link} for more detailed instructions.
