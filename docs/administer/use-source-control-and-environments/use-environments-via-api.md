---
description: Use the n8n public API to preview, push, and pull source control changes between environments.
layout:
  description:
    visible: false
---

# Use environments programmatically with the public API

You can drive n8n environments from scripts and pipelines using the public API, without opening the n8n UI. This lets you automate promotion between instances, for example moving work from a development instance to production on a schedule or as part of a CI/CD pipeline.

This page explains how the source control API endpoints work together. It assumes you've already connected your instances to Git and understand how push and pull behave in the UI. For that background, read [Push and pull](push-and-pull-changes.md) and [Copy work between environments](move-work-between-environments.md).

{% hint style="info" %}
**Feature availability**

Source control and environments is an Enterprise feature. The n8n API isn't available during the free trial. Refer to [API authentication](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/authentication) to create a key.
{% endhint %}

## The endpoints

The public API exposes three source control operations:

| Endpoint | Method | What it does |
|----------|--------|--------------|
| `/source-control/status` | `GET` | Previews the pending changes between your instance and Git, in either direction. Doesn't change anything. |
| `/source-control/push` | `POST` | Commits and pushes local changes to the connected Git branch. |
| `/source-control/pull` | `POST` | Fetches changes from the connected Git branch into the instance. |

`push` and `pull` are the same actions as the **Push** and **Pull** buttons in the source control menu. `status` matches the file list the UI shows in the push and pull modals before you confirm. The API exposes it as its own endpoint so a script can do the same review the UI does inline.

For the full request and response schemas, refer to the [Endpoint reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference).

### Authentication and scopes

Every request needs an API key sent in the `X-N8N-API-KEY` header. On Enterprise plans, you can scope each key to the minimum it needs:

| Scope | Grants |
|-------|--------|
| `sourceControl:pull` | Pull changes into the instance. |
| `sourceControl:push` | Push local changes to Git. |
| `sourceControl:read` | Read the status of pending changes. |

Scoping keys this way is how you enforce direction. A production instance that should only ever receive changes gets a key with `sourceControl:pull` and nothing else. That key can't push, so production stays read-only by design.

## Check the status, then act

Don't push blind. `push` requires a `fileNames` array and only commits the files you list there, so call `status` first to see what's eligible. Because `status` and `push` share the same file shape, you can pass its response straight back with no reshaping, whether you're sending all or a subset.

The pattern is always the same:

1. Call `status` to see what's eligible.
2. Decide what to include: the full list to push everything, or a subset to push only some of it.
3. Call `push` with those files in `fileNames`.

Call `status` with a `direction` query parameter to choose which side you're previewing:

```curl
curl --request GET \
	--location '<YOUR-INSTANCE-URL>/api/v1/source-control/status?direction=push' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>'
```

The response lists each pending file, including its `id`, `name`, `type` (such as `workflow` or `credential`), and `status` (such as `modified` or `new`):

```json
[
	{
		"id": "1a2b3c",
		"name": "Daily sales report",
		"type": "workflow",
		"status": "modified",
		"file": "workflows/1a2b3c.json"
	}
]
```

## Promotion flow from development to read-only production

This is the most common setup: you make changes on a development instance, then promote them to a production instance that only ever receives updates. This example uses a single Git branch shared by both instances.

Give each instance a scoped API key:

* The development key has `sourceControl:read` and `sourceControl:push`.
* The production key has `sourceControl:pull` only, which keeps production read-only.

**1. Preview the changes on development.** Call `status` with `direction=push` to see what n8n would commit:

```curl
curl --request GET \
	--location '<DEV-INSTANCE-URL>/api/v1/source-control/status?direction=push' \
	--header 'X-N8N-API-KEY: <DEV-API-KEY>'
```

**2. Push from development to Git.** Send a commit message and the files to promote, listed in `fileNames`. Pass every file from step 1's `status` response to promote in entirety, or a subset to promote part of it:

