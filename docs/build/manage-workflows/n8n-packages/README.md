---
description: >-
  Bundle workflows and the structure they need into a portable .n8np file, and
  move them between n8n instances.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# n8n packages

{% hint style="info" %}
**Feature availability**

n8n packages are available from n8n 2.27.0, and n8n has added options in most releases since, so check your version if an option here isn't recognized.
{% endhint %}

{% hint style="info" %}
**Preview status**

n8n packages are in Preview. The package format and the API may change in future releases, so avoid relying on them for critical automation without a plan to update.
{% endhint %}

An n8n package is a single file that holds a slice of your n8n instance: some workflows, plus the structure and references those workflows need to run. Export a package from one instance, move the file, and import it into another. Think of it as an `npm` package for part of your n8n instance.

A package is a gzipped tar archive with the `.n8np` extension. Inside it, each entity is a small JSON file, and a `manifest.json` lists what's in the package and what the target instance has to supply. See [Package format](package-format.md) for the full layout.

Packages are an API feature. You export and import them through the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api), or through the [n8n CLI](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-cli), which wraps the same two endpoints. There's no way to export or import a package from the n8n editor.

## Three package shapes

What you export decides the shape of the package, and the shape decides how the contents land on import:

* **Workflow package**: one or more workflows. On import, they land in the project and folder you choose.
* **Folder package**: one or more folders, always including everything nested inside them. On import, the folder tree lands in the project you choose.
* **Project package**: one or more whole projects. The package carries its own projects, so it decides where its contents land and ignores any target project you pass.

You can combine workflows and folders in one export. You can't combine either with projects.

## What travels in a package

| Travels | Doesn't travel |
|---------|----------------|
| Workflows: nodes, connections, settings, published state, archived state | Credential secrets and configuration |
| Folders and their nesting | Data table rows |
| Projects: name, description, icon | Executions and execution history |
| Credential references: ID, name, and type only | Users, project members, roles, and sharing |
| Data table schemas: column names and types | Pinned data and workflow static data |
| Variables: name and type, and the value unless you exclude it | Workflow version history |
| Tags | Whether a workflow is marked as a favorite |

**Credential secrets never travel.** A credential file in a package holds exactly three fields: ID, name, and type. Non-secret configuration such as a host, base URL, or region lives in the same encrypted store as the secret, so it doesn't travel either. On import, n8n matches each reference to a credential that already exists on the target instance, or creates an empty placeholder for you to fill in.

**Data table rows never travel.** Only the schema does. An imported data table starts empty.

## When to use packages

Use packages when you need a repeatable, automatable way to move work between instances:

* **Promote between environments.** Push workflows from development to staging to production as part of a pipeline. Repeated imports update in place rather than creating duplicates, so the same command works the first time and every time after.
* **Migrate to a new instance.** Move a project, its folders, and its workflows in one file.
* **Share work without sharing secrets.** Hand a workflow to another team knowing no credential data is in the file.
* **Back up structure.** Keep a copy of the workflows and structure you'd need to rebuild, though a package isn't a full backup: no execution data travels.

## Quick start

Point the CLI at your source instance, then export a workflow:

```bash
n8n-cli config set-url https://source.example.com
n8n-cli config set-api-key <your-api-key>

n8n-cli package export --workflow-id=<workflow-id> --output=triage.n8np
```

Point it at the target instance and import the file:

```bash
n8n-cli config set-url https://target.example.com
n8n-cli config set-api-key <your-api-key>

n8n-cli package import --file=triage.n8np --project-id=<target-project-id>
```

n8n checks the whole package before it writes anything. If something would block the import, such as a workflow that uses a node type the target instance doesn't have, the command exits with a non-zero status and lists every problem it found at once.

## Read next

{% content-ref url="package-format.md" %}
[package-format.md](package-format.md)
{% endcontent-ref %}

{% content-ref url="export-a-package.md" %}
[export-a-package.md](export-a-package.md)
{% endcontent-ref %}

{% content-ref url="import-a-package.md" %}
[import-a-package.md](import-a-package.md)
{% endcontent-ref %}

{% content-ref url="how-import-works.md" %}
[how-import-works.md](how-import-works.md)
{% endcontent-ref %}

{% content-ref url="limits-and-permissions.md" %}
[limits-and-permissions.md](limits-and-permissions.md)
{% endcontent-ref %}

For other ways to move a workflow, including copy and paste and the editor's download and import options, see [Export and import](../export-and-import.md).
