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

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.

Environments are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Enterprise

Environments are available from n8n 2.47.0. This page covers Environments, not [Environments (Classic)](../use-source-control-and-environments/README.md), the current default source control feature.
{% endhint %}

**Protected instance** makes an instance read-only in the n8n UI, so changes only arrive by apply (or pull, in Environments (Classic)). Use it on instances that run live workflows.

## What Protected instance blocks

In the UI, it stops people from doing these things:

- Edit workflows, or create workflows, credentials, projects, folders, variables, or data tables.
- Run workflows manually. The editor shows "This workflow can't be edited or run manually because it's on a protected instance". Published workflows still run from their triggers.
- Change data table columns.

## What people can still do

- Edit existing credentials, variable values, and data table rows.
- Add rows to an existing data table.
- Create missing credentials and variables while they resolve Apply blockers.
- Add missing projects from the environment they apply from.
- Publish and unpublish workflows.
- Promote and apply.

## Data tables on a protected instance

Data table rows aren't part of a promote or apply, so you add data on the instance itself. On a protected instance you can:

- Add and edit rows in the data table UI.
- Write rows from a published workflow with the [Data table node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.datatable), which runs from its trigger.
- Use the public API.

You can't create a data table or change its columns in the UI. Create or change the table on the source instance and promote it, then apply it on the protected instance.

## Protection applies to the UI

Protected instance doesn't block the public API, so it still allows most other changes. Use API key scopes and roles to control who can change what through the API.

Environments (Classic) uses the same setting. Turning it on or off changes it for both.

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
