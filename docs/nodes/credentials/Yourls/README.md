---
description: Learn to configure credentials for the Yourls node in n8n
---

# Yourls

You can use these credentials to authenticate the following nodes with Yourls.
- [Yourls](../../nodes-library/nodes/Yourls/README.md)

## Prerequisites

Install [Yourls](https://github.com/YOURLS/YOURLS) on your server.

## Using API

1. Access your Yourls Admin dashboard.
2. Click on ***Tools*** on the top left.
3. Scroll down to the ***Secure passwordless API call*** section.
4. Copy the ***signature token***.
5. Use this ***Signature*** and the URL of your Yourls instance with your Yourls node credentials in n8n.

![Getting Yourls credentials](./using-api.gif)
