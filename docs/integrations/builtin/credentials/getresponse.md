---
title: GetResponse credentials
description: Documentation for GetResponse credentials. Use these credentials to authenticate GetResponse in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# GetResponse credentials

You can use these credentials to authenticate the following nodes:

- [GetResponse](/integrations/builtin/app-nodes/n8n-nodes-base.getresponse.md)
- [GetResponse Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.getresponsetrigger.md)

## Prerequisites

Create a [GetResponse](https://www.getresponse.com/) account.

## Supported authentication methods

- API key
- OAuth2

## Related resources

Refer to [GetResponse's API documentation](https://apidocs.getresponse.com/v3) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: To view or generate an API key, go to **Integrations and API > API**. Refer to the [GetResponse Help Center](https://www.getresponse.com/help/where-do-i-find-the-api-key.html) for more detailed instructions.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you [register your application](https://apidocs.getresponse.com/v3/authentication/oauth2).
- A **Client Secret**: Generated when you [register your application](https://apidocs.getresponse.com/v3/authentication/oauth2) as the **Client Secret Key**.

When you register your application, copy the **OAuth Redirect URL** from n8n and add it as the **Redirect URL** in GetResponse.

/// note | Redirect URL with localhost
The Redirect URL should be a URL in your domain, for example: `https://mytemplatemaker.example.com/gr_callback`. GetResponse doesn't accept a localhost callback URL. Refer to the [FAQs](#configure-oauth2-credentials-for-a-local-environment) to configure the credentials for the local environment.
///

## Configure OAuth2 credentials for a local environment

GetResponse doesn't accept the localhost callback URL. Follow the steps below to configure the OAuth credentials for a local environment:
1. Use [ngrok](https://ngrok.com/) to expose the local server running on port `5678` to the internet. In your terminal, run the following command:
```sh
ngrok http 5678
```
2. Run the following command in a new terminal. Replace `<YOUR-NGROK-URL>` with the URL that you got from the previous step.
```sh
export WEBHOOK_URL=<YOUR-NGROK-URL>
```
3. Follow the [Using OAuth2](#using-oauth2) instructions to configure your credentials, using this URL as your **Redirect URL**.

