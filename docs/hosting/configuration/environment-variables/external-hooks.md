---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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

--8<-- "_snippets/self-hosting/file-based-configuration.md"

You can define external hooks that n8n executes whenever a specific operation runs. Refer to [Backend hooks](/embed/configuration/#backend-hooks) for examples of available hooks and [Hook files](/embed/configuration/#hook-files_1) for information on file formatting. 

| Variable | Type  | Description |
| :------- | :---- | :---------- |
| `EXTERNAL_HOOK_FILES` | String | Files containing backend external hooks. Provide multiple files as a colon-separated list ("`:`"). |
| `EXTERNAL_FRONTEND_HOOKS_URLS` | String | URLs to files containing frontend external hooks. Provide multiple URLs as a colon-separated list ("`:`"). |