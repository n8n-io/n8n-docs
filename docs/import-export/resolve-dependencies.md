---
title: Resolve dependencies on import
description: Control how n8n matches credentials, variables, sub-workflows, and data tables when importing a package.
contentType: reference
---

# Resolve dependencies on import

A workflow often depends on credentials, variables, sub-workflows, or data tables. When you [import a package](/import-export/import-packages.md), these options control how n8n matches each dependency against the target instance, and what happens when it can't find a match.

/// note | Proposed feature
The options and defaults on this page come from a draft design and aren't final. Names and defaults may still change.
///

## Credentials

When n8n imports a workflow, it tries to link each credential reference to a credential on the target instance. It searches the target project first, then the global scope. It never matches shared credentials.

### Match credentials

Use `credentialMatchingMode` to control how n8n searches for a matching credential:

```json
credentialMatchingMode:
	| "id-only"       // default - match on an exact ID
	| "name-and-type" // match on both name and type
	| "type-only"     // match on type alone
```

| Value | Behaviour |
|-------|-----------|
| `name-and-type` | Searches for a credential with an exact match on both `name` and `type`, for example `name: n8n Slack, type: slackApi`. |
| `id-only` | Searches for a credential with an exact match on `id`. |
| `type-only` | Links to any credential with the same `type`, for example `type: slackApi`. |

### Handle missing credentials

Use `credentialMissingMode` to control what happens when n8n can't match a credential:

```json
credentialMissingMode:
	| "create-stub"   // default - create a stub credential
	| "must-preexist" // fail the import if the credential isn't found
```

| Value | Behaviour |
|-------|-----------|
| `create-stub` | Creates an empty credential stub in the nearest scope, the project or the global scope, for the user to fill in later. |
| `must-preexist` | Reverts the import and fails if a credential isn't found. |

/// note | Draft: default for missing credentials
The default for `credentialMissingMode` isn't settled. It's documented here as `create-stub`, but it may end up as `must-preexist`.
///

### Map credentials directly

Use `bindings.credentials` to map specific source credentials to specific target credentials. The `bindings` object groups exact mapping overrides by entity type, so it can support other entity types later. n8n doesn't apply `credentialMatchingMode` to a credential listed here. If the target credential doesn't exist, the import fails.

```json
{
	"bindings": {
		"credentials": {
			"source_credential_123": "target_credential_xyz"
		}
	}
}
```

## Variables

When n8n imports a workflow, it checks which variables already exist, searching the project scope first, then the global scope.

### Handle missing variables

Use `variableMissingMode` to control what happens when a referenced variable doesn't exist on the target:

```json
variableMissingMode:
	| "create-with-value" // default - create the variable using the package value
	| "create-stub"       // create the variable with an empty value
	| "must-preexist"     // fail if a referenced variable isn't in target scope
	| "do-nothing"        // import the workflow without creating the variable
```

| Value | Behaviour |
|-------|-----------|
| `create-with-value` | Creates the variable at the import scope using the value from the package. Falls back to `create-stub` if the package has no value. |
| `create-stub` | Creates the variable at the import scope with an empty value. n8n returns a list of the affected variables. |
| `must-preexist` | Fails if any referenced variable isn't in the target scope. |
| `do-nothing` | Imports the workflow without creating the variable. The workflow fails at execution time until you add the variable manually. |

### Handle variable conflicts

Use `variableConflictPolicy` to control what happens when a variable with the same name already exists in the target scope:

```json
variableConflictPolicy:
	| "keep-existing" // default - never change an existing value
	| "overwrite"     // adopt the package value
	| "fail"          // abort the import on any conflict
```

| Value | Behaviour |
|-------|-----------|
| `keep-existing` | Ignores the package value and leaves the existing variable untouched. |
| `overwrite` | Overwrites the existing value with the package value. Only applies when the package includes a value. |
| `fail` | Aborts the import on the first conflict. |

/// warning | Overwriting variables changes shared values
`overwrite` replaces values that other workflows might depend on. Use it only when you're sure the package values should win.
///

### Choose where n8n creates variables

Use `variableParentPolicy` to control the scope where n8n creates variables:

```json
variableParentPolicy:
	| "project" // default - create variables in the import project
	| "global"  // create variables in the global scope
```

| Value | Behaviour |
|-------|-----------|
| `project` | Creates variables in the project set by `projectId`, or in the personal project of the importing user. |
| `global` | Creates variables in the global scope. This requires admin permission. n8n rejects the import if the user doesn't have it. |

/// note | Draft: same-as-source
A draft design also lists a `same-as-source` value that mirrors the variable's original scope. This page leaves it out because its behaviour isn't settled.
///

## Sub-workflows

When a workflow calls another workflow, n8n resolves the reference on import. It looks for the target in this order:

1. Workflows bundled in the package.
2. Workflows that already exist in the target project.

Every imported workflow gets a new local ID, so n8n rewrites each sub-workflow reference to point at the new ID. This includes the Execute Workflow node's `workflowId` and `workflowSelector.value` parameters, and the `cachedResultName` in workflow selector values.

### Handle missing sub-workflows

