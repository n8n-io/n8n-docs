---
title: Import and export
description: Move workflows and their dependencies between n8n instances using portable packages.
contentType: overview
hide:
  - toc
---

# Import and export

/// note | Proposed feature
Import and export packages are a proposed feature. The behaviour, endpoints, option names, and defaults on this page come from a draft design and aren't final. Don't rely on them in production yet. Sections marked **Draft** may still change.
///

n8n uses **packages** to move entities between instances. A package is a single, portable snapshot that contains n8n assets along with a manifest of everything those assets depend on. You export a package from one instance and import it into another.

A package is similar to an [npm](https://www.npmjs.com/){:target="_blank" .external-link} package: it bundles content together with a description of its requirements, so the target instance can check whether it can use the package before it imports anything.

You can use packages to:

- Back up part of an instance and restore it elsewhere.
- Promote work between environments, for example from staging to production.
- Share workflows, folders, or projects with other people.
- Bootstrap a new instance from files, without opening the editor.

## Package variants

A package always uses the same structure, but it comes in three variants that behave differently on import:

- **Workflow package**: one or more workflows, with their dependencies.
- **Folder package**: one or more folders, including all of their children.
- **Project package**: one or more projects.

/// info | This section covers workflow packages
The pages in this section document the **workflow package** only. Folder and project packages use the same format but add their own import behaviour, which isn't documented yet.
///

## What import and export isn't

- It isn't a full instance backup. A package doesn't carry execution history or audit data. At most, you can use it to set up a clean instance, not to restore one byte-for-byte.
- It isn't the way AI tools connect to n8n. Tools like agents connect through [MCP](/advanced-ai/index.md) and the [public API](/api/index.md) directly.

## How you use it

Import and export are public API operations. You call the API directly, or through a client such as the [n8n CLI](/api/n8n-cli/index.md), which calls the same endpoints. Every operation runs as the authenticated user and respects that user's roles and permissions.

In this section:

- [Move a workflow between instances](/import-export/move-a-workflow.md): A worked example, from export to import.
- [The package format](/import-export/packages.md): What's inside a package, and how n8n decides whether it can import a package.
- [Export a workflow package](/import-export/export-packages.md): Create a package from one or more workflows.
- [Import a workflow package](/import-export/import-packages.md): Import a package and control where its contents land.
- [Resolve dependencies on import](/import-export/resolve-dependencies.md): Control how n8n matches credentials, variables, sub-workflows, and data tables.
- [Options at a glance](/import-export/options.md): A scannable index of every export and import option.

Related sections:

- [Source control and environments](/source-control-environments/index.md): Git-based syncing between instances.
- [Variables](/code/variables.md): reusable values.
- [Data tables](/data/data-tables.md): structured tables scoped to a project.
