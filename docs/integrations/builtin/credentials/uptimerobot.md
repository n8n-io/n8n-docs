---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: UptimeRobot credentials
description: Documentation for UptimeRobot credentials. Use these credentials to authenticate UptimeRobot in n8n, a workflow automation platform.
contentType: integration
---

# UptimeRobot credentials

You can use these credentials to authenticate the following nodes:

- [UptimeRobot](/integrations/builtin/app-nodes/n8n-nodes-base.uptimerobot/)

## Prerequisites

Create an [UptimeRobot](https://uptimerobot.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [UptimeRobot's API documentation](https://uptimerobot.com/api/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Get your API Key from **My Settings > API Settings**. Create a **Main API Key** and enter this key in your n8n credential.

### API key types

UptimeRobot supports three API key types:

- **Account-specific** (also known as **main**): Pulls data for multiple monitors.
- **Monitor-specific**: Pulls data for a single monitor.
- **Read-only**: Only runs `GET` API calls.

To complete all of the operations in the UptimeRobot node, use the **Main** or **Account-specific** API key type. Refer to [API authentication](https://uptimerobot.com/api/#auth){:target=_blank .external-link} for more information.
