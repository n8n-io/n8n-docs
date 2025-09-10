---
title: Twist credentials
description: Documentation for Twist credentials. Use these credentials to authenticate Twist in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Twist credentials

You can use these credentials to authenticate the following nodes:

- [Twist](/integrations/builtin/app-nodes/n8n-nodes-base.twist.md)

## Prerequisites

- Create a [Twist](https://twist.com/) account.
- [Create a general integration](https://twist.com/app_console/create_app) and configure a valid OAuth Redirect URL. Refer to [Using OAuth2](#using-oauth2) for more information.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Twist's API documentation](https://developer.twist.com/v3/#authorization) for more information about authenticating with the service.

## Using OAuth2
To configure this credential, you'll need:

- A **Client ID**: Generated once you create a general integration.
- A **Client Secret**: Generated once you create a general integration.

To generate your Client ID and Client Secret, [create a general integration](https://twist.com/app_console/create_app).

Use these settings for your integration's **OAuth Authentication**:

- Copy the **OAuth Redirect URL** from n8n and enter it as the **OAuth 2 redirect URL** in Twist.
    
    /// note | OAuth Redirect URL for self-hosted n8n
    Twist doesn't accept a `localhost` Redirect URL. The Redirect URL should be a URL in your domain, for example: `https://mytemplatemaker.example.com/gr_callback`. If your n8n **OAuth Redirect URL** contains localhost, refer below to [Local environment redirect URL](#local-environment-redirect-url) for generating a URL that Twist will allow.
    ///

- Select **Update OAuth settings** to save those changes.
- Copy the **Client ID** and **Client Secret** from Twist and enter them in the appropriate fields in n8n.

### Local environment redirect URL

Twist doesn't accept a localhost callback URL. These steps should allow you to configure the OAuth credentials for the local environment:

1. Use [ngrok](https://ngrok.com/) to expose the local server running on port `5678` to the internet. In your terminal, run the following command:
```sh
ngrok http 5678
```
2. Run the following command in a new terminal. Replace `<YOUR-NGROK-URL>` with the URL that you get from the previous step.
```sh
export WEBHOOK_URL=<YOUR-NGROK-URL>
```
3. Use the generated URL as your **OAuth 2 redirect URL** in Twist.

