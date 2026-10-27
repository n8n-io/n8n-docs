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

### Moving workflows and folders between projects

Promote and apply can't move workflows or folders from one project to another. Moves within a project work.

### Workflow descriptions don't move

Promote doesn't include the workflow description. Update it on the target instance.

## Apply

### An instance apply deletes projects

An instance apply deletes projects that aren't on the branch, and everything in them. n8n lists the projects it deletes and asks you to confirm once. For day-to-day changes, use a project apply instead.

## Promotion reviews

### Review status updates when you open Reviews

n8n updates the status of promotion reviews from the Git host when you open **Reviews**. Changes on the Git host don't appear in n8n until then.

### GitLab approval rules

n8n opens and approves merge requests with the same GitLab token. GitLab approval rules that stop authors from approving their own merge requests block **Approve and merge**. See [Promotion reviews](promotion-reviews.md#n8n-acts-as-the-tokens-user).

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
