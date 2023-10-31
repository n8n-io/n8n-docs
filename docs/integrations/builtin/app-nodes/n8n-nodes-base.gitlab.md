---
title: GitLab
description: Documentation for the GitLab node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# GitLab

Use the GitLab node to automate work in GitLab, and integrate GitLab with other applications. n8n has built-in support for a wide range of GitLab features, including creating, updating, deleting, and editing issues, repositories, releases and users. 

On this page, you'll find a list of operations the GitLab node supports and links to more resources.

!!! note "Credentials"
    Refer to [GitLab credentials](/integrations/builtin/credentials/gitlab/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [GitLab integrations](https://n8n.io/integrations/gitlab/){:target="_blank" .external-link} list.


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


## Related resources


Refer to [GitLab's documentation](https://docs.gitlab.com/ee/api/rest/){:target=_blank .external-link} for more information about the service.

n8n provides a trigger node for GitLab. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger/).
	
View [example workflows and related content](https://n8n.io/integrations/gitlab/){:target=_blank .external-link} on n8n's website.

