---
title: Typeform credentials
description: Documentation for Typeform credentials. Use these credentials to authenticate Typeform in n8n, a workflow automation platform.
contentType: integration
---

# Typeform credentials

You can use these credentials to authenticate the following nodes:

- [Typeform Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.typeformtrigger/)

## Prerequisites

Create a [Typeform](https://typeform.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [Typeform's API documentation](https://www.typeform.com/developers/get-started/){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need:

- An **Access Token**: Your personal access token. To get your personal access token, go to your **Account >** [**Personal Tokens**](https://admin.typeform.com/user/tokens){:target=_blank .external-link}. Refer to Typeform's [Personal access token documentation](https://www.typeform.com/developers/get-started/personal-access-token/){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you register an app.
- A **Client Secret**: Generated when you register an app.

To get your Client ID and Client Secret, [create an application in the Typeform Admin panel](https://www.typeform.com/developers/get-started/applications/#1-create-an-application-in-the-typeform-admin-panel){:target=_blank .external-link}. For the **Redirect URI(s)**, copy the **OAuth Redirect URL** from n8n and enter it.

Enter the app's **Client ID** and **Client Secret** into your n8n credential. Refer to [Find your app's client ID and secret](https://www.typeform.com/developers/get-started/applications/#2-find-your-apps-client-id-and-client-secret){:target=_blank .external-link} for more information.
