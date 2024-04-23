---
title: Box credentials
description: Documentation for Box credentials. Use these credentials to authenticate Box in n8n, a workflow automation platform.
contentType: integration
---

# Box credentials

You can use these credentials to authenticate the following nodes:

- [Box](/integrations/builtin/app-nodes/n8n-nodes-base.box/)
- [Box Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.boxtrigger/)

## Prerequisites

Create a [Box](https://www.box.com/) account.

## Supported authentication methods

- OAuth2

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API credential docs. Amend the link text if neccessary. -->
Refer to [Box's API documentation](https://developer.box.com/reference/){:target=_blank .external-link} for more information about the service.

## Using OAuth2

/// note | Note for n8n Cloud users
You'll only need to enter the Credentials Name and select the **Connect my account** button in the OAuth credential to connect your Box account to n8n.
///

1. Access the [Box Developers Console](https://app.box.com/developers/console).
2. Click on the *Create New App* button.
3. Select 'Custom App' and click *Next*.
4. Select 'Standard OAuth 2.0 (User Authentication)'and click *Next*.
5. Enter any other necessary information and click on the *Create App* button.
6. Copy the 'OAuth Callback URL' provided in the Box OAuth2 API credentials in n8n and paste it in the 'Redirect URI' field in the Box app page.
7. Click the *Save Changes* button and use the displayed 'Client ID' and the 'Client Secret' with your Box OAuth2 API credentials in n8n.
10. Click on the circle button in the OAuth section to connect a Box account to n8n.
11. Click the *Save* button to save your credentials in n8n.

![Getting Box credentials](/_images/integrations/builtin/credentials/box/using-oauth.gif)

