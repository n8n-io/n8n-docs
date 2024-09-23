---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GitLab node documentation
description: Learn how to use the GitLab node in n8n. Follow technical documentation to integrate GitLab node into your workflows.
contentType: integration
priority: medium
---

# GitLab node

Use the GitLab node to automate work in GitLab, and integrate GitLab with other applications. n8n has built-in support for a wide range of GitLab features, including creating, updating, deleting, and editing issues, repositories, releases and users. 

On this page, you'll find a list of operations the GitLab node supports and links to more resources.

/// note | Credentials
Refer to [GitLab credentials](/integrations/builtin/credentials/gitlab/) for guidance on setting up authentication. 
///

## Operations

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'gitlab') ]]

## Related resources

Refer to [GitLab's documentation](https://docs.gitlab.com/ee/api/rest/){:target=_blank .external-link} for more information about the service.

n8n provides a trigger node for GitLab. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger/).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

