---
description: Move workflows and their dependencies between n8n instances with environments, and review changes before they reach production.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Environments

Environments let you move workflows between n8n instances, for example from a development instance to a production instance. You promote changes from one instance to an environment, then apply them from that environment to another instance.

{% hint style="info" %}
**Feature availability**

Environments are available on:

- **n8n Cloud:** TODO(OPEN-2): confirm plans.
- **Self-hosted:** TODO(OPEN-2): confirm plans.

Only instance owners and instance admins can set up environments, promote, apply, and review promotions.
{% endhint %}

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## How environments work

![Changes move from a development instance through an optional review to the Production environment, then to production](../.gitbook/assets/environments-how-it-works.png)

A developer builds workflows on a development instance and promotes them to the Production environment. With Git-based promotion, that's a commit to a Git branch. If the environment requires a promotion review, someone approves the changes first. The production instance then applies the changes from the same environment.

## Concepts

### Promotion model

A promotion model is how changes travel between instances. n8n supports one model, Git-based promotion, where changes travel through a Git repository. Other models may follow, so the docs name the model apart from the Git providers. See [Git-based promotion](git-based-promotion/).

### Provider

A provider holds the details n8n uses to connect and authenticate to a Git host, such as an access token or an SSH key. Several environments can use the same provider. The provider type decides which extra features you get, such as listing repositories and branches, or promotion reviews with GitLab merge requests.

### Environment

An environment stands for an instance at a stage of your process, such as staging or production. Each environment has a direction:

- On the instance you promote from, the environment is where your changes go.
- On the instance you apply to, the environment is the source of truth that the instance takes changes from.

Each instance has at most one environment it promotes changes to and one it applies changes from. With Git-based promotion, an environment is a repository and branch, plus settings such as whether each promote opens a new branch or a merge request.

### Promote and apply

Promote and apply are the two promotion actions:

- **Promote** sends changes from your instance to the environment.
- **Apply** brings changes from the environment into your instance.

You can promote or apply one project, choosing the workflows to include, or the whole instance. Promoting or applying the whole instance overwrites every team project to match, and applying it deletes projects that aren't in the environment.

### What you promote

You promote workflows. n8n adds what the selected workflows use: credentials, variables, data tables, and tags. You can't promote a credential or data table on its own, and a dependency that no selected workflow uses doesn't move.

Promote and apply use [n8n packages](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages) to export and import content. To learn what Apply changes on an instance, see [Apply changes](apply-changes.md#what-apply-changes-on-the-instance).

### Promotion review

A promotion review is an optional approval step. Promoted changes reach the environment's branch only after someone approves them. Promotion reviews depend on the provider. See [Review promotions](review-promotions.md).

## Environments and Environments (Classic)

Environments replace [Environments (Classic)](../use-source-control-and-environments/), the earlier source control feature. An instance uses one or the other. See [Switch from Environments (Classic)](switch-from-environments-classic.md).

## In this section

- [Plan your environments](plan-your-environments.md): choose how your instances and environments connect.
- [Set up environments](set-up-environments.md): add providers and environments, and protect an instance.
- [Promote changes](promote-changes.md): send a project or the whole instance to an environment.
- [Apply changes](apply-changes.md): bring changes from an environment into a project or the whole instance.
- [Review promotions](review-promotions.md): approve promoted changes before they reach the environment's branch.
- [Git-based promotion](git-based-promotion/): how environments use Git, and the supported Git providers.
- [Known limitations](known-limitations.md): what Environments don't support yet, and workarounds.
- [Switch from Environments (Classic)](switch-from-environments-classic.md): compare the two versions and switch an instance.

## Related resources

- [Administer](../)
- [Set permissions and roles](../manage-users-and-access/set-permissions-and-roles-rbac/README.md)
- [n8n packages](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages)
