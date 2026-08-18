---
description: >-
  Import a .n8np package into an n8n instance, and control where its contents
  land and how n8n resolves what they depend on.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Import a package

{% hint style="info" %}
**Preview status**

n8n packages are in Preview. The import options may change in future releases.
{% endhint %}

Import reads an [n8n package](README.md), a [.n8np archive](package-format.md), and writes its contents to the target instance. n8n checks the whole package first: if anything would block the import, it writes nothing and returns every problem at once. See [How import works](how-import-works.md) for the detail.

Use the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli):

```bash
n8n-cli package import --file=triage.n8np --project-id=<target-project-id>
```

Or call the endpoint directly. The archive goes in a multipart field named `package`, and each option is a separate text field:

```bash
curl -X POST 'https://n8n.example.com/api/v1/n8n-packages/import' \
	-H "X-N8N-API-KEY: <your-api-key>" \
	-F 'package=@triage.n8np' \
	-F 'workflowConflictPolicy=new-version' \
	-F 'projectId=<target-project-id>'
```

For the full request and response schema, see the `N8nPackage` section of the [endpoint reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference).

{% hint style="info" %}
If you call the endpoint rather than using the CLI, the request must be `multipart/form-data`. Any other content type returns a `415`. `workflowConflictPolicy` is a required field, even though the CLI supplies it for you.

Omit an option you don't want to set rather than sending it empty. A blank value for one of the policy or mode fields is rejected with a `400`. Only `projectId`, `folderId`, and `bindings` accept a blank value, which n8n treats as omitted.
{% endhint %}

## Where the contents land

For a workflow or folder package, you choose the destination:

| Flag | Description |
|------|-------------|
| `--file` | Path to the `.n8np` file. Required. No short alias, because `-f` is `--format`. |
| `--project-id`, `-p` | Target project ID. Defaults to your personal project. Aliases: `--project`. |
| `--folder-id` | Target folder ID within the project. Defaults to the project root. Aliases: `--folder`. |

{% hint style="warning" %}
For a project package, `--project-id` and `--folder-id` are ignored without warning. A project package carries its own projects, and each project's contents go into that project at its root. Use `--project-conflict-policy` to control what happens when the project already exists.
{% endhint %}

{% hint style="info" %}
Flags are shown in kebab-case throughout this page. `n8n-cli package import --help` prints the equivalent camelCase names (`--projectId`, `--workflowConflictPolicy`, `--tagConflictPolicy`), and error messages use them too. Both spellings work.

There's no `--conflict-policy`, no `--force`, and no `--dry-run`. The flag for workflow conflicts is `--workflow-conflict-policy`.
{% endhint %}

## Workflow options

