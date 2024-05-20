---
title: Mautic credentials
description: Documentation for Mautic credentials. Use these credentials to authenticate Mautic in n8n, a workflow automation platform.
contentType: integration
---

# Mautic credentials

You can use these credentials to authenticate the following nodes with Mautic.

- [Mautic](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/)
- [Mautic Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.mautictrigger/)

## Prerequisites

- Create an account on a [Mautic](https://www.mautic.org/) instance.
- Ensure the instance has the API enabled in **Configuration > API Settings**.
- If using basic auth as your credential authentication method, turn on **Enable basic auth?** in Mautic's **Configuration > API Settings**. Refer to the [API Settings documentation](https://docs.mautic.org/en/5.x/configuration/settings.html#api-settings){:target=_blank .external-link} for more information.

## Supported authentication methods

- Basic auth
- OAuth2

## Related resources

Refer to [Mautic's API documentation](https://developer.mautic.org/#rest-api){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, be sure that **Enable basic auth?** in Mautic's **API Settings** is turned on.

Then you'll need:

- A **URL**: Enter the URL of your Mautic instance.
- A **Username**: Enter your Mautic username.
- A **Password**: Enter your Mautic password.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generate a Client ID when you create new API Credentials in **Configuration > API Credentials**. (This option won't appear if an admin hasn't enabled the API.)
- A **Client Secret**: Generate a Client ID when you create new API Credentials in **Configuration > API Credentials**. (This option won't appear if an admin hasn't enabled the API.)
- A **URL**: Enter the URL of your Mautic instance.

Refer to [What is Mautic's API?](https://kb.mautic.org/article/what-is-mautic-039%3bs-api.html){:target=_blank .external-link} for detailed instructions on creating a new API credential.

When you create the new API credential, use these options:

- Select `OAuth 2` as the **Authorization Protocol**.
- Copy the **OAuth Callback URL** from n8n and enter it as the **Redirect URI** in Mautic.

Once the credential is created, copy the **Client ID** and **Client Secret** from Mautic to enter in the corresponding fields in n8n.

