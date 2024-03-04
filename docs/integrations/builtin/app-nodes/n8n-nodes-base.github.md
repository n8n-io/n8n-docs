---
title: GitHub
description: Documentation for the GitHub node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# GitHub

Use the GitHub node to automate work in GitHub, and integrate GitHub with other applications. n8n has built-in support for a wide range of GitHub features, including creating, updating, deleting, and editing files, repositories, issues, releases, and users. 

On this page, you'll find a list of operations the GitHub node supports and links to more resources.

/// note | Credentials
Refer to [GitHub credentials](/integrations/builtin/credentials/github/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [GitHub integrations](https://n8n.io/integrations/github/){:target="_blank" .external-link} list.
///

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
    * Get the top 10 referring domains over the last 14 days.
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
