---
title: ClickUp credentials
description: >-
  Documentation for ClickUp credentials. Use these credentials to authenticate
  ClickUp in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: ClickUp credentials
originalFilePath: integrations/builtin/credentials/clickup.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/clickup'
url: 'https://docs.n8n.io/integrations/builtin/credentials/clickup'
layout:
  description:
    visible: false
---

# ClickUp credentials <a href="#clickup-credentials" id="clickup-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [ClickUp](../app-nodes/n8n-nodes-base.clickup.md)
- [ClickUp Trigger](../trigger-nodes/n8n-nodes-base.clickuptrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [ClickUp's documentation](https://clickup.com/api/) for more information about the service.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need a [ClickUp](https://www.clickup.com/) account and:

- A Personal API **Access Token**

To get your personal API token:

1. If you're using ClickUp 2.0, select your avatar in the lower-left corner and select **Apps**. If you're using ClickUp 3.0, select your avatar in the upper-right corner, select **Settings**, and scroll down to select **Apps** in the sidebar.
2. Under **API Token**, select **Generate**.
3. Copy your **Personal API token** and enter it in your n8n credential as the **Access Token**.

Refer to [ClickUp's Personal Token documentation](https://clickup.com/api/developer-portal/authentication#personal-token) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8WBawhAsMzeYnydxU5Sr/" %}

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you'll need to create an OAuth app:

1. In ClickUp, select your avatar and select **Integrations**.
2. Select **ClickUp API**.
3. Select **Create an App**.
4. Enter a **Name** for your app.
5. In n8n, copy the **OAuth Redirect URL**. Enter this as your ClickUp app's **Redirect URL**.
6. Once you create your app, copy the **client_id** and **secret** and enter them in your n8n credential.
7. Select **Connect my account** and follow the on-screen prompts to finish connecting the credential.

 Refer to the [ClickUp Oauth flow documentation](https://clickup.com/api/developer-portal/authentication#oauth-flow) for more information.
