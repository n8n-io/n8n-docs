---
title: Options at a glance
description: A scannable index of every export and import option, with links to the full behaviour.
contentType: reference
---

# Options at a glance

This page is a quick index of every option you can pass when you export or import a workflow package. Each row links to the section that describes the full behaviour. For what an option does, follow the link.

/// note | Proposed feature
The option names and defaults here come from a draft design and aren't final. Once the API contract is stable, the [API reference](/api/api-reference.md) becomes the authoritative, generated list of these parameters.
///

## Export options

Set these in the body of a [`POST /import-export/export/package`](/import-export/export-packages.md) request.

| Option | Values | Default | Summary |
|--------|--------|---------|---------|
| [`subworkflowBehaviour`](/import-export/export-packages.md#sub-workflows) | `included-in-package`, `references-only`, `inline` | `included-in-package` | How to handle workflows the exported workflow calls. |
| [`includeVariableValues`](/import-export/export-packages.md#variables) | `true`, `false` | `true` | Export variable values, or only their names. |
| [`includeDataTableData`](/import-export/export-packages.md#data-table-rows) | `true`, `false` | `false` | Bundle data table rows, or only the schema. |
| [`dataTableRowLimit`](/import-export/export-packages.md#data-table-rows) | number | `1000` | Per-table cap on exported rows. Used only when `includeDataTableData` is `true`. |

## Import options

Set these alongside the package in a [`POST /import-export/import/package`](/import-export/import-packages.md) request.

### Workflows

| Option | Values | Default | Summary |
|--------|--------|---------|---------|
| [`projectId`](/import-export/import-packages.md#choose-where-workflows-land) | project ID | personal project | Where workflows land. |
| [`folderId`](/import-export/import-packages.md#choose-where-workflows-land) | folder ID | project root | Folder within the target project. |
| [`workflowIdPolicy`](/import-export/import-packages.md#how-n8n-handles-workflow-ids) | `new`, `source` | `new` | Assign a new ID, or keep the source ID. |
| [`workflowUpdatePolicy`](/import-export/import-packages.md#handle-workflows-that-already-exist) | `new-version`, `fail`, `skip` | `new-version` | What to do when a workflow already exists. |
| [`workflowPublishingPolicy`](/import-export/import-packages.md#control-workflow-publishing) | `preserve-published-state`, `match-source`, `publish-all`, `unpublish-all` | `preserve-published-state` | Whether imported workflows are published. |
| [`missingNodeTypeMode`](/import-export/import-packages.md#handle-missing-node-types) | `fail`, `import-anyway` | `fail` | What to do when a node type is missing. |

### Credentials

| Option | Values | Default | Summary |
|--------|--------|---------|---------|
| [`credentialMatchingMode`](/import-export/resolve-dependencies.md#match-credentials) | `name-and-type`, `id-only`, `type-only` | `id-only` | How n8n searches for a matching credential. |
| [`credentialMissingMode`](/import-export/resolve-dependencies.md#handle-missing-credentials) | `create-stub`, `must-preexist` | `create-stub` | What to do when no credential matches. |
| [`bindings.credentials`](/import-export/resolve-dependencies.md#map-credentials-directly) | source-to-target ID map | none | Map specific source credentials to target credentials. |

### Variables

| Option | Values | Default | Summary |
|--------|--------|---------|---------|
| [`variableMissingMode`](/import-export/resolve-dependencies.md#handle-missing-variables) | `create-with-value`, `create-stub`, `must-preexist`, `do-nothing` | `create-with-value` | What to do when a referenced variable is missing. |
| [`variableConflictPolicy`](/import-export/resolve-dependencies.md#handle-variable-conflicts) | `keep-existing`, `overwrite`, `fail` | `keep-existing` | What to do when a variable name already exists. |
| [`variableParentPolicy`](/import-export/resolve-dependencies.md#choose-where-n8n-creates-variables) | `project`, `global` | `project` | The scope where n8n creates variables. |

### Sub-workflows

| Option | Values | Default | Summary |
|--------|--------|---------|---------|
| [`subWorkflowMissingMode`](/import-export/resolve-dependencies.md#handle-missing-sub-workflows) | `create-stub`, `skip`, `fail` | `create-stub` | What to do when a sub-workflow reference can't resolve. |
| [`subWorkflowCallerPolicy`](/import-export/resolve-dependencies.md#control-who-can-call-bundled-sub-workflows) | `workflowsFromSameOwner`, `any` | `workflowsFromSameOwner` | Who can call bundled sub-workflows. |

### Data tables

| Option | Values | Default | Summary |
|--------|--------|---------|---------|
| [`dataTableMissingMode`](/import-export/resolve-dependencies.md#handle-missing-data-tables) | `create`, `must-preexist`, `do-nothing` | `create` | What to do when a referenced data table is missing. |
| [`dataTableSchemaConflictPolicy`](/import-export/resolve-dependencies.md#handle-schema-conflicts) | `keep-existing-strict`, `keep-existing-lenient`, `fail`, `extend` | `keep-existing-lenient` | What to do when a table exists with a different schema. |
| [`dataTableDataPolicy`](/import-export/resolve-dependencies.md#choose-whether-to-import-rows) | `import-on-create`, `import-on-upsert`, `ignore` | `import-on-create` | When to import rows from the package. |
| [`dataTableDataConflictPolicy`](/import-export/resolve-dependencies.md#handle-row-conflicts) | `skip`, `append`, `replace-all`, `fail` | `skip` | How to handle existing rows when importing rows. |
| [`dataTableSchemaIncompatibilityPolicy`](/import-export/resolve-dependencies.md#handle-schema-incompatibility) | `fail`, `import-anyway` | `fail` | What to do when the target schema doesn't match the package requirements. |
