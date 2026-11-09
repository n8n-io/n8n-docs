---
description: >-
  Export workflows, agents, folders, or whole projects into a .n8np package, and
  control how n8n handles their dependencies.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Export a package

{% hint style="info" %}
**Preview status**

n8n packages are in Preview. The export options may change in future releases.
{% endhint %}

Export writes an [n8n package](README.md), a [.n8np archive](package-format.md), containing what you asked for, plus references to everything those workflows need on the target instance. Export doesn't modify the source instance.

Use the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli):

```bash
n8n-cli package export --workflow-id=<workflow-id> --output=triage.n8np
```

Or call the endpoint directly:

```bash
curl -X POST 'https://n8n.example.com/api/v1/n8n-packages/export' \
	-H "X-N8N-API-KEY: <your-api-key>" \
	-H 'Content-Type: application/json' \
	-d '{"workflowIds": ["<workflow-id>"]}' \
	-o triage.n8np
```

For the full request and response schema, see the `N8nPackage` section of the [endpoint reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference).

## Choose what to export

Pass at least one ID. Repeat a flag to name several: there's no comma-separated form.

```bash
# Two workflows
n8n-cli package export --workflow-id=wf7Kq2 --workflow-id=wf9Zx1 --output=triage.n8np

# A folder, and everything nested inside it
n8n-cli package export --folder-id=fdInProg --output=in-progress.n8np

# A workflow and a folder together
n8n-cli package export --workflow-id=wf7Kq2 --folder-id=fdInProg --output=mixed.n8np

# A workflow and an agent together
n8n-cli package export --workflow-id=wf7Kq2 --agent-id=agSup01 --output=support.n8np

# Two whole projects
n8n-cli package export --project-id=prTeam9 --project-id=prOps3 --output=teams.n8np
```

Workflow, agent, and folder IDs can be combined. Project IDs can't be combined with any of them, because a project package has a different shape. Mixing the two groups returns a `400`.

A folder always brings its nested folders and their workflows. Folder and project exports leave out archived workflows, unless you set `--include-archived-workflows=true`. A workflow you name by ID always exports, even when it's archived. If you name a workflow that's also inside a folder you named, it's exported once, inside the folder.

n8n caps each group of IDs at 300. That's per group, so one export can name 300 workflows, 300 agents, and 300 folders. Exceeding the cap returns a `400`, and the CLI doesn't catch it before sending the request.

An empty project exports as project metadata only, with no `workflows` list in the manifest.

## Export flags

