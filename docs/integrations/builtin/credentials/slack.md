---
title: Slack credentials
description: >-
  Documentation for Slack credentials. Use these credentials to authenticate
  Slack in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Slack credentials
originalFilePath: integrations/builtin/credentials/slack.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/slack'
url: 'https://docs.n8n.io/integrations/builtin/credentials/slack'
layout:
  description:
    visible: false
---

# Slack credentials <a href="#slack-credentials" id="slack-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Slack](../app-nodes/n8n-nodes-base.slack/README.md)
- [Slack Trigger](../trigger-nodes/n8n-nodes-base.slacktrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token:
    - Required for the [Slack Trigger](../trigger-nodes/n8n-nodes-base.slacktrigger.md) node.
    - Works with the [Slack](../app-nodes/n8n-nodes-base.slack/README.md) node, but not recommended.
- OAuth2:
    - Recommended method for the [Slack](../app-nodes/n8n-nodes-base.slack/README.md) node.
    - Doesn't work with the [Slack Trigger](../trigger-nodes/n8n-nodes-base.slacktrigger.md) node.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Slack's API documentation](https://api.slack.com/apis) for more information about the service.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need a [Slack](https://slack.com/) account and:

- An **Access Token**

To generate an access token, create a Slack app. n8n recommends creating the app from a manifest, which configures all the scopes in one step:

{% tabs %}
{% tab title="From a manifest" %}
1. Open your [Slack API Apps](https://api.slack.com/apps) page.
2. Select **Create New App > From a manifest**.
3. Select the **Workspace** where you'll be developing your app, then select **Next**.
4. Select the **JSON** tab and replace the default manifest with the JSON below. Adjust the [scopes](#scopes) if needed.
5. Select **Next**.
6. Review the summary and select **Create**. The app details open.

```json
{
	"display_information": {
		"name": "n8n integration"
	},
	"features": {
		"bot_user": {
			"display_name": "n8n integration"
		}
	},
	"oauth_config": {
		"scopes": {
			"bot": [
				"channels:read",
				"channels:history",
				"chat:write",
				"files:read",
				"files:write",
				"groups:read",
				"groups:history",
				"im:read",
				"im:history",
				"mpim:read",
				"mpim:history",
				"reactions:read",
				"reactions:write",
				"usergroups:read",
				"usergroups:write",
				"users.profile:read",
				"users:read"
			]
		}
	},
	"settings": {
		"org_deploy_enabled": false,
		"socket_mode_enabled": false,
		"token_rotation_enabled": false
	}
}
```
{% endtab %}

{% tab title="From scratch" %}
1. Open your [Slack API Apps](https://api.slack.com/apps) page.
2. Select **Create New App > From scratch**.
3. Enter an **App Name**.
4. Select the **Workspace** where you'll be developing your app.
5. Select **Create App**. The app details open.
6. In the left menu under **Features**, select **OAuth & Permissions**.
7. In the **Scopes** section, select appropriate scopes for your app. Refer to [Scopes](#scopes) for a list of recommended scopes.
{% endtab %}
{% endtabs %}

Then install the app and copy the token:

1. In the left menu under **Features**, select **OAuth & Permissions**.
2. In the **OAuth Tokens** section, select **Install to Workspace**. You must be a Slack workspace admin to complete this action.
3. Select **Allow**.
4. Copy the **Bot User OAuth Token** and enter it as the **Access Token** in your n8n credential.
5. If you're using this credential for the [Slack Trigger](../trigger-nodes/n8n-nodes-base.slacktrigger.md), follow the steps in [Slack Trigger configuration](#slack-trigger-configuration) to finish setting up your app.

Refer to the Slack API [Quickstart](https://api.slack.com/quickstart) for more information.

### Slack Trigger configuration <a href="#slack-trigger-configuration" id="slack-trigger-configuration"></a>

To use your Slack app with the [Slack Trigger](../trigger-nodes/n8n-nodes-base.slacktrigger.md) node:

1. Go to [Your Apps](https://api.slack.com/apps/) in Slack and select the app you want to use.
2. Go to **Features** > **Event Subscriptions**.
3. Turn on the **Enable Events** control.
4. In n8n, copy the **Webhook URL** and enter it as the **Request URL** in your Slack app.<br>

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Request URL</strong></p><p>Slack only allows one request URL per app. If you want to test your workflow, you'll need to do one of the following:</p><ul><li>Test with your <strong>Test URL</strong> first, then change your Slack app to use the <strong>Production URL</strong> once you've verified everything's working</li><li>Use the <strong>Production URL</strong> with execution logging.</li></ul></div>

5. Once verified, select the bot events to subscribe to. Use the **Trigger on** field in n8n to filter these requests. 
    - To use an event not in the list, add it as a bot event and select **Any Event** in the n8n node.

Refer to [Quickstart | Configuring the app for event listening](https://api.slack.com/quickstart#listening) for more information.

{% hint style="info" %}
After Slack verifies the **Request URL**, you can also manage the event subscription in your app's manifest: go to **Settings** > **App Manifest** and edit the `settings.event_subscriptions` block.
{% endhint %}

n8n recommends enabling request signature verification for your Slack Trigger for additional security:

1. Go to [Your Apps](https://api.slack.com/apps/) in Slack and select the app you want to use.
2. Go to **Settings** > **Basic Information**.
3. Copy the value of **Signing**.
4. In n8n, Paste this value into the **Signature Secret** field for the credential.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you're [self-hosting n8n](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) and need to configure OAuth2 from scratch, you'll need a [Slack](https://slack.com/) account and:

- A **Client ID**
- A **Client Secret**

To get both, create a Slack app. n8n recommends creating the app from a manifest, which configures the scopes and redirect URL in one step:

{% tabs %}
{% tab title="From a manifest" %}
1. In n8n, copy the **OAuth Callback URL** from your Slack credential.
2. Open your [Slack API Apps](https://api.slack.com/apps) page.
3. Select **Create New App > From a manifest**.
4. Select the **Workspace** where you'll be developing your app, then select **Next**.
5. Select the **JSON** tab and replace the default manifest with the JSON below. Replace `<your-oauth-callback-url>` with the URL you copied from n8n and adjust the [scopes](#scopes) if needed.
6. Select **Next**.
7. Review the summary and select **Create**. The app details open.

```json
{
	"display_information": {
		"name": "n8n integration"
	},
	"features": {
		"bot_user": {
			"display_name": "n8n integration"
		}
	},
	"oauth_config": {
		"redirect_urls": [
			"<your-oauth-callback-url>"
		],
		"scopes": {
			"bot": [
				"channels:read",
				"channels:history",
				"chat:write",
				"files:read",
				"files:write",
				"groups:read",
				"groups:history",
				"im:read",
				"im:history",
				"mpim:read",
				"mpim:history",
				"reactions:read",
				"reactions:write",
				"usergroups:read",
				"usergroups:write",
				"users.profile:read",
				"users:read"
			],
			"user": [
				"channels:write",
				"search:read",
				"stars:read",
				"stars:write",
				"users.profile:write"
			]
		}
	},
	"settings": {
		"org_deploy_enabled": false,
		"socket_mode_enabled": false,
		"token_rotation_enabled": false
	}
}
```

<details>

<summary>Manifest with user scopes only</summary>

Some Slack API endpoints, including Slack's MCP endpoints, only work with user tokens and not bot tokens. If you need a user token, use this manifest instead. It requests all scopes as user scopes:

```json
{
	"display_information": {
		"name": "n8n integration"
	},
	"oauth_config": {
		"redirect_urls": [
			"<your-oauth-callback-url>"
		],
		"scopes": {
			"user": [
				"channels:read",
				"channels:write",
				"channels:history",
				"chat:write",
				"files:read",
				"files:write",
				"groups:read",
				"groups:history",
				"im:read",
				"im:history",
				"mpim:read",
				"mpim:history",
				"reactions:read",
				"reactions:write",
				"stars:read",
				"stars:write",
				"usergroups:read",
				"usergroups:write",
				"users.profile:read",
				"users.profile:write",
				"users:read",
				"search:read"
			]
		}
	},
	"settings": {
		"org_deploy_enabled": false,
		"socket_mode_enabled": false,
		"token_rotation_enabled": false
	}
}
```

</details>
{% endtab %}

{% tab title="From scratch" %}
1. Open your [Slack API Apps](https://api.slack.com/apps) page.
2. Select **Create New App > From scratch**.
3. Enter an **App Name**.
4. Select the **Workspace** where you'll be developing your app.
5. Select **Create App**. The app details open.
6. In the left menu under **Features**, select **OAuth & Permissions**.
7. In the **Redirect URLs** section, select **Add New Redirect URL**.
8. Copy the **OAuth Callback URL** from n8n and enter it as the new Redirect URL in Slack.
9. Select **Add**.
10. Select **Save URLs**.
11. In the **Scopes** section, select appropriate scopes for your app. Refer to [Scopes](#scopes) for a list of scopes.
{% endtab %}
{% endtabs %}

Then finish connecting the app to n8n:

1. In **Settings > Basic Information**, open the **App Credentials** section.
2. Copy the **Client ID** and **Client Secret**. Paste these into the corresponding fields in n8n.
3. In the left menu under **Features**, select **OAuth & Permissions**.
4. In the **OAuth Tokens** section, select **Install to Workspace**. You must be a Slack workspace admin to complete this action.
5. Select **Allow**.
6. At this point, you should be able to select the OAuth button in your n8n credential to connect.

Refer to the Slack API [Quickstart](https://api.slack.com/quickstart) for more information. Refer to the Slack [Installing with OAuth](https://api.slack.com/authentication/oauth-v2) documentation for more details on the OAuth flow itself.

## Scopes <a href="#scopes" id="scopes"></a>

Scopes determine what permissions an app has.

* If you want your app to act on behalf of users who authorize the app, add the required scopes under the **User Token Scopes** section.
* If you're building a bot, add the required scopes under the **Bot Token Scopes** section.

Here's the list of scopes the OAuth credential requires, which are a good starting point. The app manifests above already include these scopes:

| **Scope name**        | **Notes** |
|-----------------------| -- |
| `channels:read`       | |
| `channels:write`      | Not available as a bot token scope |
| `channels:history`    | |
| `chat:write`          | |
| `files:read`          | |
| `files:write`         | |
| `groups:read`         | |
| `groups:history`      | |
| `im:read`             | |
| `im:history`          | |
| `mpim:read`           | |
| `mpim:history`        | |
| `reactions:read`      | |
| `reactions:write`     | |
| `stars:read`          | Not available as a bot token scope |
| `stars:write`         | Not available as a bot token scope |
| `usergroups:read`     | |
| `usergroups:write`    | | 
| `users.profile:read`  | |
| `users.profile:write` | Not available as a bot token scope |
| `users:read`          | |
| `search:read`         | Not available as a bot token scope |

## Common issues <a href="#common-issues" id="common-issues"></a>

### Token expired <a href="#token-expired" id="token-expired"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/aLQxqepKmNn7Oz3PDTB7/" %}
