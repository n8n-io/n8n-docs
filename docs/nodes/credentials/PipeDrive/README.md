---
permalink: /credentials/pipedrive
description: Learn to configure credentials for the Pipedrive node in n8n
---

# Pipedrive

You can use these credentials to authenticate the following nodes with Pipedrive.
- [Pipedrive](../../nodes-library/nodes/Pipedrive/README.md)
- [Pipedrive Trigger](../../nodes-library/trigger-nodes/PipedriveTrigger/README.md)

## Prerequisites

Create a [Pipedrive](https://pipedrive.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Pipedrive account to n8n.
:::

1. Create a [Developer Sandbox Account](https://pipedrive.readme.io/docs/developer-sandbox-account).
2. Access your Pipedrive Dashboard.
3. Click on your user profile in the top right and select 'Tools and apps' from the dropdown list.
4. From the sidebar under the ***Tools*** section, select 'Marketplace manager'.
5. Click on the ***Create new app*** button.
6. Select either 'Yes' or 'No' when asked if you would like to publish your app on the Pipedrive marketplace.
7. Click on the ***Next*** button.
8. Enter a name in the ***App name*** field.
9. Copy the 'OAuth Callback URL' provided in the 'Pipedrive OAuth2 API' credentials in n8n.
10. On the Pipedrive app creation page, scroll down to the ***OAuth & Access scopes*** section and paste the URL in the ***Callback URL*** field.
11. Click on the ***Save*** button on the top.
12. Select your app from the 'Marketplace Manager'
13. Scroll down to ***OAuth & Access scopes*** section and copy the ***Client ID*** and ***Client Secret***.
14. Use these credentials with your Pipedrive node credentials in n8n.
15. Click on the circle button in the OAuth section to connect a Pipedrive account to n8n.
16. Click on the ***Save*** button to save your credentials.

![Getting Pipedrive OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Access your Pipedrive Dashboard.
2. Click on your user profile in the top right.
3. Select 'Settings' from the dropdown list.
4. Click on the 'API' tab.
5. Click on the ***Generate new token*** button.
6. Use the displayed token with your Pipedrive node credentials in n8n.

![Getting Pipedrive Access Token](./using-access-token.gif)
