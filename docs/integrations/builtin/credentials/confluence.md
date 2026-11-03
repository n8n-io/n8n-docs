---
title: Confluence credentials
description: >-
  Documentation for Confluence credentials. Use these credentials to
  authenticate Confluence in n8n, a workflow automation platform.
layout:
  description:
    visible: false
---

# Confluence credentials

Use the **Confluence Cloud OAuth2 API** credential to authenticate with [Confluence Cloud](https://www.atlassian.com/software/confluence) in n8n.

## Prerequisites

- A [Confluence Cloud](https://www.atlassian.com/software/confluence) site.
- Access to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).

## Supported authentication methods

- OAuth2

## Related resources

Refer to [OAuth 2.0 (3LO) apps](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) and [Confluence scopes for OAuth 2.0 (3LO) and Forge apps](https://developer.atlassian.com/cloud/confluence/scopes-for-oauth-2-3LO-and-forge-apps/) in Atlassian's documentation for more information about the service.

## Using OAuth2

To configure this credential, you'll need a [Confluence Cloud](https://www.atlassian.com/software/confluence) site and access to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).

Then:

1. Open the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/) and select **Create** > **OAuth 2.0 integration**.
2. Enter a **Name** for your app and agree to the terms, then select **Create**.
3. Select **Authorization** in the left sidebar.
4. Next to **OAuth 2.0 (3LO)**, select **Add**.
5. In n8n, copy the **OAuth Redirect URL**.
6. Paste the URL into the **Callback URL** field in the Atlassian Developer Console.
7. Select **Save changes**.
8. Select **Permissions** in the left sidebar, then select **Add** next to **Confluence API**.
9. Select **Configure** next to **Confluence API** > **Edit Scopes**. Under the granular scopes, enable these scopes, then save your edits:
	- `read:page:confluence`
	- `write:page:confluence`
	- `read:hierarchical-content:confluence`
	- `read:space:confluence`
	- `read:attachment:confluence`
	- `read:comment:confluence`
	- `read:label:confluence`
	- `read:content-details:confluence`
	- `write:attachment:confluence`
	- `delete:attachment:confluence`
	- `write:comment:confluence`
	- `delete:comment:confluence`
	- `write:label:confluence`
	- `delete:page:confluence`
10. Select **Settings** in the left sidebar.
11. Copy the **Client ID** and paste it into n8n.
12. Copy the **Secret** and paste it as the **Client Secret** in n8n.
13. Select **Connect my account** and follow the prompts to complete the OAuth2 flow.

{% hint style="info" %}
**Selecting a site**

The credential doesn't store a Confluence site. You choose the site in the Confluence node's **Site** parameter instead: pick it from the list of sites the connection can access, or paste the site URL. If the connection has access to exactly one site, you can leave **Site** empty and the node uses it automatically.
{% endhint %}

{% hint style="warning" %}
**Enable every requested scope on your app**

Atlassian rejects the authorization request if the credential requests a scope that isn't enabled on your OAuth app. Make sure you enable all the scopes listed above in the Atlassian Developer Console. The credential also requests `offline_access`, which Atlassian grants automatically when requested. It's needed to refresh tokens, so the connection keeps working without you signing in again.
{% endhint %}

### Custom Scopes

By default, the credential requests the scopes listed above. To change which scopes it requests, turn on **Custom Scopes** and edit the space-separated scope list. You must enable every scope you request on your OAuth app in the Atlassian Developer Console.

Refer to [OAuth 2.0 (3LO) apps](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) in Atlassian's documentation for more information.
