---
permalink: /credentials/hubspot
---

# HubSpot

You can find information about the operations supported by the HubSpot node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.hubspot) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Hubspot).

## Prerequisites

Create a [HubSpot](https://www.hubspot.com/) account.

## Using OAuth

1. Access your [HubSpot Developer Home](https://developers.hubspot.com/).
2. Click on the ***Manage apps*** button.
3. Click on the ***Create app*** button in the top right.
4. Specify an app name in the ***Public app name*** field.
5. Click on the 'Auth' tab.
6. Use the provided ***Client ID*** and the ***Client secret*** with your HubSpot OAuth2 API credentials in n8n. 
7. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste in the ***Redirect URL*** section.
8. In the Scopes section, make sure that the 'Basic OAuth functionality' scope is selected from the ***Add a required scope*** dropdown list.
9. Select any other Scopes you plan to use with n8n.
10. Click on the ***Save*** button to save your settings in HubSpot.
11. Back in n8n, click on the circle button in the OAuth section to connect your HubSpot account to n8n.
12. Click the ***Save*** button to save your credentials.

![Getting HubSpot OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Access your HubSpot dashboard.
2. Click on the gear icon on the top right.
3. Click on ***Integrations*** and then ***API key***.
4. Click on the ***Create key*** button.
5. Use the key with HubSpot node credentials in n8n.

![Getting HubSpot credentials](./using-access-token.gif)

## Using Developer API Key (for HubSpot Trigger node)

1. Access your [HubSpot Developer Home](https://developers.hubspot.com/).
2. Click on 'Apps' in the top bar.
3. Click on the ***Get HubSpot API key*** button.
4. Click on the ***Show key*** button.
5. Use the displayed Developer API key with your HubSpot Trigger node credentials in n8n.

![Getting HubSpot Developer API key](./using-developer-api-key.gif)
