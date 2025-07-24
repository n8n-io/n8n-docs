---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: ServiceNow credentials
description: Documentation for ServiceNow credentials. Use these credentials to authenticate ServiceNow in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# ServiceNow credentials

You can use these credentials to authenticate the following nodes:

- [ServiceNow](/integrations/builtin/app-nodes/n8n-nodes-base.servicenow.md)

## Prerequisites

Create a [ServiceNow](https://developer.servicenow.com/dev.do#!/reference){:target=_blank .external-link} developer account.

## Supported authentication methods

- Basic auth
- OAuth2

## Related resources

Refer to [ServiceNow's API documentation](https://developer.servicenow.com/dev.do#!/reference/api/washingtondc/rest/){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- A **User** name: Enter your ServiceNow username.
- A **Password**: Enter your ServiceNow password.
- A **Subdomain**: The subdomain for your servicenow instance is in your instance URL: `https://<subdomain>.service-now.com/`. For example, if the full URL is `https://dev99890.service-now.com`, then the subdomain is `dev99890`.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated once you register a new app.
- A **Client Secret**: Generated once you register a new app.
- A **Subdomain**: The subdomain for your servicenow instance is in your instance URL: `https://<subdomain>.service-now.com/`. For example, if the full URL is `https://dev99890.service-now.com`, then the subdomain is `dev99890`.

To generate your **Client ID** and **Client Secret**, register a new app in **System OAuth > Application Registry > New > Create an OAuth API endpoint for external clients**. Use these settings for your app:

- Copy the **Client ID** and add it to your n8n credential.
- Enter a **Client Secret** or leave it blank to automatically generate a random secret. Add this secret to your n8n credential.
- Copy the n8n **OAuth Redirect URL** and add it as a **Redirect URL**.

Refer to [How to setup OAuth2 authentication for RESTMessageV2 integrations](https://www.servicenow.com/community/in-other-news/how-to-setup-oauth2-authentication-for-restmessagev2/ba-p/2271823){:target=_blank .external-link} for more information.

