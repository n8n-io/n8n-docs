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

Create an [Airtable](https://airtable.com/) account.

## Using Access Token

1. Open your Airtable [Developer Hub](https://airtable.com/create/tokens).
2. Under the ***Personal access tokens*** section, click on the ***Create new token*** button.
3. Create a new Access Token by selecting the following scopes: *data.records:read*, *data.records:write*, *schema.bases:read* and adding the base you want to work on (or all the bases).
4. Copy the token displayed in the dialog.
5. In the n8n Airtable credentials dialog select the ***Access Token*** connection.
6. Paste the token in the **Access Token** field.
7. Click on the ***Save*** button to create the credentials.

## Using OAuth 2

1. Open your Airtable [Developer Hub](https://airtable.com/create/tokens).
2. Under the ***OAuth integrations*** section, click on the ***Register new OAuth integration*** button.
3. Provide a name for your OAuth integration.
4. In the n8n Airtable credentials dialog select the ***OAuth 2*** connection, copy the ***OAuth Redirect URL*** and paste it in the ***OAuth redirect URL*** field in the Airtable Developer Hub.
5. In Airtable, click on ***Register integration***.
6. In the following page copy the ***Client ID*** and paste it into the ***Client ID*** parameter in the n8n Airtable credentials dialog.
7. Click on ***Generate client secret*** and paste the secret into the ***Client Secret*** parameter in the n8n Airtable credentials dialog.
8. Select the following scopes: *data.records:read*, *data.records:write*, *schema.bases:read* and click on ***Save changes*** at the bottom.
9. In the n8n Airtable credentials dialog click on ***Connect my account***.
10. Follow the instruction in the dialog and select the the base you want to work on (or to all the bases).
11. Click ok ***Grant access*** in the dialog to complete the connection.


## Using API Key

!!! note "API Key deprecation"
    API Keys will be deprecated by the end of January 2024, see [this article](https://support.airtable.com/docs/airtable-api-key-deprecation-notice) for more details. We recommend to use Personal Access Token instead.

1. Open your Airtable [dashboard](https://airtable.com/).
2. Click on the user icon on the top right and select 'Account' from the dropdown list.
3. Under the ***API*** section, click on the ***Generate API key*** button.
4. Copy the displayed API key.
5. Enter a name for your credentials in the ***Credentials Name*** field in the 'Airtable API' credentials in n8n.
6. Paste the API key in the ***API Key*** field in the 'Airtable API' credentials in n8n.
7. Click on the ***Create*** button to create the credentials.


The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/yPP3ZnynNck" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

