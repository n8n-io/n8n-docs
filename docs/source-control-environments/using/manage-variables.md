---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Manage variables
description: Manage variable values in n8n using the API and source control.
contentType: howto
---

# Manage variables

n8n doesn't sync variable values with Git. You must set up the credentials manually when setting up a new instance. You can choose to set up variables manually, or [using the API](#manage-variables-using-the-api).

## Manage variables using the API

n8n syncs variable names, but doesn't push variable values to your Git provider. You can either:

* Manually set variable values in n8n.
* Set variable values using the n8n API, using the `/pull` endpoint. 

Managing variables using the API has several advantages:

* You can automatically update variable values using a CI (continuous integration) tool. 
* You may also be able to protect the values. 

For example, you can store values in [GitHub secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets){:target=_blank .external-link}, then populate the variables in n8n using an API call from a [GitHub Action](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions){:target=_blank .external-link}.

To manage variables using an API call, make a `POST` request to `/source-control/pull`:

```curl
	curl --location '<YOUR-INSTANCE-URL>/api/v1/source-control/pull' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--data '{
	"force": true,
	"variables": { 
			"key1": "value1",
			"key2": "value2"
	}
	}
	'
```

If the key already exists in n8n, the API call updates the value. If there is no variable with the key, it creates a new variable.

After setting values using the API, you can safely edit variables in n8n, and push and pull changes. 
