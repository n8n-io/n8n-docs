---
permalink: /credentials/clickUp
---

# ClickUp

You can find information about the operations supported by the ClickUp node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.clickup) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Clickup).

## Prerequisites

Create a [ClickUp](https://www.clickup.com/) account.

## Using OAuth

1. Open your ClickUp dashboard.
2. Click on your profile icon in the bottom left.
3. Click on ***Integrations*** under your workspace profile.
4. Click on ***ClickUp API***.
5. Click on ***+ Create an App***.
6. Enter a name in the ***App Name*** field.
7. Copy the ***OAuth Callback URL*** from n8n and paste it in the ***Redirect URL(s)*** field.
8. Use the provided ***Client ID*** and ***Client Secret*** with your ClickUp OAuth2 API credentials in n8n.
9. Click on the circle button in the OAuth section to connect a ClickUp account to n8n.
10. Click the ***Save*** button to save your credentials in n8n.

![Getting ClickUp credentials](./using-oauth.gif)

## Using Access Token

1. Open your ClickUp dashboard.
2. Click on your profile icon in the bottom left and click on ***Apps***.
3. Click on ***Generate*** under API Token.
4. Use the API Token with your ClickUp node credentials in n8n.

![Getting ClickUp credentials](./using-access-token.gif)
