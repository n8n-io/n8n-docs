---
description: Compare Environments with Environments (Classic), upgrade an n8n instance, and switch back if needed.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Upgrade from Environments (Classic)

Environments improve on and replace [Environments (Classic)](../use-source-control-and-environments/README.md), the earlier source control feature. Each instance uses either Classic or Environments, and you can switch back to Classic while Environments are in Preview.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Which one an instance uses

- New instances with Environments available start on Environments.
- Instances already connected to Environments (Classic) stay on Classic until you upgrade them in **Settings** > **Environments (Classic)**.

## What stays and what starts over

Upgrading doesn't change the workflows, credentials, variables, or data on your instances. Only the Git side starts over: Classic and Environments store content in Git in different formats, so you can't apply a Classic repository with Environments. Set up environments with a new repository or branch.

## Compare Classic and Environments

| | Environments (Classic) | Environments |
|---|---|---|
| Model | The instance pushes to and pulls from one branch. | The instance promotes to one environment and applies from another. Each can use its own repository and branch. |
| Git hosts | Any Git host over SSH or HTTPS. | Any Git host through Generic Git, as in Classic. GitLab adds repository and branch lists, and promotion reviews. |
| Reviews | Manually on the Git host. | Promotion reviews in n8n with a visual diff, based on merge requests that n8n opens on GitLab. |
| Selecting changes | You choose what to push. Pull brings in everything. | You choose changes in both directions with a project promote or project apply, or move everything with an instance promote or instance apply. |
| Dependencies | You select workflows and data tables. n8n adds tags, and credential and variable stubs. | n8n includes what the selected workflows use. |
| Before changes land | Pull can overwrite local changes after you confirm. | Apply checks for blockers first and asks you to confirm destructive changes. |
| Credentials | Stubs without values. | Must exist on the target, or you create them during Apply, with expression values pre-filled. |
| Who can use it | Instance owners and admins. Project admins can push. | Instance owners and admins. |
| Personal projects | Included. | Not included. |
| Automation | Source control endpoints in the public API. | Separate promotion endpoints in the public API. Classic's endpoints don't work with Environments. |

## Classic features Environments don't support yet

Environments don't cover everything Environments (Classic) does yet. Check these before you upgrade:

- **Personal projects:** Classic includes them. Environments promote team projects only.
- **Project admins:** in Classic, project admins can push. In Environments, only instance owners and instance admins can promote and apply.
- **Auto publish:** Classic can publish workflows when you pull. Apply doesn't change whether a workflow is published.
- **Instance color:** Classic lets you set a color for the instance. Environments don't have this setting.

For everything Environments don't support yet, see [Known limitations](known-limitations.md).

## Upgrade your instances

Before you upgrade, stop or switch any CI pipelines that call the Classic endpoints of the public API. They keep working after the upgrade, because upgrading only changes what the UI shows.

Upgrade the source instance first, then the target:

1. On the source instance, go to **Settings** > **Environments (Classic)**, select **Upgrade**, and confirm.
2. Set up the environment it promotes changes to, and promote. See [First promote and apply](set-up-environments.md#first-promote-and-apply).
3. On the target instance, upgrade the same way, set up the environment it applies changes from, and apply.

Try this on test instances first. Your Classic setup stays connected in the background, so you can switch back.

## Upgrade an instance that Classic pulled to

{% hint style="warning" %}
Projects that Classic created on a target instance, such as production, have different IDs from the matching projects on the source instance. Apply matches projects by ID, so the first instance apply lists those projects under **Projects to delete** and creates the source's projects next to them.
{% endhint %}

Before you confirm, check every project under **Projects to delete**. Don't delete projects you still need. Try the upgrade on a copy of the target instance first. n8n is working on a smoother upgrade path for this case.

## Switch back to Environments (Classic)

1. Go to **Settings** > **Environments**.
2. Select **Switch back**, then confirm.

Switching back affects only this instance. You can upgrade again at any time.

## Things to check after you upgrade

- **Protected instance** is one setting for Classic and Environments. Changing it in one changes it in the other.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Environments (Classic)](../use-source-control-and-environments/README.md)
