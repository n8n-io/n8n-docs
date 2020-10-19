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

1. Access your Slack dashboard.
2. Click on your workspace name in the top left.
3. Click the "Settings & administration" option, and then "Manage apps".
4. Click on "Build" in the top right.
5. Click on "Create New App" button.
6. Enter app name and select your desired workspace.
7. Scroll down and you will see your authentication information under the ***App Credentials*** section.
8. Copy and paste ***Client ID*** and ***Client Secret*** in the Slack OAuth2 API credentials in n8n.
9. Click on the "Permissions" button.
10. Copy the "OAuth Callback URL" provided in the "Slack OAuth2 API" credentials in n8n and add it in the ***Redirect URLs*** section in the Slack OAuth & Permissions page.
11. Scroll down and add any scopes you plan to use under the ***User Token Scopes*** section.
12. Click on the circle button in the OAuth section to connect a Slack account to n8n.
13. Click the ***Save*** button to save your credentials in n8n.

![Getting Slack OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Access your Slack dashboard.
2. Click on your username in the top left.
3. Click the "Settings & administration" option, and then "Manage apps".
4. Click on "Build" in the top right.
5. Click on "Start Building".
6. Enter app name and select your desired workspace.
7. Scroll down and you will see your authentication information under the ***App Credentials*** section.
8. Use your Verification Token with your Slack node credentials in n8n.

![Getting Slack credentials](./using-access-token.gif)
