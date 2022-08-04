---
title: "WF² API pagination"
description: WF² uses API keys to authenticate API calls.
tags:
  - WF²
  - API

---

# API pagination

The default page size is 100 results. You can change the page size limit. The maximum permitted size is 250.

When a response contains more than one page, it includes a cursor, which you can use to request subsequent pages.

For example, say you want to get all active workflows, 150 at a time.

Get the first page:

```shell
# For a self-hosted WF instance
curl -X 'GET' \
  '<WF_HOST>:<WF_PORT>/<WF_PATH>/api/v<version-number>/workflows?active=true&limit=150' \
  -H 'accept: application/json' \
  -H 'X-WF-API-KEY: <your-api-key>'

# For WF Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true&limit=150' \
  -H 'accept: application/json' \
  -H 'X-WF-API-KEY: <your-api-key>'
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
# For a self-hosted WF instance
curl -X 'GET' \
  '<WF_HOST>:<WF_PORT>/<WF_PATH>/api/v<version-number>/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'

# For WF Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'
```
