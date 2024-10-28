---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GitHub node documentation
description: Learn how to use the GitHub node in n8n. Follow technical documentation to integrate GitHub node into your workflows.
contentType: integration
priority: medium
---

# GitHub node

Use the GitHub node to automate work in GitHub, and integrate GitHub with other applications. n8n has built-in support for a wide range of GitHub features, including creating, updating, deleting, and editing files, repositories, issues, releases, and users. 

On this page, you'll find a list of operations the GitHub node supports and links to more resources.

/// note | Credentials
Refer to [GitHub credentials](/integrations/builtin/credentials/github/) for guidance on setting up authentication. 
///

## Operations

* File
	* Create
	* Delete
	* Edit
	* Get
	* List
* Issue
	* Create
	* Create Comment
	* Edit
	* Get
	* Lock
* Organization
	* Get Repositories
* Release
	* Create
	* Delete
	* Get
	* Get Many
	* Update
* Repository
    * Get
	* Get Issues
	* Get License
	* Get Profile
	* Get Pull Requests
	* List Popular Paths
	* List Referrers
* Review
	* Create
	* Get
	* Get Many
	* Update
* User
    * Get Repositories
    * Invite
* Workflow
	* Disable
	* Dispatch
	* Enable
	* Get
	* Get Usage
	* List

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'github') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