Use `subWorkflowMissingMode` to control what happens when n8n can't resolve a sub-workflow reference:

```json
subWorkflowMissingMode:
	| "create-stub" // default - create an empty workflow so the parent imports cleanly
	| "skip"        // import the parent with an unresolved reference
	| "fail"        // abort the import if any sub-workflow can't be resolved
```

| Value | Behaviour |
|-------|-----------|
| `create-stub` | Creates an empty workflow using the name from the manifest, and rewrites the parent's reference to point at it. n8n returns a list of the affected sub-workflows. |
| `skip` | Imports the parent with the unresolved reference. The parent fails at execution time when it tries to call the missing sub-workflow. |
| `fail` | Aborts the import on the first missing sub-workflow. |

A bundled sub-workflow is just a workflow, so n8n handles conflicts with it using [`workflowUpdatePolicy`](/import-export/import-packages.md#handle-workflows-that-already-exist). There's no separate sub-workflow conflict option.

### Control who can call bundled sub-workflows

Each workflow has a caller policy that decides which workflows can call it as a sub-workflow. Use `subWorkflowCallerPolicy` to set this policy on every bundled sub-workflow:

```json
subWorkflowCallerPolicy:
	| "workflowsFromSameOwner" // default - only workflows in the same project can call it
	| "any"                    // any workflow on the instance can call it
```

## Data tables

A data table is always scoped to a project, and is unique by its name within that project. There are no global data tables. n8n creates data tables in the project set by `projectId`, or in the personal project of the importing user.

A data table has two parts: its schema (the table name and typed columns) and its rows. Each column has one of these types: `string`, `number`, `boolean`, or `date`.

### Handle missing data tables

Use `dataTableMissingMode` to control what happens when a referenced data table doesn't exist in the target project:

```json
dataTableMissingMode:
	| "create"        // default - create the table from the package schema
	| "must-preexist" // fail if a referenced table isn't in the target project
	| "do-nothing"    // import the workflow without creating the table
```

| Value | Behaviour |
|-------|-----------|
| `create` | Creates the table using the schema from the package. If the package includes rows, n8n inserts them. |
| `must-preexist` | Fails if any referenced data table is absent in the target project. |
| `do-nothing` | Imports the workflow even if the table is missing. The workflow fails at runtime until you create the table. |

### Handle schema conflicts

Use `dataTableSchemaConflictPolicy` to control what happens when a table with the same name exists but has different columns or types. n8n never overwrites a schema, because dropping or retyping columns would destroy existing rows.

```json
dataTableSchemaConflictPolicy:
	| "keep-existing-strict"  // target schema wins; abort if requirements are unsatisfied
	| "keep-existing-lenient" // default - target schema wins; warn and continue
	| "fail"                  // abort on any schema mismatch
	| "extend"                // add missing columns; fail if a shared column's type differs
```

| Value | Behaviour |
|-------|-----------|
| `keep-existing-strict` | Keeps the target schema. Checks the workflow's requirements against it and aborts the import if it can't meet them all. |
| `keep-existing-lenient` | Keeps the target schema. Checks the workflow's requirements against it, then warns and continues. The workflow might fail at runtime. |
| `fail` | Aborts the import on a schema mismatch. |
| `extend` | Adds columns the package has but the target doesn't. Fails if a column exists in both with a different type. Never drops columns or changes types. |

To make a destructive schema change, drop the table manually first, then import.

### Choose whether to import rows

Use `dataTableDataPolicy` to control when n8n imports rows from the package:

```json
dataTableDataPolicy:
	| "import-on-create" // default - import rows only when creating the table
	| "import-on-upsert" // import rows on create and update
	| "ignore"           // ignore all rows in the package
```

### Handle row conflicts

When a table already exists and the package includes rows, use `dataTableDataConflictPolicy` to control how n8n handles existing rows:

```json
dataTableDataConflictPolicy:
	| "skip"        // default - never touch existing rows
	| "append"      // insert all package rows, which may duplicate
	| "replace-all" // truncate the table, then insert package rows
	| "fail"        // abort if the target table has any rows
```

| Value | Behaviour |
|-------|-----------|
| `skip` | Leaves existing rows untouched and ignores the package rows. |
| `append` | Appends every package row. Creates duplicates if you've imported the package before. |
| `replace-all` | Truncates the table, then inserts the package rows. |
| `fail` | Aborts if the target table has any rows. Useful for fresh-deploy workflows. |

/// warning | replace-all drops data
`replace-all` deletes every existing row in the table, including rows added since you exported the package. Use it only on a table you're sure you want to replace.
///

/// note | Draft: upsert by column is a later addition
A later version will add an `upsert-by-column` value. It would match rows on a column you nominate, then insert or update. It needs a column with unique values and isn't available yet.
///

### Handle schema incompatibility

Use `dataTableSchemaIncompatibilityPolicy` to control what happens when the target table's schema doesn't match the package's requirements:

```json
dataTableSchemaIncompatibilityPolicy:
	| "fail"          // default - fail when the target schema doesn't match the requirements
	| "import-anyway" // log a warning and import anyway
```
