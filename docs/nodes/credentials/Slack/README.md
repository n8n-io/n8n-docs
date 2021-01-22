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

1. Access the [Slack API](https://api.slack.com/) page.
2. Click on the ***Start Building*** button.
3. Enter an app name in the ***App Name*** field.
4. Select a workspace from the ***Development Slack Workspace*** dropdown list.
5. Click on the ***Create App*** button.
6. Scroll down to the ***App Credentials*** section.
7. Copy and paste ***Client ID*** and ***Client Secret*** in the 'Slack OAuth2 API' credentials in n8n.
8. On the Basic Information page, scroll up to the ***Add features and functionality*** section and click on 'Permissions'.
9. Click on the ***Add New Redirect URL*** in the ***Redirect URLs***.
10. Copy the 'OAuth Callback URL' provided in the 'Slack OAuth2 API' credentials in n8n.
11. Paste the URL in the ***Redirect URLs*** field and click on the ***Add*** button.
12. Click on the ***Save URLs*** button.
13. Scroll down to the ***Scopes*** section.
14. Add the required scopes under the ***Bot Token Scopes*** section. You can refer to the list of scopes on the [Scopes and permissions](https://api.slack.com/scopes) documentation on Slack.
15. Enter a name for your credentials in the ***Credentials Name*** field in the 'Slack OAuth2 API' credentials in n8n.
16. Click on the circle button in the OAuth section to connect a Slack account to n8n.
17. Click the ***Save*** button to save your credentials in n8n.
18. On the Slack OAuth & Permissions page, scroll up to the ***OAuth Tokens & Redirect URLs*** section and click on the ***Install to Workspace*** button.
19. Click on the ***Allow*** button.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/ewjfY-XQ2Mo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Access Token

1. Access the [Slack API](https://api.slack.com/) page.
2. Click on the ***Start Building*** button.
3. Enter an app name in the ***App Name*** field.
4. Select a workspace from the ***Development Slack Workspace*** dropdown list.
5. Click on the ***Create App*** button.
6. Click on 'Permissions' in the ***Add features and functionality*** section.
7. Scroll down to the ***Scopes*** section.
8. If you want your app to act on behalf of users that authorize the app, add the required scopes under the ***User Token Scopes*** section.
9. If you're building a bot, add the required scopes under the ***Bot Token Scopes*** section. You can refer to the list of scopes on the [Scopes and permissions](https://api.slack.com/scopes) documentation on Slack.
10. Scroll up to the ***OAuth Tokens & Redirect URLs*** section and click on the ***Install to Workspace*** button.
11. Click on the ***Allow*** button.
12. Copy the displayed 'OAuth Access Token' under the ***OAuth Tokens for Your Team*** section.
13. Paste it in the ***Access Token*** field in the 'Slack API' credentials in n8n.
14. Enter a name for your credentials in the ***Credentials Name*** field in the 'Slack API' credentials in n8n.
15. Click the ***Save*** button to save your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/8x3BzKhl_ek" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using OAuth in n8n.cloud

The following video demonstrates the steps to get OAuth credentials for [n8n.cloud](https://n8n.cloud).

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/RHhaDb1KI2o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>