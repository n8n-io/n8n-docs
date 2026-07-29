---
title: GitLab node documentation
description: >-
  Learn how to use the GitLab node in n8n. Follow technical documentation to
  integrate GitLab node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: GitLab node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.gitlab.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab'
layout:
  description:
    visible: false
---

# GitLab node <a href="#gitlab-node" id="gitlab-node"></a>

Use the GitLab node to automate work in GitLab, and integrate GitLab with other applications. n8n has built-in support for a wide range of GitLab features, including creating, updating, deleting, and editing issues, repositories, releases and users. 

On this page, you'll find a list of operations the GitLab node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [GitLab credentials](../credentials/gitlab.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

* File
	* Create
	* Delete
	* Edit
	* Get
	* List
* Issue
    * Create a new issue
    * Create a new comment on an issue
    * Edit an issue
    * Get the data of a single issue
    * Lock an issue
* Release
    * Create a new release
    * Delete a new release
    * Get a new release
    * Get all releases
    * Update a new release
* Repository
    * Get the data of a single repository
    * Returns issues of a repository
* User
    * Returns the repositories of a user

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse GitLab node documentation integration templates](https://n8n.io/integrations/gitlab) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [GitLab's documentation](https://docs.gitlab.com/ee/api/rest/) for more information about the service.

n8n provides a trigger node for GitLab. You can find the trigger node docs [here](../trigger-nodes/n8n-nodes-base.gitlabtrigger.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

