---
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
