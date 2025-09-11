---
title: Zendesk credentials
description: Documentation for Zendesk credentials. Use these credentials to authenticate Zendesk in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Zendesk credentials

You can use these credentials to authenticate the following nodes:

- [Zendesk](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk.md)
- [Zendesk Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.zendesktrigger.md)

## Prerequisites

- Create a [Zendesk](https://zendesk.com/) account.
- For API token authentication, enable token access to the API in Admin Center under **Apps and integrations > APIs > Zendesk APIs**.

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [Zendesk's API documentation](https://developer.zendesk.com/api-reference/) for more information about the service.

## Using API token

To configure this credential, you'll need:

- Your **Subdomain**: Your Zendesk subdomain is the portion of the URL between `https://` and `.zendesk.com`. For example, if the Zendesk URL is `https://n8n-example.zendesk.com/agent/dashboard`, the subdomain is `n8n-example`.
- An **Email** address: Enter the email address you use to log in to Zendesk.
- An **API Token**: Generate an API token in **Apps and integrations > APIs > Zendesk API**. Refer to [API token](https://developer.zendesk.com/api-reference/introduction/security-and-auth/#api-token) for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated when you create a new OAuth client.
- A **Client Secret**: Generated when you create a new OAuth client.
- Your **Subdomain**: Your Zendesk subdomain is the portion of the URL between `https://` and `.zendesk.com`. For example, if the Zendesk URL is `https://n8n-example.zendesk.com/agent/dashboard`, the subdomain is `n8n-example`.

To create a new OAuth client, go to **Apps and integrations > APIs > Zendesk API > OAuth Clients**.

Use these settings:

 - Copy the **OAuth Redirect URL** from n8n and enter it as a **Redirect URL** in the OAuth client.
 - Copy the **Unique identifier** for the Zendesk client and enter this as your n8n **Client ID**.
 - Copy the **Secret** from Zendesk and enter this as your n8n **Client Secret**
 
 
 Refer to [Registering your application with Zendesk](https://support.zendesk.com/hc/en-us/articles/4408845965210-Using-OAuth-authentication-with-your-application#topic_s21_lfs_qk) for more information.

