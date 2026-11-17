---
description: Stop people from changing an instance that only applies changes, such as production, in the UI.
status: preview
layout:
  description:
    visible: false
---

# Protect a production instance

On instances that only apply changes, such as production, turn on **Protected instance** in **Settings** > **Environments**.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

**Protected instance** stops people from doing these things in the UI:

- Edit workflows, or create workflows, credentials, projects, folders, variables, or data tables.
- Run workflows manually. Published workflows still run from their triggers.
- Change data table columns.

People can still:

- Edit existing credentials, variable values, and data table rows.
- Create missing credentials and variables while they resolve Apply blockers.
- Add missing projects from the environment they apply from.
- Publish and unpublish workflows.
- Promote and apply.

The public API still allows most other changes.

Environments (Classic) uses the same setting. Turning it on or off changes it for both.

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Your first promotion](first-promotion.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Promotion reviews](promotion-reviews.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Upgrade from Environments (Classic)](upgrade-from-environments-classic.md)
