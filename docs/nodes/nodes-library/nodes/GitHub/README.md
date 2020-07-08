---
permalink: /nodes/n8n-nodes-base.github
---

# GitHub

[GitHub](https://github.com/) provides hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Github/README.md).
:::

## Basic Operations

- File
    - Create a new file in repository
    - Delete a file in repository
    - Edit a file in repository
    - Get the data of a single issue
- Issue
	- Create a new issue
	- Create a new comment on an issue
	- Edit an issue
	- Get the data of a single issue
	- Lock an issue
- Repository
	- Get the data of a single repository
	- Return the contents of the repository's license file, if one is detected
	- Returns issues of a repository
	- Get the community profile of a repository with metrics, health score, description, license, ...
	- Get the top 10 popular content paths over the last 14 days
	- Get the top 10 referrering domains over the last 14 days
- Release
	- Creates a new release
- User
	- Returns the repositories of a user

## Example Usage

This workflow allows you to get the community profile of a GitHub repository. You can also find the [workflow](https://n8n.io/workflows/450) on the website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [GitHub]()

The final workflow should look like the following image.

![A workflow with the GitHub node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. GitHub node

1. First of all, you'll have to enter credentials for the GitHub node. You can find out how to do that [here](../../../credentials/Github/README.md).
2. Select the 'Repository' option under the *Resource* field.
3. Select the 'Get Profile' option under the *Operation* field.
4. Enter the repository owner in the *Repository Owner* field.
5. Enter the repository name in the *Repository Name* field.
6. Click on *Execute Node* to run the workflow.
