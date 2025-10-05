---
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
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment.md) for more information on this variable.
