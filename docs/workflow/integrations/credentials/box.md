---
title: Box

tags:
  - Workflow²
  - Box
---

# Box

You can use these credentials to authenticate the following nodes with Box.
- [Box](/workflow/integrations/nodes/n8n-nodes-base.box/)
- [Box Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.boxTrigger/)

## Prerequisites

Create a [Box](https://www.box.com/) account.

## Using OAuth


1. Access the [Box Developers Console](https://app.box.com/developers/console).
2. Click on the *Create New App* button.
3. Select 'Custom App' and click *Next*.
4. Select 'Standard OAuth 2.0 (User Authentication)'and click *Next*.
5. Enter any other necessary information and click on the *Create App* button.
6. Copy the 'OAuth Callback URL' provided in the Box OAuth2 API credentials in Doc² and paste it in the 'Redirect URI' field in the Box app page.
7. Click the *Save Changes* button and use the displayed 'Client ID' and the 'Client Secret' with your Box OAuth2 API credentials in n8n.
10. Click on the circle button in the OAuth section to connect a Box account to n8n.
11. Click the *Save* button to save your credentials in n8n.

![Getting Box credentials](/_images/integrations/credentials/box/using-oauth.gif)
