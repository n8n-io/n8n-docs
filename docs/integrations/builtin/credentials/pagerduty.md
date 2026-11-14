---
title: PagerDuty credentials
description: >-
  Documentation for PagerDuty credentials. Use these credentials to authenticate
  PagerDuty in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: PagerDuty credentials
originalFilePath: integrations/builtin/credentials/pagerduty.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/pagerduty'
url: 'https://docs.n8n.io/integrations/builtin/credentials/pagerduty'
layout:
  description:
    visible: false
---

# PagerDuty credentials <a href="#pagerduty-credentials" id="pagerduty-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [PagerDuty](../app-nodes/n8n-nodes-base.pagerduty.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [PagerDuty](https://pagerduty.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [PagerDuty's API documentation](https://developer.pagerduty.com/docs/531092d4c6658-rest-api-v2-overview) for more information about the service.

## Using API token <a href="#using-api-token" id="using-api-token"></a>

To configure this credential, you'll need:

- A general access **API Token**: To generate an API token, go to **Integrations > Developer Tools > API Access Keys > Create New API Key**. Refer to [Generate a General Access REST API key](https://support.pagerduty.com/docs/api-access-keys#generate-a-general-access-rest-api-key) for more information.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you need to configure OAuth2 from scratch, [register a new Pagerduty app](https://developer.pagerduty.com/docs/dd91fbd09a1a1-register-an-app).

Use these settings for registering your app:

- In the **Category** dropdown list, select **Infrastructure Automation**.
- In the **Functionality** section, select **OAuth 2.0**.

Once you **Save** your app, open the app details and [edit your app configuration](https://developer.pagerduty.com/docs/dd91fbd09a1a1-register-an-app#editing-your-app-configuration) to use these settings:

- Within the **OAuth 2.0** section, select **Add**.
- Copy the **OAuth Callback URL** from n8n and paste it into the **Redirect URL** field.
- Copy the **Client ID** and **Client Secret** from PagerDuty and add these to your n8n credentials.
- Select **Read/Write** from the **Set Permission Scopes** dropdown list.

Refer to the instructions in [App functionality](https://developer.pagerduty.com/docs/b25fd1b8acb1b-app-functionality) for more information on available functionality. Refer to the PagerDuty [OAuth Functionality documentation](https://developer.pagerduty.com/docs/f59fdbd94ceab-o-auth-functionality) for more information on the OAuth flow.


