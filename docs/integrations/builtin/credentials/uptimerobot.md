---
title: UptimeRobot credentials
description: >-
  Documentation for UptimeRobot credentials. Use these credentials to
  authenticate UptimeRobot in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: UptimeRobot credentials
originalFilePath: integrations/builtin/credentials/uptimerobot.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/uptimerobot'
url: 'https://docs.n8n.io/integrations/builtin/credentials/uptimerobot'
layout:
  description:
    visible: false
---

# UptimeRobot credentials <a href="#uptimerobot-credentials" id="uptimerobot-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [UptimeRobot](../app-nodes/n8n-nodes-base.uptimerobot.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [UptimeRobot](https://uptimerobot.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [UptimeRobot's API documentation](https://uptimerobot.com/api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Get your API Key from **My Settings > API Settings**. Create a **Main API Key** and enter this key in your n8n credential.

### API key types <a href="#api-key-types" id="api-key-types"></a>

UptimeRobot supports three API key types:

- **Account-specific** (also known as **main**): Pulls data for multiple monitors.
- **Monitor-specific**: Pulls data for a single monitor.
- **Read-only**: Only runs `GET` API calls.

To complete all of the operations in the UptimeRobot node, use the **Main** or **Account-specific** API key type. Refer to [API authentication](https://uptimerobot.com/api/#auth) for more information.
