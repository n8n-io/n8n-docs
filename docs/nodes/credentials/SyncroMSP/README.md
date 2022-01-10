---
permalink: /credentials/syncroMsp
description: Learn to configure credentials for the SyncroMSP node in n8n
---

# SyncroMSP

You can use these credentials to authenticate the following nodes with SyncroMSP.
- [SyncroMSP](../../nodes-library/nodes/SyncroMSP/README.md)

## Prerequisites

Create a [SyncroMSP](https://syncromsp.com/) account.

## Using Access Token

1. With administrator privileges, navigate to the [API Tokens page in SyncroMSP](https://n8nchangelog.syncromsp.com/api_tokens).
2. Click on the `+ New Token` button.
3. On the `Custom Permissions` tab, enter a name for your new token and adjust the permissions to match your requirements.
4. Click `Create API Token` once done.
5. Copy the key shown by SyncroMSP into the `API Key` field of your SyncroMSP credentials in n8n.
6. Enter your SyncroMSP subdomain (the part between `https://` and `.syncromsp.com`) in the `Subdomain` field of your SyncroMSP credentials in n8n.
7. Click `Save` on the n8n credentials screen.
