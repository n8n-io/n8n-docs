---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Typeform credentials
description: Documentation for Typeform credentials. Use these credentials to authenticate Typeform in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Typeform credentials

You can use these credentials to authenticate the following nodes:

- [Typeform Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.typeformtrigger/)

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [Typeform's API documentation](https://www.typeform.com/developers/get-started/){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need a [Typeform](https://typeform.com/){:target=_blank .external-link} account and:

- A personal **Access Token**

To get your personal access token:

1. Log into your Typeform account.
2. Select your profile avatar in the upper right and go to **Account > Your settings >** [**Personal Tokens**](https://admin.typeform.com/user/tokens){:target=_blank .external-link}.
3. Select **Generate a new token**.
4. Give your token a **Name**, like `n8n integration`.
5. For **Scopes**, select **Custom scopes**. Select these scopes:
    - Forms: Read
    - Webhooks: Read, Write
6. Select **Generate token**.
7. Copy the token and enter it in your n8n credential.

Refer to Typeform's [Personal access token documentation](https://www.typeform.com/developers/get-started/personal-access-token/){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need a [Typeform](https://typeform.com/){:target=_blank .external-link} account and:

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

Refer to [Create applications that integrate with Typeform's APIs](https://www.typeform.com/developers/get-started/applications/#1-create-an-application-in-the-typeform-admin-panel){:target=_blank .external-link} for more information.
