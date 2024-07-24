---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Calendly credentials
description: Documentation for Calendly credentials. Use these credentials to authenticate Calendly in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Calendly credentials

You can use these credentials to authenticate the following nodes:

- [Calendly Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.calendlytrigger/)

## Prerequisites

Create a [Calendly](https://www.calendly.com/){:target=_blank .external-link} premium account.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Calendly's API documentation](https://developer.calendly.com/getting-started){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An API Key or **Personal Access Token**: Refer to [Calendly's API authentication documentation](https://developer.calendly.com/how-to-authenticate-with-personal-access-tokens){:target=_blank .external-link} for information on generating a personal access token (PAT).


## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a new OAuth client.
- A **Client Secret**: Generated when you create a new OAuth client.

To create a new OAuth client after logging in to [Calendly's developer portal](https://developer.calendly.com/console/apps){:target=_blank .external-link}, go to **Account > My Apps > Create new app**.

Use these settings:

 - Give your app a name like **n8n Automation**
 - Set **Kind of app** to **Web**
 - Set **Environment type** to **Sandbox** or **Production**
 - Copy the **OAuth Redirect URL** from n8n and enter it as a **Redirect URI** in the OAuth app.
 - Copy the **Client ID** for the Calendly app and enter this as your n8n **Client ID**.
 - Copy the **Client secret** from Calendly and enter this as your n8n **Client Secret**
 
 
 Refer to [Registering your application with Calendly](https://developer.calendly.com/create-a-developer-account){:target=_blank .external-link} for more information.
