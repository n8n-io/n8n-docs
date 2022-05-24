# API pagination

The default page size is 100 results. You can change the page size limit. The maximum permitted size is 250.

When a response contains more than one page, it includes a cursor, which you can use to request subsequent pages.

For example, say you want to get all active workflows, 150 at a time.

Get the first page:

```bash
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v1/workflows?active=true&limit=150' \
  -H 'accept: application/json'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v1/workflows?active=true&limit=150' \
  -H 'accept: application/json'
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
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v1/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v1/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'
```
