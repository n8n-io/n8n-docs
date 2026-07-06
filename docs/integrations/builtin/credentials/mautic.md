---
title: Mautic credentials
description: >-
  Documentation for Mautic credentials. Use these credentials to authenticate
  Mautic in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Mautic credentials
originalFilePath: integrations/builtin/credentials/mautic.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mautic'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mautic'
layout:
  description:
    visible: false
---

# Mautic credentials <a href="#mautic-credentials" id="mautic-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Mautic](../app-nodes/n8n-nodes-base.mautic.md)
- [Mautic Trigger](../trigger-nodes/n8n-nodes-base.mautictrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Mautic's API documentation](https://developer.mautic.org/#rest-api) for more information about the service.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

{% hint style="info" %}
**API enabled**

To set up this credential, your Mautic instance must have the API enabled. Refer to [Enable the API](#enable-the-api) for instructions.
{% endhint %}

To configure this credential, you'll need an account on a [Mautic](https://www.mautic.org/) instance and:

- Your **URL**
- A **Username**
- A **Password**

To set it up:

1. In Mautic, go to **Configuration > API Settings**.
2. If **Enable HTTP basic auth?** is set to **No**, change it to **Yes** and save. Refer to the [API Settings documentation](https://docs.mautic.org/en/5.x/configuration/settings.html#api-settings) for more information.
1. In n8n, enter the Base **URL** of your Mautic instance.
2. Enter your Mautic **Username**.
3. Enter your Mautic **Password**.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% hint style="info" %}
**API enabled**

To set up this credential, your Mautic instance must have the API enabled. Refer to [Enable the API](#enable-the-api) for instructions.
{% endhint %}

To configure this credential, you'll need an account on a [Mautic](https://www.mautic.org/) instance and:

- A **Client ID**: Generated when you create new API credentials.
- A **Client Secret**: Generated when you create new API credentials.
- Your **URL**

To set it up:

1. In Mautic, go to **Configuration > Settings**.
2. Select **API Credentials**.<br>

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>No API Credentials menu</strong></p><p>If you don't see the <strong>API Credentials</strong> option under <strong>Configuration &gt; Settings</strong>, be sure to <a href="#enable-the-api">Enable the API</a>. If you've enabled the API and you still don't see the option, try <a href="https://forum.mautic.org/t/cant-find-api-credentials-menu/10689">manually clearing the cache</a>.</p></div>

2. Select the option to **Create new client**.
3. Select **OAuth 2** as the **Authorization Protocol**.
4. Enter a **Name** for your credential, like `n8n integration`.
5. In n8n, copy the **OAuth Callback URL** and enter it as the **Redirect URI** in Mautic.
6. Select **Apply**.
7. Copy the **Client ID** from Mautic and enter it in your n8n credential.
8. Copy the **Client Secret** from Mautic and enter it in your n8n credential.
9. Enter the Base **URL** of your Mautic instance.

Refer to [What is Mautic's API?](https://kb.mautic.org/article/what-is-mautic-039%3bs-api.html#mcetoc_1g7n1bgoo0) for more information.

## Enable the API <a href="#enable-the-api" id="enable-the-api"></a>

To enable the API in your Mautic instance:

1. Go to **Settings > Configuration**.
2. Select **API Settings**.
3. Set **API enabled?** to **Yes**.
4. **Save** your changes.

Refer to [How to use the Mautic API](https://kb.mautic.org/article/what-is-mautic-039;s-api.html) for more information.
