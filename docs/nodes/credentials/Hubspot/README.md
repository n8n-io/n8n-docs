---
permalink: /credentials/hubspot
---

# HubSpot

You can find information about the operations supported by the HubSpot node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.hubspot) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Hubspot).

## Prerequisites

Create a [HubSpot](https://www.hubspot.com/) account.

## Using OAuth

1. Access your HubSpot Developer Home.
2. Click on 'Create an app'.
3. Specify an app name in the ***Public app name*** field.
4. Click on the 'Auth' tab.
5. Use the provided 'Client ID' and the 'Client secret' with your HubSpot OAuth2 API credentials in n8n. 
6. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste in the ***Redirect URL*** section.
7. In the Scopes section, make sure that the 'Basic OAuth functionality' scope is selected from the ***Add a required scope*** dropdown list.
8. Select any other Scopes you plan to use with n8n.
9. Click on the ***Save*** button to save your settings in HubSpot.
10. Back in n8n, click on the circle button in the OAuth section to connect your HubSpot account to n8n.
11. Click the ***Save*** button to save your credentials.

![Getting HubSpot OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Access your HubSpot dashboard.
2. Click on the gear icon on the top.
3. Click on Integrations, API key.
4. Create Key.
5. Use the key with HubSpot node credentials in n8n.

![Getting HubSpot credentials](./using-access-token.gif)

<!-- ## Developer API (for trigger node)
https://legacydocs.hubspot.com/docs/faq/developer-api-keys -->