# API authentication

n8n uses API keys to authenticate API calls.

## Create an API key

1. Log in to n8n.
2. Go to **Settings** > **API**.
3. Select **Create an API key**.

## Delete an API key

1. Log in to n8n.
2. Go to **Settings** > **API**.
3. Select **Delete** next to the key you want to delete.

## Call the API using your key

Send the API key in your API call as a header named `X-N8N-API-KEY`. 

For example, say you want to get all active workflows. Your curl request will look like this:

```shell
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v1/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v1/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'
```
