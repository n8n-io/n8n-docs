---
title: Specify user folder path
description: Specify location of the folder that stores user-specific data.
contentType: howto
nodeTitle: Specify user folder path
originalFilePath: hosting/configuration/configuration-examples/user-folder.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/user-folder'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/specify-user-folder-path
layout:
  description:
    visible: false
---

# Specify user folder path <a href="#specify-user-folder-path" id="specify-user-folder-path"></a>

n8n saves user-specific data like the encryption key, SQLite database file, and
the ID of the tunnel (if used) in the subfolder `.n8n` of the user who started n8n. It's possible to overwrite the user-folder using an environment variable.

```bash
export N8N_USER_FOLDER=/home/jim/n8n
```
Refer to [Environment variables reference](../use-environment-variables/deployment.md) for more information on this variable.
