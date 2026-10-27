---
description: What Environments don't support yet during the Preview, and how to work around each limitation.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Known limitations

This page lists what Environments don't support yet, with workarounds where they exist. n8n updates it as it removes limitations.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Scope and access

### Only instance owners and admins

Only instance owners and instance admins can set up environments, promote, apply, and review promotions. Other roles, including project admins, can't do any of these.

### Environments apply to the whole instance

Each instance has at most one environment it promotes changes to and one it applies changes from, and they cover all team projects. You can't give a project its own environment.

### Personal projects aren't promoted

Promote covers team projects only. To promote a workflow, move it to a team project first.

### Agents aren't promoted

Environments promote workflows and what they use. Agents don't move between instances.

## Workflows and dependencies

### Sub-workflows in other projects

A project promote doesn't include sub-workflows from other projects. It only references them, and the promote isn't blocked. The sub-workflow must already exist on the target instance, so promote the project that owns it first. Otherwise the reference points nowhere, and publishing the calling workflow on the target can fail.

An instance promote fails if a workflow references a workflow outside the team projects, such as a sub-workflow or error workflow in a personal project. Move the referenced workflow into a team project, then promote again.

### Moving workflows and folders

- A project promote can't move a workflow to another project. Run an instance promote instead.
- Apply can't move a folder or workflow that already exists on the instance. Move it on the instance to match the branch, or run an instance apply.

### Workflow descriptions don't move

Promote doesn't include the workflow description. Update it on the target instance.

### Publishing alone isn't a change

If you only publish or unpublish a workflow, n8n doesn't show it as a change to promote. Publish the workflow on the target instance, or make an edit and promote it.

## Projects

### New projects need an instance apply

A project apply only works on projects that already exist on the target instance. To create a new project there, run an instance apply, which also overwrites every other project. Run it before people work on the target instance, for example when you set it up.

### Project changes need a workflow

A project promote or project apply needs at least one selected workflow. You can't promote an empty project, or a project change such as a rename, on its own.

## Apply

### An instance apply deletes projects

An instance apply deletes projects that aren't on the branch, and everything in them. n8n lists the projects it deletes and asks you to confirm once. For day-to-day changes, use a project apply instead.

### Hidden credential values

When you save a credential that Apply imported, n8n loses the values in its hidden fields. Enter the values again before you use the credential. TODO(LIGO-1195): remove if fixed by the release.

## Promotion reviews

### Review status updates when you open Reviews

n8n updates the status of promotion reviews from the Git host when you open **Reviews**. Changes on the Git host don't appear in n8n until then.

### GitLab

- **Reviews** lists only merge requests that n8n opened.
- GitLab approval rules that stop authors from approving their own merge requests block **Approve and merge**, because n8n opens and approves with the same token.
- The changes of a review may not load once 14 days have passed since someone merged or closed its merge request.

See [GitLab](git-based-promotion/gitlab.md#promotion-reviews-with-merge-requests).

## Self-hosted n8n

### Multi-main setups

In multi-main setups, n8n doesn't coordinate Git operations between main instances yet. Don't promote or apply from two places at the same time.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
