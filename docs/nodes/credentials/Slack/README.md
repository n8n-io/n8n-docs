---
permalink: /credentials/slack
description: Learn to configure credentials for the Slack node in n8n
---

# Slack

You can use these credentials to authenticate the following nodes with Slack.
- [Slack](../../nodes-library/nodes/Slack/README.md)

## Prerequisites

Create a [Slack](https://slack.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Slack account to n8n.
:::

1. Access your Slack workspace.
2. Click on your workspace name in the top left.
3. Click the 'Settings & administration' option, and then 'Manage apps'.
4. Click on the 'Build' button in the top right.
5. Click on the 'Start Building' button if this is your first Slack app, else click on the 'Create New App' button.
6. Enter an app name and select your desired workspace.
7. Scroll down and you will see your authentication information under the ***App Credentials*** section.
8. Copy and paste ***Client ID*** and ***Client Secret*** in the Slack OAuth2 API credentials in n8n.
9. Click on the 'Permissions' button in the ***Add features and functionality*** section.
10. Copy the 'OAuth Callback URL' provided in the 'Slack OAuth2 API' credentials in n8n.
11. Click on the ***Add New Redirect URL*** in the ***Redirect URLs*** section in the Slack OAuth & Permissions page.
12. Paste the 'OAuth Callback URL' in the field and click on the ***Save URLs*** button.
13. Scroll down and add any scopes you plan to use under the ***User Token Scopes*** section.
14. If you're building a bot, add the required scopes for the bot under the ***Bot Token Scopes*** section.
15. Click on the circle button in the OAuth section to connect a Slack account to n8n.
16. Click the ***Save*** button to save your credentials in n8n.

![Getting Slack OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Access your Slack workspace.
2. Click on your username in the top left.
3. Click the 'Settings & administration' option, and then 'Manage apps'.
4. Click on ***Build*** in the top right.
5. Click on the ***Start Building*** button if this is your first Slack app, else click on the ***Create an App*** button.
6. Enter an app name and select your desired workspace.
7. Click on the 'Permissions' button in the ***Add features and functionality*** section.
8. Scroll down and add any scopes you plan to use under the ***User Token Scopes*** section.
9. If you're building a bot, add the required scopes for the bot under the ***Bot Token Scopes*** section.
10. Click on the ***Install to Workspace*** button in the ***OAuth Tokens & Redirect URLs*** section.
11. Click on the ***Allow*** button to install the app in your workspace.
12. Use the displayed Access Token with your Slack node credentials in n8n.

![Getting Slack credentials](./using-access-token.gif)
