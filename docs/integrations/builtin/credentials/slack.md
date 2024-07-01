---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Slack credentials
description: Documentation for Slack credentials. Use these credentials to authenticate Slack in n8n, a workflow automation platform.
contentType: integration
---

# Slack credentials

You can use these credentials to authenticate the following nodes:

- [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/)
- [Slack Trigger](/integrations/builtin/trigger-ndoes/n8n-nodes-base.slacktrigger/)


## Prerequisites

- Create a [Slack](https://slack.com/){:target=_blank .external-link} account.
- Create a Slack app. Refer to the Slack API [Quickstart](https://api.slack.com/quickstart){:target=_blank .external-link} for more information.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Slack's API documentation](https://api.slack.com/apis){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An **Access Token**

To generate an access token, create a Slack app:

1. Open your [Slack API Apps](https://api.slack.com/apps){:target=_blank .external-link} page.
2. Select **Create New App > From scratch**.
3. Enter an **App Name**.
4. Select the **Workspace** where you'll be developing your app.
5. Select **Create App**.
6. In **Basic Information > Building Apps for Slack**, select **Add features and functionality**.
7. Select **Permissions**.
8. In the **Scopes** section:
    * If you want your app to act on behalf of users who authorize the app, add the required scopes under the **User Token Scopes** section.
    * If you're building a bot, add the required scopes under the **Bot Token Scopes** section. 
    
    /// note | Scopes
    Scopes determine what permissions an app has. Refer to Slack's [Permission scopes](https://api.slack.com/scopes){:target=_blank .external-link} documentation for a list of scopes.
    ///
    
8. After you've added scopes, go up to the **OAuth Tokens for Your Workspace** section and select **Install to Workspace**. You must be a Slack workspace admin to complete this action.
9. Select **Allow**.
10. You'll return to the **OAuth Tokens for your Workspace** section, which now displays a **Bot User OAuth Token**.
10. Copy that token and enter it into the n8n credential.

Refer to the Slack API [Quickstart](https://api.slack.com/quickstart){:target=_blank .external-link} for more information.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, you'll need:

- A **Client ID**
- A **Client Secret**

To get both, create a Slack app:

1. Open your [Slack API Apps](https://api.slack.com/apps){:target=_blank .external-link} page.
2. Select **Create New App > From scratch**.
3. Enter an **App Name**.
4. Select the **Workspace** where you'll be developing your app.
5. Select **Create App**.
6. In **Basic Information**, open the **App Credentials** section.
7. Copy the **Client ID** and **Client Secret**. Paste these into the corresponding fields in n8n.
6. In **Basic Information > Building Apps for Slack**, select **Add features and functionality**.
7. Select **Permissions**.
7. In the **Redirect URLs** section, select **Add New Redirect URL**.
8. Copy the **OAuth Callback URL** from n8n and enter it as the new Redirect URL in Slack.
9. Select **Add**.
10. Select **Save URLs**.
11. In the **Scopes** section:
    * If you want your app to act on behalf of users who authorize the app, add the required scopes under the **User Token Scopes** section.
    * If you're building a bot, add the required scopes under the **Bot Token Scopes** section. 
    
    /// note | Scopes
    Scopes determine what permissions an app has. Refer to Slack's [Permission scopes](https://api.slack.com/scopes){:target=_blank .external-link} documentation for a list of scopes.
    ///
    
13. After you've added scopes, go up to the **OAuth Tokens for Your Workspace** section and select **Install to Workspace**. You must be a Slack workspace admin to complete this action.
14. Select **Allow**.
15. At this point, you should be able select the OAuth button in your n8n credential to connect.

Refer to the Slack API [Quickstart](https://api.slack.com/quickstart){:target=_blank .external-link} for more information. Refer to the Slack [Installing with OAuth](https://api.slack.com/authentication/oauth-v2){:target=_blank .external-link} documentation for more details on the OAuth flow itself.