| Flag | Description |
|------|-------------|
| `--workflow-id`, `-w` | Workflow ID to include. Repeat to export several. |
| `--agent-id` | Agent ID to include. Repeat to export several. |
| `--folder-id` | Folder ID to include, with everything nested inside it. Repeat to export several. |
| `--project-id`, `-p` | Project ID to include. Repeat to export several. Can't be combined with `--workflow-id`, `--agent-id`, or `--folder-id`. |
| `--output`, `-o` | File to write the package to. Defaults to `export.n8np` in the current directory. |
| `--version-policy` | `latest` (default), `published-strict`, `prefer-published`, or `ignore-unpublished`. Which version of each workflow and agent n8n exports. See [Workflow versions](#workflow-versions). |
| `--include-variable-values` | `true` (default) or `false`. Whether variable values are bundled. See [Variable values](#variable-values). |
| `--include-tags` | `true` (default) or `false`. Whether the tags on the exported workflows are bundled. |
| `--include-archived-workflows` | `false` (default) or `true`. Whether folder and project exports include their archived workflows. |
| `--credential-export-policy` | `expression-values-only` (default) or `no-values`. Whether credential fields set by an expression are bundled. See [Credential values](#credential-values). |
| `--dependency-policy` | `fail` (default), `include-in-package`, or `reference-only`. How n8n handles a workflow or agent the package depends on that you didn't name, such as a sub-workflow, an error workflow, or a sub-agent. See [Workflow dependencies](#workflow-dependencies). |

{% hint style="info" %}
The `n8n-cli package export` flags are shown here in kebab-case. `--help` prints the equivalent camelCase names (`--workflowId`, `--includeTags`, `--dependencyPolicy`), and error messages use them too. Both spellings work.
{% endhint %}

`--output` overwrites an existing file without warning. n8n writes nothing when the export fails, so a failed run leaves the previous file in place.

## Workflow dependencies

If a workflow calls a sub-workflow, or names an error workflow, that's a dependency of the package. `--dependency-policy` decides what n8n does when a dependency isn't in the set of IDs you named.

The policy only applies to workflows and agents. It doesn't affect the credentials, data tables, variables, or tags they use. An agent's sub-agents and the workflows it uses as tools count as dependencies too.

| Value | What it does |
|-------|--------------|
| `fail` (default) | Abort the export and list what's missing, up to 20 IDs |
| `include-in-package` | Walk the dependency graph and add the missing workflows and agents to the package |
| `reference-only` | Leave them out, and record them in `requirements.workflows` or `requirements.agents` as entities the target instance must already have |

**`fail` and `include-in-package` follow the whole chain.** If workflow A calls B and B calls C, exporting A and B still fails on C. Only `reference-only` stops at direct references, on the assumption that a referenced workflow and its own dependencies already exist on the target together.

**An error workflow counts as a dependency.** A workflow with an error workflow configured under **Settings > Error workflow** fails a default export unless you include that workflow too. The exceptions are the literal value `DEFAULT` and any error workflow set by an expression, which n8n ignores.

n8n never treats a reference set by an expression as a dependency, and never rewrites one on import. Only static references count.

The everyday promotion case has two forms:

```bash
# Name the dependency yourself
n8n-cli package export --workflow-id=wf7Kq2 --workflow-id=wf9Zx1 --output=triage.n8np

# Or let n8n work it out
n8n-cli package export --workflow-id=wf7Kq2 \
	--dependency-policy=include-in-package \
	--output=triage.n8np
```

{% hint style="warning" %}
On a project export, `include-in-package` can pull in projects you didn't ask for. A dependency owned by another project brings that project's shell and folder chain into the archive. The CLI's summary counts the projects you named rather than the projects in the archive, so it under-reports when this happens. Extract the archive or read the manifest to see what you actually got.
{% endhint %}

## Workflow versions

`--version-policy` decides which version of each workflow travels in the package:

| Value | What it does |
|-------|--------------|
| `latest` (default) | Export the current draft |
| `published-strict` | Export the published version. Abort the export if a workflow has none, and list up to 20 of them |
| `prefer-published` | Export the published version, or the draft for a workflow that isn't published |
| `ignore-unpublished` | Export the published version, and leave out workflows that aren't published |

For a workflow, the policy only picks the nodes and connections. Its name, settings, and tags always come from its current draft. The policy applies to agents too.

An archived workflow has no published version, so it always exports its draft, whatever the policy.

A dependency that `ignore-unpublished` leaves out counts as missing. Under `--dependency-policy=fail` or `include-in-package`, the export aborts. Under `reference-only`, n8n records it in the manifest's `requirements`.

## Variable values

By default, a variable referenced by an exported workflow travels with its value. With `--include-variable-values=false`, the variable still travels, and still appears in the manifest and in `requirements.variables`, but its `value` field is left out.

Turning values off changes what happens on import: the target instance creates the variable empty rather than filling it in. It doesn't stop the variable traveling.

Bundling values needs the `variable:list` API key scope, but only when the exported workflows reference at least one variable. Without it, the export returns a `403` telling you to add the scope or set `--include-variable-values=false`. Every role that can create an API key can assign `variable:list`, so a `403` here means the key you used was created without it.

n8n finds variable references by scanning node parameters and workflow settings for `$vars.NAME`, `$vars['NAME']`, and `$vars["NAME"]`.

An export is blocked when one variable name would resolve to two different variables in the same package, because the package can only carry one of them.

## Credential values

By default, a bundled credential carries the fields whose value is an n8n expression, such as `={{ $secrets.apiKey }}`. It also carries a toggle or option, such as an SSL mode or an auth type, when that setting decides whether one of those fields shows, so the field stays visible on the target. No other value typed in directly travels, and neither do OAuth tokens. With `--credential-export-policy=no-values`, each credential file holds only the credential's ID, name, and type.

Expression values let the target instance create a working credential that reads its secrets from its own store. To use them, import with `--credential-missing-mode=create-with-values`. See [Credentials](how-import-works.md#credentials).

## Tags

With `--include-tags=false`, no tag data travels: the exported workflows carry no tag references and the archive has no `tags/` directory.

This matters more on import than it looks. A workflow that carries a tag list, including an empty one, overwrites the target workflow's tags with exactly that list. A workflow with no tag list at all leaves the target's tags alone. So `--include-tags=false` is the option that preserves existing tags on the target.

If the source instance sets `N8N_WORKFLOW_TAGS_DISABLED=true`, tags are left out of every export regardless of this flag, with no warning.

## What the response tells you

A successful export returns the archive as `application/gzip`, with an `X-N8n-Export-Counts` header carrying the real per-entity counts:

```
X-N8n-Export-Counts: {"agents":0,"workflows":2,"folders":0,"credentials":1,"dataTables":1,"variables":1,"tags":1}
```

These are the counts of what ended up in the archive, after folder contents and any auto-included sub-workflows and sub-agents, so they don't have to match the number of IDs you asked for. The header has no `projects` key. The CLI prints a summary built from it.

`credentials` counts bundled credential files, so a credential you can't read is recorded as a requirement without adding to the count. `variables` counts bundled variable files rather than referenced names.

The download file name is always `export.n8np`, whatever you exported. The CLI writes to `--output` instead.

## Permissions

Export needs an API key with:

* `workflow:export`, when you name workflow or folder IDs. Folders use the workflow scope.
* `agent:export`, when you name agent IDs.
* `project:export`, when you name project IDs, including for the agents in those projects.
* `variable:list`, when values are bundled and the workflows reference at least one variable.

On top of the API key, you can only export what you can read: n8n checks your own access to each workflow, agent, folder, project, and credential as it builds the package. A credential you can't read is recorded as a requirement rather than bundled.

Export needs no license feature. For the full matrix, see [Limits and permissions](limits-and-permissions.md).

## Errors

| Status | Cause |
|--------|-------|
| `400` | A requested workflow, agent, folder, or project doesn't exist, or you can't access it. Also mixing ID groups, passing no IDs, exceeding 300 IDs in a group, or an export blocked by `--dependency-policy` or `--version-policy=published-strict` |
| `403` | The API key is missing a scope it needs |

A missing entity and an inaccessible one return the same `400` with the same message, so you can't use export to test whether an ID exists. Export never returns a `404`.

Error bodies carry a `message` only. 

## Events

Every export emits an event on both the log streaming and telemetry paths, so you can audit what left an instance.

| Event | Emitted when |
|-------|--------------|
| `n8n.audit.n8n-package.export.success` | The export succeeded |
| `n8n.audit.n8n-package.export.failed` | The export failed |

The success event carries the user and the `workflowIds`, `agentIds`, `folderIds`, and `projectIds` that actually ended up in the package, so it reflects folder contents and auto-included dependencies rather than what you asked for. Each list is present only when it isn't empty.

The failure event carries the user, the IDs requested, and a `reason` of `access-denied`, `entity-not-found`, `blocked`, or `validation`.

Log streaming events carry IDs. 
Telemetry events emit counts to keep the data anonymized.

## Read next

* [Import a package](import-a-package.md) to move the file onto another instance.
* [Package format](package-format.md) for what you'll find inside the archive.
* [Limits and permissions](limits-and-permissions.md) for the size caps and the full scope matrix.

## Related resources

* [n8n packages](./)
* [Package format](package-format.md)
* [Import a package](import-a-package.md)
* [How import works](how-import-works.md)
* [Limits and permissions](limits-and-permissions.md)
