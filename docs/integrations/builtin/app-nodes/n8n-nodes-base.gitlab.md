# GitLab

The GitLab node allows you to automate work in the GitLab platform and integrate GitLab with other applications. n8n has built-in support for a wide range of GitLab features, including creating, updating, deleting, and editing issues, repositories, releases and users. 

On this page, you'll find a list of operations the GitLab node supports and links to more resources.

!!! note "Credentials"
    Refer to the [GitLab credentials](https://docs.n8n.io/integrations/builtin/credentials/gitlab/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [GitLab integrations](https://n8n.io/integrations/gitlab/){:target="_blank" .external-link} list.


## Basic Operations

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

## Example Usage

This workflow allows you to get the details of a GitLab repository. You can also find the [workflow](https://n8n.io/workflows/465) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [GitLab]()

The final workflow should look like the following image.

![A workflow with the GitLab node](/_images/integrations/builtin/app-nodes/gitlab/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. GitLab node

1. First of all, you'll have to enter credentials for the GitLab node. You can find out how to do that [here](/integrations/builtin/credentials/gitlab/).
2. Select the 'Repository' option from the *Resource* dropdown list.
3. Select the 'Get' option under the *Operation* field.
4. Enter the project owner in the *Project Owner* field.
5. Enter the project name in the *Project Name* field.
6. Click on *Execute Node* to run the workflow.
