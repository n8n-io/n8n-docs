---
description: Learn to configure credentials for the Help Scout node in n8n
---

# Help Scout

You can use these credentials to authenticate the following nodes with Help Scout.
- [Help Scout](../../nodes-library/nodes/HelpScout/README.md)
- [Help Scout Trigger](../../nodes-library/trigger-nodes/HelpScoutTrigger/README.md)

## Prerequisites

Create a [Help Scout](https://www.helpscout.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Help Scout account to n8n.
:::

1. Log in to your Help Scout account.
2. Click on the user icon in the top right.
3. Select 'Your Profile' in the drop down menu.
4. Click on 'My Apps' in the sidebar.
5. Click on the *Create My App* button.
6. Copy the 'OAuth Callback URL' provided in the HelpScout OAuth2 API credentials in n8n and paste it in the 'Redirection URL' field in Help Scout.
7. Fill out any other information that is necessary and click 'Create'.
8. Click on the *Save* button and use the 'App ID' and the 'App Secret' with your HelpScout OAuth2 API credentials in n8n.
9. Click on the circle button in the OAuth section to connect a Help Scout account to n8n.
10. Click the *Save* button to save your credentials.

![Getting Help Scout OAuth credentials](./using-oauth.gif)
