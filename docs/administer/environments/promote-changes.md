---
description: Promote changes from a project or from a whole n8n instance to the environment the instance promotes changes to.
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

## Project promote

A project promote sends the changes you select from one team project.

1. Open a team project. If it has changes to promote, a badge with an up arrow and the number of changes appears next to the project name.
2. Select the badge. The **Changes to promote** page opens.
3. Select the workflows to promote. n8n includes their dependencies, such as credentials, variables, data tables, and tags. Sub-workflows from other projects are only referenced, not included. To promote a project without workflows, such as an empty project, select the project itself.
4. Inspect the changes. Each resource shows what changed, such as **New**, **Modified**, **Renamed**, **Moved**, **Archived**, or **Deleted**. To compare a workflow visually, select **Show diff**. The diff viewer shows the canvas **Before** and **After**, where **Before** is the environment's branch and **After** is this instance.
5. Select **Promote N changes**.
6. Optional: enter a **Commit message**. If you leave it empty, n8n generates one.
7. Select **Promote**.

If you edit a workflow while the page is open, select **Refresh** before you promote so the page shows your latest changes.

Promoting a workflow marked **Deleted** removes it from the branch, and applying deletes it on the target instance. An archived workflow stays archived.

## Instance promote

An instance promote sends every team project and overwrites the project content on the branch to match the instance. Personal projects aren't included.

1. Go to **Settings** > **Environments**.
2. On the environment under **Promote changes to**, select **Promote**.
3. Optional: enter a **Commit message**. If you leave it empty, n8n generates one.
4. Select **Promote**.

## Where the changes go

The environment's settings decide what n8n does with the changes:

- **Direct:** n8n commits to the environment's branch.
- **Feature branch:** n8n pushes a feature branch named `n8n-promotion/<timestamp>`, based on the environment's branch. Someone merges it on the Git host.
- **Feature branch with a promotion review:** n8n also opens a promotion review. With GitLab, that's a merge request. See [Promotion reviews](promotion-reviews.md).

n8n sets the commit author to your n8n name and email. The Git host records the push, and any merge request, under the provider's account or token.

## What blocks a promote

### A review is open

While a promotion review for a project is open, you can't promote that project again. This prevents merge conflicts between reviews. Approve or close the review first. See [Promotion reviews](promotion-reviews.md).

### Workflows moved to another project

A project promote can't move workflows between projects. n8n shows: **These workflows moved to another project**. Run an instance promote instead.

### Workflows the export doesn't include

A project promote doesn't include sub-workflows from other projects. It only references them, and the promote isn't blocked. The sub-workflow must already exist on the target instance, so promote the project that owns it first. Otherwise the reference points nowhere, and publishing the calling workflow on the target can fail.

An instance promote fails if a workflow references a workflow outside the team projects, for example a sub-workflow or error workflow in a personal project, or a deleted workflow. n8n shows **workflow dependencies not included in the package. Export aborted.** Move the referenced workflow into a team project, or remove the reference, then promote again.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
