---
title: "Workflow² API authentication"
description: WF² uses API keys to authenticate API calls.
tags:
  - Workflow²
  - API

---

# API authentication

WF² uses API keys to authenticate API calls.

## Create an API key

1. Log in to WF².
2. Go to **Settings** > **API**.
3. Select **Create an API key**.

## Delete an API key

1. Log in to WF².
2. Go to **Settings** > **API**.
3. Select **Delete** next to the key you want to delete.

## Call the API using your key

Send the API key in your API call as a header named `X-WF-API-KEY`.

For example, say you want to get all active workflows. Your curl request will look like this:

```shell
# For a self-hosted WF instance
curl -X 'GET' \
  '<WF_HOST>:<WF_PORT>/<WF_PATH>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-WF-API-KEY: <your-api-key>'

# For WF Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-WF-API-KEY: <your-api-key>'
```
