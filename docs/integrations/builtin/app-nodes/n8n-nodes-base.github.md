# GitHub

The GitHub node allows you to automate work in GitHub, and integrate GitHub with other applications. n8n has built-in support for a wide range of GitHub features, including creating, updating, deleting, and editing files, repositories, issues, releases, and users. 

On this page, you'll find a list of operations the GitHub node supports and links to more resources.

!!! note "Credentials"
    Refer to [GitHub credentials](https://docs.n8n.io/integrations/builtin/credentials/github/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [GitHub integrations](https://n8n.io/integrations/github/){:target="_blank" .external-link} list.


## Basic Operations

* File
    * Create a new file in repository.
    * Delete a file in repository.
    * Edit a file in repository.
    * Get the data of a single file.
    * List contents of a folder.
* Issue
    * Create a new issue.
    * Create a new comment on an issue.
    * Edit an issue.
    * Get the data of a single issue.
    * Lock an issue.
* Repository
    * Get the data of a single repository.
    * Returns the contents of the repository's license file, if one is detected.
    * Returns issues of a repository.
    * Get the community profile of a repository with metrics, health score, description, license, etc.
    * Get the top 10 popular content paths over the last 14 days.
    * Get the top 10 referrering domains over the last 14 days.
* Release
    * Creates a new release.
    * Get a release.
    * Get all repository releases.
    * Delete a release.
    * Update a release.
* Review
    * Creates a new review.
    * Get a review for a pull request.
    * Get all reviews for a pull request.
    * Update a review.
* User
    * Returns the repositories of a user.
    * Invites a user to an organization.

## Example Usage

This workflow allows you to get the community profile of a GitHub repository. You can also find the [workflow](https://n8n.io/workflows/450) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [GitHub]()

The final workflow should look like the following image.

![A workflow with the GitHub node](/_images/integrations/builtin/app-nodes/github/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. GitHub node

1. First of all, you'll have to enter credentials for the GitHub node. You can find out how to do that [here](/integrations/builtin/credentials/github/).
2. Select the 'Repository' option under the *Resource* field.
3. Select the 'Get Profile' option under the *Operation* field.
4. Enter the repository owner in the *Repository Owner* field.
5. Enter the repository name in the *Repository Name* field.
6. Click on *Execute Node* to run the workflow.




