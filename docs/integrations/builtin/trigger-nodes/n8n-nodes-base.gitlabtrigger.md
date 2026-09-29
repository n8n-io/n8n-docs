---
title: GitLab Trigger node documentation
description: >-
  Learn how to use the GitLab Trigger node in n8n. Follow technical
  documentation to integrate GitLab Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: GitLab Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger
layout:
  description:
    visible: false
---

# GitLab Trigger node <a href="#gitlab-trigger-node" id="gitlab-trigger-node"></a>

[GitLab](https://gitlab.com/) is a web-based DevOps lifecycle tool that provides a Git-repository manager providing wiki, issue-tracking, and continuous integration/continuous installation pipeline features.

{% hint style="info" %}
**Credentials**

Refer to the [GitLab credentials documentation](../credentials/gitlab.md) for authentication information for this node.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [GitLab Trigger integrations](https://n8n.io/integrations/gitlab-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Comment
* Confidential issues
* Confidential comments
* Deployments
* Issue
* Job
* Merge request
* Pipeline
* Push
* Release
* Tag
* Wiki page

## Working with subgroups and nested repositories

If your repository is located within nested GitLab groups or subgroups (for example, `https://gitlab.com/org/subgroup1/subgroup2/my-repo`), GitLab's API requires you to URL-encode the namespace path.

To configure the node for nested subgroups:

1. **Repository Owner**: Enter the full subgroup hierarchy up to the repository, replacing all forward slashes (`/`) with `%2F`. Example: `org%2Fsubgroup1%2Fsubgroup2`
2. **Repository Name**: Enter the project's repository slug. Example: `my-repo`

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for GitLab. Refer to the [GitLab node documentation](../app-nodes/n8n-nodes-base.gitlab.md) for more information.

View [example workflows and related content](https://n8n.io/integrations/gitlab-trigger/) on n8n's website.

Refer to [GitLab's documentation](https://docs.gitlab.com/api/rest/) for details about their API.
