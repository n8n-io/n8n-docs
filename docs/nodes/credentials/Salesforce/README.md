---
description: Learn to configure credentials for the Salesforce node in n8n
---

# Salesforce

You can use these credentials to authenticate the following nodes with Salesforce.
- [Salesforce](../../nodes-library/nodes/Salesforce/README.md)

## Prerequisites

Create a [Salesforce](https://www.salesforce.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name, Access Token URL, and click on the circle button in the OAuth section to connect your Salesforce account to n8n. You can find details on how to obtain the Access Token URL in the instructions below.
:::

1. Access your Salesforce Dashboard.
2. Click on the gear icon in the top right and select ***Setup*** from the dropdown list.
3. In the ***Platform Tools*** category of the sidebar, select ***App Manager*** under the ***Apps*** section.
4. Click on the ***New Connected App*** button.
5. Enter any necessary information and click on the ***Enable OAuth Settings*** checkbox.
6. Copy the ***OAuth Callback URL*** provided in the 'Salesforce OAuth2 API' credentials in n8n.
7. On the Salesforce app creation page, paste the URL in the ***Callback URL*** field.
8. Add the "Perform requests on your behalf at any time (refresh_token, offline_access)" scope in the ***Selected OAuth Scopes*** section.
9. Add any other scopes you plan to use in the  ***Selected OAuth Scopes*** section.
10. Click on the ***Save*** button at the bottom of the page.
11. On the ***New Connected App*** page, click on the ***Continue*** button.
12. In the 'API (Enable OAuth Settings)' section of the page, click on the ***Click to reveal*** button to reveal the consumer secret.
13. Copy the displayed ***Consumer Key*** and the ***Consumer Secret*** and use these with your Salesforce OAuth2 API credentials in n8n.
14. Copy the part of the URL between `https://` and `.salesforce.com` and replace 'yourcompany' in the ***Access Token URL*** in your Salesforce OAuth2 API credentials in n8n.
15. Click on the circle button in the OAuth section to connect a Salesforce account to n8n.
16. Click on the ***Save*** button to save your credentials.

![Getting Salesforce OAuth credentials](./using-oauth.gif)

## Using OAuth JWT

To use the OAuth JWT authentication method with the Salesforce node you need to create a private key. Follow the instructions mentioned in the documentation [here](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm) to create a priavte key.

1. Access your Salesforce Dashboard.
2. Click on the gear icon in the top right and select ***Setup*** from the dropdown list.
3. In the ***Platform Tools*** category of the sidebar, select ***App Manager*** under the ***Apps*** section.
4. Click on the ***New Connected App*** button.
5. Enter any necessary information and click on the ***Enable OAuth Settings*** checkbox.
6. Copy the ***OAuth Callback URL*** provided in the 'Salesforce OAuth2 API' credentials in n8n.
7. On the Salesforce app creation page, paste the URL in the ***Callback URL*** field.
8. Click on the ***Use digital signatures*** checkbox.
9. Upload the private key that you created earlier.
10. Add the "Perform requests on your behalf at any time (refresh_token, offline_access)" scope in the ***Selected OAuth Scopes*** section.
11. Add any other scopes you plan to use in the  ***Selected OAuth Scopes*** section.
12. Click on the ***Save*** button at the bottom of the page.
13. On the ***New Connected App*** page, click on the ***Continue*** button.
14. Copy the displayed ***Consumer Key*** and paste it in the ***Client ID*** field in your Salesforce JWT API credentials in n8n.
15. Use your Salesforce username in the ***Username*** field.
16. Copy the private key that you created earlier and paste it in the ***Private Key*** field in your Salesforce JWT API credentials in n8n.
17. Click on the ***Save*** button to save your credentials.
