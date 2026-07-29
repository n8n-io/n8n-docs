---
title: Typeform credentials
description: >-
  Documentation for Typeform credentials. Use these credentials to authenticate
  Typeform in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Typeform credentials
originalFilePath: integrations/builtin/credentials/typeform.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/typeform'
url: 'https://docs.n8n.io/integrations/builtin/credentials/typeform'
layout:
  description:
    visible: false
---

# Typeform credentials <a href="#typeform-credentials" id="typeform-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Typeform Trigger](../trigger-nodes/n8n-nodes-base.typeformtrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Typeform's API documentation](https://www.typeform.com/developers/get-started/) for more information about the service.

## Using API token <a href="#using-api-token" id="using-api-token"></a>

To configure this credential, you'll need a [Typeform](https://typeform.com/) account and:

- A personal **Access Token**

To get your personal access token:

1. Log into your Typeform account.
2. Select your profile avatar in the upper right and go to **Account > Your settings >** [**Personal Tokens**](https://admin.typeform.com/user/tokens).
3. Select **Generate a new token**.
4. Give your token a **Name**, like `n8n integration`.
5. For **Scopes**, select **Custom scopes**. Select these scopes:
    - Forms: Read
    - Webhooks: Read, Write
6. Select **Generate token**.
7. Copy the token and enter it in your n8n credential.

Refer to Typeform's [Personal access token documentation](https://www.typeform.com/developers/get-started/personal-access-token/) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [Typeform](https://typeform.com/) account and:

- A **Client ID**: Generated when you register an app.
- A **Client Secret**: Generated when you register an app.

To get your Client ID and Client Secret, register a new Typeform app:

1. Log into your Typeform account.
2. In the upper left, select the dropdown for your organization and select **Developer apps**.
3. Select **Register a new app**.
4. Enter an **App Name** that makes sense, like `n8n OAuth2 integration`.
5. Enter your n8n base URL as the **App website**, for example `https://n8n-sample.app.n8n.cloud/`.
6. From n8n, copy the **OAuth Redirect URL**. Enter this in Typeform as the **Redirect URI(s)**.
7. Select **Register app**.
8. Copy the **Client Secret** and enter it in your n8n credential.
9. In Typeform, select **Got it** to close the Client Secret modal.
10. The **Developer apps** panel displays your new app. Copy the **Client ID** and enter it in your n8n credential.
10. Once you enter both the **Client ID** and **Client Secret** in n8n, select **Connect my account** and follow the on-screen prompts to finish authorizing the app.

Refer to [Create applications that integrate with Typeform's APIs](https://www.typeform.com/developers/get-started/applications/#1-create-an-application-in-the-typeform-admin-panel) for more information.
