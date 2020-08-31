---
permalink: /credentials/pipedrive
---

# Pipedrive

You can find information about the operations supported by the Pipedrive node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.pipedrive) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Pipedrive).

## Prerequisites

Create a [Pipedrive](https://pipedrive.com/) account.

## Using OAuth

1. Create a [Developer Sandbox Account](https://pipedrive.readme.io/docs/developer-sandbox-account).
2. Access your Pipedrive Dashboard.
3. Select 'Tools and apps' from the dropdown list.
4. Select 'Marketplace Manager' from the 'Tools' section.
5. Click on the ***Create new app*** button.
6. For the question 'Intent to publish app on Pipedrive's marketplace', select the appropriate option for your app.
7. Click on the ***Next*** button.
8. Enter a name in the ***App name*** field.
9. Copy the 'OAuth Callback URL' provided in the 'Pipedrive OAuth2 API' credentials in n8n.
10. On the Pipedrive app creation page, scroll down to the ***OAuth & Access scopes*** section and paste the URL in the ***Callback URL*** field.
11. Click on the ***Save*** button on the top.
12. Select your app from the 'Marketplace Manager'
13. Scroll down to ***OAuth & Access scopes*** section and copy the ***Client ID*** and ***Client Secret***.
14. Use these credentials with your Pipedrive node credentials in n8n.
15. Click on the circle button in the OAuth section of n8n to connect a Pipedrive account to n8n.
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
