---
description: Bring your work from a source instance to a new target instance for the first time.
status: preview
layout:
  description:
    visible: false
---

# Your first promotion

Bring your work from a source instance, such as development, to a target instance, such as production, for the first time.

If your instances use Environments (Classic), start with [Migrate from Environments (Classic)](upgrade-from-environments-classic.md#migrate-from-environments-classic).

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

## Promote and apply

1. On the source instance, add the environment you promote to. See [Plan your environments](plan-your-environments.md).
2. On the target instance, add the environment you apply from, using the same repository and branch as the source's environment.
3. Bring your work over, all at once or project by project:
   - **All at once:** on the source, run an [instance promote](promote-changes.md#instance-promote). It sends every team project. On the target, run an [instance apply](apply-changes.md#instance-apply). It creates every team project and handles the dependencies between projects.
   - **Project by project:** on the source, run an instance promote, or a [project promote](promote-changes.md#project-promote) in each project. A project without workflows needs an instance promote. See [Promoting projects without workflows](known-limitations.md#promoting-projects-without-workflows). On the target, [add any missing projects](apply-changes.md#add-missing-projects), then run a [project apply](apply-changes.md#project-apply) in each. Start with the projects that others depend on, such as a project with shared sub-workflows or credentials.

   If the environment pushes feature branches or opens promotion reviews, merge the feature branch or approve and merge the review before you apply. When n8n asks, create the credentials and variables that don't exist on the target yet. If the target already has content, read [Apply to an instance that already has content](#apply-to-an-instance-that-already-has-content) first.
4. Publish the workflows you want to run. Workflows that Apply creates arrive unpublished.
5. [Protect the target instance](protect-a-production-instance.md).

Keep the source and target instances on the same n8n version.

Personal projects aren't promoted. Before you start, move the workflows and credentials that team projects use out of personal projects and into team projects.

### Apply to an instance that already has content

Apply matches projects, workflows, credentials, and data tables by ID. Content you created by hand on the target has different IDs from the source, even when the names match, so Apply creates the source's content next to it.

The apply level decides what happens to content that isn't on the branch:

- **Project apply:** changes only the workflows you select in one project and their dependencies, and never deletes projects. Use it to keep the content on the target. If a project isn't on the target yet, an instance owner or admin [adds it from the environment](apply-changes.md#add-missing-projects) first, next to the instance **Apply** in **Settings** > **Environments**, so it keeps the source's ID. A project you create by hand gets a different ID, and Apply doesn't match it. Start with the projects that others depend on, such as a project with shared sub-workflows or credentials. See [Cross-project dependencies](known-limitations.md#cross-project-dependencies).
- **Instance apply:** makes every team project match the branch. After you confirm, it deletes projects that aren't on the branch, such as projects created by hand.

{% hint style="warning" %}
You can't undo an instance apply. It treats the environment's branch as the source of truth for your team projects. It deletes projects that aren't on the branch, with everything in them, such as credentials and data table rows, and it deletes workflows that aren't on the branch, even in projects that stay. Only run an instance apply after an instance promote from the source, or after you back up the target. On a new target, run the instance apply before people start working there.
{% endhint %}

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Protect a production instance](protect-a-production-instance.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Upgrade from Environments (Classic)](upgrade-from-environments-classic.md)
