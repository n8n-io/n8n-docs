---
permalink: /credentials/pushbullet
description: Learn to configure credentials for the Pushbullet node in n8n
---

# Pushbullet

You can use these credentials to authenticate the following nodes with Pushbullet.
- [Pushbullet](../../nodes-library/nodes/Pushbullet/README.md)

## Prerequisites

Create a [Pushbullet](https://www.pushbullet.com/) account.

## Using OAuth

1. Access the [create client](https://www.pushbullet.com/create-client) page.
2. Enter an app name in the ***name*** field.
3. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste it in the ***redirect_uri*** field.
4. Click on the ***Add A New OAuth Client*** button.
5. Use the provided ***client_id*** and ***client_secret*** with your Pushbullet OAuth2 API credentials in n8n.
6. Click on the circle button in the OAuth section to connect an Pushbullet account to n8n.
7. Click the ***Save*** button to save your credentials in n8n.

![Getting Pushbullet credentials](./using-oauth.gif)
