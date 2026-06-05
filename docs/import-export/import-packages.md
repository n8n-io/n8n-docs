---
title: Import a workflow package
description: Import a package and control where its workflows land and how conflicts are handled.
contentType: howto
---

# Import a workflow package

Import a package to add its workflows and dependencies to an instance. Import options control where the content lands, what happens when something already exists, and how strict n8n is about missing dependencies.

/// note | Proposed feature
The endpoint, options, and defaults on this page come from an early design and aren't final. Option names and defaults are especially likely to change.
///

## Authenticate your request

Import and export run on the [public API](/api/index.md). Authenticate with an API key in the `X-N8N-API-KEY` header, as described in [API authentication](/api/authentication.md). The import runs as the user that owns the key, and respects that user's roles and permissions.

For a complete export-to-import walkthrough, see [Move a workflow between instances](/import-export/move-a-workflow.md).

## Import a package

Send the package to the import endpoint as a file upload, with the import options alongside it:

```bash
POST /import-export/import/package
# the tar file as a file upload, plus the import options
```

The examples on this page show the options as JSON for clarity.

/// warning | Draft: request and response shapes aren't final
The exact mechanism for sending the import options with the file, and the shape of the response (including what a dry run returns), aren't finalized. This page will be updated once the API is pinned down.
///

### Preview an import with a dry run

Set `dryRun` to `true` to see the changes an import would make without applying them:

```json
{ "dryRun": true }
```

A dry run reports what n8n would create, update, skip, or stub, so you can check the result before you commit to it.

## Import order

When n8n imports a package, it processes entities in dependency order:

1. **Structure**: `project` and `folder` entities.
2. **Dependencies**: `credentials`, `variables`, and `data tables`.
3. **Workflows**: starting from the leaves of the sub-workflow tree and working up, so every parent has its children before it imports.

This order makes sure that by the time a workflow imports, everything it references already exists.

## Choose where workflows land

Use `projectId` and `folderId` to choose where workflows land. Both are optional:

- No `projectId`: workflows go to the personal project of the user running the import.
- `projectId` only: workflows go to the root level of that project.
- `projectId` and `folderId`: workflows go into that folder in that project.
- `folderId` only: n8n looks for the folder in your personal project.

n8n rejects the import if:

- You specify a `projectId` that doesn't exist.
- You specify a `folderId` that doesn't exist in the target project.
- You specify a `folderId` only, and it doesn't exist in your personal project.

## How workflow IDs are handled

n8n always records where an imported workflow came from. It adds a `sourceWorkflowId` field set to the workflow's ID in the package.

Use `workflowIdPolicy` to choose whether the imported workflow keeps its original ID:

```json
workflowIdPolicy:
	| "new"    // default - assign a new ID, store the original in sourceWorkflowId
	| "source" // keep the source workflow ID exactly
```

## Handle workflows that already exist

Use `workflowUpdatePolicy` to control what happens when a workflow already exists on the target. n8n matches existing workflows by `sourceWorkflowId`. If no match exists, it always creates a new workflow.

```json
workflowUpdatePolicy:
	| "new-version" // add a new version to the existing workflow
	| "fail"        // revert the whole import and error
	| "skip"        // skip the conflicting workflow and continue
```

| Value | Behaviour |
|-------|-----------|
| `new-version` | Updates the existing workflow whose `sourceWorkflowId` matches, and bumps its version. |
| `fail` | Reverts all parts of the import and returns an error. |
| `skip` | Skips the conflicting workflow and continues importing the rest of the package. |

## Control workflow activation

Use `workflowActivationPolicy` to control whether imported workflows are active. This setting isn't affected by the import [mode](#import-modes).

```json
workflowActivationPolicy:
	| "preserve-active-state" // default - leave the target's active flag untouched
	| "match-source"          // adopt the active state from the package
	| "all-inactive"          // force every imported workflow inactive
	| "all-active"            // force every imported workflow active
```

| Value | Behaviour |
|-------|-----------|
| `preserve-active-state` | Leaves the target's `active` flag untouched. An updated workflow keeps the state it had on the target. New workflows default to inactive. |
| `match-source` | Adopts the source workflow's active state, read from the `active` flag in `workflow.json`. |
| `all-inactive` | Imports every workflow inactive. If an active workflow is updated, n8n deactivates it. |
| `all-active` | Imports and activates every workflow in the package. |

/// note | Draft: a workflow with a missing node type stays inactive
A workflow imported with a missing node type is always deactivated, whatever you set here. See [Handle missing node types](#handle-missing-node-types).
///

## Handle missing node types

Use `missingNodeTypeMode` to control what happens when a workflow uses a node type that the target instance doesn't have, such as a community node or a newer node version:

```json
missingNodeTypeMode:
	| "fail"          // revert the import if a node type is missing
	| "import-anyway" // import the workflow anyway
```

| Value | Behaviour |
|-------|-----------|
| `fail` | Reverts the import and errors if a node type isn't found. |
| `import-anyway` | Imports the workflow and shows the unknown node as unrecognized in the editor. n8n deactivates this workflow whatever `workflowActivationPolicy` is set to. |

## Import modes

Use `mode` to set sensible defaults for the options above in one place. A mode sets the defaults; you can still override individual options.

```json
mode:
	| "auto"   // default - best-effort: create stubs for missing dependencies, update existing workflows in place
	| "strict" // every reference must resolve, or the import aborts
	| "force"  // import as much as possible with what's available
```

/// note | Draft: modes and per-option defaults
How each mode maps to the individual option defaults isn't finalized. Set the options you care about explicitly until the mapping is settled.
///

## Next steps

A package's workflows usually depend on credentials, variables, sub-workflows, or data tables. For the options that control how n8n resolves each of those, see [Resolve dependencies on import](/import-export/resolve-dependencies.md).
