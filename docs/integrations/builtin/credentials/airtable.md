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

## Using Access Token

1. Open your Airtable [Developer Hub](https://airtable.com/create/tokens).
2. Under the **Personal access tokens** section, click on the **Create new token** button.
3. Create a new Access Token by selecting the following scopes: *data.records:read*, *data.records:write*, *schema.bases:read* and adding the base you want to work on (or all the bases).
4. Copy the token displayed in the dialog.
5. In the n8n Airtable credentials dialog select the **Access Token** connection.
6. Paste the token in the **Access Token** field.
7. Click on the **Save** button to create the credentials.

## Using OAuth 2

1. Open your Airtable [Developer Hub](https://airtable.com/create/tokens).
2. Under the **OAuth integrations** section, click on the **Register new OAuth integration** button.
3. Provide a name for your OAuth integration.
4. In the n8n Airtable credentials dialog select the **OAuth 2** connection, copy the **OAuth Redirect URL** and paste it in the **OAuth redirect URL** field in the Airtable Developer Hub.
5. In Airtable, click on **Register integration**.
6. In the following page copy the **Client ID** and paste it into the **Client ID** parameter in the n8n Airtable credentials dialog.
7. Click on **Generate client secret** and paste the secret into the **Client Secret** parameter in the n8n Airtable credentials dialog.
8. Select the following scopes: *data.records:read*, *data.records:write*, *schema.bases:read* and click on **Save changes** at the bottom.
9. In the n8n Airtable credentials dialog click on **Connect my account**.
10. Follow the instruction in the dialog and select the base you want to work on (or to all the bases).
11. Click ok **Grant access** in the dialog to complete the connection.


## Using API Key

!!! note "API Key deprecation"
    API Keys will be deprecated by the end of January 2024, see [this article](https://support.airtable.com/docs/airtable-api-key-deprecation-notice){:target=_blank .external-link} for more details. n8n recommends using Personal Access Token instead.

