---
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

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods/) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. Variables that support this have the "/`_FILE`" option listed below.
///

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `GENERIC_TIMEZONE` | * | `America/New_York` |The n8n instance timezone. Important for schedule nodes (such as Cron). |
| `N8N_DEFAULT_LOCALE` | String | `en` | A locale identifier, compatible with the [Accept-Language header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language){:target="_blank" .external-link}. n8n doesn't support regional identifiers, such as `de-AT`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings. |
