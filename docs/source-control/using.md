---
title: Using source control
description: How to use source control in n8n.
---

# Using source control

If your n8n instance [connects to a Git repository](/source-control/setup/), you need to keep your work in sync with Git.

This document assumes some familiarity with Git concepts and terminology. Refer to [Git and n8n](/source-control/git/) for an introduction to how n8n works with Git.

!!! note "Environments"
	The main use case for source control is creating environments. Refer to [Environments](/environments/) for more information on creating environments in n8n, including recommended configurations.


## Fetch other people's work

!!! note "Restricted to instance owners"
	Ordinary users can't send work to Git.

To pull work from Git, select **Pull** <span class="inline-image">![Pull icon](/_images/source-control/pull-icon.png)</span> in the main menu.

--8<-- "_snippets/source-control/push-pull-menu-state.md"

n8n may display a warning about overriding local changes. Select **Pull and override** to override your local work with the content in Git.

### Workflow owner may change on pull

When you pull from Git to an n8n instance, the workflow owner may change. If the same owner is available on both instances, the owner remains the same. If the original owner isn't on the new instance, n8n sets the instance owner as the workflow owner.


## Send your work to Git

!!! note "Restricted to instance owners"
	Ordinary users can't send work to Git.

--8<-- "_snippets/source-control/push.md"

## Credentials and variable values

n8n doesn't sync credential and variable values with Git. You must set up the credentials manually when setting up a new instance. You can choose to set up variables manually, or [using the API](#manage-variables-using-the-api).

!!! note "Coming soon: credential support with secret managers"
	n8n is working on support for external secret managers to handle credentials. Once this feature is complete, n8n will support linking the secret manager to multiple instances.

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
