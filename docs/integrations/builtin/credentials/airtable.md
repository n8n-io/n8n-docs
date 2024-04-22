---
title: Airtable credentials
description: Documentation for Airtable credentials. Use these credentials to authenticate Airtable in n8n, a workflow automation platform.
contentType: integration
---

# Airtable credentials

You can use these credentials to authenticate the following nodes with Airtable.

- [Airtable](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/)
- [Airtable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.airtabletrigger/)

## Prerequisites

Create an [Airtable](https://airtable.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Personal Access Token (PAT)
- Oauth2

/// note | API Key deprecation
n8n previously supported an API key authentication method with Airtable. Airtable [fully deprecated these keys](https://support.airtable.com/docs/airtable-api-key-deprecation-notice){:target=_blank .external-link} as of February 2024. If you were using an Airtable API credential, replace it with an Airtable Personal Access Token or Airtable Oauth2 credential. n8n recommends using Personal Access Token instead.
///

## Using Personal Access Token

Follow the instructions to **Find/create PATs** in the [Airtable documentation](https://support.airtable.com/docs/creating-personal-access-tokens#understanding-the-basics-of-personal-access-tokens){:target=_blank .external-link}.

n8n recommends using the following **Scopes** for your PAT:

- `data.records:read`
- `data.records:write`
- `schema.bases:read`

## Using OAuth2

1. Open your Airtable [Developer Hub](https://airtable.com/create/tokens).
2. Under the **OAuth integrations** section, select the **Register new OAuth integration** button.
3. Provide a name for your OAuth integration.
4. In the n8n Airtable Oauth2 credentials dialog, copy the **OAuth Redirect URL**.
5. In Airtable, paste that redirect URL into the **OAuth redirect URL**.
6. Then select the **Register integration** button in Airtable.
7. On the following page, copy the **Client ID** from Airtable and paste it into the **Client ID** parameter in the n8n Airtable Oauth2 credentials dialog.
8. In Airtable, select the **Generate client secret** button.
9. Copy the client secret and paste it into the **Client Secret** parameter in the n8n Airtable OAuth2 credentials dialog.
10. Select the following scopes in Airtable:
    - `data.records:read`
    - `data.records:write`
    - `schema.bases:read`
11. Select **Save changes** at the bottom of the page in Airtable.
12. In the n8n Airtable Oauth2 credentials dialog, select the **Connect my account** button.
13. This will open a Grant access dialog. Follow the instructions in the dialog and select the base you want to work on (or all bases).
14. Select the **Grant access** button in the dialog to complete the connection.
