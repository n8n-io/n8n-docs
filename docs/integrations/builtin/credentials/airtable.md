---
title: Airtable credentials
description: Documentation for Airtable credentials. Use these credentials to authenticate Airtable in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Airtable credentials

You can use these credentials to authenticate the following nodes:

- [Airtable](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md)
- [Airtable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.airtabletrigger.md)

## Prerequisites

Create an [Airtable](https://airtable.com/) account.

## Supported authentication methods

- Personal Access Token (PAT)
- OAuth2

/// note | API Key deprecation
n8n used to offer an API key authentication method with Airtable. Airtable [fully deprecated these keys](https://support.airtable.com/v1/docs/airtable-api-deprecation-guidelines) as of February 2024. If you were using an Airtable API credential, replace it with an Airtable Personal Access Token or Airtable OAuth2 credential. n8n recommends using Personal Access Token instead.
///

## Related resources

Refer to [Airtable's API documentation](https://airtable.com/developers/web/api/authentication) for more information about the service.

## Using personal access token

To configure this credential, you'll need:

- A Personal **Access Token** (PAT)

To create your PAT:

1. Go to the Airtable Builder Hub [Personal access tokens](https://airtable.com/create/tokens) page.
1. Select **+ Create new token**. Airtable opens the **Create personal access token** page.
1. Enter a **Name** for your token, like `n8n credential`.
1. Add **Scopes** to your token. Refer to Airtable's [Scopes](https://airtable.com/developers/web/api/scopes) guide for more information. n8n recommends using these scopes:
    - `data.records:read`
    - `data.records:write`
    - `schema.bases:read`
1. Select the **Access** for your token. Choose from a single base, multiple bases (even bases from different workspaces), all of the current and future bases in a workspace you own, or all of the bases from any workspace that you own including bases/workspace added in the future.
1. Select **Create token**.
1. Airtable opens a modal with your token displayed. Copy this token and enter it in your n8n credential as the **Access Token**.

Refer to Airtable's [Find/create PATs documentation](https://support.airtable.com/v1/docs/creating-personal-access-tokens) for more information.

## Using OAuth2

To configure this credential, you'll need:

- An **OAuth Redirect URL**
- A **Client ID**
- A **Client Secret**

To generate all this information, register a new Airtable integration:

1. Open your Airtable Builder Hub [**OAuth integrations**](https://airtable.com/create/oauth) page.
2. Select the **Register new OAuth integration** button.
3. Enter a name for your OAuth integration.
4. Copy the **OAuth Redirect URL** from your n8n credential.
5. Paste that redirect URL in Airtable as the **OAuth redirect URL**.
6. Select **Register integration**.
7. On the following page, copy the **Client ID** from Airtable and paste it into the **Client ID** in your n8n credential.
8. In Airtable, select **Generate client secret**.
9. Copy the client secret and paste it into the **Client Secret** in your n8n credential.
10. Select the following scopes in Airtable:
    - `data.records:read`
    - `data.records:write`
    - `schema.bases:read`
11. Select **Save changes** in Airtable.
12. In your n8n credential, select the **Connect my account**. A **Grant access** modal opens.
13. Follow the instructions and select the base you want to work on (or all bases).
14. Select **Grant access** to complete the connection.

Refer to the [Airtable Register a new integration documentation](https://airtable.com/developers/web/guides/oauth-integrations) for steps on registering a new Oauth integration.
