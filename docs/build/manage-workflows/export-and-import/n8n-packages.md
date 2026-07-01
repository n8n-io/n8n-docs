---
title: n8n Packages
contentType: howto
nodeTitle: n8nPackages
originalFilePath: workflows/n8n-packages.md
url: https://docs.n8n.io/build/manage-workflows/export-and-import/n8n-packages
description: How you can export and import content from your n8n instance with n8n pcakages
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

You can import and export n8n packages through the Public API of your n8n instance, or through the n8n CLI, which wraps the same Public API endpoints.

## Known limitations

There is no support for including the following data in n8n packages yet:
- subworkflows
- error workflows
- data tables
- folders
- projects

We are working on adding support for those.

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

## Export a package

To export a package, call the export endpoint with the IDs of the workflows you want to include. n8n returns a `.n8np` file containing those workflows and their credential stubs.

For the request and response details, see [Export a package](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/n8n-package#post-n8n-packages-export) in the Public API reference.

You can also export a package using the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli), which wraps the same endpoint:

```bash
n8n-cli package export --workflow-id=<workflow-id> --output=export.n8np
```

## Import a package

To import a package, provide the `.n8np` file along with options that control:

* Which project and folder the workflows land in.
* What happens if a workflow with the same source ID already exists on the target instance.
* Whether imported workflows keep their original ID or get a new one.
* How n8n matches the credentials the workflows depend on.

Today, this import flow matches credentials by ID only, and the credential must already exist on the target instance before you import.

For the full list of options, see [Import a package](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/n8n-package#post-n8n-packages-import) in the Public API reference.

You can also import a package using the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli), which wraps the same endpoint. See the [`package import` command reference](https://github.com/n8n-io/n8n/blob/master/packages/%40n8n/cli/docs/commands/package.md#package-import) for the available arguments:

```bash
n8n-cli package import --file=export.n8np --conflict-policy=fail
```