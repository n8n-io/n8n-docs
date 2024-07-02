---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GoToWebinar credentials
description: Documentation for GoToWebinar credentials. Use these credentials to authenticate GoToWebinar in n8n, a workflow automation platform.
contentType: integration
---

# GoTo Webinar credentials

You can use these credentials to authenticate the following nodes:

- [GoToWebinar](/integrations/builtin/app-nodes/n8n-nodes-base.gotowebinar/)

## Prerequisites

Create a [GoToWebinar](https://gotowebinar.com/){:target=_blank .external-link} account with [Developer Center](https://developer.goto.com/){:target=_blank .external-link} access.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [GoToWebinar's API documentation](https://developer.goto.com/GoToWebinarV2){:target=_blank .external-link} for more information about authenticating with the service.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Provided once you create an OAuth client
- A **Client Secret**: Provided once you create an OAuth client

Refer to the [Create an OAuth client documentation](https://developer.goto.com/guides/Get%20Started/02_HOW_createClient/){:target=_blank .external-link} for detailed instructions on creating an OAuth client. Copy the **OAuth Callback URL** from n8n to use as the **Redirect URI** in your OAuth client. The Client ID and Client secret are provided once you've finished setting up your client.

