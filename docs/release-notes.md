---
title: Release notes
description: Release notes detailing new features and bug fixes for n8n.
tags:
  - release
  - release notes
  - changelog
hide:
  - tags
contentType: reference
---
<!-- vale off -->
# Release notes

New features and bug fixes for n8n.

You can also view the [Releases](https://github.com/n8n-io/n8n/releases) in the GitHub repository.

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

--8<-- "_snippets/update-n8n.md"

## Semantic versioning in n8n

n8n uses [semantic versioning](https://semver.org/). All version numbers are in the format `MAJOR.MINOR.PATCH`. Version numbers increment as follows:

* MAJOR version when making incompatible changes which can require user action.
* MINOR version when adding functionality in a backward-compatible manner.
* PATCH version when making backward-compatible bug fixes.

/// note | Older versions
You can find the release notes for older versions of n8n: [1.x](/release-notes/1-x.md) and [0.x](/release-notes/0-x.md)
///



## n8n@2.1.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.1.0...n8n@2.1.1) for this version.<br />
**Release date:** 2025-12-17

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.



## n8n@2.0.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.2...n8n@2.0.3) for this version.<br />
**Release date:** 2025-12-17

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.1.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0...n8n@2.1.0) for this version.<br />
**Release date:** 2025-12-16

This release contains bug fixes and features.

### Contributors

[Akcthecoder200](https://github.com/Akcthecoder200)  
[rishiraj-58](https://github.com/rishiraj-58)  
[rlafferty](https://github.com/rlafferty)

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.1...n8n@2.0.2) for this version.<br />
**Release date:** 2025-12-12

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0...n8n@2.0.1) for this version.<br />
**Release date:** 2025-12-10

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0-rc.3...n8n@2.0.0) for this version.<br />
**Release date:** 2025-12-05

### Major Version Change

n8n 2.0.0 is a hardening release, not a feature release. It strengthens n8n's position as an enterprise-grade platform with secure-by-default execution, removal of legacy options that caused edge-case bugs, and better performance under load. The goal is a more predictable foundation you can rely on for mission-critical workflows.

This release is currently in **beta**. There's no urgency to upgrade immediately — take time to review the breaking changes and assess your workflows using the migration tool before upgrading.

For the full story behind 2.0, read our [announcement blog post](https://blog.n8n.io/introducing-n8n-2-0/).

### Breaking changes

Version 2.0 includes breaking changes across security defaults, data handling, and configuration. Key changes include:

- Task runners enabled by default (Code node executions now run in isolated environments)
- Environment variable access blocked from Code nodes by default
- ExecuteCommand and LocalFileTrigger nodes disabled by default
- In-memory binary data mode removed

Review the complete list and migration guidance in the [v2.0 breaking changes docs.](https://docs.n8n.io/2-0-breaking-changes/)

### Before you upgrade

Use the **Migration Report** tool to identify workflow-level and instance-level issues that need attention before upgrading.

See the [v2.0 migration tool docs](https://docs.n8n.io/migration-tool-v2/) for details.

### Product updates

**Publish / Save workflow paradigm**

n8n 2.0 introduces a safer approach to updating live workflows. The `Save` button now preserves your edits without changing production. A new `Publish` button lets you explicitly push changes live when ready. See [Publish workflows](https://docs.n8n.io/workflows/publish/) for details.

**Canvas and navigation improvements**

Subtle refinements to the workflow editor canvas and reorganized sidebar navigation.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.


## n8n@2.0.0-rc.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0-rc.3...n8n@2.0.0-rc.4) for this version.<br />
**Release date:** 2025-12-05

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.0-rc.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0-rc.2...n8n@2.0.0-rc.3) for this version.<br />
**Release date:** 2025-12-04

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.0-rc.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0-rc.1...n8n@2.0.0-rc.2) for this version.<br />
**Release date:** 2025-12-04

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.0-rc.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@2.0.0-rc.0...n8n@2.0.0-rc.1) for this version.<br />
**Release date:** 2025-12-04

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.

## n8n@2.0.0-rc.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.122.0...n8n@2.0.0-rc.0) for this version.<br />
**Release date:** 2025-12-02

This release contains bug fixes.

### Contributors

[farzad528](https://github.com/farzad528)  

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases) on GitHub.
