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

- New instances with Environments available start on Environments.
- Instances already connected to Environments (Classic) stay on Classic until you upgrade them in **Settings** > **Environments (Classic)**.
- Environments are available on every plan that includes Environments (Classic), so every instance on Classic can upgrade.

## What stays and what starts over

Upgrading doesn't change the workflows, credentials, variables, or data on your instances. Only the Git side starts over: Classic and Environments store content in Git in different formats, so you can't apply a Classic repository with Environments. Set up environments with a new repository or branch.

## Compare Classic and Environments

| | Environments (Classic) | Environments |
|---|---|---|
| Model | The instance pushes to and pulls from one branch. | The instance promotes to one environment and applies from another. Each can use its own repository and branch. |
| Git hosts | Any Git host over SSH or HTTPS. | Any Git host through Generic Git, as in Classic. GitLab adds repository and branch lists, and promotion reviews. |
| Reviews | Manually on the Git host. | Promotion reviews in n8n with a visual diff, based on merge requests that n8n opens on GitLab. |
| Selecting changes | You choose what to push. Pull brings in everything. | You choose changes in both directions with a project promote or project apply, or move all team projects with an instance promote or instance apply. |
| Dependencies | You select workflows, credentials, and data tables. n8n adds tags and variable stubs. | n8n includes what the selected workflows use. |
| Before changes land | Pull can overwrite local changes after you confirm. | Apply checks for blockers first and asks you to confirm destructive changes. |
| Credentials | Stubs without values. | Must exist on the target, or you create them during Apply, with expression values pre-filled. |
| Variables | Stubs without values. | Written to the repository with their values. Must exist on the target, or you create them during Apply, with the value pre-filled. |
| Who can use it | Instance owners and admins. Project admins can push. | Instance owners and admins. |
| Personal projects | Included. | Not included. |
| Automation | Source control endpoints in the public API, and a pull command in the n8n CLI. | Promotion endpoints in the public API, and promotion commands in the n8n CLI. Classic's endpoints and commands don't work with Environments. |

## Classic features Environments don't support yet

Environments don't cover everything Environments (Classic) does yet. Check these before you upgrade:

- **Personal projects:** Classic includes them. Environments promote team projects only.
- **Project admins:** in Classic, project admins can push. In Environments, only instance owners and instance admins can promote and apply.
- **Auto publish:** Classic can publish workflows when you pull. Apply doesn't change whether a workflow is published.
- **Instance color:** Classic lets you set a color for the instance. Environments don't have this setting.
- **Credentials and data tables on their own:** Classic can push a credential or data table by itself. Environments promote them only as dependencies of a workflow.
- **Workflow descriptions:** Classic syncs them. Environments don't.
- **Credential settings:** Classic syncs whether a credential is shared with all users and projects, and whether each user connects their own account to it. Environments don't, so set these on the target instance.

For everything Environments don't support yet, see [Known limitations](known-limitations.md).

## Upgrade your instances

Before you upgrade, stop or switch any CI pipelines that call the Classic endpoints of the public API. Upgrading only changes what the UI shows, so those endpoints keep running Classic push and pull. Switch them to the promotion endpoints.

Upgrade the source instance first, then the target:

1. On the source instance, go to **Settings** > **Environments (Classic)**, select **Upgrade**, and confirm.
2. Set up the environment it promotes changes to, and promote. See [First promote and apply](set-up-environments.md#first-promote-and-apply).
3. On the target instance, upgrade the same way, set up the environment it applies changes from, and apply.

Try this on test instances first. Your Classic setup stays connected in the background, so you can switch back.

## What happens to the content on the target instance

Classic pull keeps the source's IDs for team projects, workflows, credentials, variables, and data tables. Apply matches projects, workflows, credentials, and data tables by ID too, so on a target instance that Classic pulled to, the first instance apply updates them in place. Workflows keep their version history and executions. Existing variables keep their values, and existing credentials keep their secrets.

{% hint style="warning" %}
Projects that someone created by hand on the target instance have different IDs from the projects with the same name on the source. The first instance apply creates the source's projects next to them and lists the hand-made ones under **Projects to delete**. Check that list before you confirm. You can't undo the deletion, so first move the workflows you still need into a project that stays.
{% endhint %}

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
