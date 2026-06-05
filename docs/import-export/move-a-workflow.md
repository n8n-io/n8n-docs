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

Import and export run on the [public API](/api/index.md), so you authenticate the same way you would for any API call: with an API key in the `X-N8N-API-KEY` header. See [API authentication](/api/authentication.md) for how to create a key. You need a key for both the source and the target instance.

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
	|- order-alerts-abc123
		|- workflow.json
|- credentials
	|- slack-alerts-xyz789
		|- credential.json
```

n8n includes the credential as a stub: the package records its name and type so the target can match it, but never its secret values. For the full list of export options, see [Export a workflow package](/import-export/export-packages.md).

## Step 2: Preview the import with a dry run

Send the package to the target instance with `dryRun: true` to see what the import would do without changing anything:

```bash
curl -X POST https://prod.example.com/api/v1/import-export/import/package \
	-H "X-N8N-API-KEY: <prod-api-key>" \
	-F "package=@workflow-package.tar" \
	-F 'options={ "dryRun": true, "credentialMatchingMode": "name-and-type", "credentialMissingMode": "must-preexist" }'
```

Because the credential has a different ID on production, `credentialMatchingMode: "name-and-type"` tells n8n to match it by name and type instead of by ID. `credentialMissingMode: "must-preexist"` tells n8n to fail rather than create a stub if it still can't find a match. The dry run reports the workflow it would create and the credential it would link, so you can confirm the match before committing.

## Step 3: Import the workflow

Run the same call with `dryRun: false` to apply it:

```bash
curl -X POST https://prod.example.com/api/v1/import-export/import/package \
	-H "X-N8N-API-KEY: <prod-api-key>" \
	-F "package=@workflow-package.tar" \
	-F 'options={ "dryRun": false, "credentialMatchingMode": "name-and-type", "credentialMissingMode": "must-preexist" }'
```

n8n imports the workflow into your personal project on production, links the Slack credential by name and type, and gives the workflow a new ID while recording the original in `sourceWorkflowId`. To control where the workflow lands or how n8n assigns its ID, see [Import a workflow package](/import-export/import-packages.md).

## Common scenarios

Different tasks call for different option combinations. These are the starting points for the most common ones:

| Scenario | Goal | Key options |
|----------|------|-------------|
| Promote to an instance that already has the dependencies | Reuse the target's existing credentials and variables | `credentialMatchingMode: "name-and-type"`, `credentialMissingMode: "must-preexist"`, `variableMissingMode: "must-preexist"` |
| Share a self-contained copy | The recipient has none of the dependencies | Export with `includeVariableValues: true`; import with `credentialMissingMode: "create-stub"` so the recipient fills in secrets |
| Restore to a clean instance | Recreate the workflow as it was | Export with `includeVariableValues: true` and `includeDataTableData: true`; import with `workflowIdPolicy: "source"` |

For what each option does, see [Import a workflow package](/import-export/import-packages.md) and [Resolve dependencies on import](/import-export/resolve-dependencies.md).

## Request format

/// warning | Draft: request and response shapes aren't final
The import endpoint takes the package as a file upload alongside the import options. The mechanism for sending the options with the file, and the shape of the response (including what a dry run returns), aren't final. The `-F "package=..."` and `-F 'options=...'` form fields above show the intent, not a confirmed contract. We'll update this page once the API is final.
///
