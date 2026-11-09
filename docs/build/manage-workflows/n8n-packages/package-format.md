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
│   ├── triage-inbound-wf7Kq2/
│   │   ├── workflow.json
│   │   └── workflow-metadata.json
│   └── send-email-wf9Zx1/
│       ├── workflow.json
│       └── workflow-metadata.json
├── credentials/
│   └── linear-api-crLin44/
│       └── credential.json
├── variables/
│   └── slackchannelid-vaSl03/
│       └── variable.json
├── data-tables/
│   └── countries-dtCn12/
│       └── data-table.json
└── tags/
    └── prod-tgPr01/
        └── tag.json
```

Each workflow directory holds two files:

* `workflow.json`: the workflow itself.
* `workflow-metadata.json`: the ID of the exported version, and of the version published on the source if there is one. Import uses it to apply the [publishing policy](import-a-package.md#publishing). Keeping the version IDs out of `workflow.json` means publishing a workflow doesn't change its `workflow.json`.

### Folder package

Exporting by folder ID keeps the folder tree. A folder's workflows sit in a `workflows/` directory inside that folder, and nested folders sit directly inside their parent, with no repeated `folders/` segment. Credentials, variables, data tables, and tags stay at the top level:

```
in-progress.n8np
├── manifest.json
├── folders/
│   ├── to-production-fdToProd/
│   │   └── folder.json            # an empty folder is just the shell
│   └── in-progress-fdInProg/
│       ├── folder.json
│       ├── workflows/
│       │   └── triage-inbound-wf7Kq2/
│       │       ├── workflow.json
│       │       └── workflow-metadata.json
│       └── nested-fdNest01/
│           ├── folder.json
│           └── workflows/
│               └── playground-wfPlay1/
│                   ├── workflow.json
│                   └── workflow-metadata.json
├── credentials/
│   └── linear-api-crLin44/
│       └── credential.json
└── tags/
    └── prod-tgPr01/
        └── tag.json
```

### Project package

Exporting by project ID adds a namespacing layer. Several projects can travel in one package. Credentials, variables, and data tables owned by an exported project nest under that project. Anything global, or owned by a project that isn't in the package, stays at the top level. Tags are always at the top level, because tags are global in n8n:

```
team-ligo.n8np
├── manifest.json
├── projects/
│   └── team-ligo-prTeam9/
│       ├── project.json
│       ├── workflows/                    # workflows at the project root
│       │   └── triage-inbound-wf7Kq2/
│       │       ├── workflow.json
│       │       └── workflow-metadata.json
│       ├── folders/
│       │   └── in-progress-fdInProg/
│       │       ├── folder.json
│       │       └── workflows/
│       │           └── send-email-wf9Zx1/
│       │               ├── workflow.json
│       │               └── workflow-metadata.json
│       ├── credentials/                  # owned by this project
│       │   └── linear-api-crLin44/
│       │       └── credential.json
│       ├── variables/                    # scoped to this project
│       │   └── slackchannelid-vaSl03/
│       │       └── variable.json
│       └── data-tables/
│           └── countries-dtCn12/
│               └── data-table.json
├── credentials/                          # a global credential
│   └── shared-smtp-crSmtp1/
│       └── credential.json
├── variables/                            # a global variable
│   └── region-vaRg02/
│       └── variable.json
└── tags/                                 # always global
    └── prod-tgPr01/
        └── tag.json
```

{% hint style="info" %}
In a project package, where a variable sits decides where it's created. A variable under `projects/<project-directory>/variables/` is created in that project. One at the top level is created globally. This is why `--variable-parent-policy` is rejected for project packages: the layout already decided.
{% endhint %}

## Agents and skills

[Agents](export-and-import-agents.md) sit next to workflows. In a workflow or folder package, each agent has a directory under the top-level `agents/`. In a project package, an agent sits under its project, in `projects/<project-directory>/agents/`. Each agent directory holds two files:

* `agent.json`: the agent's definition, with its custom tools and schedules.
* `agent-metadata.json`: the ID of the exported version, and of the version published on the source if there is one. Import uses it to apply the [publishing policy](import-a-package.md#publishing).

Each skill an exported agent uses gets its own directory with a `skill.json`, holding the skill's content and whether it's a project or an instance skill. A project skill sits under its project when that project is in the package. Every other skill sits in the top-level `skills/`:

```
support.n8np
├── manifest.json
├── agents/
│   └── support-triage-agSup01/
│       ├── agent.json
│       └── agent-metadata.json
├── skills/
│   └── refund-policy-skRf01/
│       └── skill.json
└── credentials/
    └── openai-account-crOai01/
        └── credential.json