```curl
curl --request POST \
	--location '<DEV-INSTANCE-URL>/api/v1/source-control/push' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <DEV-API-KEY>' \
	--data '{
		"commitMessage": "Promote sales reporting workflows",
		"fileNames": [
			{
				"id": "1a2b3c",
				"name": "Daily sales report",
				"type": "workflow",
				"status": "modified",
				"file": "workflows/1a2b3c.json"
			}
		]
	}'
```

**3. Pull into production.** Production reads the same branch and applies the changes. Use `force` to accept the incoming version, and set `autoPublish` to publish workflows as they arrive:

```curl
curl --request POST \
	--location '<PROD-INSTANCE-URL>/api/v1/source-control/pull' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <PROD-API-KEY>' \
	--data '{
		"force": true,
		"autoPublish": "published"
	}'
```

The `autoPublish` parameter accepts `none` (the default), `published` (only republish workflows that are already published on production), or `all` (publish every pulled workflow). For details on what each mode does, refer to [Push and pull](push-and-pull-changes.md#auto-publish-workflows-on-pull).

{% hint style="info" %}
**Using multiple branches**

If your instances use different Git branches, you can't promote directly. Push from development to its branch, merge that branch into the production branch in your Git provider, then pull on production. Refer to [Copy work between environments](move-work-between-environments.md) for the branch patterns.
{% endhint %}

## Scheduled backup flow

To version your instance in Git on a schedule, fetch every eligible file and push everything on a timer. This is a common GitOps backup pattern. Run this from a cron job, a CI pipeline, or an n8n workflow on a [Schedule Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.scheduletrigger):

**1. Get every eligible file.** Call `status` with `direction=push`:

```curl
curl --request GET \
	--location '<YOUR-INSTANCE-URL>/api/v1/source-control/status?direction=push' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>'
```

**2. Push the full list.** Pass everything the `status` response returned as `fileNames`:

```curl
curl --request POST \
	--location '<YOUR-INSTANCE-URL>/api/v1/source-control/push' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--data '{
		"commitMessage": "Scheduled backup",
		"force": true,
		"fileNames": [
			{
				"id": "1a2b3c",
				"name": "Daily sales report",
				"type": "workflow",
				"status": "modified",
				"file": "workflows/1a2b3c.json"
			}
		]
	}'
```

Build `fileNames` from the `status` response programmatically rather than building it yourself, since the set of eligible files changes between runs. Each run then commits a full snapshot of the resources n8n tracks in source control. This isn't a complete mirror of the instance. n8n commits only [certain resource types](push-and-pull-changes.md#what-gets-committed), so data like credential values and execution history isn't backed up. A push also overwrites what's in the branch, so make sure the instance holds the versions you want before each scheduled run, or you risk overwriting more recent changes.

## Push specific files

To push only some pending changes, filter the `status` response down to the files you want and pass them as `fileNames`. Each entry must match the shape returned by `status`:

```curl
curl --request POST \
	--location '<YOUR-INSTANCE-URL>/api/v1/source-control/push' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--data '{
		"commitMessage": "Push reviewed workflows only",
		"fileNames": [
			{
				"id": "1a2b3c",
				"name": "Daily sales report",
				"type": "workflow",
				"status": "modified",
				"file": "workflows/1a2b3c.json"
			}
		]
	}'
```

Because `status` and `push` share the same file shape, the preview always matches what you push. There's no drift between what you review and what you send.

## What gets pushed and pulled

The API commits and applies the same resources as the UI: workflows, credential stubs, variable stubs, data table schemas, projects, folders, and tags. For the full list and the merge behavior for each resource type, refer to [Push and pull](push-and-pull-changes.md#what-gets-committed).

## Related

* [Push and pull](push-and-pull-changes.md): How push and pull behave, and what gets committed.
* [Copy work between environments](move-work-between-environments.md): Branch patterns for moving work between instances.
* [Endpoint reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference): The full source control API schemas.
