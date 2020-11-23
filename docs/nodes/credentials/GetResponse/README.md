---
permalink: /credentials/getResponse
description: Learn to configure credentials for the GetResponse node in n8n
---

# GetResponse

You can use these credentials to authenticate the following nodes with GetResponse.
- [GetResponse](../../nodes-library/nodes/GetResponse/README.md)

## Prerequisites

Create a [GetResponse](https://www.getresponse.com/) account.

## Using OAuth

::: tip ⚠️ Callback URL with GetResponse
**Note:** The Redirect URL should be a URL in your domain. For example, `https://mytemplatemaker.example.com/gr_callback`. GetResponse doesn't accept the localhost callback URL. Refer to the [FAQs](#_1-how-to-configure-the-oauth-credentials-for-the-local-environment) to learn to configure the credentials for the local environment.
:::

1. Access your [GetResponse dashboard](https://app.getresponse.com/dashboard).
2. Click on ***Menu*** and select 'Integrations and API'.
3. Click on the ***Custom apps*** tab.
4. Click on the ***Register your app*** button.
5. Enter all the necessary information.
6. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste it in the ***Redirect URL*** field.
7. Click on the ***Add*** button.
8. Use the provided ***Client ID*** and ***Client secret key*** with your GetResponse OAuth2 API credentials in n8n.
9. Click on the circle button in the OAuth section to connect a GetResponse account to n8n.
10. Click on the ***Save*** button to save your credentials in n8n.

![Getting GetResponse OAuth credentials](./using-oauth.gif)

## Using API Key

1. Access your [GetResponse dashboard](https://app.getresponse.com/dashboard).
2. Click on ***Menu*** and select 'Integrations and API'.
3. Click on the ***API*** tab.
4. Click on the ***Generate API key*** button.
5. Enter a name for your key.
6. Click on the ***Generate*** button.
7. Copy the ***API key*** that is displayed and use it with your GetResponse node credentials in n8n.

![Getting GetResponse API credentials](./using-api.gif)

## FAQs

### 1. How to configure the OAuth credentials for the local environment?
GetResponse doesn't accept the localhost callback  URL. However, you can follow the steps mentioned below to configure the OAuth credentials for the local environment:
1. We will use [ngrok](https://ngrok.com/) to expose the local server running on port `5678` to the internet. In your terminal, run the following command: 
```sh
ngrok http 5678
``` 
2. Run the following command in a new terminal. Replace `<YOUR-NGROK-URL>` with the URL you get in the previous step.
```sh
export WEBHOOK_TUNNEL_URL=<YOUR-NGROK-URL>
```
3. Start your n8n instance.
4. Follow the instructions mentioned in the [Using OAuth](#using-oauth) section to configure your credentials.
## Further Reference

- [OAuth 2.0 - Authorization Code](https://apidocs.getresponse.com/v3/case-study/oauth2-authorization-code)
- [Authentication - API key](https://apireference.getresponse.com/#section/Authentication)
