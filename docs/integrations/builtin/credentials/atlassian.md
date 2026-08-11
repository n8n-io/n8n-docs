---
title: Atlassian credentials
description: >-
  Documentation for Atlassian credentials. Use these credentials to
  authenticate Atlassian in n8n, a workflow automation platform.
layout:
  description:
    visible: false
---

# Atlassian credentials

The **Atlassian OAuth2 API** credential is a generic OAuth2 credential for [Atlassian Cloud](https://www.atlassian.com/).

{% hint style="info" %}
**Choosing a credential type**

The product-specific credentials, [Jira SW Cloud OAuth2 API](jira.md) and [Confluence Cloud OAuth2 API](confluence.md), build on this credential and are the right choice for the Jira and Confluence nodes: they request the scopes those nodes need. Use the generic **Atlassian OAuth2 API** credential for advanced cases, for example with the HTTP Request node, where you define the scopes yourself.
{% endhint %}

## Prerequisites

- An [Atlassian Cloud](https://www.atlassian.com/) site for the product you want to access, such as Jira or Confluence.
- Access to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).

## Supported authentication methods

- OAuth2

## Related resources

Refer to [OAuth 2.0 (3LO) apps](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) in Atlassian's documentation for more information about the service.

## Using OAuth2

To configure this credential, you'll need an [Atlassian Cloud](https://www.atlassian.com/) site and access to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).

Then:

1. Open the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/) and select **Create** > **OAuth 2.0 integration**.
2. Enter a **Name** for your app and agree to the terms, then select **Create**.
3. Select **Authorization** in the left sidebar.
4. Next to **OAuth 2.0 (3LO)**, select **Add**.
5. In n8n, copy the **OAuth Redirect URL**.
6. Paste the URL into the **Callback URL** field in the Atlassian Developer Console.
7. Select **Save changes**.
8. Select **Permissions** in the left sidebar, then select **Add** next to the API of each product you want to access, such as **Jira API** or **Confluence API**.
9. Select **Configure** next to each API you added, then select **Edit Scopes** and enable the scopes you plan to request.
10. Select **Settings** in the left sidebar.
11. Copy the **Client ID** and paste it into n8n.
12. Copy the **Secret** and paste it as the **Client Secret** in n8n.
13. Enter the **Site URL** of your Atlassian site, for example `https://example.atlassian.net`. n8n ignores the scheme and any path such as `/wiki`, so pasting the site part of a full page URL also works.
14. Enter the **Scope** as a space-separated list of scopes to request, for example `read:jira-work read:page:confluence offline_access`.
15. Select **Connect my account** and follow the prompts to complete the OAuth2 flow.

{% hint style="warning" %}
**Enable every requested scope on your app**

Atlassian rejects the authorization request if the credential requests a scope that isn't enabled on your OAuth app. Make sure you enable every scope in the **Scope** field in the Atlassian Developer Console. Include `offline_access` in the list, which Atlassian grants automatically when requested. It's needed to refresh tokens, so the connection keeps working without you signing in again.
{% endhint %}

Refer to [Jira scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/) and [Confluence scopes](https://developer.atlassian.com/cloud/confluence/scopes-for-oauth-2-3LO-and-forge-apps/) in Atlassian's documentation for the available scopes.
