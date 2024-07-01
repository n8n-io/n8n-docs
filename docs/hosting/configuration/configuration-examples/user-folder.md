---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Specify user folder path
description: Specify location of the folder that stores user-specific data. 
contentType: howto
---

# Specify user folder path

n8n saves user-specific data like the encryption key, SQLite database file, and
the ID of the tunnel (if used) in the subfolder `.n8n` of the user who started n8n. It's possible to overwrite the user-folder using an environment variable.

```bash
export N8N_USER_FOLDER=/home/jim/n8n
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment/) for more information on this variable.
