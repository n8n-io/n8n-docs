---
title: Base URL
description: Configure the Base URL environment variable to define the front end's access path to the back end's REST API for n8n.
contentType: howto
---

# Base URL

/// warning | Requires manual UI build
This environmental variable requires a manual build of the `n8n-editor-ui` package. You can't use it with the default n8n Docker image. The default is `/`, meaning that it uses the root-domain.
///
Tells the front end how to reach the REST API of the back end:

```bash
export VUE_APP_URL_BASE_API=https://n8n.example.com/
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/) for more information on each variable.