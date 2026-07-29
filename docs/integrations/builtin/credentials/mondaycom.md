---
title: monday.com credentials
description: >-
  Documentation for monday.com credentials. Use these credentials to
  authenticate monday.com in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: monday.com credentials
originalFilePath: integrations/builtin/credentials/mondaycom.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mondaycom'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mondaycom'
layout:
  description:
    visible: false
---

# monday.com credentials <a href="#mondaycom-credentials" id="mondaycom-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [monday.com](../app-nodes/n8n-nodes-base.mondaycom.md)

{% hint style="info" %}
**Minimum required version**

The monday.com node requires n8n version 1.22.6 or above.
{% endhint %}

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [monday.com's API documentation](https://developer.monday.com/api-reference/docs/basics) for more information about authenticating with the service.

## Using API token <a href="#using-api-token" id="using-api-token"></a>

To configure this credential, you'll need a [monday.com](https://monday.com/) account and:

- An API **Token V2**

To get your token:

1. In your monday.com account, select your profile picture in the top right corner.
2. Select **Developers**. The Developer Center opens in a new tab.
3. In the Developer Center, select **My Access Tokens > Show**.
4. Copy your personal token and enter it in your n8n credential as the **Token V2**.

Refer to [monday.com API Authentication](https://developer.monday.com/api-reference/docs/authentication) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [monday.com](https://monday.com/) account and:

- A **Client ID**
- A **Client Secret**

To generate both these fields, register a new monday.com application:

1. In your monday.com account, select your profile picture in the top right corner.
2. Select **Developers**. The Developer Center opens in a new tab.
3. In the Developer Center, select **Build app**. The app details open.
4. Enter a **Name** for your app, like `n8n integration`.
5. Copy the **Client ID** and enter it in your n8n credential.
6. **Show** the **Client Secret**, copy it, and enter it in your n8n credential.
7. In the left menu, select **OAuth**.
8. For **Scopes**, select `boards:write` and `boards:read`.
9. Select **Save Scopes**.
10. Select the **Redirect URLs** tab.
11. Copy the **OAuth Redirect URL** from n8n and enter it as the **Redirect URL**.
12. **Save** your changes in monday.com.
13. In n8n, select **Connect my account** to finish the setup.

 Refer to [Create an app](https://developer.monday.com/apps/docs/create-an-app) for more information on creating apps.
 
 Refer to [OAuth and permissions](https://developer.monday.com/apps/docs/oauth) for more information on the available scopes and setting up the Redirect URL.
