---
title: The package format
description: What's inside an n8n package, and how n8n decides whether it can import one.
contentType: explanation
---

# The package format

A package is a `tar` file that bundles n8n entities together with a manifest. This page describes what's inside a package and how n8n checks that it can import one.

/// note | Proposed feature
The format on this page comes from an early design and isn't final.
///

## Package contents

A package contains a `manifest.json` file at the root, then a directory for each kind of entity. Each entity lives in its own directory, named with a human-readable name so the package stays readable.

A workflow package that uses a credential looks like this:

```text
|- manifest.json
|- workflows
	|- test-workflow
		|- workflow.json
|- credentials
	|- header-credential
		|- credential.json
```

Depending on what you export, a package can also contain `variables`, `data-tables`, and `folders` directories.

## The manifest

The `manifest.json` file lists everything in the package and everything the package needs from the target instance. n8n reads it first, before importing any entity, to decide whether the import can succeed.

```json
{
	"packageFormatVersion": "1",
	"workflows": [
		{ "id": "abc123", "name": "test-workflow", "target": "workflows/test-workflow" }
	],
	"credentials": [
		{ "id": "xyz789", "name": "Header credential", "target": "credentials/header-credential" }
	],
	"requirements": {
		"credentials": [
			{
				"id": "xyz789",
				"name": "Header credential",
				"type": "httpHeaderAuth",
				"usedByWorkflows": ["abc123"]
			}
		],
		"subWorkflows": [],
		"nodeTypes": [],
		"variables": []
	}
}
```

The manifest is always rebuildable from the files in the package. It exists to speed up the import, not to hold anything the entities don't already describe.

## The requirements list

The `requirements` section of the manifest declares what the package needs from the target instance. It lists the node types, credentials, variables, sub-workflows, and data tables that the workflows reference, and which workflows use each one.

n8n validates these requirements before any entity imports. If a requirement can't be satisfied, the import fails fast rather than importing part of the package.

For example, the manifest lists each node type a workflow needs, along with the version:

```json
{
	"requirements": {
		"nodeTypes": [
			{ "type": "n8n-nodes-base.formTrigger", "typeVersion": 2.5, "usedByWorkflows": ["abc123"] },
			{ "type": "@n8n-community/cool-aid/node", "typeVersion": 3, "usedByWorkflows": ["abc123"] }
		]
	}
}
```

If a required node type is missing or unavailable on the target, n8n fails the import. You can change this with [`missingNodeTypeMode`](/import-export/import-packages.md#handle-missing-node-types).

## Compatibility checks

n8n runs three checks to decide whether a package is compatible with the target instance:

1. **Package format version**: The `packageFormatVersion` field lets n8n make breaking changes to the format later. An older instance rejects a package whose format it doesn't recognize.
2. **Requirements**: n8n checks the manifest's requirements against the target instance, as described above.
3. **Entity schemas**: n8n validates every entity against a schema on both export and import. If an entity doesn't match its schema, the operation fails.

## Version handling

The manifest records the n8n version that created the package in a `sourceN8nVersion` field, but n8n doesn't require the source and target instances to run the same version. As long as the package format version is recognized, the entities match their schemas, and the requirements are satisfied, n8n imports the package.
