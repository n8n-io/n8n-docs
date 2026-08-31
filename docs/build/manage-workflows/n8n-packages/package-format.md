---
description: >-
  What's inside a .n8np file: the three package shapes, the directory layout,
  and the manifest.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Package format

{% hint style="info" %}
**Preview status**

n8n packages are in Preview. The package format may change in future releases.
{% endhint %}

An [n8n package](README.md) is a gzip-compressed tar archive. Standard tools read it, so you can inspect one without n8n:

```bash
tar -tzf triage.n8np    # list what's inside
tar -xzf triage.n8np    # extract it
```

The `.n8np` extension is a naming convention. n8n doesn't check the file name on import, and it accepts an uncompressed tar with the same layout.

Inside the archive, every entity is its own small JSON file in its own directory, and a `manifest.json` at the root indexes the whole thing. `manifest.json` must be the first file in the archive, so n8n can validate a package before reading the rest of it.

## Three package shapes

The shape depends on what you exported. All three carry the same kinds of file, arranged differently.

### Workflow package

Exporting by workflow ID gives you loose workflows, with everything they depend on at the top level:

```
triage.n8np
├── manifest.json
├── workflows/
│   ├── triage-inbound/
│   │   └── workflow.json
│   └── send-email/
│       └── workflow.json
├── credentials/
│   └── linear-api/
│       └── credential.json
├── variables/
│   └── slackchannelid/
│       └── variable.json
├── data-tables/
│   └── countries/
│       └── data-table.json
└── tags/
    └── prod/
        └── tag.json
```

### Folder package

Exporting by folder ID keeps the folder tree. A folder's workflows sit in a `workflows/` directory inside that folder, and nested folders sit directly inside their parent, with no repeated `folders/` segment. Credentials, variables, data tables, and tags stay at the top level:

```
in-progress.n8np
├── manifest.json
├── folders/
│   ├── to-production/
│   │   └── folder.json            # an empty folder is just the shell
│   └── in-progress/
│       ├── folder.json
│       ├── workflows/
│       │   └── triage-inbound/
│       │       └── workflow.json
│       └── nested/
│           ├── folder.json
│           └── workflows/
│               └── playground/
│                   └── workflow.json
├── credentials/
│   └── linear-api/
│       └── credential.json
└── tags/
    └── prod/
        └── tag.json
```

### Project package

Exporting by project ID adds a namespacing layer. Several projects can travel in one package. Credentials, variables, and data tables owned by an exported project nest under that project. Anything global, or owned by a project that isn't in the package, stays at the top level. Tags are always at the top level, because tags are global in n8n:

```
team-ligo.n8np
├── manifest.json
├── projects/
│   └── team-ligo/
│       ├── project.json
│       ├── workflows/                    # workflows at the project root
│       │   └── triage-inbound/
│       │       └── workflow.json
│       ├── folders/
│       │   └── in-progress/
│       │       ├── folder.json
│       │       └── workflows/
│       │           └── send-email/
│       │               └── workflow.json
│       ├── credentials/                  # owned by this project
│       │   └── linear-api/
│       │       └── credential.json
│       ├── variables/                    # scoped to this project
│       │   └── slackchannelid/
│       │       └── variable.json
│       └── data-tables/
│           └── countries/
│               └── data-table.json
├── credentials/                          # a global credential
│   └── shared-smtp/
│       └── credential.json
├── variables/                            # a global variable
│   └── region/
│       └── variable.json
└── tags/                                 # always global
    └── prod/
        └── tag.json
```

{% hint style="info" %}
In a project package, where a variable sits decides where it's created. A variable under `projects/<project-slug>/variables/` is created in that project. One at the top level is created globally. This is why `--variable-parent-policy` is rejected for project packages: the layout already decided.
{% endhint %}

## Directory naming

Each entity gets a directory named after a slug of its name, holding one JSON file. Slugging lowercases the name, drops every character that isn't a letter a to z, a digit, whitespace, or a hyphen, then turns whitespace runs into single hyphens:

| Entity name | Directory |
|-------------|-----------|
| `Triage inbound` | `triage-inbound` |
| `Linear api` | `linear-api` |
| `slackChannelId` | `slackchannelid` |
| `Q4 报告` | `q4` |
| `報告` | `workflow` |

The last row shows the fallback: when nothing survives slugging, n8n uses the entity type as the name (`workflow`, `folder`, `project`, `credential`, `variable`, `data-table`, or `tag`). Names that slug identically get a numeric suffix starting at 2, so a second `Triage inbound` becomes `triage-inbound-2`.

Directory names are for humans reading the archive. n8n identifies entities by the IDs in the manifest and the JSON files, never by the directory name.

## `manifest.json`

The manifest is an index. It tells n8n what's in the package and what the target instance has to supply, so an import can fail fast without reading every file.

These four fields are always present:

* `packageFormatVersion`: the version of the package format, currently the string `"1"`.
* `exportedAt`: when n8n created the package, as an ISO 8601 timestamp.
* `sourceN8nVersion`: the n8n version that created the package.
* `sourceId`: an identifier for the instance that created the package.

Then come the entry lists, one per entity type that's present: `workflows`, `folders`, `projects`, `credentials`, `dataTables`, `variables`, and `tags`. A list is left out entirely when it would be empty. Every entry has the same three fields:

