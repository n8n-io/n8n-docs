---
title: Asana

tags:
  - Workflow²
  - Asana
---

# Asana

You can use these credentials to authenticate the following nodes with Asana.
- [Asana](/workflow/integrations/nodes/n8n-nodes-base.asana/)
- [Asana Trigger](/workflwo/integrations/trigger-nodes/n8n-nodes-base.asanaTrigger/)


## Prerequisites

Create an [Asana](https://www.Asana.com/) account.

## Using OAuth

!!! note "⛅️ Note fordoc2app.cloudintegration.eu users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Asana account to Workflow².


1. Open your Asana dashboard.
2. Click on your user icon in the top right.
3. Click on ***My Profile Settings...***
4. Click on the ***Apps*** tab.
5. Click on ***Manage Developer Apps***.
6. Click on ***New App***.
7. Enter a name, accept the *API terms and conditions*, and click on ***Create app***.
8. Copy the ***OAuth Callback URL*** from Doc² and paste it in the ***Redirect URLs*** field and click ***Add***.
9. Use the provided ***Client ID*** and ***Client secret*** with your Asana OAuth2 API credentials in Workflow².
10. Click on the circle button in the OAuth section to connect an Asana account to Workflow².
11. Click the ***Save*** button to save your credentials in Workflow².

![Getting Asana credentials](/_images/integrations/credentials/asana/using-oauth.gif)

## Using Access Token

1. Open your Asana dashboard.
2. Click on your user icon in the top right of the window.
3. Click on ***My Profile Settings***.
4. Click on the ***Apps*** tab.
5. Click on ***Manage Developer Apps***.
6. Click on ***New access token*** under the ***Personal access tokens*** section.
7. Enter a name for the access token and agree to the API terms and conditions.
8. Click on the ***Create token*** button.
9. Copy the token and use it with your Asana node credentials in Workflow².

![Getting Asana credentials](/_images/integrations/credentials/asana/using-access-token.gif)
