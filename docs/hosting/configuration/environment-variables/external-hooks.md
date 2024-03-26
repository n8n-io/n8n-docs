---
title: External hooks
description: Environment variables to integrate external hooks into your self-hosted n8n instance. 
contentType: reference
hide:
  - toc
---

# External hooks

You can define external hooks that n8n executes whenever a specific operation runs. Refer to [Backend hooks](/embed/configuration/#backend-hooks) for examples of available hooks and [Hook files](/embed/configuration/#hook-files_1) on file formatting. 

| Variable | Type  | Description |
| :------- | :---- | :---------- |
| `EXTERNAL_HOOK_FILES` | String | Files containing external hooks. Provide multiple files as a colon-separated list ("`:`"). |