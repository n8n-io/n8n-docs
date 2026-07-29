---
title: Jira credentials
description: >-
  Documentation for Jira credentials. Use these credentials to authenticate Jira
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Jira credentials
originalFilePath: integrations/builtin/credentials/jira.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/jira'
url: 'https://docs.n8n.io/integrations/builtin/credentials/jira'
layout:
  description:
    visible: false
---

# Jira credentials <a href="#jira-credentials" id="jira-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Jira](../app-nodes/n8n-nodes-base.jira.md)
- [Jira Trigger](../trigger-nodes/n8n-nodes-base.jiratrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Jira](https://www.atlassian.com/software/jira) Software Cloud or Server account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- [SW Cloud OAuth2](#using-sw-cloud-oauth2): Use this method with [Jira Software Cloud](https://www.atlassian.com/software/jira) for OAuth2 authentication.
- [SW Cloud API token](#using-sw-cloud-api-token): Use this method with [Jira Software Cloud](https://www.atlassian.com/software/jira).
- [SW Server account](#using-sw-server-account): Use this method with [Jira Software Server](https://www.atlassian.com/software/jira/download.).

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Jira's API documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about) for more information about the service.

## Using SW Cloud OAuth2 <a href="#using-sw-cloud-oauth2" id="using-sw-cloud-oauth2"></a>

To configure this credential, you'll need an account on [Jira Software Cloud](https://www.atlassian.com/software/jira) and access to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).

Then:

1. Open the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/) and select **Create** > **OAuth 2.0 integration**.
2. Enter a **Name** for your app and agree to the terms, then select **Create**.
3. Select **Authorization** in the left sidebar.
4. Next to **OAuth 2.0 (3LO)**, select **Add**.
5. In n8n, copy the **OAuth Redirect URL**.
6. Paste the URL into the **Callback URL** field in the Atlassian Developer Console.
7. Select **Save changes**.
8. Select **Permissions** in the left sidebar, then select **Add** next to **Jira API**.
9. Select **Configure** next to **Jira API** > **Edit Scopes**. Enable at minimum these scopes, then save your edits:
	- `read:jira-user`
	- `read:jira-work`
	- `write:jira-work`
	- `manage:jira-webhook`
	- `manage:jira-user`
	- `offline_access`
10. Select **Settings** in the left sidebar.
11. Copy the **Client ID** and paste it into n8n.
12. Copy the **Secret** and paste it as the **Client Secret** in n8n.
13. Enter the **Domain** you access Jira on, for example `https://example.atlassian.net`.
14. Select **Connect to Jira SW Cloud** and follow the prompts to complete the OAuth2 flow.

Refer to [OAuth 2.0 (3LO) apps](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) in Atlassian's documentation for more information.

## Using SW Cloud API token <a href="#using-sw-cloud-api-token" id="using-sw-cloud-api-token"></a>

To configure this credential, you'll need an account on [Jira Software Cloud](https://www.atlassian.com/software/jira).

Then:

1. Log in to your Atlassian profile > **Security > API tokens** page, or jump straight there using this [link](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Select **Create API Token**.
3. Enter a **Name** for your token, like `n8n integration`.
4. Set an **Expires on** date, or leave the default date.
5. Select **Create**.
6. Copy the API token.
7. In n8n, enter the **Email** address associated with your Jira account.
8. Paste the API token you copied as your **API Token**.
9. Enter the **Domain** you access Jira on, for example `https://example.atlassian.net`.

Refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) for more information.

{% hint style="info" %}
**New tokens**

New tokens may take up to a minute before they work. If your credential verification fails the first time, wait a minute before retrying.
{% endhint %}

## Using SW Server account <a href="#using-sw-server-account" id="using-sw-server-account"></a>

To configure this credential, you'll need an account on [Jira Software Server](https://www.atlassian.com/software/jira/download.).

Then:

1. Enter the **Email** address associated with your Jira account.
2. Enter your Jira account **Password**.
3. Enter the **Domain** you access Jira on.

