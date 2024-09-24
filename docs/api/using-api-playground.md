---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to use the API playground to try out n8n's public REST API.
contentType: howto
---

# Using the API playground

/// info | Feature availability
The API playground isn't available on Cloud. It's available for all self-hosted pricing tiers.
///

The n8n API comes with a built-in Swagger UI playground in self-hosted versions. This provides interactive documentation, where you can try out requests. The path to access the playground depends on your hosting.

n8n constructs the path from values set in your environment variables:

```shell
N8N_HOST:N8N_PORT/N8N_PATH/api/v<api-version-number>/docs
```

The API version number is `1`. There may be multiple versions available in the future.

/// warning | Real data
If you select **Authorize** and enter your API key in the API playground, you have access to your live data. This is useful for trying out requests. Be aware you can change or delete real data.
///
The API includes built-in documentation about credential formats. This is available using the `credentials` endpoint:

```shell
N8N_HOST:N8N_PORT/N8N_PATH/api/v<api-version-number>/credentials/schema/{credentialTypeName}
```

/// note | How to find `credentialTypeName`
To find the type, download your workflow as JSON and examine it. For example, for a Google Drive node the `{credentialTypeName}` is `googleDriveOAuth2Api`:
```json
{
    ...,
    "credentials": {
        "googleDriveOAuth2Api": {
        "id": "9",
        "name": "Google Drive"
        }
    }
}
```
/// 
