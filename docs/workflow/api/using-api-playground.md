---
title: "Workflow² Using the API playground"
description: The n8n API comes with a built-in Swagger UI playground. This provides interactive documentation, allowing you to try out requests.
tags:
  - WF²
  - API

---

# Using the API playground

The n8n API comes with a built-in Swagger UI playground. This provides interactive documentation, allowing you to try out requests. The path to access the playground depends on your hosting.

For self-hosted users, n8n constructs the path from values set in your environment variables:

```shell
N8N_HOST:N8N_PORT/N8N_PATH/api/v<version-number>/docs
```

For n8n Cloud users, the API playground path contains your cloud instance URL:

```shell
<your-cloud-instance>/api/v<version-number>/docs
```

The API includes built-in documentation about credential formats. This is available using the `credentials` endpoint:

```shell
/api/credentials/schema/{id}
```

!!! warning "Real data"
    If you click **Authorize** and enter your API key in the API playground, you have access to your live data. This is useful for trying out requests. However, be aware you can change or delete real data.