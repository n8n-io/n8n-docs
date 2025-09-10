---
title: Slack credentials
description: Documentation for Slack credentials. Use these credentials to authenticate Slack in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Slack credentials

You can use these credentials to authenticate the following nodes:

- [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md)
- [Slack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger.md)

## Supported authentication methods

- API access token:
    - Required for the [Slack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger.md) node.
    - Works with the [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md) node, but not recommended.
- OAuth2:
    - Recommended method for the [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md) node.
    - Doesn't work with the [Slack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger.md) node.

## Related resources

Refer to [Slack's API documentation](https://api.slack.com/apis) for more information about the service.

## Using API access token

To configure this credential, you'll need a [Slack](https://slack.com/) account and:

- An **Access Token**

To generate an access token, create a Slack app:

1. Open your [Slack API Apps](https://api.slack.com/apps) page.
2. Select **Create New App > From scratch**.
3. Enter an **App Name**.
4. Select the **Workspace** where you'll be developing your app.
5. Select **Create App**. The app details open.
6. In the left menu under **Features**, select **OAuth & Permissions**.
8. In the **Scopes** section, select appropriate scopes for your app. Refer to [Scopes](#scopes) for a list of recommended scopes.
9. After you've added scopes, go up to the **OAuth Tokens** section and select **Install to Workspace**. You must be a Slack workspace admin to complete this action.
10. Select **Allow**.
12. Copy the **Bot User OAuth Token** and enter it as the **Access Token** in your n8n credential.
13. If you're using this credential for the [Slack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger.md), follow the steps in [Slack Trigger configuration](#slack-trigger-configuration) to finish setting up your app.

Refer to the Slack API [Quickstart](https://api.slack.com/quickstart) for more information.

### Slack Trigger configuration

To use your Slack app with the [Slack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger.md) node:

1. Go to [Your Apps](https://api.slack.com/apps/) in Slack and select the app you want to use.
2. Go to **Features** > **Event Subscriptions**.
3. Turn on the **Enable Events** control.
4. In n8n, copy the **Webhook URL** and enter it as the **Request URL** in your Slack app.

    ///  note  | Request URL
    Slack only allows one request URL per app. If you want to test your workflow, you'll need to do one of the following:

    - Test with your **Test URL** first, then change your Slack app to use the **Production URL** once you've verified everything's working
    - Use the **Production URL** with execution logging.
    ///

5. Once verified, select the bot events to subscribe to. Use the **Trigger on** field in n8n to filter these requests. 
    - To use an event not in the list, add it as a bot event and select **Any Event** in the n8n node.

Refer to [Quickstart | Configuring the app for event listening](https://api.slack.com/quickstart#listening) for more information.

n8n recommends enabling request signature verification for your Slack Trigger for additional security:

1. Go to [Your Apps](https://api.slack.com/apps/) in Slack and select the app you want to use.
2. Go to **Settings** > **Basic Information**.
3. Copy the value of **Signing**.
4. In n8n, Paste this value into the **Signature Secret** field for the credential.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting n8n](/hosting/index.md) and need to configure OAuth2 from scratch, you'll need a [Slack](https://slack.com/) account and:

- A **Client ID**
- A **Client Secret**

To get both, create a Slack app:

1. Open your [Slack API Apps](https://api.slack.com/apps) page.
2. Select **Create New App > From scratch**.
3. Enter an **App Name**.
4. Select the **Workspace** where you'll be developing your app.
5. Select **Create App**. The app details open.
6. In **Settings > Basic Information**, open the **App Credentials** section.
7. Copy the **Client ID** and **Client Secret**. Paste these into the corresponding fields in n8n.
6. In the left menu under **Features**, select **OAuth & Permissions**.
7. In the **Redirect URLs** section, select **Add New Redirect URL**.
8. Copy the **OAuth Callback URL** from n8n and enter it as the new Redirect URL in Slack.
9. Select **Add**.
10. Select **Save URLs**.
11. In the **Scopes** section, select appropriate scopes for your app. Refer to [Scopes](#scopes) for a list of scopes.
13. After you've added scopes, go up to the **OAuth Tokens** section and select **Install to Workspace**. You must be a Slack workspace admin to complete this action.
14. Select **Allow**.
15. At this point, you should be able to select the OAuth button in your n8n credential to connect.

Refer to the Slack API [Quickstart](https://api.slack.com/quickstart) for more information. Refer to the Slack [Installing with OAuth](https://api.slack.com/authentication/oauth-v2) documentation for more details on the OAuth flow itself.

## Scopes

Scopes determine what permissions an app has.

* If you want your app to act on behalf of users who authorize the app, add the required scopes under the **User Token Scopes** section.
* If you're building a bot, add the required scopes under the **Bot Token Scopes** section.

Here's the list of scopes the OAuth credential requires, which are a good starting point:

| **Scope name** | **Notes** |
| --- | --- |
| `channels:read` | |
| `channels:write` | Not available as a bot token scope |
| `chat:write` | |
| `files:read` | |
| `files:write` | |
| `groups:read` | |
| `im:read` | |
| `mpim:read` | |
| `reactions:read` | |
| `reactions:write` | |
| `stars:read`| Not available as a bot token scope |
| `stars:write` | Not available as a bot token scope |
| `usergroups:read` | |
| `usergroups:write` | | 
| `users.profile:read` | |
| `users.profile:write` | Not available as a bot token scope |
| `users:read` | |

## Common issues

### Token expired

--8<-- "_snippets/integrations/builtin/credentials/slack/token-rotation.md"
