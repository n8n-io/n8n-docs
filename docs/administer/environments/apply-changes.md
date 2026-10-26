---
description: Apply changes from an environment to a project or to a whole n8n instance, resolve blockers, and learn what Apply changes on the instance.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Apply changes

Apply changes to bring workflows from the environment your instance applies changes from into the instance. You can apply selected workflows to one project, or make the whole instance match the environment.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

Before you start, [set up](set-up-environments.md) the environment this instance applies changes from.

## Apply workflows to a project

Applying to a project changes only the workflows you select and what they use. It never deletes projects.

1. Open a team project. If the environment has changes for it, a badge with the number of incoming changes appears next to the project name.
2. Select the badge. The **Changes to apply** page opens.
3. Select the workflows to apply. n8n selects the credentials, variables, data tables, and tags they use.
4. Review the changes. Select **Show diff** on a workflow to compare the canvas **Before** and **After**. **Before** is this instance.
5. Check the **Blockers** tab and resolve any blockers. See [Resolve blockers](#resolve-blockers).
6. Select **Apply N changes**, then confirm.

## Apply to the whole instance

{% hint style="danger" %}
Applying to the whole instance overwrites every project to match the environment's branch. It deletes projects and content that aren't on the branch. You can't undo this.
{% endhint %}

Use this to bring an instance fully in line with its environment, for example a new production instance. For day-to-day changes, apply to a project instead. Before you apply to the whole instance, back up the instance or try the apply on a test instance first.

1. Go to **Settings** > **Environments**.
2. On the environment under **Apply changes from**, select **Apply**.
3. Read the warning and select **Apply**.
4. If n8n asks you to resolve blockers or review destructive changes, follow the dialog. To delete projects that aren't on the branch, confirm **Delete N projects and apply**.

## Resolve blockers

Before Apply writes anything, n8n checks the changes against the instance. A blocker stops Apply until you resolve it. Apply changes nothing while blockers remain.

| Blocker | What to do |
|---|---|
| **Missing** credential or variable | Select **Add credential** or **Add variable** and create it. n8n doesn't create credentials or variables for you. |
| **No access** | The credential exists, but the project can't use it. Ask an admin to share it with the project. |
| **Conflict** | The resource differs on the instance in a way Apply can't fix. Follow the message, then refresh. |
| **Moved** | The folder or workflow is in a different place on the branch. Move it on the instance to match, or apply the whole instance. |

## Confirm destructive changes

Apply asks you to confirm before it:

- Removes or retypes data table columns. You can't restore the values in those columns. Rows and other columns stay.
- Deletes projects, when you apply to the whole instance.

## What Apply changes on the instance

Apply moves entities, such as workflows, credentials, and data table schemas. It doesn't move content, such as credential secrets or data table rows.

| Resource | What Apply does |
|---|---|
| Workflows | Creates or updates them. If you deleted a workflow on the source, Apply deletes it on the instance instead of archiving it. An archived workflow stays archived. Workflows get the published state they have on the source. If publishing fails, n8n reports it without failing the apply. |
| Credentials | Links workflows to a credential with the same ID. The credential must exist on the instance, or you create it while you resolve blockers. Credential secrets never move. TODO(OPEN-22): confirm whether Apply overwrites existing credential values. |
| Variables | The variable must exist on the instance. Apply keeps its existing value. |
| Data tables | Creates or updates the schema. Rows never move. |
| Tags | Creates or renames tags. All projects on an instance share tags, so a rename applies in every project. |

Promote and apply use [n8n packages](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages) to export and import this content.

## If Apply doesn't finish

- **Apply paused:** the branch changed after you loaded the changes. Nothing changed. Start Apply again.
- **Couldn't apply:** some changes may already be on the instance, and n8n doesn't roll them back. Check the instance before you try again.
- **Could not be published:** Apply finished, but some workflows didn't publish, for example because a credential is missing. Fix them and publish them on the instance.

## Related resources

- [Environments](./)
- [Promote changes](promote-changes.md)
- [Set up environments](set-up-environments.md)
- [Known limitations](known-limitations.md)
