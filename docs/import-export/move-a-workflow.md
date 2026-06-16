---
title: Move a workflow between instances
description: A worked example that exports a workflow from one instance and imports it into another.
contentType: howto
---

# Move a workflow between instances

This example walks through the most common task: promoting a single workflow from one instance to another, for example from staging to production. The workflow uses a Slack credential that already exists on the target.

/// note | Proposed feature
The endpoints, request shapes, and responses here come from a draft design and aren't final. See [Request format](#request-format) for what's still open.
///

## Before you start

Import and export run on the [public API](/api/index.md), so you authenticate the same way you would for any API call: with an API key in the `X-N8N-API-KEY` header. See [API authentication](/api/authentication.md) for how to create a key or via Bearer token with token exchange. You need a key/token for both the source and the target instance.

## Step 1: Export the workflow

Call the export endpoint on the source instance with the workflow you want to move, and save the package to a file:

```bash
curl -X POST https://staging.example.com/api/v1/import-export/export/package \
	-H "X-N8N-API-KEY: <staging-api-key>" \
	-H "Content-Type: application/json" \
	-d '{ "type": "workflow", "workflowIds": ["abc123"] }' \
	--output workflow-package.tar
```

n8n walks the workflow, bundles its dependencies, and returns a `tar` file. For this workflow the package looks like this:

```text
|- manifest.json
|- workflows
	|- order-alerts
		|- workflow.json
|- credentials
	|- slack-alerts
		|- credential.json
```

n8n includes the credential as a stub: the package records its id, name and type so the target can match it, but never its secret values. For the full list of export options, see [Export a workflow package](/import-export/export-packages.md).

## Step 2: Import the workflow

Send the package to the target instance:

```bash
curl -X POST https://prod.example.com/api/v1/import-export/import/package \
	-H "X-N8N-API-KEY: <prod-api-key>" \
	-F "package=@workflow-package.tar" \
	-F 'options={
        "projectId": "project-id-1",
	    "workflowIdPolicy": "source",             // The same workflow id from the package is used 
		"credentialMatchingMode": "id",           //  When importing a workfolw credentials it uses should have a specific id
		"credentialMissingMode": "must-preexist", // If a credential is missing fail
		"workflowPublishingPolicy": "source",     // If the workflow was published on the source it should be on the target
        "bindings": {
		  "credentials": { 
		    "slack-id-abc-on-source": "slack-id-xyz-on-target" // Override specific credential ids within the workflow
          }
        }
	}'
```

n8n imports the workflow into project with id `project-id-1` on production, replaces the slack credential id with the new binding, and gives the workflow the same id as the source. To control where the workflow lands or how n8n assigns its ID, see [Import a workflow package](/import-export/import-packages.md).

## Common scenarios

Different tasks call for different option combinations. These are the starting points for the most common ones.

**Promote to an instance that already has the dependencies**

Reuse the target's existing credentials and variables.

- Import: `credentialMatchingMode: "name-and-type"`
- Import: `credentialMissingMode: "must-preexist"`
- Import: `variableMissingMode: "must-preexist"`
- Import: `workflowPublishingPolicy: "unpublish-all"`

**Share a self-contained copy**

The recipient has none of the dependencies.

- Export: `includeVariableValues: true`
- Import: `credentialMissingMode: "create-stub"` — the recipient fills in secrets

**Restore to a clean instance**

Recreate the workflow exactly as it was.

- Export: `includeVariableValues: true`, `includeDataTableData: true`
- Import: `workflowIdPolicy: "source"`

For what each option does, see [Import a workflow package](/import-export/import-packages.md) and [Resolve dependencies on import](/import-export/resolve-dependencies.md).

## Request format

/// warning | Draft: request and response shapes aren't final
The import endpoint takes the package as a file upload alongside the import options. The mechanism for sending the options with the file, and the shape of the response, aren't final. The `-F "package=..."` and `-F 'options=...'` form fields above show the intent, not a confirmed contract. This page will change once the API is final.
///
