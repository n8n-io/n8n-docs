---
title: Export a workflow package
description: Create a portable package from one or more workflows and their dependencies.
contentType: howto
---

# Export a workflow package

Export a package to bundle one or more workflows, along with the credentials, variables, sub-workflows, and data tables they depend on, into a single `tar` file.

/// note | Proposed feature
The endpoint, options, and defaults on this page come from an early design and aren't final.
///

## Export a package

Send a `POST` request to the export endpoint with the workflows you want to include:

```bash
POST /import-export/export/package
{
	"type": "workflow",
	"workflowIds": ["abc1234567890"]
}
```

n8n walks each workflow, collects its dependencies, and returns a `tar` file. The package contains a [manifest](/import-export/packages.md#the-manifest) and a directory for each kind of entity.

## Choose what to include

Export options control which dependencies n8n bundles into the package and which it records as requirements only. Bundling more makes the package self-contained. Recording dependencies as requirements keeps the package smaller and expects the target instance to already have them.

### Sub-workflows

Use `subworkflowBehaviour` to control how n8n handles workflows that the exported workflow calls:

```json
subworkflowBehaviour:
	| "included-in-package" // default - bundle each sub-workflow in the package
	| "references-only"     // list sub-workflows as requirements only
	| "inline"              // embed sub-workflow JSON into the parent's Execute Workflow nodes
```

In every case, the manifest declares which sub-workflows the parent depends on, so the importer can fail fast if a required sub-workflow can't be resolved.

### Variables

Use `includeVariableValues` to decide whether n8n exports variable values or only their names:

```json
includeVariableValues:
	| true   // default - export variables as name and value
	| false  // export variable names as requirements only
```

When a variable name exists at both the project and global level, n8n exports the project value.

### Data table rows

By default, n8n exports a data table's schema (its name and columns) but not its rows. The target instance is expected to hold the data, or to create an empty table. Use `includeDataTableData` to bundle rows as well:

```json
includeDataTableData:
	| false  // default - export the schema only
	| true   // bundle rows as NDJSON alongside the schema
```

When you include rows, use `dataTableRowLimit` to cap how many rows each table exports. When n8n hits the cap, it sets `rowsTruncated: true` for that table in the manifest:

```json
dataTableRowLimit: 1000 // default - per-table row cap, only used when includeDataTableData is true
```

A full export request might look like this:

```bash
POST /import-export/export/package
{
	"type": "workflow",
	"workflowIds": ["abc1234567890"],
	"subworkflowBehaviour": "included-in-package",
	"includeVariableValues": true,
	"includeDataTableData": false,
	"dataTableRowLimit": 1000
}
```

## What the package contains

For a workflow `abc123` that calls a sub-workflow `def456`, exported with `subworkflowBehaviour: "included-in-package"`, the package looks like this:

```text
|- manifest.json
|- workflows
	|- main-workflow-abc123
		|- workflow.json
	|- send-email-def456
		|- workflow.json
```

The manifest records both workflows and the dependency between them:

```json
{
	"packageFormatVersion": "1.0.0",
	"workflows": [
		{ "id": "abc123", "name": "main-workflow", "target": "workflows/main-workflow-abc123" },
		{ "id": "def456", "name": "send-email", "target": "workflows/send-email-def456" }
	],
	"credentials": [],
	"requirements": {
		"subWorkflows": [
			{ "sourceWorkflowId": "def456", "name": "send-email", "usedByWorkflows": ["abc123"] }
		],
		"nodeTypes": [],
		"variables": []
	}
}
```

To import this package, see [Import a workflow package](/import-export/import-packages.md).
