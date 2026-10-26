---
description: Compare Environments with Environments (Classic), and switch an n8n instance between the two versions.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Switch from Environments (Classic)

Environments replace [Environments (Classic)](../use-source-control-and-environments/), the earlier source control feature. Each instance uses one version at a time. You can switch an instance between them while Environments are in Preview.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Which version an instance uses

- New instances start with Environments.
- Instances already connected to Environments (Classic) stay on it until you switch.

## Compare the versions

| | Environments (Classic) | Environments |
|---|---|---|
| Model | The instance pushes to and pulls from one branch. | The instance promotes to one environment and applies from another. Each can use a different repository and branch. |
| Git hosts | Any Git host over SSH or HTTPS. | Any Git host through Generic Git, and GitLab with repository lists and merge requests. |
| Reviews | On the Git host. | Promotion reviews in n8n, with GitLab. |
| Selecting changes | You choose what to push. Pull brings in everything. | You choose workflows in both directions, per project, or promote and apply the whole instance. |
| Dependencies | You select them. | n8n adds what the selected workflows use. |
| Before changes land | Pull overwrites local changes. | Apply checks for blockers first and asks you to confirm destructive changes. |
| Credentials | Stubs. | References to credentials that must exist on the target, or that you create during Apply. |
| Who can use it | Instance owners and admins. Project admins can push. | Instance owners and admins. |
| Personal projects | Included. | Not included. |

## What doesn't carry over

Nothing migrates from Environments (Classic). The two versions store content in different formats, so set up environments from scratch. Use a new repository or branch for Environments.

## Upgrade an instance

1. Go to **Settings** > **Environments (Classic)**.
2. Select **Upgrade**, then confirm.
3. [Set up environments](set-up-environments.md).

Try this on a test instance first. Your Classic setup stays connected in the background, so you can switch back.

## Switch back

1. Go to **Settings** > **Environments**.
2. Select **Switch back**, then confirm.

Switching affects only this instance. You can upgrade again at any time.

## Things to check when you switch

- **Protected instance** is one setting for both versions. Changing it in one version changes it in the other.
- Switching only changes what the UI shows. The public API and CLI commands of the other version still work, so stop any CI pipelines that call them.

## Related resources

- [Environments](./)
- [Set up environments](set-up-environments.md)
- [Environments (Classic)](../use-source-control-and-environments/)
