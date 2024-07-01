---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Timezone and localization environment variables
description: Set the timezone and default language locale for self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Timezone and localization environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `GENERIC_TIMEZONE` | * | `America/New_York` |The n8n instance timezone. Important for schedule nodes (such as Cron). |
| `N8N_DEFAULT_LOCALE` | String | `en` | A locale identifier, compatible with the [Accept-Language header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language){:target="_blank" .external-link}. n8n doesn't support regional identifiers, such as `de-AT`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings. |
