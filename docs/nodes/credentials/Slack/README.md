---
permalink: /credentials/slack
---

# Slack

You can find information about the operations supported by the Slack node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.slack) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Slack).

## Prerequisites

Create a [Slack](https://slack.com/) account.

## Using OAuth

1. Access your Slack dashboard.
2. Click on your workspace name in the top left.
3. Click the 'Settings & administration' option, and then 'Manage apps'.
4. Click on 'Build' in the top right.
5. Click on 'Create New App' button.
6. Enter app name and select your desired workspace.
7. Scroll down and you will see your authentication information under the ***App Credentials*** section.
8. Copy and paste ***Client ID*** and ***Client Secret*** in the Slack OAuth2 API credentials in n8n.
9. Click on the circle button in the OAuth section to connect a Slack account to n8n.
10. Click the ***Save*** button to save your credentials in n8n.

![Getting Slack OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Access your Slack dashboard.
2. Click on your username in the top left.
3. Click the 'Settings & administration' option, and then 'Manage apps'.
4. Click on 'Build' in the top right.
5. Click on 'Start Building'.
6. Enter app name and select your desired workspace.
7. Scroll down and you will see your authentication information under the ***App Credentials*** section.
8. Use your Verification Token with your Slack node credentials in n8n.

![Getting Slack credentials](./using-access-token.gif)
