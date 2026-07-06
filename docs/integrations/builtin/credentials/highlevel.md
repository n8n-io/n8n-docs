---
title: HighLevel credentials
description: >-
  Documentation for HighLevel credentials. Use these credentials to authenticate
  HighLevel in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: HighLevel credentials
originalFilePath: integrations/builtin/credentials/highlevel.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/highlevel'
url: 'https://docs.n8n.io/integrations/builtin/credentials/highlevel'
layout:
  description:
    visible: false
---

# HighLevel credentials <a href="#highlevel-credentials" id="highlevel-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [HighLevel node](../app-nodes/n8n-nodes-base.highlevel.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [HighLevel developer](https://marketplace.gohighlevel.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key: Use with API v1
- OAuth2: Use with API v2

{% hint style="info" %}
**API 1.0 deprecation**

HighLevel deprecated API v1.0 and no longer maintains it. Use OAuth2 to set up new credentials.
{% endhint %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [HighLevel's API 2.0 documentation](https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview) for more information about the service.

For existing integrations with the API v1.0, refer to [HighLevel's API 1.0 documentation](https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api).

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Refer to the [HighLevel API 1.0 Welcome documentation](https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api) for instructions on getting your API key.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate both, create an app in **My Apps > Create App**. Use these settings:

1. Set **Distribution Type** to **Sub-Account**.
2. Add these **Scopes**:
    - `locations.readonly`
    - `contacts.readonly`
    - `contacts.write`
    - `opportunities.readonly`
    - `opportunities.write`
    - `users.readonly`
3. Copy the **OAuth Redirect URL** from n8n and add it as a **Redirect URL** in your HighLevel app.
4. Copy the **Client ID** and **Client Secret** from HighLevel and add them to your n8n credential.
5. Add the same scopes added above to your n8n credential in a space-separated list. For example:

    ```locations.readonly contacts.readonly contacts.write opportunities.readonly opportunities.write users.readonly```

Refer to HighLevel's [API Authorization documentation](https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization) for more details. Refer to HighLevel's [API Scopes documentation](https://highlevel.stoplight.io/docs/integrations/vcctp9t1w8hja-scopes) for more information about available scopes.

