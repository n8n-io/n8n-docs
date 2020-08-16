---
permalink: /credentials/zoom
---

# Zoom

You can find information about the operations supported by the Zoom node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.zoom) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Zoom).

## Prerequisites

Create a [Zoom](https://zoom.us/) account.

## Using Access Token

1. Visit the [Zoom App Marketplace](https://marketplace.zoom.us/) and select the 'Build App' option in the *Develop* dropdown on the top-right corner.
2. Create a new JWT app and enter any necessary information.
3. Go to the 'App Credentials' tab.
4. Click on *View JWT Token* and copy the given token. <!-- Typo in code repo, needs PR -->
5. Go to the 'Activation' tab and click on the *Activate your app* button.
6. Use the JWT token you copied with your Zoom API credentials in n8n.

![Getting Zoom JWT credentials](./using-access-token.gif)

## Using OAuth

1. Visit the [Zoom App Marketplace](https://marketplace.zoom.us/) and select the 'Build App' option in the *Develop* dropdown on the top-right corner.
2. Create a new OAuth app.
3. Select 'User-managed app'.
4. Set the "Would you like to publish this app on Zoom App Marketplace?" slider to off.
5. Click on the *Create* button.
6. Copy the 'OAuth Callback URL' provided in the Zoom OAuth2 API credentials in n8n and paste it in the 'Redirect URL for OAuth' section in the Zoom app creation page.
7. Copy the Whitelist URL' provided in the Zoom OAuth2 API credentials in n8n and paste it in the 'Redirect URL for OAuth' section in the Zoom app creation page.
8. Copy the Client ID and Client Secret provided in the Zoom app creation page and paste it in the Zoom OAuth2 API credentials in n8n.
9. Enter any necessary information and click continue.
10. In the 'Scopes' section, click *Add Scopes* and choose the scopes that you plan to use.
11. Click on the circle button in the OAuth section to connect your Zoom account to n8n.
12. Click the *Save* button to save your credentials.

![Getting Zoom OAuth credentials](./using-oauth.gif)
