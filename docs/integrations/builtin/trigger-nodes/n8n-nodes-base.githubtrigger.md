---
title: GitHub Trigger node documentation
description: >-
  Learn how to use the GitHub Trigger node in n8n. Follow technical
  documentation to integrate GitHub Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: GitHub Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger
layout:
  description:
    visible: false
---

# GitHub Trigger node <a href="#github-trigger-node" id="github-trigger-node"></a>

[GitHub](https://github.com/) provides hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.

{% hint style="info" %}
**Credentials**

Refer to the [GitHub credentials documentation](../credentials/github.md) for authentication information for this node.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [GitHub Trigger integrations](https://n8n.io/integrations/github-trigger/) page.
{% endhint %}

## Node parameters

### Resource

Choose where the node listens for events:

* **Repository**: Receive events from one repository. Select the **Repository Owner** and the **Repository Name**.
* **Organization**: Receive events from every repository in an organization. Select the organization as the **Repository Owner**.

{% hint style="info" %}
**Feature availability**

The **Organization** resource is available from n8n 2.50.0.
{% endhint %}

When you publish the workflow, n8n creates a webhook with a signing secret on the repository or organization. GitHub signs each event with that secret, and the node rejects events without a valid signature.

To create the webhook, the GitHub account that the credential uses needs these permissions:

* **Repository**: Admin access to the repository. A personal access token (classic) needs the `admin:repo_hook` scope.
* **Organization**: Owner of the organization. A personal access token (classic) needs the `admin:org_hook` scope. A fine-grained token or a GitHub App needs the organization permission **Webhooks** with read and write access.

{% hint style="warning" %}
**Event volume**

An organization webhook sends the selected events for every repository in the organization. For example, **Workflow run** starts an execution for every GitHub Actions run in the organization. Select only the events you need.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Branch protection configuration
* Branch protection rule
* Check run
* Check suite
* Code scanning alert
* Commit comment
* Create
* Custom property values
* Delete
* Dependabot alert
* Deploy key
* Deployment
* Deployment status
* Discussion
* Discussion comment
* Fork
* GitHub app authorization
* Gollum
* Installation
* Installation repositories
* Issue comment
* Issue dependencies
* Issue relates to
* Issues
* Label
* Marketplace purchase
* Member
* Membership
* Meta
* Milestone
* Org block
* Organization
* Package
* Page build
* Project
* Project card
* Project column
* Public
* Pull request
* Pull request review
* Pull request review comment
* Pull request review thread
* Push
* Registry package
* Release
* Repository
* Repository advisory
* Repository import
* Repository ruleset
* Repository vulnerability alert
* Secret scanning alert
* Secret scanning alert location
* Secret scanning scan
* Security advisory
* Security and analysis
* Star
* Status
* Sub issues
* Team
* Team add
* Watch
* Workflow job
* Workflow run

The **Membership**, **Org block**, **Organization**, and **Team** events only fire when **Resource** is **Organization**.

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for GitHub. Refer to the [GitHub node documentation](../app-nodes/n8n-nodes-base.github.md) for more information.

View [example workflows and related content](https://n8n.io/integrations/github-trigger/) on n8n's website.

Refer to [GitHub's documentation](https://docs.github.com/en/rest) for details about their API.
