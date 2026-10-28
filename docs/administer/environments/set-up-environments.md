---
description: Add providers and environments to an n8n instance, check their connection, and protect instances that only apply changes.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Set up environments

To set up environments on an instance, add the environment you promote to, the environment you apply from, or both.

Repeat this on each instance. To decide which environments each instance needs, see [Plan your environments](plan-your-environments.md).

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Prerequisites

- You're an instance owner or instance admin.
- Your instance is on an Enterprise plan.
- You have a Git repository and an SSH key, account, or token with access to it: write access to promote, read access to apply. See your provider's page under [Git-based promotion](git-based-promotion/README.md).

On self-hosted n8n:

- Enable the `promotions` module with `N8N_ENABLED_MODULES=promotions`. TODO(OPEN-1): confirm the module and the `N8N_ENV_FEAT_PROMOTIONS` flag are still needed for the release.
- The official Docker image includes `git`. On other installs, install `git` on the server that runs n8n.
- Environments run on main instances only, not on workers.

## Add an environment

Each instance promotes to at most one environment and applies from at most one. Set up the source instance first, and promote once before the target instance applies. See [First promote and apply](#first-promote-and-apply). With Generic Git, an empty repository works for the first connect and for direct promotes. For feature-branch promotes, the environment's branch must already exist on the Git host.

If the instance is connected to Environments (Classic), upgrade it first: go to **Settings** > **Environments (Classic)**, select **Upgrade**, then confirm. See [Upgrade from Environments (Classic)](upgrade-from-environments-classic.md).

1. Go to **Settings** > **Environments**.
2. Under **Promote changes to** or **Apply changes from**, select **Add environment**.
3. Choose the provider type: **Generic Git** or **GitLab**.
4. Connect the provider. Enter a **Name** and the authentication details for your Git host. See [Generic Git](git-based-promotion/generic-git.md) or [GitLab](git-based-promotion/gitlab.md).
5. Enter an **Environment name**, such as `Production`.
6. Choose the repository and **Branch**. For Generic Git, enter the **Repository URL**. For GitLab, pick the **Repository** from the list.
7. Promote environments only: to push each promote to a feature branch instead of the branch itself, turn on **Push to a new branch** (Generic Git) or **Open a merge request in GitLab** (GitLab).
8. Select **Add environment**.

n8n saves the environment and connects to the repository. The environment then shows **Connected**. If it shows **Not connected**, fix the cause and select **Retry**. If it shows **Out of date**, the repository or branch changed since n8n connected, so select **Reconnect**. If that fails, see [Git-based promotion](git-based-promotion/README.md#troubleshooting).

When you add the second environment on an instance with the same provider type, n8n reuses the first environment's provider, so you don't enter the authentication details again.

## First promote and apply

To bring your work to a new target instance for the first time:

1. On the source instance, [add the environment](#add-an-environment) you promote to.
2. Run an [instance promote](promote-changes.md#instance-promote). It sends every team project.
3. If the environment pushes feature branches or opens promotion reviews, merge the feature branch or approve the review.
4. On the target instance, add the environment you apply from, using the same repository and branch as the source's environment.
5. Run an [instance apply](apply-changes.md#instance-apply). It creates every team project on the target and handles the dependencies between projects. When n8n asks, create the credentials and variables that don't exist on the target yet.
6. Publish the workflows you want to run. Workflows that Apply creates arrive unpublished.
7. Turn on [Protected instance](#protect-an-instance) on the target.

Keep the source and target instances on the same n8n version.

An instance apply overwrites every team project on the target and deletes team projects that aren't on the branch, so run it before people start working on the target. You can also promote and apply projects one by one. Start with the projects that others depend on, such as a project with shared sub-workflows or credentials. See [Cross-project dependencies](known-limitations.md#cross-project-dependencies).

Personal projects aren't promoted. Before you start, move the workflows and credentials that team projects use out of personal projects and into team projects.

## Edit or remove an environment

Open **Environment actions** on the environment, then select **Edit** or **Remove**.

You can't change an environment's direction or its provider. To use a different provider, remove the environment and add it again.

To change the authentication details, for example to replace an expired access token, edit the environment and select **Edit provider**. The new details apply to every environment that uses the provider.

Removing an environment doesn't change the Git repository. If no other environment uses the same provider, n8n also deletes the provider's connection details.

## Protect an instance

On instances that only apply changes, such as production, turn on **Protected instance** in **Settings** > **Environments**.

**Protected instance** stops people from editing workflows and creating resources in the UI, such as workflows, credentials, projects, folders, variables, and data tables. This prevents accidental manual changes. People can still edit existing credentials, variable values, and data table rows, and create missing credentials and variables while they resolve Apply blockers. People can also still publish and unpublish workflows. The setting applies to the UI only: the public API still allows most changes.

Environments (Classic) uses the same setting. Turning it on or off changes it for both.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Upgrade from Environments (Classic)](upgrade-from-environments-classic.md)
