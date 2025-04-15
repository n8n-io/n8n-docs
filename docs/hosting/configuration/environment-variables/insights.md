---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Insights environment variables
description: Configure whether insights metrics collection is enabled or not and how its collected
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Insights environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Insights gives instance owners and admins visibility into how workflows perform over time. Refer to [Insights](/insights.md) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_DISABLED_MODULES` | String | - | Set as `insights` to disable the feature and metrics collection on an instance |
