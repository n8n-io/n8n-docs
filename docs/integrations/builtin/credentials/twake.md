---
title: Twake credentials
description: Documentation for Twake credentials. Use these credentials to authenticate Twake in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Twake credentials

You can use these credentials to authenticate the following nodes:

- [Twake](/integrations/builtin/app-nodes/n8n-nodes-base.twake.md)

## Prerequisites

Create a [Twake](https://twake.app/) account.

## Supported authentication methods

- Cloud API key
- Server API key

## Related resources

Refer to [Twake's documentation](https://doc.twake.app/developers-api/api-reference) for more information about the service.

## Using Cloud API key

To configure this credential, you'll need:

- A **Workspace Key**: Generated when you install the **n8n** application to your Twake Cloud environment and select **Configure**. Refer to [How to connect n8n to Twake](https://help.twake.app/en/latest/applications/connectors/index.html#how-to-connect-n8n-to-twake) for more detailed instructions.

## Using Server API key

To configure this credential, you'll need:

- A **Host URL**: The URL of your Twake self-hosted instance.
- A **Public ID**: Generated when you create an app.
- A **Private API Key**: Generated when you create an app.

To generate your **Public ID** and **Private API Key**, [create a Twake application](https://doc.twake.app/developers-api/get-started/create-your-first-application): 

1. Go to **Workspace Settings > Applications and connectors > Access your applications and connectors > Create an application**.
2. Enter appropriate details.
3. Once you've created your app, view its **API Details**.
4. Copy the **Public identifier** and add it as the n8n **Public ID**.
5. Copy the **Private key** and add it as the n8n **Private API Key**.

Refer to [API settings](https://doc.twake.app/developers-api/get-started/create-your-first-application#id-3.-api-settings) for more information.