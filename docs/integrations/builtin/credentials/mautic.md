---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mautic credentials
description: Documentation for Mautic credentials. Use these credentials to authenticate Mautic in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Mautic credentials

You can use these credentials to authenticate the following nodes:

- [Mautic](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/)
- [Mautic Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.mautictrigger/)

## Supported authentication methods

- Basic auth
- OAuth2

## Related resources

Refer to [Mautic's API documentation](https://developer.mautic.org/#rest-api){:target=_blank .external-link} for more information about the service.

## Using basic auth

/// note | API enabled
To set up this credential, your Mautic instance must have the API enabled. Refer to [Enable the API](#enable-the-api) for instructions.
///

To configure this credential, you'll need an account on a [Mautic](https://www.mautic.org/){:target=_blank .external-link} instance and:

- Your **URL**
- A **Username**
- A **Password**

To set it up:

1. In Mautic, go to **Configuration > API Settings**.
2. If **Enable HTTP basic auth?** is set to **No**, change it to **Yes** and save. Refer to the [API Settings documentation](https://docs.mautic.org/en/5.x/configuration/settings.html#api-settings){:target=_blank .external-link} for more information.
1. In n8n, enter the Base **URL** of your Mautic instance.
2. Enter your Mautic **Username**.
3. Enter your Mautic **Password**.

## Using OAuth2

/// note | API enabled
To set up this credential, your Mautic instance must have the API enabled. Refer to [Enable the API](#enable-the-api) for instructions.
///

To configure this credential, you'll need an account on a [Mautic](https://www.mautic.org/){:target=_blank .external-link} instance and:

- A **Client ID**: Generated when you create new API credentials.
- A **Client Secret**: Generated when you create new API credentials.
- Your **URL**

To set it up:

1. In Mautic, go to **Configuration > Settings**.
2. Select **API Credentials**.

    /// note | No API Credentials menu
    If you don't see the **API Credentials** option under **Configuration > Settings**, be sure to [Enable the API](#enable-the-api). If you've enabled the API and you still don't see the option, try [manually clearing the cache](https://forum.mautic.org/t/cant-find-api-credentials-menu/10689){:target=_blank .external-link}.
    ///

2. Select the option to **Create new client**.
3. Select **OAuth 2** as the **Authorization Protocol**.
4. Enter a **Name** for your credential, like `n8n integration`.
5. In n8n, copy the **OAuth Callback URL** and enter it as the **Redirect URI** in Mautic.
6. Select **Apply**.
7. Copy the **Client ID** from Mautic and enter it in your n8n credential.
8. Copy the **Client Secret** from Mautic and enter it in your n8n credential.
9. Enter the Base **URL** of your Mautic instance.

Refer to [What is Mautic's API?](https://kb.mautic.org/article/what-is-mautic-039%3bs-api.html#mcetoc_1g7n1bgoo0){:target=_blank .external-link} for more information.

## Enable the API

To enable the API in your Mautic instance:

1. Go to **Settings > Configuration**.
2. Select **API Settings**.
3. Set **API enabled?** to **Yes**.
4. **Save** your changes.

Refer to [How to use the Mautic API](https://kb.mautic.org/article/what-is-mautic-039;s-api.html){:target=_blank .external-link} for more information.