* `id`: the entity's ID on the source instance.
* `name`: the entity's name.
* `target`: the directory holding the entity's JSON file, relative to the package root.

Last comes `requirements`, which lists what the workflows need to run on the target instance. It has up to six sections, and each entry carries `usedByWorkflows`, the IDs of the workflows that need it:

| Section | Entry shape | Notes |
|---------|-------------|-------|
| `credentials` | `{ id, name, type, usedByWorkflows }` | n8n never exports credential data, so a credential requirement always means the target has to supply it |
| `dataTables` | `{ id, name, usedByWorkflows }` | The schema itself is in the bundled `data-table.json` |
| `workflows` | `{ id, name, usedByWorkflows }` | Sub-workflow and error workflow references. `name` is optional, because a referenced workflow may not be one the exporting user can see |
| `variables` | `{ name, usedByWorkflows }` | Name only. There's no ID, because `$vars.<name>` resolves by name at runtime |
| `tags` | `{ id, name, usedByWorkflows }` | |
| `nodeTypes` | `{ type, typeVersion, usedByWorkflows }` | Every node type and version the workflows use. Read it to tell whether a target instance can import the package, since it needs all of them installed. n8n re-derives the same list from the workflows on import rather than trusting this one |

{% hint style="warning" %}
`requirements` lists what the workflows need, which isn't the same as what the package contains. `requirements.workflows` lists every static workflow reference, including sub-workflows that are bundled in the package. A credential the exporting user can't read appears in `requirements.credentials` with no matching file. Don't read `requirements` as an inventory of the archive; read the entry lists for that.
{% endhint %}

A full manifest for a workflow package holding two workflows:

```json
{
	"packageFormatVersion": "1",
	"exportedAt": "2026-08-04T09:14:02.117Z",
	"sourceN8nVersion": "2.34.0",
	"sourceId": "f9e1e962bba26edf357042c12f367dab17f4c63ec368e1f39cbf7ce43c8b9f8b",

	"workflows": [
		{ "id": "wf7Kq2", "name": "Triage inbound", "target": "workflows/triage-inbound" },
		{ "id": "wf9Zx1", "name": "Send email", "target": "workflows/send-email" }
	],
	"credentials": [
		{ "id": "crLin44", "name": "Linear api", "target": "credentials/linear-api" }
	],
	"dataTables": [
		{ "id": "dtCn12", "name": "countries", "target": "data-tables/countries" }
	],
	"variables": [
		{ "id": "vaSl03", "name": "slackChannelId", "target": "variables/slackchannelid" }
	],
	"tags": [
		{ "id": "tgPr01", "name": "prod", "target": "tags/prod" }
	],

	"requirements": {
		"credentials": [
			{ "id": "crLin44", "name": "Linear api", "type": "linearApi", "usedByWorkflows": ["wf7Kq2"] }
		],
		"dataTables": [
			{ "id": "dtCn12", "name": "countries", "usedByWorkflows": ["wf7Kq2"] }
		],
		"workflows": [
			{ "id": "wf9Zx1", "name": "Send email", "usedByWorkflows": ["wf7Kq2"] }
		],
		"variables": [
			{ "name": "slackChannelId", "usedByWorkflows": ["wf7Kq2"] }
		],
		"tags": [
			{ "id": "tgPr01", "name": "prod", "usedByWorkflows": ["wf7Kq2"] }
		],
		"nodeTypes": [
			{ "type": "n8n-nodes-base.formTrigger", "typeVersion": 2.5, "usedByWorkflows": ["wf7Kq2"] },
			{ "type": "n8n-nodes-base.linear", "typeVersion": 1, "usedByWorkflows": ["wf7Kq2"] },
			{ "type": "n8n-nodes-base.executeWorkflow", "typeVersion": 1.2, "usedByWorkflows": ["wf7Kq2"] },
			{ "type": "n8n-nodes-base.dataTable", "typeVersion": 1, "usedByWorkflows": ["wf7Kq2"] },
			{ "type": "n8n-nodes-base.emailSend", "typeVersion": 2.1, "usedByWorkflows": ["wf9Zx1"] }
		]
	}
}
```

## Version compatibility

`packageFormatVersion` is currently `"1"`. An n8n instance imports a package only when the version matches exactly. There's no compatibility window and no migration path: a package declaring any other version is rejected with a `400` before anything is written.

`sourceN8nVersion` is recorded for information only. Nothing compares it against the target instance, so a package moves freely between instances running different n8n versions as long as the format version matches, and as long as the target has the node types the workflows use.

## Comparing packages in a pipeline

The archive is deterministic: file timestamps are fixed at the Unix epoch, permissions are fixed, and gzip runs in portable mode. Two exports of identical content produce identical bytes in the container.

The one exception is `manifest.json`, which carries a fresh `exportedAt` on every export. Two exports of unchanged content aren't byte-identical because of that field alone. If you checksum packages to detect change in a pipeline, exclude `exportedAt` from the comparison, or you'll see drift on every run.

## Read next

* [Export a package](export-a-package.md) for how to produce each of the three shapes.
* [Import a package](import-a-package.md) for the options that control where the contents land.
* [How import works](how-import-works.md) for what n8n does with each entity file.
