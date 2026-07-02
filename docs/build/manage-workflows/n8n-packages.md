---
title: n8n Packages
contentType: howto
nodeTitle: n8nPackages
originalFilePath: workflows/n8n-packages.md
url: https://docs.n8n.io/build/manage-workflows/export-and-import/n8n-packages
description: How you can export and import content from your n8n instance with n8n packages
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# n8n Packages

{% hint style="warning" %}
**Beta**

The n8n packages format and APIs are still under development. Breaking changes may occur without a major version bump.
Any feedback via GitHub issues on our main n8n repository is appreciated.
{% endhint %}

A package is a "snapshot" tar file that bundles a workflow together with a manifest file describing its dependencies, similar to an `npm` package. You could export a package from one n8n instance and import it into another.

You can import and export n8n packages through the [Public API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/n8n-package#post-n8n-packages-export) of your n8n instance, or through the n8n CLI, which wraps the same Public API endpoints.

## Known limitations

The following entities are not supported in n8n packages yet:
- subworkflows
- error workflows
- data tables
- folders
- projects

We're working on adding support for those.

## What's in a package

A package is a tar file with the `.n8np` extension. It contains a `manifest.json` and the workflows you exported, along with the credentials those workflows use. n8n never includes credential secrets in a package. Instead, it exports a stub with the credential's ID, name, and type, so you can match it to a credential on the target instance.

### Content overview

Extracting a `.n8np` archive gives you a directory containing a `manifest.json` file and a `workflows` directory. n8n creates one subdirectory per exported workflow, each holding a `workflow.json` file with that workflow's nodes, connections, and settings:

```
export/
├── manifest.json
└── workflows/
    ├── marketing-agent/
    │   └── workflow.json
    └── personal-ai-assistant/
        └── workflow.json
```

The `manifest.json` file describes the package's contents:

* `packageFormatVersion`: the version of the package format.
* `exportedAt`: the timestamp when n8n created the package.
* `sourceN8nVersion`: the version of n8n that exported the package.
* `sourceId`: an identifier for the n8n instance that exported the package.
* `workflows`: a list of the exported workflows, each with its `id`, `name`, and `target` (the path to its directory under `workflows`).
* `requirements.credentials`: a list of the credentials the exported workflows use. Each entry has the credential's `id`, `name`, and `type`, and lists the IDs of the workflows that use it (`usedByWorkflows`). n8n doesn't include credential secrets in the package.

## Use cases

Use n8n packages when you need a repeatable, automatable way to move workflows between instances. Common scenarios include:

* **CI/CD pipelines**: promote workflows from a development instance to staging or production as part of an automated pipeline.
* **Backups**: export workflows and their credential references so you can restore them later, or recreate them on a new instance.
* **Sharing workflows**: hand a workflow to a teammate or another team without sharing credential secrets.
* **Instance migration**: move workflows from one n8n instance to another, for example when consolidating instances or setting up a new environment.

## Export a package

To export a package, call the export endpoint with the IDs of the workflows you want to include. n8n returns a `.n8np` file containing those workflows and their credential stubs.

For the request and response details, see [Export a package](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/n8n-package#post-n8n-packages-export) in the Public API reference.

You can also export a package using the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli), which wraps the same endpoint:

```bash
n8n-cli package export --workflow-id=<workflow-id> --output=export.n8np
```

Provide workflow IDs or project IDs, but not both.

| Flag | Description |
|------|-------------|
| `-w, --workflow-id` | Workflow ID to include. Repeat the flag to export several. |
| `-p, --project-id` | Project ID to include. Repeat the flag to export several. |
| `-o, --output` | File to write the package to. Defaults to `export.n8np`. |

Provide at least one `--workflow-id` or `--project-id`. Exporting workflows requires the API key to hold the `workflow:export` permission scope, and exporting projects requires the `project:export` permission scope.

## Import a package

To import a package, provide the `.n8np` file along with options that control:

* Which project and folder the workflows land in.
* What happens if a workflow with the same source ID already exists on the target instance.
* Whether imported workflows keep their original ID or get a new one.
* How n8n matches the credentials the workflows depend on.


For the full list of options, see [Import a package](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/n8n-package#post-n8n-packages-import) in the Public API reference.

You can also import a package using the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli), which wraps the same endpoint:

```bash
n8n-cli package import --file=export.n8np --conflict-policy=fail
n8n-cli package import --file=export.n8np --project=<id> --conflict-policy=new-version
n8n-cli package import --file=export.n8np --conflict-policy=fail --credential-missing-mode=must-preexist
```

| Flag | Description |
|------|-------------|
| `--file` | Path to the `.n8np` package file. Required. |
| `--conflict-policy` | What to do when a workflow already exists by source ID: `new-version`, `fail`, or `skip`. Required. |
| `--project` | Target project ID. Defaults to your personal project. |
| `--folder` | Target folder ID within the project. Defaults to the project root. |
| `--workflow-id-policy` | Whether imported workflows keep their source ID (`source`) or receive a new one (`new`). |
| `--credential-matching-mode` | How credential references are matched on the target instance (`id-only`, more options to come). |
| `--credential-missing-mode` | What to do when a referenced credential can't be resolved. `create-stub`, the instance default, creates empty placeholder credentials in the target project. `must-preexist` requires every referenced credential to already exist. |

Importing requires the API key to hold the `workflow:import` permission scope. When the import is blocked, for example by a workflow conflict under `--conflict-policy=fail`, or by an unresolved credential under `--credential-missing-mode=must-preexist`, the command exits with a non-zero status and lists the blocking issues. With the default `create-stub` mode, n8n stubs missing credentials instead of blocking the import.

### Importing credentials

Today, this import flow matches credentials by ID only, and the credential must already exist on the target instance before you import.

<!-- TODO: explain the special case of credential bindings, where when you import the first time, you need to capture credentials you created and pass them in on future imports -->