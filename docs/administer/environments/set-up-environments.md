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

To set up environments on an instance, add the environment it promotes changes to, the environment it applies changes from, or both. Repeat this on each instance. To decide which environments each instance needs, see [Plan your environments](plan-your-environments.md).

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Prerequisites

- You're an instance owner or instance admin.
- Your plan includes Environments. TODO(OPEN-2): confirm plans.
- You have a Git repository and an account or token with write access to it. See your provider's page under [Git-based promotion](git-based-promotion/).

On self-hosted n8n:

- Enable the `promotions` module with `N8N_ENABLED_MODULES=promotions`. TODO(OPEN-1): confirm the module and the `N8N_ENV_FEAT_PROMOTIONS` flag are still needed for the release.
- Install `git` on the server that runs n8n.
- Environments run on main instances only, not on workers.

## Add an environment

1. Go to **Settings** > **Environments**.
2. Under **Promote changes to** or **Apply changes from**, select **Add environment**.
3. Choose the provider type: **Generic Git** or **GitLab**.
4. Connect the provider. Enter a **Name** and the authentication details for your Git host. See [Generic Git](git-based-promotion/generic-git.md) or [GitLab](git-based-promotion/gitlab.md).
5. Enter an **Environment name**, such as `Production`.
6. Choose the repository and **Branch**. For Generic Git, enter the **Repository URL**. For GitLab, pick the **Repository** from the list.
7. Promote environments only: to push each promote to a new branch instead of the branch itself, turn on **Push to a new branch** (Generic Git) or **Open a merge request in GitLab** (GitLab).
8. Select **Add environment**.

n8n saves the environment and connects to the repository.

When you add the second environment on an instance with the same provider type, n8n reuses the first environment's provider, so you don't enter the authentication details again.

## Check the connection

Each environment shows its connection status in **Settings** > **Environments**:

| Status | Meaning | Action |
|---|---|---|
| **Connected** | n8n can reach the repository and branch. | None |
| **Out of date** | The repository or branch changed. | Select **Reconnect**. |
| **Not connected** | n8n can't reach the repository. | Fix the cause, then select **Retry**. See [Git-based promotion](git-based-promotion/README.md#troubleshooting). |

## Edit or remove an environment

Open **Environment actions** on the environment, then select **Edit** or **Remove**.

You can't change an environment's direction or its provider. To use a different provider, remove the environment and add it again.

Removing an environment doesn't change the Git repository. If no other environment uses the same provider, n8n also deletes the provider's connection details.

## Protect an instance

On instances that only apply changes, such as production, turn on **Protected instance** in **Settings** > **Environments**. Users then can't edit workflows on the instance.

Environments (Classic) uses the same setting. Turning it on or off changes it for both.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Git-based promotion](git-based-promotion/)
