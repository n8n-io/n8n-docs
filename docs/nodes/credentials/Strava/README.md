---
permalink: /credentials/strava
description: Learn to configure credentials for the Strava node and the Strava Trigger node in n8n
---

# Strava

You can use these credentials to authenticate the following nodes with Strava.
- [Strava](../../nodes-library/nodes/Strava/README.md)
- [Strava Trigger](../../nodes-library/trigger-nodes/StravaTrigger/README.md)

## Prerequisites

Create a [Strava](https://Strava.com) account.

## Using OAuth

1. Access the [My API Application page](https://www.strava.com/settings/api).
2. Enter the application name in the ***Application Name*** field.
3. Enter the website URL in the ***Website*** field.
4. Copy the 'OAuth Callback URL' from n8n and paste it in the ***Authorization Callback Domain***.
5. Read the 'Strava's API Agreement' and if you agree check the checkbox.
6. Click on the ***Create*** button.
7. Click on ***App Icon*** and select an image from the browser window.
8. Click on the ***Save*** button.
9. Use this ***Client ID*** and ***Client Secret*** with your Strava node credentials in n8n.

![Getting Strava credentials](./using-oauth.gif)
