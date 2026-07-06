---
title: Reddit credentials
description: >-
  Documentation for Reddit credentials. Use these credentials to authenticate
  Reddit in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Reddit credentials
originalFilePath: integrations/builtin/credentials/reddit.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/reddit'
url: 'https://docs.n8n.io/integrations/builtin/credentials/reddit'
layout:
  description:
    visible: false
---

# Reddit credentials <a href="#reddit-credentials" id="reddit-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Reddit](../app-nodes/n8n-nodes-base.reddit.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Reddit](https://reddit.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Reddit's developer documentation](https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

{% hint style="warning" %}
**API access requires pre-approval**

Reddit closed self-service access to their public data API in November 2025. Now, Reddit require manual approval before you can create new apps. Review Reddit's [Responsible Builder Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy) and submit a request via [Reddit's Developer Support form](https://support.reddithelp.com/hc/en-us/requests/new?ticket_form_id=14868593862164).
{% endhint %}

Once approved, create a [third-party app](https://www.reddit.com/prefs/apps). Visit the previous link, or go to your **profile > Settings > Privacy > Third-party app authorizations > are you a developer? create an app**.  and use these settings:

- Copy the **OAuth Callback URL** from n8n and use it as your app's **redirect uri**.
- The app's client ID displays underneath your app name. Copy that and add it as your n8n **Client ID**.
- Copy the app's **secret** and add it as your n8n **Client Secret**.

