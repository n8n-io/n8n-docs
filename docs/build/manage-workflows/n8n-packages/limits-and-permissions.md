---
description: >-
  Size limits, license features, API key scopes, and the events n8n emits when
  you export or import a package.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Limits and permissions

{% hint style="info" %}
**Preview status**

n8n packages are in Preview. These limits and requirements may change in future releases.
{% endhint %}

Reference for what constrains [package](README.md) export and import: size caps, license features, API key scopes, and observability.

## Package size limits

Four environment variables cap what an import accepts. They protect the instance against a small archive that expands to an enormous one:

| Variable | Default | What it caps |
|----------|---------|--------------|
| `N8N_IMPORT_MAX_UNCOMPRESSED_BYTES` | `314572800` (300 MiB) | Total uncompressed size of every file in the archive, checked as the archive is read |
| `N8N_IMPORT_MAX_ENTRY_BYTES` | `5242880` (5 MiB) | Uncompressed size of any single file |
| `N8N_IMPORT_MAX_ENTRIES` | `5000` | Number of entries in the archive, counting directories |
| `N8N_IMPORT_MAX_PATH_LENGTH` | `1024` | Length of any entry path, in characters |

Exceeding any of them returns a `400` naming which limit was hit.

{% hint style="warning" %}
The upload itself is capped separately, by [`N8N_PAYLOAD_SIZE_MAX`](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/endpoints), which defaults to 16 MiB and isn't specific to packages. That cap applies to the compressed file, so it's usually the one you hit first: a package only reaches 300 MiB uncompressed if it compresses to under 16 MiB.

If you're importing large packages, raise `N8N_PAYLOAD_SIZE_MAX` first. Raising the import limits on their own changes nothing. An upload over the cap returns a `413`.
{% endhint %}

A few more limits apply to an import request and aren't configurable: exactly one file per request, and 64 KB per option field, which is the practical cap on a `--bindings` value.

Export caps IDs at 300 per group, counted separately for workflow, folder, and project IDs. See [Choose what to export](export-a-package.md#choose-what-to-export).

## Archive validation

Beyond the size caps, n8n rejects an archive that isn't shaped like a package, each with a `400`:

* `manifest.json` has to be the first file in the archive.
* Entry paths have to use only letters, digits, `.`, `_`, `/`, and `-`, so an archive with non-ASCII paths is rejected.
* Paths have to be relative, can't escape the package root, and have to be unique.
* Entries have to be files or directories. Symlinks and hardlinks are rejected.
* `packageFormatVersion` has to match exactly. See [Version compatibility](package-format.md#version-compatibility).

Files the manifest doesn't reference are ignored, though they still count toward the size and entry limits.

## License features

There's no license feature for packages themselves. The feature is available on n8n Cloud and self-hosted n8n, on all plans and editions, and export needs no license feature at all.

Import checks two license features, and only for what it would actually do:

* **Folders**, whenever the package contains folders. This is judged from what the package declares, so it applies even if every folder already exists on the target.
* **Variables**, only when the import would actually create or overwrite a variable. A package whose variables all resolve on the target writes none, so it needs neither the license nor a variable scope.

Importing a project package also needs a license that supports team projects.

A missing license feature returns a `403` naming the feature.

Packages are only reachable through the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api), so the API has to be enabled on the instance. To stop packages moving in or out of an instance, [disable the public API](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/disable-the-public-api), or don't issue API keys carrying the `workflow:export` and `workflow:import` scopes.

## API key scopes

Both endpoints authenticate with an API key, and the import is attributed to that key's user.

### Export

| Scope | Needed when |
|-------|-------------|
| `workflow:export` | You name workflow or folder IDs. Folders use the workflow scope |
| `project:export` | You name project IDs |
| `variable:list` | Variable values are bundled and the workflows reference at least one variable |

### Import

| Scope | Needed when |
|-------|-------------|
| `workflow:import` | Always |
| `folder:create` and `folder:update` | The package contains folders |
| `project:create` and `project:update` | The package is a project package, whether or not it creates a project |
| `dataTable:create` | The package references data tables and `--data-table-missing-mode` is `create` |
| `variable:create` | The import actually creates a variable |
| `variable:update` | The import actually overwrites a variable |
| `tag:create` | The import actually creates a tag |
| `tag:update` | The import actually renames or reconciles a tag |

The last four are judged from what the import will really write, so a package that references tags or variables which all already match needs neither scope. The rest are judged from what the package declares, which means `dataTable:create` is required even when every referenced table already exists.

A member-role API key can't import a project package, can't import a package containing folders, and can't create or overwrite variables: `project:create`, `project:update`, `folder:create`, `folder:update`, `variable:create`, and `variable:update` are owner and admin scopes. Members can hold `workflow:export`, `workflow:import`, `project:export`, `variable:list`, `dataTable:create`, `tag:create`, and `tag:update`, so a member can bundle variable values on export.

API key scopes are checked on top of your own permissions, not instead of them. On export you can only take what you can read, so n8n checks your access to each workflow, folder, project, and credential. On import it checks your permission to write to the target project. A credential you can't read is recorded as a requirement rather than bundled, so a partial view of an instance produces a package that says plainly what the target has to supply.

Missing permission to create a tag or a data table is reported as a blocking issue rather than a `403`. See [Why an import is refused](how-import-works.md#why-an-import-is-refused).

## Variable limit

Instances have a limit on how many variables they can hold, counted across global and project-scoped variables together. n8n refuses an import whose new variables would take you over the limit, before writing anything. The issue tells you the limit, the headroom left, how many the import wanted, and which variables they were.

Only new variables count against the limit. Overwriting an existing variable consumes no headroom, because that variable already counts. n8n also counts what the import would really create, so one global variable needed by several projects in a package counts once.

## Events

Both operations emit events on the log streaming and telemetry paths, so you can audit who moved what.

| Event | Emitted when |
|-------|--------------|
| `n8n.audit.n8n-package.export.success` | An export succeeds |
| `n8n.audit.n8n-package.export.failed` | An export fails |
| `n8n.audit.n8n-package.import.success` | An import succeeds |
| `n8n.audit.n8n-package.import.failed` | An import fails |

Subscribe a log streaming destination to all four to track every package moving in or out of the instance. Log streaming events carry entity IDs, and the matching telemetry events carry per-entity counts instead. A failure event classifies the reason as `access-denied`, `entity-not-found`, `blocked`, or `validation`.

For what each event's payload holds, see [Events](export-a-package.md#events) on the export page and [Events](import-a-package.md#events) on the import page.

## Read next

* [Export a package](export-a-package.md) and [Import a package](import-a-package.md) for the options these limits apply to.
* [How import works](how-import-works.md) for how the license and scope checks fit into an import.
