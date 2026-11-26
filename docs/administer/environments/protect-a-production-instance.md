---
description: Stop people from changing an instance that only applies changes, such as production, in the UI.
status: preview
layout:
  description:
    visible: false
---

# Protect a production instance

On instances that only apply changes, such as production, turn on **Protected instance** in **Settings** > **Environments**.

{% hint style="info" %}
**Feature availability**

Environments are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Enterprise

Environments are available from n8n 2.47.0. This page covers Environments, not [Environments (Classic)](../use-source-control-and-environments/README.md), the current default source control feature.
{% endhint %}

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances. For what Preview means, see [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed).
{% endhint %}

**Protected instance** blocks most workflow and configuration changes, while allowing the actions listed below. Use it on instances that run live workflows.

## What Protected instance blocks

- Creating, editing, renaming, moving, or deleting workflows, folders, variables, data tables, agents, and apps.
- Creating credentials and projects.
- Running workflows manually. The editor shows "This workflow can't be edited or run manually because it's on a protected instance". Published workflows still run from their triggers.
- Changing data table columns.

## What people can still do

- Edit existing credentials and variable values, and delete or move existing credentials.
- Edit and delete existing projects.
- Add, edit, and delete data table rows, and import CSV files into an existing table.
- Create missing credentials and variables while they resolve Apply blockers.
- Add missing projects from the environment they apply from.
- Publish and unpublish workflows in the workflow editor. The workflow list hides these actions.
- Promote and apply.

## Data tables on a protected instance

Promote and apply don't copy data table rows, so add data on the instance itself. You can:

- Add and edit rows in the data table UI.
- Write rows from a published workflow with the [**Data table node**](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.datatable), when the workflow runs from its trigger.
- Use the public API.

You can't create a data table or change its columns in the UI. A promote only includes data tables that a promoted workflow or agent references by ID. Create or change the table on the source instance, promote a workflow that uses it, then apply it on the protected instance. Removing columns or changing column types needs confirmation on Apply.

## The public API

Protected instance also blocks manual runs, data table schema changes, and MCP write tools in the backend. The public API still allows most resource changes, including data table schemas, and promotions. The exception is `POST /api/v1/source-control/push`, which it blocks. Use API key scopes and roles to control who can change what through the API.

## Environments (Classic)

Environments (Classic) uses the same setting. Turning it on or off changes it for both. In Classic, a protected instance blocks push in the UI and the API, and allows pull. Disconnecting Git in Classic turns Protected instance off.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Your first promotion](first-promotion.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Upgrade from Environments (Classic)](upgrade-from-environments-classic.md)
