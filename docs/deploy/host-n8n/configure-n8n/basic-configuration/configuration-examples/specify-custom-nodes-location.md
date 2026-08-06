---
title: Specify location for your custom nodes
description: Add folders and specify paths for your custom nodes.
contentType: howto
nodeTitle: Specify custom nodes location
originalFilePath: hosting/configuration/configuration-examples/custom-nodes-location.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/configuration-examples/custom-nodes-location
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/specify-custom-nodes-location
layout:
  description:
    visible: false
---

# Specify location for your custom nodes <a href="#specify-location-for-your-custom-nodes" id="specify-location-for-your-custom-nodes"></a>

Every user can add custom nodes that get loaded by n8n on startup. The default
location is in the subfolder `.n8n/custom` of the user who started n8n.

You can define more folders with an environment variable:

```bash
export N8N_CUSTOM_EXTENSIONS="/home/jim/n8n/custom-nodes;/data/n8n/nodes"
```
Refer to [Environment variables reference](../use-environment-variables/nodes.md) for more information on this variable.
