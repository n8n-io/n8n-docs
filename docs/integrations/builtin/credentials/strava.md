# Strava

You can use these credentials to authenticate the following nodes with Strava.

- [Strava](/integrations/builtin/app-nodes/n8n-nodes-base.strava/)
- [Strava Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stravaTrigger/)

## Prerequisites

Create a [Strava](https://Strava.com) account.

## Using OAuth

1. Access the [My API Application page](https://www.strava.com/settings/api).
2. Enter the application name in the ***Application Name*** field.
3. Enter the website URL in the ***Website*** field.
4. Copy the string of characters between `https://` (or `http://`) and `/oauth2/callback` (or `/rest/oauth2-credential/callback`) from 'OAuth Callback URL' in n8n. Paste it in the ***Authorization Callback Domain*** in Strava.
5. Read 'Strava's API Agreement', and if you agree, check the checkbox.
6. Click on the ***Create*** button.
7. Click on ***App Icon*** and select an image from the browser window.
8. Click on the ***Save*** button.
9. Use this ***Client ID*** and ***Client Secret*** with your Strava node credentials in n8n.

![Getting Strava credentials](/_images/integrations/builtin/credentials/strava/using-oauth.gif)
