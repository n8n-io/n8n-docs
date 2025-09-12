---
title: Calendly credentials
description: Documentation for Calendly credentials. Use these credentials to authenticate Calendly in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Calendly credentials

You can use these credentials to authenticate the following nodes:

- [Calendly Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.calendlytrigger.md)

/// warning | Supported Calendly plans
The Calendly Trigger node relies on Calendly webhooks. Calendly only offers access to webhooks in their paid plans.
///

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Calendly's API documentation](https://developer.calendly.com/getting-started) for more information about the service.

## Using API access token

To configure this credential, you'll need a [Calendly](https://www.calendly.com/) account and:

- An API Key or **Personal Access Token**

To get your access token:

1. Go to the Calendly [**Integrations & apps**](https://calendly.com/integrations) page.
2. Select [**API & Webhooks**](https://calendly.com/integrations/api_webhooks).
3. In **Your Personal Access Tokens**, select **Generate new token**.
4. Enter a **Name** for your access token, like `n8n integration`.
5. Select **Create token**.
6. Select **Copy token** and enter it in your n8n credential.

Refer to [Calendly's API authentication documentation](https://developer.calendly.com/how-to-authenticate-with-personal-access-tokens) for more information.

## Using OAuth2

To configure this credential, you'll need a [Calendly developer](https://developer.calendly.com) account and:

- A **Client ID**
- A **Client Secret**

To get both, create a new OAuth app in Calendly:

1. Log in to Calendly's developer portal and go to [**My apps**](https://developer.calendly.com/console/apps).
1. Select **Create new app**.
1. Enter a **Name of app**, like `n8n integration`.
2. In **Kind of app**, select **Web**.
3. In **Environment type**, select the environment that corresponds to your usage, either **Sandbox** or **Production**.
    - Calendly recommends starting with **Sandbox** for development and creating a second application for **Production** when you're ready to go live.
4. Copy the **OAuth Redirect URL** from n8n and enter it as a **Redirect URI** in the OAuth app.
5. Select **Save & Continue**. The app details display.
5. Copy the **Client ID** and enter this as your n8n **Client ID**.
6. Copy the **Client secret** and enter this as your n8n **Client Secret**.
1. Select **Connect my account** in n8n and follow the on-screen prompts to finish authorizing the credential.

Refer to [Registering your application with Calendly](https://developer.calendly.com/create-a-developer-account) for more information.
