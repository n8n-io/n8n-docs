---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Nextcloud credentials
description: Documentation for Nextcloud credentials. Use these credentials to authenticate Nextcloud in n8n, a workflow automation platform.
contentType: integration
---

# Nextcloud credentials

You can use these credentials to authenticate the following nodes:

- [Nextcloud](/integrations/builtin/app-nodes/n8n-nodes-base.nextcloud/)

## Prerequisites

Create a [Nextcloud](https://nextcloud.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Basic auth
- OAuth2

## Related resources

Refer to [Nextcloud's API documentation](https://nextcloud-server.netlify.app/){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- Your **Web DAV URL**: Enter your [Web DAV URL](https://docs.nextcloud.com/server/stable/user_manual/en/files/access_webdav.html){:target=_blank .external-link}.
- Your **User** name
- Your **Password**

## Using OAuth2

To configure this credential, you'll need:

- An **Authorization URL**: Update the sample URL to use your domain.
- An **Access Token URL**: Update the sample URL to use your domain.
- A **Client ID**: Generated once you add an OAuth2 application in **Administrator Security Settings**.
- A **Client Secret**: Generated once you add an OAuth2 application in **Administrator Security Settings**.
- A **Web DAV URL**: Enter your [Web DAV URL](https://docs.nextcloud.com/server/stable/user_manual/en/files/access_webdav.html){:target=_blank .external-link}.

Refer to the Nextcloud [OAuth2 Configuration documentation](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/oauth2.html){:target=_blank .external-link} for more detailed instructions on adding an OAuth2 application. As you set up your application use these settings:

- Copy the **OAuth Callback URL** from n8n and enter it as the **Redirection URI** in your OAuth2 application.


