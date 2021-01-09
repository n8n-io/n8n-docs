---
description: Learn to configure credentials for the Asana node in n8n
---

# Asana

You can use these credentials to authenticate the following nodes with Asana.
- [Asana](../../nodes-library/nodes/Asana/README.md)
- [Asana Trigger](../../nodes-library/trigger-nodes/AsanaTrigger/README.md)


## Prerequisites

Create an [Asana](https://www.Asana.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Asana account to n8n.
:::

1. Open your Asana dashboard.
2. Click on your user icon in the top right.
3. Click on ***My Profile Settings...***
4. Click on the ***Apps*** tab.
5. Click on ***Manage Developer Apps***.
6. Click on ***New App***.
7. Enter a name, accept the *API terms and conditions*, and click on ***Create app***.
8. Copy the ***OAuth Callback URL*** from n8n and paste it in the ***Redirect URLs*** field and click ***Add***.
9. Use the provided ***Client ID*** and ***Client secret*** with your Asana OAuth2 API credentials in n8n.
10. Click on the circle button in the OAuth section to connect an Asana account to n8n.
11. Click the ***Save*** button to save your credentials in n8n.

![Getting Asana credentials](./using-oauth.gif)

## Using Access Token

1. Open your Asana dashboard.
2. Click on your user icon in the top right of the window.
3. Click on ***My Profile Settings***.
4. Click on the ***Apps*** tab.
5. Click on ***Manage Developer Apps***.
6. Click on ***New access token*** under the ***Personal access tokens*** section.
7. Enter a name for the access token and agree to the API terms and conditions.
8. Click on the ***Create token*** button.
9. Copy the token and use it with your Asana node credentials in n8n.

![Getting Asana credentials](./using-access-token.gif)
