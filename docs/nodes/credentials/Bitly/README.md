---
permalink: /credentials/bitly
---

# Bitly

You can find information about the operations supported by the Bitly node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.bitly) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Bitly).

## Prerequisites

Create a [Bitly](https://www.bitly.com/) account.

## Using OAuth

1. Open your Bitly dashboard.
2. Click on your account button in the top right.
3. Click on "Profile Settings".
4. Click on "Registered OAuth Applications".
5. Click on "GET REGISTRATION CODE".
6. Use Client Secret and Client ID in your Bitly node credentials in n8n.
7. Enter n8n provided redirect URL. Redirect URL Explanation [here](../README.md).


![Getting Bitly credentials](./using-oauth.gif)

## Using Access Token

1. Open your Bitly dashboard.
2. Click on your account button in the top right.
3. Click on "Profile Settings".
4. Click on "Generate Access Token".
5. Enter password.
6. Use the access token in your Bitly node credentials in n8n.


![Getting Bitly credentials](./using-access-token.gif)
