---
permalink: /credentials/zoho
---

# Zoho

You can use these credentials to authenticate the following nodes with Zoho.
- [Zoho CRM](../../nodes-library/nodes/ZohoCRM/README.md)

## Prerequisites

Create a [Zoho](https://www.zoho.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Zoho account to n8n.
:::

1. Access your [Zoho Developer Console](https://api-console.zoho.com/).
2. Click on the 'GET STARTED' button.
3. Click on the 'Server-based Applications' box.
4. Copy the 'OAuth Callback URL' provided in the Zoho OAuth2 API credentials in n8n and paste it in the *Authorized Redirect URIs* field in the Zoho API Console app creation page.
5. Fill in any other necessary information and click on the 'CREATE' button.
6. Use the 'Client ID' and the 'Client Secret' displayed with your Zoho OAuth2 API credentials in n8n.
7. Click on the circle button in the OAuth section to connect a Zoho CRM account to n8n.
8. Click the *Save* button to save your credentials.

![Getting Zoho credentials](./getting-oauth-credentials.gif)
