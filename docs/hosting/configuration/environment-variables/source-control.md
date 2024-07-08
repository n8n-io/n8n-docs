---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Source control environment variables
description: Environment variable to set the default SSH key type for source control setup.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Source control environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

n8n uses Git-based source control to support environments. Refer to [Source control and environments](/source-control-environments/setup/) for more information on how to link a Git repository to an n8n instance and configure your source control.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE` | String | `ed25519` | Set to `rsa` to make RSA the default SSH key type for [Source control setup](/source-control-environments/setup/). |
