---
description: Promote workflows from a project, or every project on an n8n instance, to the environment the instance promotes changes to.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Promote changes

Promote changes to send workflows from your instance to the environment it promotes changes to. You can promote selected workflows from one project, or every project on the instance.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

Before you start, [set up the environment](set-up-environments.md) this instance promotes changes to.

## Promote workflows from a project

1. Open a team project. If it has changes to promote, a badge with the number of changes appears next to the project name.
2. Select the badge. The **Changes to promote** page opens.
3. Select the workflows to promote. n8n selects the credentials, variables, data tables, and tags they use.
4. Review the changes. Select **Show diff** on a workflow to compare the canvas **Before** and **After**. **Before** is the environment's branch.
5. Select **Promote N changes**.
6. Optional: enter a **Commit message**. If you leave it empty, n8n generates one.
7. Select **Promote**.

If you edit a workflow while the page is open, select **Refresh** before you promote so the page shows your latest changes.

### Change labels

| Label | Meaning |
|---|---|
| **New** | The workflow isn't on the branch yet. |
| **Modified** | The workflow, or something it uses, changed. |
| **Renamed** | The workflow has a new name. |
| **Moved** | The workflow is in a different folder. |
| **Archived** | You archived the workflow. It stays archived on the branch. |
| **Deleted** | You deleted the workflow. Promoting removes it from the branch, and applying deletes it on the target instance. |

## Promote the whole instance

Promoting the whole instance sends every team project and overwrites the project content on the branch to match the instance. Personal projects aren't included.

1. Go to **Settings** > **Environments**.
2. On the environment under **Promote changes to**, select **Promote**.
3. Optional: enter a **Commit message**. If you leave it empty, n8n generates one.
4. Select **Promote**.

## Where the changes go

The environment's settings decide what n8n does with the changes:

- **Direct:** n8n commits to the environment's branch.
- **New branch:** n8n pushes a new branch named `n8n-promotion/<timestamp>`, based on the environment's branch. Someone merges it on the Git host.
- **New branch with a promotion review:** n8n also opens a promotion review. With GitLab, that's a merge request. See [Review promotions](review-promotions.md).

n8n uses your n8n name and email as the commit author.

## When you can't promote

### A review is open

While a promotion review for a project is open, you can't promote that project again. Approve or close the review first. See [Review promotions](review-promotions.md).

### Workflows moved to another project

A project promote can't move workflows between projects. n8n shows: **These workflows moved to another project**. Promote the whole instance instead.

### Sub-workflows outside the promoted projects

A project promote lists sub-workflows from other projects but doesn't promote them. Promote the project that owns the sub-workflow first.

A whole-instance promote fails if a workflow calls a sub-workflow in a personal project, with the message **workflow dependencies not included in the package. Export aborted.** Move the sub-workflow into a team project, then promote again.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Apply changes](apply-changes.md)
- [Review promotions](review-promotions.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
