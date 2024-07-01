---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: External secrets environment variables
description: Configure the interval for checking updates to external secrets in self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# External secrets environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

You can use an external secrets store to manage credentials for n8n. Refer to [External secrets](/external-secrets/) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL` | Number | `300` (5 minutes) | How often (in seconds) to check for secret updates. |
