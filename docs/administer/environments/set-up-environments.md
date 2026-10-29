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
- You have a Git repository and a way to authenticate: n8n generates an SSH key that you add to the repository as a deploy key or to a Git account, or you use an account with an access token. You need write access to promote and read access to apply. See your provider's page under [Git-based promotion](git-based-promotion/README.md).

On self-hosted n8n:

- The `promotions` module loads by default on licensed instances. To turn Environments off, set `N8N_DISABLED_MODULES=promotions`.
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

To bring your work to a target instance for the first time:

1. On the source instance, [add the environment](#add-an-environment) you promote to.
2. Run an [instance promote](promote-changes.md#instance-promote). It sends every team project.
3. If the environment pushes feature branches or opens promotion reviews, merge the feature branch or approve the review.
4. On the target instance, add the environment you apply from, using the same repository and branch as the source's environment.
5. Run an [instance apply](apply-changes.md#instance-apply). It creates every team project on the target and handles the dependencies between projects. When n8n asks, create the credentials and variables that don't exist on the target yet. If the target already has content, read [Apply to an instance that already has content](#apply-to-an-instance-that-already-has-content) first.
6. Publish the workflows you want to run. Workflows that Apply creates arrive unpublished.
7. Turn on [Protected instance](#protect-an-instance) on the target.

Keep the source and target instances on the same n8n version.

Personal projects aren't promoted. Before you start, move the workflows and credentials that team projects use out of personal projects and into team projects.

### Apply to an instance that already has content

Apply matches projects, workflows, credentials, and data tables by ID. What the first apply does to the content on the target depends on where that content came from:

- **Pulled by Environments (Classic):** Classic pull kept the source's IDs, so Apply updates the content in place. Workflows keep their version history and executions. Existing variables keep their values, and existing credentials keep their secrets.
- **Created by hand on the target:** the IDs differ from the source, even when the names match. Apply creates the source's content next to it.

The apply level decides what happens to content that isn't on the branch:

- **Instance apply:** makes every team project match the branch. After you confirm, it deletes projects that aren't on the branch, such as projects created by hand.
- **Project apply:** changes only the workflows you select in one project and their dependencies, and never deletes projects. Start with the projects that others depend on, such as a project with shared sub-workflows or credentials. See [Cross-project dependencies](known-limitations.md#cross-project-dependencies).

{% hint style="warning" %}
You can't undo an instance apply. It treats the environment's branch as the source of truth for your team projects. It deletes projects that aren't on the branch, with everything in them, such as credentials and data table rows, and it deletes workflows that aren't on the branch, even in projects that stay. Only run an instance apply after an instance promote from the source, or after you back up the target. On a new target, run the instance apply before people start working there.
{% endhint %}

## Edit or remove an environment

Open **Environment actions** on the environment, then select **Edit** or **Remove**.

You can't change an environment's direction or its provider. To use a different provider, remove the environment and add it again.

To change the authentication details, for example to replace an expired access token, edit the environment and select **Edit provider**. The new details apply to every environment that uses the provider.

Removing an environment doesn't change the Git repository. If no other environment uses the same provider, n8n also deletes the provider's connection details.

## Protect an instance

On instances that only apply changes, such as production, turn on **Protected instance** in **Settings** > **Environments**.

**Protected instance** stops people from doing these things in the UI:

- Edit workflows, or create workflows, credentials, projects, folders, variables, or data tables.
- Run workflows manually. Published workflows still run from their triggers.
- Change data table columns.

People can still:

- Edit existing credentials, variable values, and data table rows.
- Create missing credentials and variables while they resolve Apply blockers.
- Publish and unpublish workflows.
- Promote and apply.

The public API still allows most other changes.

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
