---
title: Xero credentials
description: Documentation for Xero credentials. Use these credentials to authenticate Xero in n8n, a workflow automation platform.
contentType: integration
---

# Xero credentials

You can use these credentials to authenticate the following nodes with Xero.

- [Xero](/integrations/builtin/app-nodes/n8n-nodes-base.xero/)

## Prerequisites

Create a [Xero](https://www.xero.com/) account.

## Using OAuth

1. Go to the [apps page](https://developer.xero.com/myapps) in the Xero developer portal.
2. Select **New app**. 
3. Make sure **Web app** is selected.
4. Copy the **OAuth Callback URL** provided in the Xero OAuth API credentials in n8n and paste it into **OAuth 2.0 redirect URI** in the Xero app creation page.
5. Select **Create app**.
6. Select **Generate a secret** and use the **Client ID** and the **Client secret** with your Xero OAuth API credentials in n8n.
7. Select **Save** to save your credentials.

Refer to Xero's [OAuth Custom Connections](https://developer.xero.com/documentation/guides/oauth2/custom-connections){:target=_blank .external-link} documentation for more information.
