---
description: Understand what Preview, GA, deprecated, and removed mean for n8n features, how n8n versioning works, and how plan, platform, and role limits apply.
layout:
  description:
    visible: false
---

# Understand feature availability

Whether you have access to an n8n feature depends on your **plan**, **platform**, and **n8n version**. Whether you can rely on it depends on its maturity status, Preview, GA, deprecated, or removed.

This page explains:

* What each maturity status means, and where it sits in a feature's lifecycle
* How n8n versioning works
* How platform, plan, and role limits apply

Each of these has its own label or hint in n8n docs, for example a **Feature availability** hint or a **Preview status** hint, so you'll recognize the same information wherever a page states it.

This information is useful for instance admins before upgrading, before turning on a Preview feature for your team, or before confirming a plan or edition unlocks something you want to promise users. If you're building a workflow or reading a node's docs, you need to know whether a feature is stable enough to depend on in production, and why it might not show up on your instance yet.

## Feature maturity: Preview, deprecated, and removed

Every n8n feature has one of three maturity statuses:

* **Preview**: The feature works, but isn't complete or stable yet, and may change. Avoid relying on a Preview feature in a production workflow. A page or section about a Preview feature carries a **Preview status** hint.
* **Generally available (GA)**: The default, stable status. A GA feature is complete and supported, and n8n only changes its behavior through the deprecation process below rather than without warning. Docs don't call this out explicitly, since it's the default: if a page has neither a Preview status hint nor a Deprecated tag, the feature is GA.
* **Deprecated**: The feature still works, but n8n plans to remove it and recommends moving away from it. A deprecated feature, setting, or node names the n8n version it was deprecated from, and its replacement, where one exists.
* **Removed**: The feature no longer exists in the current version. Removal always happens at a major version. Check that version's breaking changes page, for example [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes), for what to do instead.

For nodes specifically, check [Deprecated and versioned nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/deprecated-nodes) for the current, automatically updated list, rather than relying on any single node's page.

## How versions work in n8n

n8n has two separate version numbers:

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

## Platform, plan, and role limits

Availability also depends on where and how you run n8n, and who's asking, along three separate axes:

* **Platform**: whether the feature is on n8n Cloud, self-hosted, or both.
* **Plan or edition**: your commercial tier. On n8n Cloud, that's your subscription plan (Starter, Pro, Enterprise). Self-hosted, it's your edition (Community, Registered Community, Business, Enterprise), unlocked by a license key when you subscribe to a paid plan.
* **Role or permissions**: even when your plan, platform, and version all include a feature, your instance owner or admin decides whether your role can see or use it.

The first two are product limits, n8n itself sets them. The third is a limit your own admin sets, not n8n. See [Understand instance roles](manage-users-and-access/understand-instance-roles.md) and [Set permissions and roles (RBAC)](manage-users-and-access/set-permissions-and-roles-rbac/README.md) for how roles and permissions work.

See the [key concept glossary](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#plan-n8n) for how plan, edition, and license relate to each other.

A page limited to certain plans or platforms carries a hint titled **Feature availability** stating exactly which ones. For the full breakdown of what each self-hosted edition includes, see [Compare plans and editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features). For the current feature list per plan, the [pricing page](https://n8n.io/pricing/) is the source of truth, since plan contents can change.
