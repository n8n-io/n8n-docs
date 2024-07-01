---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Enterprise key
description: How to use your enterprise license key.
contentType: howto
---

# Enterprise license key

You need to add your enterprise license key to enable enterprise features. You can do this through the UI, or using environment variables.

## Add an enterprise license key in the UI

In your n8n instance:

1. Select **Settings** > **Usage and plan**.
1. Select **Enter activation key**.
1. Paste in your license key.
1. Select **Activate**.

## Add an enterprise license key using environment variables

In your n8n configuration, set `N8N_LICENSE_ACTIVATION_KEY` to your license key.

Refer to [Environment variables](/hosting/configuration/configuration-methods/) to learn more about configuring n8n.

## Allowlist the license server IP addresses

n8n uses Cloudflare to host the license server. As the specific IP addresses can change, you need to allowlist the [full range of Cloudflare IPs](https://www.cloudflare.com/ips/){:target=_blank .external-link} to ensure n8n can always reach the license server.