| Flag | Values | Description |
|------|--------|-------------|
| `--workflow-conflict-policy` | `new-version` (default), `fail`, `skip` | What to do when the workflow already exists on the target. `new-version` saves a new version of the existing workflow, `fail` refuses the whole import, `skip` leaves it alone and carries on. |
| `--workflow-id-policy` | `source` (default), `new` | Whether an imported workflow keeps the package's ID or gets a fresh one. `source` suits promotion between instances. `new` suits importing the same package repeatedly into one instance, and records the package ID as the workflow's source ID. |
| `--workflow-publishing-policy` | `preserve-published-state` (default), `match-source`, `publish-all`, `unpublish-all` | Whether imported workflows end up published. See [Publishing](#publishing). |
| `--missing-node-type-mode` | `fail` (default), `import-anyway` | What to do when a workflow uses a node type, or a node version, the target instance doesn't have. `fail` refuses before writing anything and lists every missing type with the workflows using it. `import-anyway` imports them, but they're never published. |

n8n matches a package workflow to an existing one by the source workflow ID recorded on the target, falling back to a target workflow whose own ID equals the package's ID. That's what makes repeated promotion converge: the second import updates the workflow rather than creating a duplicate.

### Publishing

n8n always writes imported workflows unpublished, then applies the publishing policy in a single pass at the end of the import, once everything exists.

| Value | What it does |
|-------|--------------|
| `preserve-published-state` (default) | A new workflow stays a draft. An updated workflow is republished only if it was already published and the package's workflow is published too. |
| `match-source` | Follow whether the workflow was published in the package. |
| `publish-all` | Publish every imported workflow. Needs `workflow:publish` on the target project. |
| `unpublish-all` | New workflows stay drafts, and updated workflows are unpublished. |

Two things override the policy. A workflow that uses a placeholder credential is never published, and neither is one using a node type the instance doesn't have. n8n reports those as `blocked` with the reason. An archived workflow is never published either.

Publishing can also fail without failing the import, most often when two workflows want the same webhook path. See [Publishing outcomes](how-import-works.md#publishing-outcomes).

## Folder and project options

| Flag | Values | Description |
|------|--------|-------------|
| `--folder-conflict-policy` | `merge` (default), `fail` | What to do when a folder in the package already exists in the target project. `merge` reuses the existing folder and merges the package's contents into it, leaving its name as it is. `fail` refuses the import. |
| `--project-conflict-policy` | `merge` (default), `fail`, `overwrite` | Project packages only. What to do when a project in the package already exists. `merge` leaves the project's details alone and adds the package's contents. `overwrite` also replaces its name, description, and icon, leaving anything the package doesn't carry as it is. `fail` refuses the import. |

`--project-conflict-policy` is ignored for workflow and folder packages.

Two folder conflicts refuse the import even under `merge`: a folder ID that exists in a different project, and an existing folder that sits under a different parent than the import would place it. Neither is something a policy can resolve, because both would mean moving a folder.

A package containing folders needs a license that supports folders.

## Credential options

| Flag | Values | Description |
|------|--------|-------------|
| `--credential-matching-mode` | `id-only` (default), `name-and-type`, `type-only` | How n8n finds the target credential for a reference in the package. |
| `--credential-missing-mode` | `create-stub` (default), `must-preexist` | What to do when a reference can't be resolved. `create-stub` creates an empty placeholder credential in the target project, and the workflow imports but can't be published. `must-preexist` refuses the import. |

In every mode, n8n only considers credentials you can read and that the target project can use, plus global credentials. A credential you can't read is never a candidate, including under `id-only`, which is the usual reason a matching ID doesn't match.

For the ranking rules and the full resolution order, see [Credentials](how-import-works.md#credentials).

## Data table options

| Flag | Values | Description |
|------|--------|-------------|
| `--data-table-matching-mode` | `by-id` (default and only value) | Match the target-project table with the same ID. Never falls back to matching by name. |
| `--data-table-missing-mode` | `create` (default), `must-preexist`, `do-nothing` | What to do when a referenced table isn't in the target project. `create` creates it from the package schema, keeping the source ID, with no rows. `must-preexist` refuses the import. `do-nothing` skips creation. |
| `--data-table-schema-conflict-policy` | `keep-existing` (default), `fail` | How strictly a matched table's schema is compared. `keep-existing` tolerates extra columns the target table has of its own. `fail` refuses those too. |

Every column in the package must exist on a matched target table with the same name and type. A missing column or a type mismatch refuses the import under both schema policies. Neither policy ever changes the target table, so package columns are never added to it.

A matched table is schema-checked even under `--data-table-missing-mode=do-nothing`. That option governs absence, not comparison.

## Variable options

| Flag | Values | Description |
|------|--------|-------------|
| `--variable-missing-mode` | `create-with-value` (default), `create-stub`, `must-preexist`, `do-nothing` | What to do when a referenced variable exists in neither the target project nor global scope. `create-with-value` creates it with the package's value, falling back to an empty variable when the package has no value for it. `create-stub` always creates it empty. `must-preexist` refuses the import. `do-nothing` imports anyway and reports the unresolved names, so the workflow fails at runtime. |
| `--variable-conflict-policy` | `keep-existing` (default), `overwrite`, `fail` | What to do when a referenced variable already resolves but the package carries a different value. `keep-existing` leaves the target value alone. `overwrite` replaces it. `fail` refuses the import. |
| `--variable-parent-policy` | `project` (the behavior when omitted), `global` | Where newly created variables go. Rejected with a `400` for project packages, where the package layout already decides. |

n8n matches variables by name, never by ID, mirroring how `$vars.<name>` resolves at runtime: the target project first, then global scope.

{% hint style="warning" %}
`--variable-conflict-policy=overwrite` writes to the variable at whichever scope it resolved. If the name resolves to a global variable, other projects reading that variable see the new value. There's no warning.
{% endhint %}

Creating or overwriting a variable needs a license that supports variables, plus the matching API key scope, and there has to be room in the instance's variable limit. An import whose variables all resolve already writes nothing, so it needs none of those.

## Tag options

| Flag | Values | Description |
|------|--------|-------------|
| `--tag-missing-mode` | `create` (default), `do-nothing` | What to do when a tag the package references isn't on the target instance. `create` creates it globally with its source ID and name. `do-nothing` imports the workflows without those tags and lists them as skipped. |
| `--tag-conflict-policy` | `skip` (default), `fail`, `rename` | What to do when a tag conflicts. `skip` drops the tag and lists it as skipped. `fail` refuses the import. `rename` renames a target tag whose name has drifted, and resolves a name collision by moving the existing tag onto the package's ID, keeping its name and everything tagged with it. |

Tags are matched by source ID, never by name, because a rename can only be detected against a stable ID.

There are two kinds of conflict. Rename drift means a target tag has the same ID but a different name, so someone renamed it on one instance. A name collision means the ID isn't on the target, but another tag already holds the name, which is the usual case on an established instance where tags were created independently.

{% hint style="warning" %}
Dropping a tag can remove tags from an existing workflow. When n8n updates a workflow, the package's tag list replaces the target workflow's tags entirely. Dropped tags are filtered out of that list first, so updating a tagged workflow whose package tags are all dropped clears the tags it currently has.

To leave existing tags alone, export with `--include-tags=false`, which omits the tag list rather than sending an empty one.
{% endhint %}

If the target instance sets `N8N_WORKFLOW_TAGS_DISABLED=true`, all tag handling is skipped silently and never fails the import.

## Bindings

Bindings map an entity in the package to a specific entity on your instance, skipping the matching rules. Pass a JSON object keyed by entity type. Only `credentials` is accepted:

```bash
n8n-cli package import --file=triage.n8np \
	--bindings='{"credentials":{"crLin44":"crProd8"}}'
```

That maps the package's `crLin44` credential to `crProd8` on the target, so every workflow using `crLin44` uses `crProd8` instead. n8n applies bindings before `--credential-matching-mode` runs, and still checks that the types match: binding to a credential of the wrong type refuses the import.

n8n rejects any key other than `credentials` with a `400` rather than ignoring it.

A bound credential that can't be resolved always refuses the import, even under the default `create-stub`. Only references you haven't bound get a placeholder.

n8n returns the bindings it used in the response. Save the `credentials` map and pass it back as `--bindings='{"credentials":{...}}'` on a later import to keep the mapping stable. The response also carries a `workflows` map, which is informational: sending it back is rejected with a `400`.

## The import response

A successful import returns `200` with eight keys:

```json
{
	"package": {
		"sourceN8nVersion": "2.34.0",
		"sourceId": "f9e1e962bba26edf357042c12f367dab17f4c63ec368e1f39cbf7ce43c8b9f8b",
		"exportedAt": "2026-08-04T09:14:02.117Z"
	},
	"workflows": [
		{ "sourceWorkflowId": "wf9Zx1", "localId": "wf9Zx1", "name": "Send email",
			"projectId": "prProd4", "parentFolderId": null,
			"activeVersionId": null, "publishing": { "state": "unchanged" }, "status": "created" },
		{ "sourceWorkflowId": "wf7Kq2", "localId": "wf7Kq2", "name": "Triage inbound",
			"projectId": "prProd4", "parentFolderId": null,
			"activeVersionId": null, "publishing": { "state": "unchanged" }, "status": "created" }
	],
	"folders": [],
	"projects": [],
	"bindings": {
		"workflows": { "wf7Kq2": "wf7Kq2", "wf9Zx1": "wf9Zx1" },
		"credentials": { "crLin44": "crLin44" }
	},
	"credentials": { "matched": ["crLin44"], "stubbed": [] },
	"variables": { "matched": [], "missing": [], "created": ["slackChannelId"], "stubbed": [], "updated": [] },
	"tags": { "matched": [], "created": ["prod"], "renamed": [], "reconciled": [], "skipped": [] }
}
```

| Key | What it holds |
|-----|---------------|
| `package` | The source instance's n8n version, instance ID, and export timestamp, copied from the manifest |
| `workflows` | One row per workflow, with its `status` of `created`, `updated`, or `skipped`, and its `publishing` outcome |
| `folders` | One row per folder, with a `status` of `created` or `skipped` |
| `projects` | One row per project, with a `status` of `created`, `updated`, or `skipped`. Empty for workflow and folder packages |
| `bindings` | Source ID to target ID maps for workflows and credentials. Only the `credentials` map can be passed back on a later import |
| `credentials` | Source credential IDs, split into `matched` and `stubbed` |
| `variables` | Variable names, split into `matched`, `missing`, `created`, `stubbed`, and `updated`. Values never appear |
| `tags` | Tag names, split into `matched`, `created`, `renamed`, `reconciled`, and `skipped` |

There's no data table summary in the response.

A workflow's `localId` is its ID on the target instance: the package's ID under `--workflow-id-policy=source`, a fresh ID under `new`, and the existing workflow's ID when it was updated or skipped.

`publishing.state` is one of `published`, `unpublished`, `unchanged`, `blocked`, or `failed`. For what each means, see [Publishing outcomes](how-import-works.md#publishing-outcomes).

Both workflows in the example are new, and the default `preserve-published-state` never publishes a new workflow, so each reports `unchanged`. To have new workflows arrive published, use `--workflow-publishing-policy=publish-all`, or `match-source` when they are specified as `published` in the package.

## Errors

A refused import returns every problem it found, not just the first:

```json
{
	"message": "Import blocked: 2 issue(s) must be resolved before the package can be imported.",
	"issues": [
		{ "type": "missing-node-type", "nodeType": "@acme/cool-node", "typeVersion": 3,
			"usedByWorkflows": ["wf7Kq2"] },
		{ "type": "credential-unresolved", "kind": "not_found", "sourceId": "crLin44",
			"usedByWorkflows": ["wf7Kq2"] }
	]
}
```

Nothing was written. The CLI exits with a non-zero status and prints the list.

| Status | Meaning |
|--------|---------|
| `400` | The request or the package is malformed. Also `--variable-parent-policy` on a project package, or a bad `--bindings` value |
| `403` | A missing API key scope, no access to the target project, or a license that doesn't cover folders, variables, or team projects |
| `404` | The project ID you passed doesn't exist, or you have no personal project |
| `409` | The import was refused by a conflict |
| `413` | The upload is larger than the instance allows |
| `415` | The request wasn't `multipart/form-data` |
| `422` | The import was refused for another reason, such as an unresolved credential or a missing node type |

For the full list of reasons an import can be refused, and which status each returns, see [Why an import is refused](how-import-works.md#why-an-import-is-refused).

## Events

Every import emits an event on both the log streaming and telemetry paths, so you can audit what arrived on an instance.

| Event | Emitted when |
|-------|--------------|
| `n8n.audit.n8n-package.import.success` | The import succeeded |
| `n8n.audit.n8n-package.import.failed` | The import failed |

The success event carries the user, the projects and folder the contents landed in, the workflows that were written, every option the import ran with, the source instance ID and format version from the package, and the credential IDs split into matched, created, and updated. Skipped workflows are left out. A package holding several projects still emits one event.

The failure event carries the user, a `reason` of `access-denied`, `entity-not-found`, `blocked`, or `validation`, and the target project and folder if the import got far enough to resolve them. It carries no workflow IDs, because many failures happen before n8n reads the package.

A refused import emits no success event. Log streaming events carry IDs but no counts, and telemetry events carry counts but no IDs.

## Read next

* [How import works](how-import-works.md) for the order n8n writes things in and how it resolves each entity type.
* [Export a package](export-a-package.md) for the options that shape the package in the first place.
* [Limits and permissions](limits-and-permissions.md) for upload caps and the full scope matrix.
