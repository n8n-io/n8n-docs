---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure the Base URL for n8n's front end access
description: Configure the Base URL environment variable to define the front end's access path to the back end's REST API for n8n.
contentType: howto
---

# Configure the Base URL for n8n's front end access

/// warning | Requires manual UI build
This use case involves configuring the `VUE_APP_URL_BASE_API` environmental variable which requires a manual build of the `n8n-editor-ui` package. You can't use it with the default n8n Docker image where the default setting for this variable is `/`, meaning that it uses the root-domain.
///

You can configure the Base URL that the front end uses to connect to the back end's REST API. This is relevant when you want to host n8n's front end and back end separately. 

```bash
export VUE_APP_URL_BASE_API=https://n8n.example.com/
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment/) for more information on this variable.
