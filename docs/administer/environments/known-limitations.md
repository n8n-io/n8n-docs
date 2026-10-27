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

Environments are in Preview, and n8n is actively improving and extending them. Many of these limitations are temporary. Each entry names a workaround where one exists.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Cross-project dependencies

A project promote includes what its workflows use, but not sub-workflows from other projects. It only references them, so they must already exist on the target instance. This affects setups like a shared utility project whose sub-workflows many other projects call.

**Workaround:** promote and apply the shared project first, or use an instance promote and instance apply, which include every team project and the dependencies between them. An instance promote fails if a workflow references a workflow in a personal project. Move that workflow into a team project first.

## Moving workflows and folders between projects

A project promote or project apply can't move workflows or folders from one project to another. Moves within a project work.

**Workaround:** use an instance promote and instance apply. They move workflows and folders to the project that the branch holds them in, and keep their ID, version history, and executions.

## Environments for individual projects

Environments currently cover the whole instance. Environments for individual projects are planned.

## Roles

Currently, only instance owners and instance admins can set up environments, promote, apply, and review promotions. Support for project roles is planned.

## Git providers

Environments currently support Generic Git and GitLab. Support for GitHub and Bitbucket is planned.

**Workaround:** connect GitHub, Bitbucket, and other Git hosts with [Generic Git](git-based-promotion/generic-git.md). Promotion reviews aren't available there yet.

## Agents

Promote and apply don't include agents yet. Support is in development.

## Personal projects

Promote and apply cover team projects only.

**Workaround:** move the workflows you want to promote to a team project.

## Workflow descriptions

Promote doesn't include a workflow's description.

**Workaround:** update the description on the target instance.

## Updating an open promotion review

You can't add changes to a promotion review after n8n opens it.

**Workaround:** approve or close the review, then promote again to open a new one.

## Promotion review status

n8n updates the status of promotion reviews from the Git host when you open **Reviews**. Changes on the Git host don't appear in n8n until then.

## GitLab approval rules

n8n opens and approves merge requests with the same GitLab token. GitLab approval rules that stop authors from approving their own merge requests block **Approve and merge**.

**Workaround:** adjust the approval rules, or merge on GitLab. See [Promotion reviews](promotion-reviews.md#n8n-acts-as-the-tokens-user).

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
