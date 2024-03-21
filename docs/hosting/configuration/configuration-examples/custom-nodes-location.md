---
title: Custom nodes location
description: Add custom nodes location.
contentType: howto
---

# Custom nodes location

Every user can add custom nodes that get loaded by n8n on startup. The default
location is in the subfolder `.n8n/custom` of the user who started n8n.

You can define more folders with an environment variable:

```bash
export N8N_CUSTOM_EXTENSIONS="/home/jim/n8n/custom-nodes;/data/n8n/nodes"
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/) for more information on each variable.