---
title: External hooks environment variables
description: Environment variables to integrate external hooks into your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# External hooks environment variables

/// note | File-based configuration
You can provide a [configuration file](/hosting/configuration/configuration-methods/) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file. Variables that support this have the "/`_FILE`" option listed below.
///

You can define external hooks that n8n executes whenever a specific operation runs. Refer to [Backend hooks](/embed/configuration/#backend-hooks) for examples of available hooks and [Hook files](/embed/configuration/#hook-files_1) for information on file formatting. 

| Variable | Type  | Description |
| :------- | :---- | :---------- |
| `EXTERNAL_HOOK_FILES` | String | Files containing external hooks. Provide multiple files as a colon-separated list ("`:`"). |
