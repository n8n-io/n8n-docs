---
description: How to use an API playground to try out n8n's public REST API.
contentType: howto
---

# Using an API playground

This documentation site provides a playground to test out calls. Self-hosted users also have access to a built-in playground hosted as part of their instance.

## Documentation playground

You can test API calls from this site's [API reference](api-reference.md). You need to set your server's base URL and instance name, and add an API key.

n8n uses [Scalar's](https://github.com/scalar/scalar) open source API platform to power this functionality.

/// warning | Exposed API key and data
Use a test API key with limited scopes and test data when using a playground. All calls from the playground are routed through Scalar's proxy servers.
///

/// warning | Real data
You have access to your live data. This is useful for trying out requests. Be aware you can change or delete real data.
///


## Built-in playground

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
