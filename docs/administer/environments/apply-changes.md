---
description: Apply changes from an environment to a project or to a whole n8n instance, resolve blockers, and see how Apply affects the instance.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Apply changes

Applying changes brings your work from an environment into your instance. A project apply brings selected changes into one team project. An instance apply makes the whole instance match the environment.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

Before you start, [set up the environment](set-up-environments.md) this instance applies changes from.

## Project apply

A project apply brings the changes you select into one team project. If the project isn't on the instance yet, Apply creates it. A project apply never deletes projects. All projects on an instance share tags, so a tag rename applies in every project.

1. Open a team project. Next to the project name, a badge with a down arrow shows the number of incoming changes.
2. Select the badge. The **Changes to apply** page opens.
3. Select the workflows to apply. n8n includes their dependencies, such as credentials, variables, data tables, and tags. To apply a project without workflows, such as an empty project, select the project itself. TODO(LIGO-1367): confirm the UI steps for a project that isn't on the instance yet.
4. Inspect the changes. Each resource shows what changed, such as **New**, **Modified**, **Renamed**, **Moved**, **Archived**, or **Deleted**. To compare a workflow visually, select **Show diff**. The diff viewer shows the canvas **Before** and **After**, where **Before** is this instance and **After** is the environment's branch.
5. Check the **Blockers** tab and resolve any blockers. See [Resolve blockers](#resolve-blockers).
6. Select **Apply N changes**, then confirm.

## Resolve blockers

Before Apply writes anything, n8n checks the changes against the instance. This happens for both project and instance applies. A blocker stops Apply until you resolve it, and Apply changes nothing while blockers remain.

| Blocker | What to do |
|---|---|
| **Missing** credential or variable | Select **Add credential** or **Add variable** and create it. For a credential, n8n pre-fills the fields that use expressions on the source. |
| **No access** | The credential exists, but the project can't use it. Ask an admin to share it with the project. |
| **Conflict** | The resource differs on the instance in a way Apply can't fix. Follow the message, then refresh. |
| **Moved** | The workflow or folder is in another project on the branch. A project apply can't move items between projects. Move it on the instance to match the branch, or run an instance apply. |

## Confirm destructive changes

Apply asks you to confirm before it:

- Removes or retypes data table columns. This deletes the values in those columns. Rows and other columns stay.
- Deletes projects, in an instance apply.

## Instance apply

{% hint style="danger" %}
An instance apply overwrites every project to match the environment's branch. It deletes projects and content that aren't on the branch. You can't undo this.
{% endhint %}

Use an instance apply to bring an instance fully in line with its environment, for example to seed a new production instance. For day-to-day changes, n8n recommends a project apply, which gives you finer control.

1. Go to **Settings** > **Environments**.
2. On the environment under **Apply changes from**, select **Apply**.
3. Read the warning and select **Apply**.
4. If n8n finds blockers or destructive changes, it opens a dialog. Resolve the blockers, review the changes, and confirm. To delete projects that aren't on the branch, confirm **Delete N projects and apply**.

## What Apply changes on the instance

Apply brings over the structure of your work, such as workflows, folders, and data table schemas. It doesn't bring over stored content, such as literal credential secrets or data table rows. Agents aren't included yet.

| Resource | What Apply does |
|---|---|
| Projects | An instance apply creates projects that are on the branch and, after you confirm, deletes projects that aren't. A project apply creates the project if it isn't on the instance yet, and never deletes projects. |
| Folders | Creates, renames, and moves folders to match the branch. |
| Workflows | Creates or updates them. If you deleted a workflow on the source, Apply deletes it on the instance instead of archiving it. An archived workflow stays archived. Apply doesn't change whether a workflow is published. Publish or unpublish workflows on each instance. |
| Credentials | Links workflows to the credential with the same ID. If it's missing, you create it while you resolve blockers. If it exists and belongs to the project you apply to, Apply updates its name and the fields that use expressions, and keeps every other value, such as secrets. |
| Variables | The variable must exist on the instance. Apply keeps its existing value. |
| Data tables | Creates tables or updates their schema. Existing rows stay. Removing or retyping a column deletes only that column's values, after you confirm. |
| Tags | Creates tags and renames them to match the branch. Apply never deletes tags. |

Promote and apply use [n8n packages](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages) to export and import this content.

## If Apply stops

### The branch changed

If someone changes the environment's branch after you load the changes, Apply stops before it writes anything. A project apply shows **The branch changed after the page loaded, so Apply didn't change anything.** An instance apply shows **Apply paused**. Check the latest changes, then apply again.

### Couldn't apply

If an instance apply fails, n8n shows **Couldn't apply to the instance** and **Some changes may already be applied**. n8n doesn't roll back the changes it already made. Apply makes the instance match the branch, so you can run it again to finish.

If a project apply fails, n8n shows **Couldn't apply the changes** and one of these:

- **Nothing changed:** fix the cause in the message, then try again.
- **The request may have run:** the page now shows the latest changes. Check them before you apply again.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Promote changes](promote-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
