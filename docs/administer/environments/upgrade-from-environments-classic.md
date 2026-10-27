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

Environments improve on and replace [Environments (Classic)](../use-source-control-and-environments/README.md), the earlier source control feature. Each instance uses one version at a time, and you can switch an instance between them while Environments are in Preview.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Which version an instance uses

- New instances with Environments available start on the new version.
- Instances already connected to Environments (Classic) stay on it until you upgrade them in **Settings** > **Environments (Classic)**.

## Start fresh with Environments

The two versions store content in Git in different formats, and they aren't compatible. Nothing migrates from Environments (Classic), and you can't apply a Classic repository with Environments. Set up environments from scratch, with a new repository or branch.

## Compare the versions

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

## Classic features Environments don't support yet

Environments don't cover everything Environments (Classic) does yet. Check these before you upgrade:

- **Personal projects:** Classic includes them. Environments promote team projects only.
- **Project admins:** in Classic, project admins can push. In Environments, only instance owners and instance admins can promote and apply.
- **Auto publish:** Classic can publish workflows when you pull. Apply doesn't change whether a workflow is published.

For everything Environments don't support yet, see [Known limitations](known-limitations.md).

## Upgrade an instance

1. Go to **Settings** > **Environments (Classic)**.
2. Select **Upgrade**, then confirm.
3. [Set up environments](set-up-environments.md).

Try this on a test instance first. Your Classic setup stays connected in the background, so you can switch back.

## Switch back to Environments (Classic)

1. Go to **Settings** > **Environments**.
2. Select **Switch back**, then confirm.

Switching affects only this instance. You can upgrade again at any time.

## Things to check when you switch

- **Protected instance** is one setting for both versions. Changing it in one version changes it in the other.
- Switching only changes what the UI shows. The public API and CLI commands of the other version still work, so stop any CI pipelines that call them.

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
