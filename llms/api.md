

# api/api-reference.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
template: api.html
hide:
    - toc
    - navigation
description: API reference for n8n's public REST API.
contentType: reference
---


<redoc
  spec-url="/api/v1/openapi.yml"
  disable-search
  hide-hostname
  theme='{
    "typography": {
      "fontSize": "14px",
      "lineHeight": "1.2em",
      "fontFamily": "\"Open sans\", Helvetica, sans-serif",
      "headings": {
        "fontFamily": "\"Open sans\", Helvetica, sans-serif"
      }
    },
    "sidebar": {
      "backgroundColor": "#eaeaea",
      "width": "280px"
    }
  }' />
<script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>


# api/authentication.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Authentication for n8n's public REST API.
contentType: howto
---

# API authentication

n8n uses API keys to authenticate API calls.

/// info | Feature availability 
The n8n API isn't available during the free trial. Please upgrade to access this feature.
///

## API Scopes

Users of [enterprise instances](https://n8n.io/enterprise/) can limit which resources and actions a key can access with scopes. API key scopes allow you specify the exact level of access a key needs for its intended purpose.

Non-enterprise API keys have full access to all the account's resources and capabilities.

## Create an API key

1. Log in to n8n.
1. Go to **Settings** > **n8n API**.
1. Select **Create an API key**.
1. Choose a **Label** and set an **Expiration** time for the key.
1. If on an enterprise plan, choose the **Scopes** to give the key.
1. Copy **My API Key** and use this key to authenticate your calls.

## Call the API using your key

Send the API key in your API call as a header named `X-N8N-API-KEY`. 

For example, say you want to get all active workflows. Your curl request will look like this:

```shell
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'
```

## Delete an API key

1. Log in to n8n.
2. Go to **Settings** > **n8n API**.
3. Select **Delete** next to the key you want to delete.
4. Confirm the delete by selecting **Delete Forever**.


# api/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n public REST API Documentation and Guides
description: Access n8n public REST API documentation and guides. Find comprehensive resources to programmatically perform tasks with the public API instead of the GUI.
contentType: overview
search:
    boost: 5
---

# n8n public REST API

/// info | Feature availability
The n8n API isn't available during the free trial. Please upgrade to access this feature.  
///

Using n8n's public [API](/glossary.md#api), you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API, including:

* How to [authenticate](/api/authentication.md)
* [Paginating](/api/pagination.md) results
* Using the [built-in API playground](/api/using-api-playground.md) (self-hosted n8n only)
* [Endpoint reference](/api/api-reference.md)

n8n provides an [n8n API node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md) to access the API in your workflows.

## Learn about REST APIs

The API documentation assumes you are familiar with REST APIs. If you're not, these resources may be helpful:

* [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis){:target=_blank .external-link}: a basic introduction, including examples of how to call REST APIs.
* [IBM Cloud Learn Hub - What is an Application Programming Interface (API)](https://www.ibm.com/cloud/learn/api){:target=_blank .external-link}: this gives a general, but technical, introduction to APIs.
* [IBM Cloud Learn Hub - What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis){:target=_blank .external-link}: more detailed information about REST APIs.
* [MDN web docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview){:target=_blank .external-link}: REST APIs work over HTTP and use HTTP verbs, or methods, to specify the action to perform.

/// tip | Use the API playground (self-hosted n8n only)
Trying out the API in the [playground](/api/using-api-playground.md) can help you understand how APIs work. If you're worried about changing live data, consider setting up a test workflow, or test n8n instance, to explore safely.
///


# api/pagination.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Pagination in n8n's public REST API.
contentType: howto
---

# API pagination

The default page size is 100 results. You can change the page size limit. The maximum permitted size is 250.

When a response contains more than one page, it includes a cursor, which you can use to request the next pages.

For example, say you want to get all active workflows, 150 at a time.

Get the first page:

```shell
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true&limit=150' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true&limit=150' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'
```

The response is in JSON format, and includes a `nextCursor` value. This is an example response.

```js
{
  "data": [
    // The response contains an object for each workflow
    {
      // Workflow data
    }
  ],
  "nextCursor": "MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA"
}
```

Then to request the next page:

```bash
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'
```


# api/using-api-playground.md

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
