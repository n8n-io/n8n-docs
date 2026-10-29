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

## Which version an instance uses

- Environments are available on Enterprise plans. Other plans keep Environments (Classic).
- Instances connected to Environments (Classic) stay on Classic until you upgrade them in **Settings** > **Environments (Classic)**.
- Every other instance starts on Environments.

## What stays and what starts over

Upgrading doesn't change the workflows, credentials, variables, or data on your instances. Only the Git side starts over: Classic and Environments store content in Git in different formats, so Apply can't read what Classic pushed. While Environments can technically share a repository with Classic content, n8n recommends a new or empty repository or branch.

## Compare Classic and Environments

| | Environments (Classic) | Environments |
|---|---|---|
| Model | The instance pushes to and pulls from one branch. | The instance promotes to one environment and applies from another. Each can use its own repository and branch. |
| Git hosts | Any Git host over SSH or HTTPS. | Any Git host through Generic Git, as in Classic. GitLab adds repository and branch lists, and promotion reviews. |
| Reviews | Manually on the Git host. | Promotion reviews in n8n with a visual diff, based on merge requests that n8n opens on GitLab. |
| Selecting changes | You choose what to push. Pull brings in everything. | You choose changes in both directions with a project promote or project apply, or move all team projects with an instance promote or instance apply. |
| Dependencies | You select workflows, credentials, and data tables. n8n adds tags and variable stubs. | n8n includes everything the selected workflows use. Selecting dependencies yourself is planned. |
| Before changes land | Pull can overwrite local changes after you confirm. | Apply checks for blockers first and asks you to confirm destructive changes. |
| Credentials | Stubs without values. | Must exist on the target, or you create them during Apply. |
| Variables | Stubs without values. | Written to the repository with their values. Must exist on the target, or you create them during Apply. |
| Who can use it | Instance owners and admins. Project admins can push. | Instance owners and admins. Support for project admins in project promotes and project applies is planned. |
| Personal projects | Included. | Not included. |
| Automation | Source control endpoints in the public API, and a pull command in the n8n CLI. | Promotion endpoints in the public API, and promotion commands in the n8n CLI. |

## Classic features Environments don't support yet

Environments don't cover everything Environments (Classic) does yet. Check these before you upgrade:

- **Personal projects:** Classic includes them. Environments promote team projects only, and support for personal projects isn't planned.
- **Project admins:** in Classic, project admins can push. In Environments, only instance owners and instance admins can promote and apply. Support for project admins in project promotes and project applies is planned.
- **Auto publish:** Classic can publish workflows when you pull. Apply doesn't change whether a workflow is published. Auto publish is planned.
- **Instance color:** Classic lets you set a color for the instance. Environments don't have this setting.
- **Selecting dependencies:** Classic lets you push credentials and data tables on their own. Environments include every dependency of the selected workflows, and you can't select dependencies yourself. Selecting dependencies is planned.
- **Cross-project moves:** Classic pull moves workflows to the project they belong to in Git. A project promote or project apply can't move workflows or folders between projects, so use an instance promote and instance apply. See [Moving workflows and folders between projects](known-limitations.md#moving-workflows-and-folders-between-projects).
- **Workflow descriptions:** Classic syncs them. Environments don't.
- **Credential settings:** Classic syncs whether a credential is shared with all users and projects, and whether each user connects their own account to it. Environments don't, so set these options again on the target instance.

{% hint style="info" %}
Environments also have limitations that don't relate to Classic. See [Known limitations](known-limitations.md).
{% endhint %}

## Upgrade your instances

Try this on test instances first. Your Classic setup stays connected in the background, so you can switch back.

Before you upgrade, stop or switch any CI pipelines that call the Classic endpoints of the public API. Upgrading only changes what the UI shows, so those endpoints keep running Classic push and pull. Don't mix them with Environments, and switch your pipelines to the promotion endpoints. n8n plans to block the Classic endpoints on instances that use Environments.

Upgrade the source instance first, then the target:

1. On the source instance, go to **Settings** > **Environments (Classic)**, select **Upgrade**, and confirm.
2. Set up the environment it promotes changes to, and promote. See [First promote and apply](set-up-environments.md#first-promote-and-apply).
3. On the target instance, upgrade the same way, set up the environment it applies changes from, and apply. Classic pull kept the source's IDs, so the first apply updates the existing content in place. See [Apply to an instance that already has content](set-up-environments.md#apply-to-an-instance-that-already-has-content).

## Switch back to Environments (Classic)

1. Go to **Settings** > **Environments**.
2. Select **Switch back**, then confirm.

Switching back affects only this instance. You can upgrade again at any time.

## Things to check after you upgrade

- **Protected instance** is one setting for Classic and Environments. Changing it in one changes it in the other.
- Variables now go to the repository with their values. Before your first promote, move any secrets from variables into credentials.
- Classic accepts SSH repository URLs like `git@github.com:acme/n8n.git`. Environments need the `ssh://` form, such as `ssh://git@github.com/acme/n8n.git`.

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
