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

Workflows can use resources from outside their project: sub-workflows from another team project, and credentials that another project owns and shares with them. Data tables and project variables always belong to one project.

- **Sub-workflows from another project:** a project promote only references them, so they must already exist on the target instance.
- **Credentials owned by another project:** a project promote includes them, but a project apply can only use them if they already exist on the target instance and are shared with the project you apply to. If they're missing, Apply blocks, and you can't create them from **Blockers**.

**Workaround:** promote and apply the project that owns the shared resources first, or use an instance promote and instance apply, which include every team project. An instance apply overwrites every team project on the target, so see [Instance apply](apply-changes.md#instance-apply) first. Credentials owned by a personal project never travel. Move them to a team project on the source instance before you promote.

## Moving workflows and folders between projects

A project promote or project apply can't move workflows or folders from one project to another. Moves within a project work.

**Workaround:** use an instance promote and instance apply. They move the existing workflows and folders on the target instance to the project that the branch holds them in, so they keep their ID, version history, and executions there. An instance apply overwrites every team project on the target, so see [Instance apply](apply-changes.md#instance-apply) first.

## Project-specific environments

Environments currently cover the whole instance. Environments for individual projects are planned.

## Roles that can use Environments

Currently, only instance owners and instance admins can set up environments, promote, apply, and review promotions. Support for project roles is planned.

## Supported Git providers

Environments currently have two provider types: Generic Git and GitLab. Dedicated GitHub and Bitbucket providers are planned.

**Workaround:** connect GitHub, Bitbucket, and other Git hosts with [Generic Git](git-based-promotion/generic-git.md). Promotion reviews aren't available there yet.

## Agent support

Promote and apply don't include agents yet. Support is in development.

## Personal projects

Promote and apply cover team projects only.

**Workaround:** move the workflows you want to promote to a team project.

## Workflow descriptions

Promote doesn't include a workflow's description.

**Workaround:** update the description on the target instance.

## Updating an open promotion review

n8n can't push changes to an open promotion review. For example, if a reviewer requests changes on GitLab, a new promote can't add them to the review. Pushing changes to an open promotion review from n8n is planned.

**Workaround:** close the merge request on GitLab, open **Reviews** so n8n picks up the closed status, then promote again to open a new review. n8n can't close a review itself yet.

## Feature branch names

n8n names feature branches `n8n-promotion/<timestamp>`. You can't choose the name yet. Custom branch names are planned.

## Promotion review status

n8n updates the status of promotion reviews from the Git host when you open the **Reviews** inbox. Changes on the Git host don't appear in n8n until then.

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
- [Upgrade from Environments (Classic)](upgrade-from-environments-classic.md)
