---
title: Twake credentials
description: Documentation for Twake credentials. Use these credentials to authenticate Twake in n8n, a workflow automation platform.
contentType: integration
---

# Twake credentials

You can use these credentials to authenticate the following nodes:

- [Twake](/integrations/builtin/app-nodes/n8n-nodes-base.twake/)

## Prerequisites

Create a [Twake](https://twake.app/) account.

## Supported authentication methods

- Cloud API key
- Server API key

## Related resources

Refer to [Twake's documentation](https://doc.twake.app/developers-api/api-reference){:target=_blank .external-link} for more information about the service.

## Using Cloud API key

To configure this credential, you'll need:

- A **Workspace Key**

1. Access your [Twake](https://web.twake.app) workspace.
2. Click on ***Main*** in the top left corner.
3. Select 'Workspace settings' from the dropdown list.
4. Select ***Applications and connectors***.
5. Click on the ***Search applications...*** button.
6. Search for `n8n` and click on the ***Display*** button.
7. Click on ***Install*** and select ***Confirm***.
8. Click on ***Configure*** and copy the Workspace Key.
9. Use the Workspace Key with your Twake node credentials in n8n.

![Getting Twake workspace key](/_images/integrations/builtin/credentials/twake/using-workspace-key.gif)

## Using Server API key

To configure this credential, you'll need:

- A **Host URL**
- A **Public ID**
- A **Private API Key**