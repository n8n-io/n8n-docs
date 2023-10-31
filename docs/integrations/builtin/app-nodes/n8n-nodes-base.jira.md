---
title: Jira
description: Documentation for the Jira node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Jira

Use the Jira node to automate work in Jira, and integrate Jira with other applications. n8n has built-in support for a wide range of Jira features, including creating, updating, deleting, and getting issues, and users. 

On this page, you'll find a list of operations the Jira node supports and links to more resources.

!!! note "Credentials"
    Refer to [Jira credentials](/integrations/builtin/credentials/jira/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Jira integrations](https://n8n.io/integrations/jira-software/){:target="_blank" .external-link} list.


## Basic Operations

* Issue
    * Get issue changelog
    * Create a new issue
    * Delete an issue
    * Get an issue
    * Get all issues
    * Create an email notification for an issue and add it to the mail queue
    * Return either all transitions or a transition that can be performed by the user on an issue, based on the issue's status
    * Update an issue
* Issue Attachment
    * Add attachment to issue
    * Get an attachment
    * Get all attachments
    * Remove an attachment
* Issue Comment
    * Add comment to issue
    * Get a comment
    * Get all comments
    * Remove a comment
    * Update a comment
* User
    * Create a new user.
    * Delete a user.
    * Retrieve a user.

## Example Usage

This workflow allows you to create a new issue in Jira. You can also find the [workflow](https://n8n.io/workflows/459) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Jira]()

The final workflow should look like the following image.

![A workflow with the Jira node](/_images/integrations/builtin/app-nodes/jira/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Jira node

1. First of all, you'll have to enter credentials for the Jira node. You can find out how to do that [here](/integrations/builtin/credentials/jira/).
2. Select your project from the dropdown list for the *Project* field.
3. Select an issue type from the dropdown list for the *Issue Type* field.
4. Enter the summary of the issue in the *Summary* field.
5. Click on *Execute Node* to run the workflow.

## FAQs

### How to fetch issues for a specific project?

The 'Get All' operation returns all the issues from Jira. To fetch issues for a particular project, you need to use JQL (Jira Query Language).

For example, if you want to receive all the issues of a project named `n8n`, follow the steps mentioned below.
- Select 'Get All' from the ***Operation*** dropdown list.
- Toggle ***Return All*** to true.
- Click on ***Add Option*** and select 'JQL'.
- Enter `project=n8n` in the ***JQL*** field.

This query will fetch all the issues in the project named `n8n`. Enter the name of your project instead of `n8n` to fetch all the issues for your project.

You can refer to the [official documentation](https://www.atlassian.com/software/jira/guides/expand-jira/jql) about JQL to learn more about it.





