---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HighLevel credentials
description: Documentation for HighLevel credentials. Use these credentials to authenticate HighLevel in n8n, a workflow automation platform.
contentType: integration
---

# HighLevel credentials

You can use these credentials to authenticate the following nodes:

* [HighLevel node](/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/)

## Prerequisites

Create a [HighLevel developer](https://marketplace.gohighlevel.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key: Use with API v1
- OAuth2: Use with API v2

/// note | API 1.0 deprecation
HighLevel deprecated API v1.0 and no longer maintains it. Use OAuth2 to set up new credentials.
///

## Related resources

Refer to [HighLevel's API 2.0 documentation](https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview){:target=_blank .external-link} for more information about the service.

For existing integrations with the API v1.0, refer to [HighLevel's API 1.0 documentation](https://public-api.gohighlevel.com/){:target=_blank .external-link}.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Refer to the [HighLevel API 1.0 Welcome documentation](https://public-api.gohighlevel.com/){:target=_blank .external-link} for instructions on getting your API key.

## Using OAuth2

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

Refer to HighLevel's [API Authorization documentation](https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization){:target=_blank .external-link} for more details. Refer to HighLevel's [API Scopes documentation](https://highlevel.stoplight.io/docs/integrations/vcctp9t1w8hja-scopes){:target=_blank .external-link} for more information about available scopes.

