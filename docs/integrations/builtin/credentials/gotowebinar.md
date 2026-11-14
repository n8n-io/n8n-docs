---
title: GoToWebinar credentials
description: >-
  Documentation for GoToWebinar credentials. Use these credentials to
  authenticate GoToWebinar in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: GoToWebinar credentials
originalFilePath: integrations/builtin/credentials/gotowebinar.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/gotowebinar'
url: 'https://docs.n8n.io/integrations/builtin/credentials/gotowebinar'
layout:
  description:
    visible: false
---

# GoTo Webinar credentials <a href="#goto-webinar-credentials" id="goto-webinar-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [GoToWebinar](../app-nodes/n8n-nodes-base.gotowebinar.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [GoToWebinar](https://www.goto.com/webinar) account with [Developer Center](https://developer.goto.com/) access.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [GoToWebinar's API documentation](https://developer.goto.com/GoToWebinarV2) for more information about authenticating with the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need:

- A **Client ID**: Provided once you create an OAuth client
- A **Client Secret**: Provided once you create an OAuth client

Refer to the [Create an OAuth client documentation](https://developer.goto.com/guides/Get%20Started/02_HOW_createClient/) for detailed instructions on creating an OAuth client. Copy the **OAuth Callback URL** from n8n to use as the **Redirect URI** in your OAuth client. The Client ID and Client secret are provided once you've finished setting up your client.

