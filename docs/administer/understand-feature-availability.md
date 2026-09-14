---
description: Understand what Preview, GA, deprecated, and removed mean for n8n features, how n8n versioning works, and how plan, platform, and role limits apply.
layout:
  description:
    visible: false
---

# Understand feature availability

Whether you have access to an n8n feature depends on your **plan**, **platform**, and **n8n version**. 
Whether you can rely on it depends on its maturity status: **Preview**, **GA**, **deprecated**, or **removed**.

This page explains:

* How platform, plan, and role limits apply
* How n8n versioning works
* What each maturity status means, and where it sits in a feature's lifecycle

Each of these has its own label or hint in n8n docs, for example a **Feature availability** hint or a **Preview status** hint, so you'll recognize the same information wherever a page states it.

## Feature availability by platform

n8n offers two primary deployment options:

- **n8n Cloud**: a managed setup on an instance run by n8n.
- **Self-hosted**: run n8n on your own machine or infrastructure, or on your cloud platform of choice.

Most features are available on both platforms. Only a few exist on one platform or the other. For example, the [AI Transform](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.aitransform) node is only available on n8n Cloud, while [LangSmith tracing](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/langchain-in-n8n#use-langsmith-with-a-self-hosted-n8n-instance) is only available on self-hosted.

For such features, in n8n Docs, a platform-specific **Feature availability** hint names only the platform the feature is on, and adds a line stating that it isn't available on the other:

![A Feature availability hint showing a feature available on self-hosted only, with a line stating it isn't available on n8n Cloud](.gitbook/assets/feature-availability-hint-platform-example.png)

<!-- TODO: replace with a real screenshot of a platform-specific Feature availability hint, for example the one on the "Rotate encryption keys" or "Use external storage" page. -->

A feature that's not available on your platform doesn't usually appear in the n8n interface at all, rather than showing up locked.

## Feature availability by plan

Plan or edition is your [commercial tier](https://n8n.io/pricing/):

- For n8n Cloud: **Starter**, **Pro** or **Enterprise**.
- For self-hosted: **Community**, **Registered Community**, **Business**, or **Enterprise**. 

For example, [log streaming](observe-and-log/stream-logs-to-external-systems.md) is only available on Enterprise. The number of [shared projects](manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects.md) you can have differs according to your plan.

For such features, in n8n Docs, a plan-specific **Feature availability** hint lists the plan or edition required on each platform separately:

![A Feature availability hint listing different plan and edition requirements for n8n Cloud and self-hosted](.gitbook/assets/feature-availability-hint-plan-example.png)

<!-- TODO: replace with a real screenshot of a plan-specific Feature availability hint, for example the one on the "Configure SSO" or "Share credentials securely" page. -->

A feature that needs a higher plan or edition still shows up in the n8n interface, but greyed out with an **Upgrade** badge and a tooltip linking to the pricing or billing page.

<TODO screenshot of interface>

## Feature availability by n8n version

CONTINUE FROM HERE

n8n has two separate types of version number:

* **Instance version**: the n8n release itself, written as three-part [semantic versioning](https://semver.org/), for example n8n 2.30.0. The MAJOR number increments for incompatible changes that can need user action, MINOR for backward-compatible new features, and PATCH for backward-compatible fixes. Environment variables, APIs, CLI commands, and hooks are all tied to this version.
* **Node version**: a single node's own version number, usually two parts, for example node version 4.7. A node can gain a new version independently of the n8n release it ships in.

n8n Cloud workspaces choose a release track and an update cadence, rather than a single fixed version you upgrade by hand:

* **Release track**: **Beta** delivers new releases as soon as they're ready. **Stable** runs a later, more proven patch that's already spent time on Beta. n8n recommends Stable for mission-critical workloads.
* **Update cadence**: **Security & stability** upgrades roughly every two weeks. **Every new release** upgrades on every release, on average about once a day. Security and stability fixes apply automatically either way.

Switch tracks or cadence anytime from **Updates & maintenance** in your workspace settings, see [Update your version](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/update-your-version). Self-hosted instances update on your own schedule instead, see [Update n8n](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/update-n8n).

To find out what's available in a given version, use whichever of these matches how much detail you need:

* [Changelog](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/): a curated, narrative summary of the most important features as n8n rolls them out.
* [Release notes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/release-notes): every feature-level update, one line per feature, newest first, also available as an RSS feed.
* [GitHub releases](https://github.com/n8n-io/n8n/releases): full change detail linked to commits, including bug fixes and minor changes the other two skip.

Publishing in the changelog or release notes doesn't guarantee a feature has reached your instance yet. Some features ship behind a flag you need to enable, and others roll out gradually to n8n Cloud or self-hosted instances before reaching everyone.

## Other factors influencing feature availability 

* **Role or permissions**: even when your plan, platform, and version all include a feature, your instance owner or admin decides whether your role can see or use it.

This is a limit your own admin sets, not n8n. See [Understand instance roles](manage-users-and-access/understand-instance-roles.md) and [Set permissions and roles (RBAC)](manage-users-and-access/set-permissions-and-roles-rbac/README.md) for how roles and permissions work.

## Feature maturity: Preview, deprecated, and removed

Every n8n feature has a maturity status:

* **Preview**: The feature works, but isn't complete or stable yet, and may change. Avoid relying on a Preview feature in a production workflow. A page or section about a Preview feature carries a **Preview status** hint.
* **Generally available (GA)**: The default, stable status. A GA feature is complete and supported, and n8n only changes its behavior through the deprecation process below rather than without warning. Docs don't call this out explicitly, since it's the default: if a page has neither a Preview status hint nor a Deprecated tag, the feature is GA.
* **Deprecated**: The feature still works, but n8n plans to remove it and recommends moving away from it. A deprecated feature, setting, or node names the n8n version it was deprecated from, and its replacement, where one exists.
* **Removed**: The feature no longer exists in the current version. Removal always happens at a major version. Check that version's breaking changes page, for example [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes), for what to do instead.

For nodes specifically, check [Deprecated and versioned nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/deprecated-nodes) for the current, automatically updated list, rather than relying on any single node's page.





A page limited to certain plans or platforms carries a hint titled **Feature availability** stating exactly which ones. For the full breakdown of what each self-hosted edition includes, see [Compare plans and editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features). For the current feature list per plan, the [pricing page](https://n8n.io/pricing/) is the source of truth, since plan contents can change.
