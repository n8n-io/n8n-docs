---
permalink: /credentials/gotify
description: Learn to configure credentials for the Gotify node in n8n
---

# Gotify

You can use these credentials to authenticate the following nodes with Gotify.
- [Gotify](../../nodes-library/nodes/Gotify/README.md)

## Prerequisites

Install [Gotify](https://gotify.net/docs/install) on your server.

## Using API Token

***Note:*** To create a message, the App API Token is required. To delete or retrieve all messages, you need the Client API Token.

1. Access your Gotify dashboard.
2. Click on ***APPS*** in the navigation menu.
3. Click on the ***CREATE APPLICATION*** button.
4. Enter an application name in the ***Name*** field.
5. Click on the ***CREATE*** button.
6. Click on ***CLIENTS*** in the navigation menu.
7. Click on the ***CREATE CLIENT*** button.
8. Enter a name for the client in the ***Name*** field.
9. Click on the ***CREATE*** button.
10. Use this app token, client token, and the host URL with your Gotify API credentials in n8n.
11. Click the ***Save*** button to save your credentials in n8n.

![Getting Gotify credentials](./using-api.gif)
