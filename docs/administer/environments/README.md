---
description: Move workflows and what they use through development, staging, and production environments, and review changes before they reach production.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Environments

Environments let you move your work, such as workflows and the credentials, variables, and data tables they use, through stages like development, staging, and production. You build and test changes in one environment, then promote them to the next.

{% hint style="info" %}
**Feature availability**

Environments are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Enterprise

Only instance owners and instance admins can set up environments, promote, apply, and review promotions.
{% endhint %}

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Why use environments

Separate environments let you change workflows without breaking the ones in use. A common setup:

- **Development:** build and change workflows.
- **Staging:** test changes before they go live.
- **Production:** run the live workflows.

Each environment usually runs on its own n8n instance.

## How environments work

![Changes move from a development instance through an optional review to the Production environment, then to production](../.gitbook/assets/environments-how-it-works.png)

The development instance promotes changes to the Production environment. If that environment requires a promotion review, someone approves the promoted changes on the development instance first, for example through a GitLab merge request. The production instance then applies the changes from the same environment. With Git-based promotion, the Production environment is a Git branch, and promoting commits to it.

## Concepts

### Environment

An environment is a stage in your process, such as staging or production. It stands for the instance at that stage, and holds the version of your work that the instance should run. On each instance, you define environments by direction:

- The environment the instance promotes changes to.
- The environment the instance applies changes from, its source of truth.

Each instance has at most one environment per direction. With Git-based promotion, an environment is a repository and branch, plus settings such as whether each promote pushes a feature branch or opens a merge request.

### Promote and apply

Promote and apply are the two promotion actions:

- **Promote** sends changes from your instance to an environment.
- **Apply** brings changes from an environment into your instance.

A project promote or project apply covers one team project, and you choose the changes to include. An instance promote or instance apply covers every team project and overwrites them to match. An instance apply also deletes projects that aren't in the environment.

### What you promote

Workflows are the main unit of promotion. When you select workflows, n8n adds what they use: credentials, variables, data tables, and tags.

Promote and apply use [n8n packages](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages) to export and import content. To learn what Apply changes on an instance, see [Apply changes](apply-changes.md#what-apply-changes-on-the-instance).

### Promotion review

A promotion review is an optional approval step. Promoted changes reach the environment only after someone approves them. You turn on promotion reviews in the settings of the environment an instance promotes changes to, and you approve them on that same instance. Promotion reviews depend on the provider. See [Promotion reviews](promotion-reviews.md).

### Promotion model

A promotion model is how changes travel between environments. n8n currently supports Git-based promotion, where changes travel through a Git repository. Other models, such as promoting directly from one instance to another, may follow, so the docs name the promotion model apart from the Git providers. See [Git-based promotion](git-based-promotion/).

### Provider

A provider holds the details n8n uses to connect and authenticate to a Git host, such as an access token or an SSH key. Several environments can use the same provider. The Git provider type you choose decides which extra features you get, such as listing repositories and branches, or promotion reviews with GitLab merge requests.

## Environments and Environments (Classic)

Environments replace [Environments (Classic)](../use-source-control-and-environments/), the earlier source control feature. An instance uses one or the other. See [Switch from Environments (Classic)](switch-from-environments-classic.md).

## In this section

- [Plan your environments](plan-your-environments.md): choose how your instances and environments connect.
- [Set up environments](set-up-environments.md): add providers and environments, and protect an instance.
- [Promote changes](promote-changes.md): send a project or the whole instance to an environment.
- [Apply changes](apply-changes.md): bring changes from an environment into a project or the whole instance.
- [Promotion reviews](promotion-reviews.md): approve promoted changes before they reach the environment's branch.
- [Git-based promotion](git-based-promotion/): how environments use Git, and the supported Git providers.
- [Known limitations](known-limitations.md): what Environments don't support yet, and workarounds.
- [Switch from Environments (Classic)](switch-from-environments-classic.md): compare the two versions and switch an instance.

## Related resources

- [Administer](../)
- [Set permissions and roles](../manage-users-and-access/set-permissions-and-roles-rbac/README.md)
- [n8n packages](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages)