```

The manifest lists agents and skills in its `agents` and `skills` entry lists.

## Directory naming

Each entity gets a directory named `<slug>-<id>`: a slug of its name, then a hyphen, then its ID on the source instance. Slugging lowercases the name, drops every character that isn't a letter a to z, a digit, whitespace, or a hyphen, turns whitespace runs and repeated hyphens into a single hyphen, and trims hyphens from both ends:

| Entity name | ID | Directory |
|-------------|----|-----------|
| `Triage inbound` | `wf7Kq2` | `triage-inbound-wf7Kq2` |
| `slackChannelId` | `vaSl03` | `slackchannelid-vaSl03` |
| `Q4 报告` | `wfQ4r1` | `q4-wfQ4r1` |
| `報告` | `wfBg02` | `workflow-wfBg02` |

The last row shows the fallback: when nothing survives slugging, n8n uses the entity type as the slug (`workflow`, `agent`, `skill`, `folder`, `project`, `credential`, `variable`, `data-table`, or `tag`). Because the ID is part of the directory name, two entities with the same name still get separate directories.

Directory names are for humans reading the archive. n8n identifies entities by the IDs in the manifest and the JSON files, never by the directory name.

## `manifest.json`

The manifest is an index. It tells n8n what's in the package and what the target instance has to supply, so an import can fail fast without reading every file.

These four fields are always present:

* `packageFormatVersion`: the version of the package format, currently the string `"1"`.
* `exportedAt`: when n8n created the package, as an ISO 8601 timestamp.
* `sourceN8nVersion`: the n8n version that created the package.
* `sourceId`: an identifier for the instance that created the package.

Then come the entry lists, one per entity type that's present: `workflows`, `agents`, `skills`, `folders`, `projects`, `credentials`, `dataTables`, `variables`, and `tags`. A list is left out entirely when it would be empty. Every entry has the same three fields:

* `id`: the entity's ID on the source instance.
* `name`: the entity's name.
* `target`: the directory holding the entity's JSON file, relative to the package root.

Last comes `requirements`, which lists what the workflows and agents need to run on the target instance. It has up to seven sections. Each entry carries `usedBy`, the workflows and agents that need it, each as `{ "kind": "workflow", "id": "<id>" }` or `{ "kind": "agent", "id": "<id>" }`:

| Section | Entry shape | Notes |
|---------|-------------|-------|
| `credentials` | `{ id, name, type, usedBy }` | n8n never exports credential data, so a credential requirement always means the target has to supply it |
| `dataTables` | `{ id, name, usedBy }` | The schema itself is in the bundled `data-table.json` |
| `workflows` | `{ id, name, usedBy }` | Sub-workflow and error workflow references, and workflows an agent uses as tools. `name` is optional, because a referenced workflow may not be one the exporting user can see |
| `agents` | `{ id, name, usedBy }` | Sub-agents an agent uses. `name` is optional, for the same reason |
| `variables` | `{ name, usedBy }` | Name only. There's no ID, because `$vars.<name>` resolves by name at runtime |
| `tags` | `{ id, name, usedBy }` | Only workflows use tags |
| `nodeTypes` | `{ type, typeVersion, usedBy }` | Every node type and version the workflows and agents' node tools use. Read it to tell whether a target instance can import the package, since it needs all of them installed. n8n re-derives the same list on import rather than trusting this one |

{% hint style="warning" %}
`requirements` lists what the workflows and agents need, which isn't the same as what the package contains. `requirements.workflows` lists every static workflow reference, including sub-workflows that are bundled in the package. A credential the exporting user can't read appears in `requirements.credentials` with no matching file. Don't read `requirements` as an inventory of the archive; read the entry lists for that.
{% endhint %}

A full manifest for a workflow package holding two workflows:

```json
{
	"packageFormatVersion": "1",
	"exportedAt": "2026-08-04T09:14:02.117Z",
	"sourceN8nVersion": "2.34.0",
	"sourceId": "f9e1e962bba26edf357042c12f367dab17f4c63ec368e1f39cbf7ce43c8b9f8b",

	"workflows": [
		{ "id": "wf7Kq2", "name": "Triage inbound", "target": "workflows/triage-inbound-wf7Kq2" },
		{ "id": "wf9Zx1", "name": "Send email", "target": "workflows/send-email-wf9Zx1" }
	],
	"credentials": [
		{ "id": "crLin44", "name": "Linear api", "target": "credentials/linear-api-crLin44" }
	],
	"dataTables": [
		{ "id": "dtCn12", "name": "countries", "target": "data-tables/countries-dtCn12" }
	],
	"variables": [
		{ "id": "vaSl03", "name": "slackChannelId", "target": "variables/slackchannelid-vaSl03" }
	],
	"tags": [
		{ "id": "tgPr01", "name": "prod", "target": "tags/prod-tgPr01" }
	],

	"requirements": {
		"credentials": [
			{ "id": "crLin44", "name": "Linear api", "type": "linearApi", "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] }
		],
		"dataTables": [
			{ "id": "dtCn12", "name": "countries", "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] }
		],
		"workflows": [
			{ "id": "wf9Zx1", "name": "Send email", "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] }
		],
		"variables": [
			{ "name": "slackChannelId", "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] }
		],
		"tags": [
			{ "id": "tgPr01", "name": "prod", "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] }
		],
		"nodeTypes": [
			{ "type": "n8n-nodes-base.formTrigger", "typeVersion": 2.5, "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] },
			{ "type": "n8n-nodes-base.linear", "typeVersion": 1, "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] },
			{ "type": "n8n-nodes-base.executeWorkflow", "typeVersion": 1.2, "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] },
			{ "type": "n8n-nodes-base.dataTable", "typeVersion": 1, "usedBy": [{ "kind": "workflow", "id": "wf7Kq2" }] },
			{ "type": "n8n-nodes-base.emailSend", "typeVersion": 2.1, "usedBy": [{ "kind": "workflow", "id": "wf9Zx1" }] }
		]
	}
}
```

## `data-table.json`

Each data table file holds the table's schema. Rows never travel.

```json
{
	"id": "dtCn12",
	"name": "countries",
	"columns": [
		{ "id": "dcNm01", "name": "name", "type": "string", "index": 0 },
		{ "id": "dcCd02", "name": "code", "type": "string", "index": 1 }
	]
}
```

| Field | Description |
|-------|-------------|
| `id` | The table's ID on the source instance. A table the import creates keeps it |
| `name` | The table's name |
| `columns` | One entry per column, with its `id`, `name`, `type`, and `index` (its position in the table) |
| `columns[].id` | The column's ID on the source instance. Missing in packages exported before n8n 2.44.0 |

Column IDs let an import recognize a renamed column, so the column keeps its values. Packages exported before n8n 2.44.0 don't carry column IDs, so n8n pairs their columns by name, and a renamed column counts as a destructive change. See [Data tables](how-import-works.md#data-tables).

## Version compatibility

`packageFormatVersion` is currently `"1"`. An n8n instance imports a package only when the version matches exactly. There's no compatibility window and no migration path: a package declaring any other version is rejected with a `400` before anything is written.

`sourceN8nVersion` is recorded for information only. Nothing compares it against the target instance, so a package moves freely between instances running different n8n versions as long as the format version matches, and as long as the target has the node types the workflows use.

The exception is data table column IDs. From n8n 2.44.0, an exported data table carries column IDs, and an older instance rejects a package with column IDs with a `400`. Upgrade the importing instance first.

## Comparing packages in a pipeline

The archive is deterministic: file timestamps are fixed at the Unix epoch, permissions are fixed, and gzip runs in portable mode. Two exports of identical content produce identical bytes in the container.

The one exception is `manifest.json`, which carries a fresh `exportedAt` on every export. Two exports of unchanged content aren't byte-identical because of that field alone. If you checksum packages to detect change in a pipeline, exclude `exportedAt` from the comparison, or you'll see drift on every run.

## Read next

* [Export a package](export-a-package.md) for how to produce each of the three shapes.
* [Import a package](import-a-package.md) for the options that control where the contents land.
* [How import works](how-import-works.md) for what n8n does with each entity file.

## Related resources

* [n8n packages](./)
* [Export a package](export-a-package.md)
* [Import a package](import-a-package.md)
* [Export and import agents](export-and-import-agents.md)
* [How import works](how-import-works.md)
* [Limits and permissions](limits-and-permissions.md)
